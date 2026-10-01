---
name: sb-ticket-keys-govern-department-hierarchy-reads
description: "Department list and hierarchy reads are governed by ticket-system keys (view_departments / view_hierarchy), never by HRMS staff.* keys for ticket roles; IT Team role = asset module only; DB changes ship via migrate:ticket-keys, not by re-running seed:route-perms."
metadata:
  node_type: memory
  type: project
  originSessionId: 473ad943-3e19-48da-a903-078a93c68666
  modified: 2026-10-01T09:19:10.993Z
---

Decision from Darshan (2026-10-01): `GET /api/departments` and the `GET /api/hierarchy/*` reads are mapped to the ticket-system permission keys `view_departments` / `view_hierarchy` (the latter added to `seed-ticket-permissions.ts`). Later the same day the self-scoped reads `GET /api/hierarchy/me/tree` and the new `GET /api/hierarchy/me/line` (manager chain + nested reports) were mapped to `view_hierarchy` too, and the migration grants that key to USER/AGENT/MANAGER; the ticket frontend gates `/hierarchy` with the same key (permissions.js catalog + ROUTE_PERMISSION + RequirePermission). Rule from Darshan: ticket-portal access is always by ticket keys — if a key is missing, add it in the backend catalog + route map + migration, never leave a module open. Ticket roles (USER, AGENT, MANAGER) must get department access through those keys, NOT through `staff.department.view` — that HRMS key also unlocks the staff portal's Departments module. A new role "IT Team" (`IT_TEAM`) holds only the HRMS Asset module keys (`staff.asset.*` incl. the previously missing catalog key `staff.asset.manage`); sf's `HomeRoute` sends such roles to their first visible module instead of the dashboard.

**Why:** The earlier fix (`migrate:user-dept-view`) handed ticket users an HRMS key just to fill a dropdown, leaking an HRMS module to them. Route→permission rows and role permissions are cached in-process, and `seed:route-perms` re-upserts EVERY mapping (would overwrite admin edits made in Settings).

**How to apply:** Ship DB changes with the targeted, idempotent `npm run migrate:ticket-keys` (updates only the named rows, grants ticket keys to roles that held the HRMS view keys, removes `staff.department.view` from USER only, creates IT_TEAM) and restart the API afterwards. Do not run it against the live Atlas DB from a local shell without Darshan's go-ahead; the local `.env` points at production. Related: [[access-is-permission-based]], [[module-access-portal-wise]], [[sb-git-branch-and-main-merge]].
