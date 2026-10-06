---
name: verification-special-role-usr-1036
description: "USR-1036 Manager Assistant (\"Verification Special\") feature — where the uncommitted work lives, how to run it locally, QA gaps found 2026-10-06"
metadata:
  node_type: memory
  type: project
  originSessionId: ca5822c6-8603-4477-8939-7356a677e942
  modified: 2026-10-06T12:56:57.160Z
---

Role **USR-1036 = Manager Assistant ("Verification Special")**: logs into the manager portal of the verification portal and must see exactly what their reporting manager (`agent_manager`) sees; actions stay attributed to the assistant; no active manager → own scope only.

**Where the work is (as of 2026-10-06, all UNCOMMITTED, nothing pushed):**
- Frontend worktree `Desktop\All\retailer-verification-portel-handle-special-role`, branch `handle-special-role` (upstream `origin/aws-v4`) — 25 files; core is `src/lib/teamUtils.ts` + `src/hooks/useTeamScope.ts`, 16 manager pages use it.
- Backend worktree `Desktop\All\rlm-backend-nest-verification-special`, branch `nitesh-verification-special` (upstream `origin/aws-deployed`) — `src/common/utils/manager-assistant.ts` + scope changes in `retailers.service.ts` and `retailer-alerts.service.ts`.
- ko-sales-backend and utilities have NO USR-1036 handling.

**Local run recipe (verified working 2026-10-06):** the frontend `.env.local` points login to `localhost:3000` (ko-sales) and the agents list to `localhost:3010` (utils), which are usually not running, so login fails. Instead of editing env files, start Vite with shell env overrides (Vite prefers process env over `.env*`): `VITE_BACKEND_URL` / `VITE_B2B_API_URL` and `VITE_BASE_URL` set to the live values from `.env`, `VITE_NEST_V2_URL=http://localhost:4003/api/v2`. Run the special nest with `PORT=4003` (copy `.env` + `.env.local` from the main nest checkout; both gitignored). Live ko-sales/utils allow CORS from `localhost:8005`; nest validates tokens via SSO JWKS, so live logins work. This setup writes to real data.

**QA gaps found by code reading (not yet seen at runtime, no USR-1036 test login was available):**
- Lead Assignment: lead list comes from ko-sales `GET /leads`, scoped by the token's role (`get_scoping_type` → `self` for an unknown role), so an assistant sees only own leads, not the manager's.
- `src/pages/manager/LiveAgents.tsx` still uses `useLoginEmployeeWithManager(user?.email)` — missed.
- ~40 other `/manager/*` pages, HRMS and utils handlers were not reviewed.

**Why:** Darshan asked to run and test this branch on 2026-10-06; the state is not in git, so it cannot be recovered from history.

**How to apply:** before touching this feature again, re-check `git status` in both worktrees (it may have been committed or changed since). Related: [[nest-access-control]], [[rlm-portal-typecheck]] (same `tsc -p tsconfig.app.json` rule applies to the verification portal; its typecheck takes about 7 minutes and has ~249 errors that predate this feature).
