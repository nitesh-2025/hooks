---
name: rlm-rrf-tickets-hidden
description: "2026-10-14 Darshan hid the Return/Refund (RRF) ticket pages for every role in rlm-portal behind RRF_TICKETS_LIVE=false (hide, do not remove); rrf_req.md asks Stockship V3 for a by-customer RRF API"
metadata:
  node_type: memory
  type: project
  originSessionId: 72bcf505-debe-42dc-84fd-4ab5944a40f7
  modified: 2026-10-14T06:27:25.834Z
---

**RRF ticket pages hidden (2026-10-14).** Darshan: "hatna nahi hai, comment karke hide karna hai, user + manager side". Done as a flag, not a comment-out: `src/lib/beta.ts` `RRF_TICKETS_LIVE = false` gates the sidebar rows (My Tickets, Create Ticket, All Tickets, My Team Tickets — `RRF_TICKET_URLS` in `AppSidebar.tsx`) and the 8 routes `/tickets*`, `/rrf-tickets*`, `/manager/tickets*`, `/manager/rrf-tickets*` in `App.tsx`. Pages, APIs, Create Order RRF lookup untouched. Commit `df32cbc` on portal branch `alpha`, **not pushed, not on the deploy branch (aws-v2)** — needs a cherry-pick there.

**rrf_req.md** (`Desktop/All/rrf_req.md`): requirement doc for the Stockship V3 team — `GET /api/return-refund/by-customer?pii_id=&phone=&scope=&status=&request_type=&date_range=&page=&limit=`, paged, compact rows + summary; fallback A2 = `pii_id` on the existing dashboard list filter; A3 = `@AllowApiKey()` so the portal can call it with `x-api-key`. Nothing built yet. Facts behind it: Stockship list already has `customer_phone` (resolves via `orders.customer.phone`, last-10-digit variants), `orders.pii_id` is indexed, tickets store `order_id` upper-cased; nest `return-refunds/search` is a single closed ticket by rrf_id + phone guard (RawDbService reads the same `return_refunds` / `orders` collections).

**Why:** the RRF screens embed the Stockship dashboard (iframe) and Darshan wants them off for all users for now while a customer-level RRF API is requested.

**How to apply:** to bring the pages back flip `RRF_TICKETS_LIVE` to true, nothing else. If asked to "remove the comment"/"unhide RRF", that is the flag. Related: [[rlm-create-order-lookup]], [[rlm-settings-v3]], [[md-doc-format]].
