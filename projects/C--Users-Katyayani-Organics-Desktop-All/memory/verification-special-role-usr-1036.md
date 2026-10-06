---
name: verification-special-role-usr-1036
description: "USR-1036 Manager Assistant (\"Verification Special\") feature — three uncommitted worktrees (portal, nest, ko-sales), local run recipe, what is still unverified as of 2026-10-06"
metadata:
  node_type: memory
  type: project
  originSessionId: ca5822c6-8603-4477-8939-7356a677e942
  modified: 2026-10-06T13:45:41.497Z
---

Role **USR-1036 = Manager Assistant ("Verification Special")**: logs into the manager portal of the verification portal and must see exactly what their reporting manager (`agent_manager`) sees; actions stay attributed to the assistant; no active manager → own scope only.

**Must-haves, stated by Darshan on 2026-10-06 ("base scoping") — everything else may stay unscoped:**
1. Agent view (after "Switch to Agent") → My Leads (`/leads`, `src/pages/agent/MyLeads.tsx`): the "My Team" agent filter and the team's leads, exactly as the manager gets them. Driven entirely by ko-sales (`GET /agents/my-scope` for the filter + scope label, `GET /leads` for rows) — no frontend change needed.
2. Verification Approval (`/manager/kyc-approval`, `KYCApproval.tsx`): same agent filter and list as the manager. Frontend sends the manager's email as `single_agent` to nest `GET /retailers`; approve/reject go to nest `/verification/approve-kyc|reject-kyc/:id`, which has no role gate and records the token's email (the assistant).

**Where the work is (as of 2026-10-06, all UNCOMMITTED, nothing pushed or deployed):**
- Frontend worktree `Desktop\All\retailer-verification-portel-handle-special-role`, branch `handle-special-role` (upstream `origin/aws-v4`) — 25 files; core is `src/lib/teamUtils.ts` + `src/hooks/useTeamScope.ts`, 16 manager pages use it.
- nest worktree `Desktop\All\rlm-backend-nest-verification-special`, branch `nitesh-verification-special` (upstream `origin/aws-deployed`) — `src/common/utils/manager-assistant.ts` + scope changes in `retailers.service.ts` and `retailer-alerts.service.ts`.
- ko-sales worktree `Desktop\All\ko-sales-backend-verification-special`, branch `nitesh-verification-special` (from `origin/aws-deployed` e9164af0), created by me on 2026-10-06 — `src/common/utils/manager-assistant.util.ts` (+ spec, 13 tests) and `resolve_scope_user` wired into `agents_service.get_team_agent_ids`, `get_my_scope_agents`, `leads_service.get_leads` (global search) and `manager_report_service.build_team_report`. Scope only: `req.user` is never rewritten.

**Why ko-sales needed a change:** it had no USR-1036 anywhere, so `get_scoping_type` treated an assistant as `self`. Effects: Lead Assignment (`GET /leads`) showed only the assistant's own leads, and `GET /statistics/manager-team-report` pinned the report to the assistant's own row — that feeds Call Reporting (the manager portal landing page) and Bandwidth Detector.

**Local run recipe (verified 2026-10-06):** the frontend `.env.local` points login to `localhost:3000` (ko-sales) and the agents list to `localhost:3010` (utils), which are usually not running, so login fails. Start Vite with shell env overrides instead of editing env files (Vite prefers process env over `.env*`): `VITE_BACKEND_URL` / `VITE_B2B_API_URL` and `VITE_BASE_URL` set to the live values from `.env`, `VITE_NEST_V2_URL=http://localhost:4003/api/v2`. Run the special nest with `PORT=4003` (copy `.env` + `.env.local` from the main nest checkout; both gitignored). Live ko-sales/utils allow CORS from `localhost:8005`; nest validates tokens via SSO JWKS. This setup writes to real data.

**Do NOT start ko-sales locally without Darshan's explicit OK:** it has 18 scheduled jobs and 6 queue consumers with no global off switch, and its `.env` points at the remote production MongoDB. So the ko-sales fix is unit-tested but has never run against a real request.

**Still unverified (no USR-1036 test login was available):** every logged-in flow. Also: Live Agents is only an Agri Sales Hub iframe (`/reports/agent-activity/embed?token&email`) that sends the logged-in user's own email; left untouched on purpose (no local repo for the hub, so passing the manager's email could not be verified, and it is outside the must-haves). ~40 other `/manager/*` pages, HRMS and utils handlers were not reviewed. Consciously not converted in ko-sales: `dashboard.get_pipeline_funnel`, contacts b2b shortcut, `queue.gateway` admin room.

**How to apply:** before touching this feature again, re-check `git status` in all three worktrees (it may have been committed or changed since). The same assistant→manager rule lives in three places (portal `teamUtils.ts`, nest `manager-assistant.ts`, ko-sales `manager-assistant.util.ts`) — change them together. Related: [[nest-access-control]], [[rlm-portal-typecheck]] (same `tsc -p tsconfig.app.json` rule applies to the verification portal; its typecheck takes about 7 minutes and has 249 errors that predate this feature; ko-sales has 6 failing jest suites and 2 `scripts/sync-counters.ts` type errors that also predate it).
