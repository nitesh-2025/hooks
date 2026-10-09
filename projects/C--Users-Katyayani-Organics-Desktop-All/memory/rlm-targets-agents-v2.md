---
name: rlm-targets-agents-v2
description: 2026-10-09 — sales target precedence HRMS > agents_v2 target > 50k/day; nest GET /agents/targets (team-scoped); roster from nest /agents/all; HRMS team cache 6h; balloons on order value only
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-09T12:45:51.949Z
---

Built 2026-10-09 on branch `new-events-added-api` (portal c2c589c, nest 3068557; both pushed, NOT deployed).

- agents_v2 docs carry `target: { value, period: "monthly", last_updated_at }`, always the current month (Darshan).
- Precedence per agent (Darshan, final): HRMS Sales target → agents_v2 `target.value` → 50k/day default. If HRMS fails, show the fallback mapping at once (never pending/blank).
- nest `GET /api/v2/agents/targets?emails=` — admins/dashboard roles read all; others only own + team (AccessService `covers`). `/auth/me` and `/agents/me` include `target`; `/agents/all` deliberately does NOT.
- Portal roster (`useGetAllAgentsV2Query`) now reads nest `GET /agents/all` — Darshan: "no need to call utilities API". No utilities fallback.
- Manager team HRMS snapshot lives in IndexedDB (6h TTL, 30 min when empty), department calls (Retailer-Sale, Retailer-FO-Sale) + per-email top-up only for missing members; Darshan wants minimum HRMS calls with frontend caching. The old month-long cache was why the manager side showed "no target" for everyone.
- Balloons/confetti only when today's order VALUE ≥ target (never order count).
- Local portal .env points at the DEPLOYED nest, so `/agents/targets` 404s locally until nest is deployed (hook caches the 404 as empty for 5 min and falls back).

**Why:** Darshan wants real targets on both dashboards with HRMS as the main source.
**How to apply:** keep the precedence and the minimum-HRMS-calls rule in any target UI; related [[rlm-view-as-playground]], [[nest-render-beta-deploy]].
