---
name: rlm-view-as-playground
description: "rlm-portal 2026-10-09 — manager/admin \"Switch to Agent\" opens an agent picker (view-as playground); reads scoped to picked agent, writes stay real user; header bug icon removed"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-09T11:53:50.997Z
---

rlm-portal, branch `new-events-added-api` (2026-10-09), built in the session that also did the header revert.

- **Switch to Agent** for managers/admins opens `ViewAsAgentPicker` (src/components/layout). Manager = own team only (roster `agent_manager` === my agent_id); Super Admin/Admin (`isNoScopeAdmin`) = everyone. FO and RO agents only: FO agent USR-1029/1030, RO USR-1022, FO manager USR-1021 (Darshan's rule).
- State in `src/lib/actingAgent.ts` (localStorage `rlm_portal_view_as`, recents `rlm_portal_view_as_recent`); `useActingAgent(user?.role)` gives `actingEmail` / `actingAgentId`. Agent pages READ the picked agent (same `single_agent` / `agent_id` filters Team Retailers uses); WRITES stay the real user.
- MyRetailers: managers/admins/viewing-as can open any lead (Darshan); Call/WhatsApp stay owner-only and are disabled while viewing as.
- Known gaps: MyCallRatings API returns only the signed-in user's audits (shows an explanatory empty state while viewing as; needs backend `agent_email`); PCRequest/PCCertificates not view-as aware; NDR backend may ignore a single agent_id for manager tokens (unverified); no real logged-in test yet.
- Darshan 2026-10-09: header keeps the page background (green header rejected, "keep uniform"), sidebar toggle icon must not change, bug-report icon removed from the header (Bug Reports still reachable from What's New).

**Why:** Darshan wants managers to see exactly what one agent sees without logging in as them.
**How to apply:** any new agent page must read through `useActingAgent` for scope and keep writes on the real user. Related: [[rlm-settings-v3]], [[rlm-ui-sweep-2026-10-09]], [[searchable-dropdowns]].
