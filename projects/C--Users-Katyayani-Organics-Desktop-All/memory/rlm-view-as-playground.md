---
name: rlm-view-as-playground
description: "rlm-portal 2026-10-09 — manager/admin \"Switch to Agent\" opens an agent picker (view-as playground); reads scoped to picked agent, writes stay real user; header bug icon removed"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-09T11:53:50.997Z
---

rlm-portal, branch `new-events-added-api`, committed c2c589c (pushed 2026-10-09, not deployed).

- **Switch to Agent** for managers/admins opens `ViewAsAgentPicker` (src/components/layout). Manager = own team only (roster `agent_manager` === my agent_id); Super Admin/Admin (`isNoScopeAdmin`) = everyone. FO and RO agents only: FO agent USR-1029/1030, RO USR-1022, FO manager USR-1021 (Darshan's rule).
- State in `src/lib/actingAgent.ts` (localStorage `rlm_portal_view_as`, recents `rlm_portal_view_as_recent`); `useActingAgent(user?.role)` gives `actingEmail` / `actingAgentId`. Agent pages READ the picked agent (same `single_agent` / `agent_id` filters Team Retailers uses); WRITES stay the real user.
- MyRetailers: managers/admins/viewing-as can open any lead (Darshan); Call/WhatsApp stay owner-only (in a playground the picked agent's leads can be dialled, as the real user — same as RetailerDetail).
- Known gaps: MyCallRatings API returns only the signed-in user's audits (shows an explanatory empty state while viewing as; needs backend `agent_email`); PCRequest/PCCertificates not view-as aware; NDR backend may ignore a single agent_id for manager tokens (unverified); no real logged-in test yet.
- Picker follows Darshan's reference (card rows, selected footer, Open playground); team tabs ONLY for Super Admin/Admin, managers get one list with no team stamp. "Viewing X" lives in a header chip (no in-page strip). Stored playground is bound to the viewer email + needs agent_id, re-checked against the roster, cleared on logout/login.
- /meri-pareshani (My Problems) is agents-only: managers/admins (also in a playground) get an agents-only screen, no sidebar row.
- Darshan 2026-10-09: header keeps the page background (green header rejected, "keep uniform"), sidebar toggle icon must not change, bug-report icon removed from the header (Bug Reports still reachable from What's New).

**Why:** Darshan wants managers to see exactly what one agent sees without logging in as them.
**How to apply:** any new agent page must read through `useActingAgent` for scope and keep writes on the real user. Related: [[rlm-settings-v3]], [[rlm-ui-sweep-2026-10-09]], [[searchable-dropdowns]].
