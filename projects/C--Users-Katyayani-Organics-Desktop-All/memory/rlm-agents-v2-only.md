---
name: rlm-agents-v2-only
description: "rlm-portal rule (Darshan 2026-10-10) — agent lists come from agents_v2 only, never the v1 roster; managers' dropdowns show current employees only"
metadata:
  node_type: memory
  type: feedback
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-10T05:35:19.565Z
---

Darshan, 2026-10-10: "hamesha tum v2 ka data rakh, v1 ka nahi" / "agents_v2 se chalo". Manager agent dropdowns showed 22 instead of 20 because they read the stale v1 localStorage roster (`rlm_portal_all_agents`, written by nothing any more) and never dropped agents who left (A0-1399, A0-1178).

**Why:** the v1 roster's manager mapping is stale; agents_v2 (nest) is the source of truth, and the dashboard's server report already counts only active agents.
**How to apply:** build every team / agent list from `useTeamRoster` (live nest `/agents/all`, v2 only) or the v2 roster filtered with `isActiveAgent` (src/utils/agentStatus.ts: `is_active === false` or a left/inactive status = gone; "on leave" stays). Never read `rlm_portal_all_agents`; main.tsx deletes it at startup (portal 17b2a37). Related: [[rlm-targets-agents-v2]].
