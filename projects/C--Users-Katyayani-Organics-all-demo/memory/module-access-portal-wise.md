---
name: module-access-portal-wise
description: "Module access (e.g. chat) is decided per portal on the frontend, not by role checks in sb API; chat is for every active user"
metadata: 
  node_type: memory
  type: project
  originSessionId: d76025d8-4edc-45de-951d-1ad00e461085
  modified: 2026-09-15T07:05:51.513Z
---

The user said (2026-09-15) module access is applied portal-wise on the frontend, not on the API. Chat (DMs + groups) must work for every active user, executives (role `USER`) and all agents included.

**Why:** a hard-coded role check in `GET /api/messages/contacts` (`canUseChat` → `staff.chat.view`) gave executives only `{_id, employee_id}`. Their group member picker in the ticket portal then listed employee codes instead of names. The role check was removed on user request.

**How to apply:** don't add role or permission gates to sb chat/group endpoints to decide who can use a module. `authGuard` already blocks inactive/suspended accounts. The `route_permissions` rows mapping `/api/messages/*` and `/api/groups*` to `staff.chat.view` still exist in the DB. Roles need that key, e.g. `npm run seed:chat-perms -- --grant=ALL` then restart, or those routes return 403. See [[portal-ui-text-english-only]].
