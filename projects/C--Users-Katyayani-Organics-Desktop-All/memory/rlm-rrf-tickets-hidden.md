---
name: rlm-rrf-tickets-hidden
description: 2026-10-14 the Return/Refund (RRF) pages in rlm-portal were hidden by mistake and reverted the same day (Darshan wants them live); rrf_req.md asks Stockship V3 for a by-customer RRF API
metadata:
  node_type: memory
  type: project
  originSessionId: 72bcf505-debe-42dc-84fd-4ab5944a40f7
  modified: 2026-10-21T07:18:30.804Z
---

**RRF pages must stay live.** On 2026-10-14 a mid-turn Hinglish message ("hatna nahi hai ... hide karna hai for user on frontend, manager side bhi") was taken, after an AskUserQuestion, as "hide the Return/Refund ticket pages". Wrong: Darshan said "existing return refund kyu hataye, lao". The hide (`RRF_TICKETS_LIVE` flag, commit `df32cbc` on portal branch `alpha`) was reverted in `5786aca`; sidebar rows (My Tickets, Create Ticket, All Tickets, My Team Tickets) and routes `/tickets*`, `/rrf-tickets*`, `/manager/tickets*`, `/manager/rrf-tickets*` are back exactly as before. Both commits are on origin/alpha (the hide had been pushed by another session together with 7d4bd3a; the revert 5786aca was pushed 2026-10-14 on Darshan's ask), so origin/alpha shows the RRF pages again. The "hide" message was probably meant for another session or feature — it was never resolved what it referred to.

**rrf_req.md** (`Desktop/All/rrf_req.md`): requirement doc for the Stockship V3 team — `GET /api/return-refund/by-customer?pii_id=&phone=&scope=&status=&request_type=&date_range=&page=&limit=`, paged, compact rows + summary; fallback A2 = `pii_id` on the existing dashboard list filter; A3 = `@AllowApiKey()` so the portal can call it with `x-api-key`. Nothing built yet. Facts behind it: Stockship list already has `customer_phone` (resolves via `orders.customer.phone`, last-10-digit variants), `orders.pii_id` is indexed, tickets store `order_id` upper-cased; nest `return-refunds/search` is a single closed ticket by rrf_id + phone guard (RawDbService reads the same `return_refunds` / `orders` collections).

**My Team Tickets API (utilities `GET /rlm/rrf/tickets`, `controllers/retailerPortal/return_refund.js`, only caller = rlm-portal `ReturnRefundTickets`)**: 2026-10-21 Darshan reported "My Team Tickets khaali". Root cause: the team was read from v1 `agents` (`agent_manager` exact) while the portal sends the agents_v2 `agent_id`; empty v1 team → NO filter (all tickets). Beta, 91 managers: 70 got ALL, 3 empty, 18 wrong counts, 2 right. Also `status` param was ignored, dates were UTC days, search regex unescaped. Fix: team = agents_v2 manager + `agent_manager` (ignore case, `status != inactive`, same as orders API), never unfiltered (no agentId → token user's team; unknown → empty), `requested_email` must be in team, `status` (comma list) filters list but not `statusCounts`, IST days + 400 on bad dates, escaped search, upper-case rrf_id/order_id. Branch `nitesh-rrf-team-scope` from origin/aws-deployed (upstream unset), worktree in the session scratchpad `utilities-rrf`; verified with a harness running the real controller on beta (counts = expected). Still open (needs Darshan): token-based scoping (any user can pass any agentId), `/rrf/tickets/:rrfId` unscoped, per-IP rate limit without `trust proxy`. Which branch deploys beta.utils is unknown.

**Why:** the existing RRF module (Stockship dashboard iframe pages + My Team Tickets list) is in daily use; the new API is an addition for a customer-level view, not a replacement.

**How to apply:** never hide or remove the RRF pages on a vague instruction; a Hinglish "hide" message with no feature named should be answered with a question that includes "none of these / other session" rather than a feature guess as the first option. Related: [[rlm-create-order-lookup]], [[md-doc-format]].
