---
name: verification-special-role-usr-1036
description: "USR-1036 Manager Assistant (\"Verification Special\") feature - branch nitesh-special-role-usr-1036 now checked out in the main portal/nest/ko-sales checkouts (worktrees pruned 2026-10-07), local run recipe, what is still unverified"
metadata:
  node_type: memory
  type: project
  originSessionId: ca5822c6-8603-4477-8939-7356a677e942
  modified: 2026-10-07T06:39:04.312Z
---

Role **USR-1036 = Manager Assistant ("Verification Special")**: logs into the manager portal of the verification portal and must see exactly what their reporting manager (`agent_manager`) sees; actions stay attributed to the assistant; no active manager → own scope only.

**Must-haves, stated by Darshan on 2026-10-06 ("base scoping") — everything else may stay unscoped:**
1. Agent view (after "Switch to Agent") → My Leads (`/leads`, `src/pages/agent/MyLeads.tsx`): the "My Team" agent filter and the team's leads, exactly as the manager gets them. Driven entirely by ko-sales (`GET /agents/my-scope` for the filter + scope label, `GET /leads` for rows) — no frontend change needed.
2. Verification Approval (`/manager/kyc-approval`, `KYCApproval.tsx`): same agent filter and list as the manager. Frontend sends the manager's email as `single_agent` to nest `GET /retailers`; approve/reject go to nest `/verification/approve-kyc|reject-kyc/:id`, which has no role gate and records the token's email (the assistant).

**Where the work is (committed and pushed 2026-10-07 on branch `nitesh-special-role-usr-1036` in all three repos; NOT merged, NOT deployed; PRs not opened):**
- Frontend worktree `Desktop\All\retailer-verification-portel-handle-special-role` (commit 572272e, branched from `handle-special-role`, which was never pushed) — 25 files; core is `src/lib/teamUtils.ts` + `src/hooks/useTeamScope.ts`, 16 manager pages use it. Deploy branch for the portal is `aws-v4`.
- nest worktree `Desktop\All\rlm-backend-nest-verification-special` (commit 2d155bb, based on `origin/aws-deployed` 79dee21, 45 commits behind it at the time) — `src/common/utils/manager-assistant.ts` + scope changes in `retailers.service.ts` and `retailer-alerts.service.ts`.
- ko-sales worktree `Desktop\All\ko-sales-backend-verification-special` (commit f7b4b2ba, based on `origin/aws-deployed` e9164af0) — `src/common/utils/manager-assistant.util.ts` (+ spec, 13 tests) and `resolve_scope_user` wired into `agents_service.get_team_agent_ids`, `get_my_scope_agents`, `leads_service.get_leads` (global search) and `manager_report_service.build_team_report`. Scope only: `req.user` is never rewritten.

**Why ko-sales needed a change:** it had no USR-1036 anywhere, so `get_scoping_type` treated an assistant as `self`. Effects: Lead Assignment (`GET /leads`) showed only the assistant's own leads, and `GET /statistics/manager-team-report` pinned the report to the assistant's own row — that feeds Call Reporting (the manager portal landing page) and Bandwidth Detector.

**Local run recipe (verified 2026-10-06):** the frontend `.env.local` points login to `localhost:3000` (ko-sales) and the agents list to `localhost:3010` (utils), which are usually not running, so login fails. Start Vite with shell env overrides instead of editing env files (Vite prefers process env over `.env*`): `VITE_BACKEND_URL` / `VITE_B2B_API_URL` and `VITE_BASE_URL` set to the live values from `.env`, `VITE_NEST_V2_URL=http://localhost:4003/api/v2`. Run the special nest with `PORT=4003` (copy `.env` + `.env.local` from the main nest checkout; both gitignored). Live ko-sales/utils allow CORS from `localhost:8005`; nest validates tokens via SSO JWKS. This setup writes to real data.

**Do NOT start ko-sales locally without Darshan's explicit OK:** it has 18 scheduled jobs and 6 queue consumers with no global off switch, and its `.env` points at the remote production MongoDB. So the ko-sales fix is unit-tested but has never run against a real request.

**Still unverified (no USR-1036 test login was available):** every logged-in flow. Also: Live Agents is only an Agri Sales Hub iframe (`/reports/agent-activity/embed?token&email`) that sends the logged-in user's own email; left untouched on purpose (no local repo for the hub, so passing the manager's email could not be verified, and it is outside the must-haves). ~40 other `/manager/*` pages, HRMS and utils handlers were not reviewed. Consciously not converted in ko-sales: `dashboard.get_pipeline_funnel`, contacts b2b shortcut, `queue.gateway` admin room.

**Open risks found in QA on 2026-10-06 (code-read, not confirmed on data — a read-only query on production `agents_v2` was denied by the permission system; ask Darshan before any production read):**
- All three implementations treat `agents_v2.status` in {inactive, disabled, …} as "manager switched off", but in ko-sales that field is the PRESENCE status (enum: Taking a Quick Break / Available / Out for Lunch / In a Training / End of shift / Active / Inactive). If a working manager's presence is ever `Inactive`, their assistant silently drops to own scope in both must-have flows. Needs Darshan's decision on the rule (e.g. `is_active` only).
- Verification Approval resolves the manager from the rlm roster (`/kyc/agent_v2` on utils). `MyLeads.tsx`'s own comment says that roster "is a filtered subset of agents_v2 and disagrees on managers", and its handler is not in the local `utilities` checkout (master), so whether it returns the assistant's and manager's rows is unverified. My Leads does not depend on the roster.
- Whether any USR-1036 user exists in the database is unknown.

**Update 2026-10-07 (afternoon):** the three separate worktree folders were deleted and their stale git entries pruned. Branch `nitesh-special-role-usr-1036` is now checked out directly in the MAIN checkouts: `retailer-verification-portel` (572272e), `rlm-backend-nest` (2d155bb), `ko-sales-backend` (f7b4b2ba) - all equal to origin. Local run as it stood that day: Vite on :8005 from the portal main checkout (its `.env.local` points login to localhost:3000 ko-sales, nest to localhost:4002, utils to localhost:3010); nest main checkout `.env` has PORT=4002 (not 4003); Darshan was running ko-sales locally himself in watch mode on :3000 (the rule about not starting it applies to me starting it). Switching nest killed Darshan's `nest start --watch` (392 files changed at once); I restarted it with `npm run dev` from my session, log in the scratchpad. ko-sales special branch adds `compression` + `@types/compression` -> `npm install` after switching to it. Previous branches before the switch: portal `check-app-version`, nest `app-version-retailer-sync` (45 commits ahead of the special base), ko-sales `nitesh-lead-app-version`.

**How to apply:** before touching this feature again, re-check `git status` in all three worktrees (it may have been committed or changed since). The same assistant→manager rule lives in three places (portal `teamUtils.ts`, nest `manager-assistant.ts`, ko-sales `manager-assistant.util.ts`) — change them together. Related: [[nest-access-control]], [[rlm-portal-typecheck]] (same `tsc -p tsconfig.app.json` rule applies to the verification portal; its typecheck takes about 7 minutes and has 249 errors that predate this feature; ko-sales has 6 failing jest suites and 2 `scripts/sync-counters.ts` type errors that also predate it).
