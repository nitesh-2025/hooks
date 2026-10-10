---
name: pctv-live-screens
description: "PCTV (People & Team Visibility) — on-demand peer-to-peer live agent screens for managers/admins; branch pctv in rlm-portal (from aws-v2) + nest (from aws-deployed), uncommitted as of 2026-10-10; cluster adapter added to nest"
metadata:
  node_type: memory
  type: project
  originSessionId: 6c258031-a910-406a-8419-4b403286cfed
  modified: 2026-10-10T08:42:52.149Z
---

PCTV = managers/admins watch agents' screens live (like CCTV for PCs). Darshan's hard rules (2026-10-10): **nothing about a session is saved anywhere, connection is peer-to-peer, no load on the server**. He also sent a mockup (header "PCTV / People & Team Visibility", 5 KPI cards Agents/Online/Busy/Offline/Unknown, toolbar search + Your team + All Status + Newest First + green "Peer-to-peer · Not recorded or stored / Live screen is shown only when you click", 5×2 agent cards with status pill, ⋮, preview, green View Live Screen + outline View Activity, numbered pager).

**Where:** branch `pctv` in rlm-portal (base aws-v2 a61e78f) and rlm-backend-nest (base aws-deployed 96df0e9). Created 2026-10-10, not committed/pushed when this was written — check `git status` first.

**Design decisions:**
- On demand: a view opens only on click. Not sharing → `share:ask` → agent dialog (Share screen / Not now → `share:decline`). Agent capture is opt-in (browser picker); max 4 viewers per agent; viewer tab hidden 60 s closes views.
- nest `src/modules/pctv`: `GET /pctv/agents` (page, limit 10, search name/agent id/katyayani id/email, status, sort newest|oldest|name, scope all|team|direct, KPI counts) + socket namespace `/pctv` that only relays SDP/ICE (rebuilt by `cleanSignal`, never logged). Presence = socket rooms (`pctv:online|share|watch:<ID>`), read by `PctvPresenceService` (3 s cache). Busy = online + agents_v2.status busy/on call.
- Authorization from the token via AccessService: admin → everyone; anyone else → agents below them (covers minus self), even ACCESS_DASHBOARD_ROLES managers (narrower than their data access — product call). Nobody below → 403.
- Prod runs `cluster.js` with 2 workers and no shared socket adapter → added `@socket.io/cluster-adapter` (setupPrimary in cluster.js, createAdapter in socket-io.adapter.ts when cluster.isWorker and no Redis). This also fixes half-delivery of every other gateway's emits.
- Frontend token: `rlm_portal_auth_token` first (stale `v2_access_token`, see [[rlm-create-order-lookup]]); agent refuses to share if `auth:ok` agentId ≠ `rlm_portal_agent_id`.
- "View Activity" → `/manager/events?agent_id=…` (TeamEvents now honours that param once the roster loads).

**Not verified:** no browser run (no real WebRTC session), no real-data query (nest .env.local now points at a non-beta DB; production reads need Darshan's OK). No TURN: networks that block direct P2P will show "Could not connect".

Related: [[four-agent-review]], [[nest-access-control]], [[searchable-dropdowns]].
