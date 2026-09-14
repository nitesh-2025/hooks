---
name: gf-calling-integration
description: "Decisions (2026-09-14) for bringing the verification portal's VoIP (JsSIP/Asterisk) + CallerApp calling into gf, with its call bar, drawer and disposition"
metadata: 
  node_type: memory
  type: project
  originSessionId: f444ed37-7c63-4de1-a4c2-e3c95d6476c3
  modified: 2026-09-14T11:22:07.317Z
---

Darshan asked (2026-09-14) to bring retailer-verification-portel's calling into gf (global-connect-new) "with 100% accuracy": VoIP (JsSIP → Asterisk, creds per agent) and normal calling (CallerApp `POST /send-single-call` + `/call-control`, status via Firebase RTDB `calls/{uuid}`, `agents/{topic}`), same bottom ActiveCallBar stages (Connecting amber / Ringing indigo / On call emerald / On hold slate), multi-agent build, end-to-end tested.

Decisions the user made:
- Keep all three providers: VoIP + CallerApp added, Exotel stays. Selection per user: ko-sales `agents_v2` record by email → `is_voip` true = VoIP, agent without VoIP = CallerApp, no agent = Exotel.
- VoIP extension/SIP password come from ko-sales via the EXISTING `GET /agents/search-one?q=<email>` with gf's SSO token (user chose this over a new `/agents/me/voip`, knowing that endpoint leaks every agent's plain-text sipPassword — flag it, don't fix unasked).
- Dispositions saved to gf (call_logs + gb) AND ko-sales `POST /calls/dispositions`; ko-sales only when the record has a `pii_id` (leads_v1/contacts_v1), otherwise gf-only with a note — calls never blocked.
- Disposition form = verification's (connected/not_connected + reason + next action + follow-up datetime + probability), mapped to gf outcomes for gb stage rules.
- On connect show verification's CallWorkspaceDrawer (not bar-only).
- Env values copied from verification .env into gf `.env.local` (git-ignored; gf `.env` is tracked, never put secrets there); VITE_SIP_PASSWORD fallback not copied.
- Later the same day the user changed selection to routing per dialled number: domestic → Vartalap (the agent's ko-sales VoIP/CallerApp), international → Exotel, env-controlled (`VITE_CALL_ROUTE_DOMESTIC`, `VITE_CALL_ROUTE_INTERNATIONAL` = vartalap|exotel, `VITE_CALL_DOMESTIC_COUNTRY_CODES`, default 91). Both providers run at once; manual provider toggle removed. Decided from the NUMBER, not lead market type. Vartalap missing → domestic falls back to Exotel; international never silently moves to Vartalap. Vercel still needs these vars.
- Work on a new branch `feat/voip-callerapp-calling`, not style/nitesh-ui (that one feeds the beta PR). A parallel session (g-connect-f-claude) also works in gf — coordinate before git or shared files.

**Why:** agents already use this calling in verification; gf must behave identically while keeping Exotel users working.
**How to apply:** follow the UI team loop from CLAUDE.md; real test calls only with explicit permission. Related: [[searchable-dropdowns]], [[assistant-identity]].
