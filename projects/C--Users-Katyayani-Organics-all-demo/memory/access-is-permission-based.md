---
name: access-is-permission-based
description: "sf/sb actions are gated by permission keys a role holds, never by role name (ADMIN/SUPER_ADMIN) alone"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 5af2fa5c-8ad5-40f8-b6cd-b4c95087e59c
  modified: 2026-09-24T13:59:54.126Z
---

Any action in staffcore/node-backend (create/edit/delete user, etc.) must be allowed for **whoever holds the permission key**, not only ADMIN / SUPER_ADMIN. The user said (2026-09-24): "admin super admin nahi, jiske pass access rahega wo bhi kar sakta hai".

**Why:** roles are configured from the permission catalog (`seed-permissions.ts`, e.g. `staff.admin.user.edit`); a hard-coded `isAdmin` / `roleGuard("SUPER_ADMIN","ADMIN")` locks out custom roles that were granted the access.

**How to apply:**
- Backend: use `accessGuard(key, ...alsoRoles)` from `common/guards` (SUPER_ADMIN always passes; also honours the DB route_permissions map), not a bare `roleGuard`.
- Frontend: `useAccess().has(key)` (plus `isSuperAdmin`), not `isAdmin` alone.
- Keep security guards that are about the *target* (e.g. only SUPER_ADMIN may edit a SUPER_ADMIN account) — those are escalation rules, not access gates.
- Check the key actually exists in the catalog (staffcore once used a non-existent `staff.user.view`).

Related: [[module-access-portal-wise]]
