---
name: call-logs-v1
description: "2026-09-15 decisions for Global Connect's call_logs_v1 table (gb+gf) — one outcome column, agent via view, no status/agent_name/ring_sec"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0b98f2d4-fc4c-46d6-8993-8574c0eea0f7
  modified: 2026-09-15T08:40:42.986Z
---

On 2026-09-15 Darshan had all Global Connect calls (Exotel, VoIP, CallerApp, Telnyx, Twilio) moved from `call_logs` to `call_logs_v1` — a full switch: every writer and every screen, not a dual write.

Decisions the user made:
- `outcome` is the ONE result column: `connected` | `not_connected`, NULL while live. User: "calls either connected hoga or not connected" — no second result field. `status` column dropped; Exotel's live call-bar state lives in `provider_status`.
- `outcome_reason` is `text` + CHECK fixed list (not a Postgres enum type).
- No `agent_name` column: "agent id hai to populate karke get me nikal sakte hai". `agent_id` uuid → auth.users; name via view `call_logs_v1_with_agent`.
- `is_missed` kept, but as a GENERATED column (inbound + not_connected).
- `ring_sec` dropped (derive `answered_at - started_at`); `duration_sec` kept (provider's own talk time).
- Before that, user said no need to edit gf `logCall` just to add agent_name/outcome to old `call_logs` — they wanted the v1 redesign instead.

Work lives on branch `feat/call-logs-v1`: gb in place, gf in a separate worktree `global-connect-new-calllogs` (so the parallel g-connect-f-claude session's checkout isn't switched). Migration `global-connect-backend/supabase/public-v1-migration/0024_create_call_logs_v1.sql`, design doc `global-connect-backend/docs/call_logs_v1.md`.

**Why:** every provider filled `call_logs` differently (Vartalap left outcome null, Exotel set is_missed on outbound), so no report could count connected calls from one column.
**How to apply:** new call code must write `call_logs_v1` and read `call_logs_v1_with_agent`; never add a second result/status column or copy agent names onto rows. gb CLAUDE.md: every Supabase SQL (read or write) needs explicit user approval first. Related: [[gf-calling-integration]], [[gf-call-region-rule]].
