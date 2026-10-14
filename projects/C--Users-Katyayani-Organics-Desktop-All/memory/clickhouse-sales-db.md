---
name: clickhouse-sales-db
description: "clickhouse.ko-tech.in `sales` database (CRM/RLM analytics warehouse, 76 tables) — what is in it, where return-request events live, how to query it over HTTP; credentials are NOT stored here, ask Darshan"
metadata:
  node_type: memory
  type: reference
  originSessionId: 72bcf505-debe-42dc-84fd-4ab5944a40f7
  modified: 2026-10-14T11:37:11.563Z
---

**Host:** `https://clickhouse.ko-tech.in` (ClickHouse 26.6). UI: `/play`. HTTP API: POST the SQL to `/` with `X-ClickHouse-User` / `X-ClickHouse-Key` headers. Read user `sales_reader` (grants: SHOW, SELECT, dictGet on `sales.*` + `system.tables/columns/databases`). `sales_writer` did not accept the same password on 2026-10-14. **Never store the password in memory or in a repo file; Darshan shares it in chat when needed.**

**Databases visible:** `sales`, `system` only. The Stockship `orders` / `sales.orders` warehouse from `Stockship_V3_Backend/docs/flows/clickhouse-sync.md` is NOT on this user — different instance or not granted.

**`sales` = CRM/RLM analytics (ReplacingMergeTree + `*_current` views):** leads 1.88M, contacts 500k, customers 371k (pii_id, customer_id, order_count, total_order_value, cpp_*), calls 7.5M, dispositions 1.35M (pii_id, call_outcome, reason, notes), notes 3.2M, lead_owner_history 2.86M, events 2.07M (app/web events, `event_name`, JSON `properties`, `pii_id`, `user_id` = 91+10-digit phone), retailer_events 1.24M (same events, Title Case names), karma_scores 2.07M (per pii_id: p_rto, tier, refund_pct, return_rate_s…), farmer_potential, retailer_potential, buckets/cohorts/workflows, agents, pii_map_kv (user_id → pii_id Join table), dim_case/dict_case = product case pricing (not support cases).

**Freshness seen 2026-10-14:** `events` is live (last received same day, ~200k rows/day since 2026-10-07, 405 event types, only ~5k distinct pii_id, 40% rows without pii_id, a few client-clock rows dated in the future). `retailer_events` lags ~1 day. **`leads` (and most CRM tables) stopped syncing on 2026-09-30 08:34** — 1.88M rows, nothing newer; check the sync job before trusting lead numbers.

**CRM copies (checked 2026-10-14 17:10 IST):** calls max call_time 2026-09-28, lead_owner_history 09-28, leads 09-30, notes/dispositions/contacts synced 10-13, customers 10-14. `retailer_events` begins 09-29, so the tracker cannot derive call/owner statuses from the warehouse until that sync resumes. Parameter cap: `http_max_field_value_size` 128 KiB (5k pii ids OK, 10k fail; form-encoded body is NOT parsed as params; multipart has the same cap). readonly=2 for sales_reader (URL settings allowed, no writes). See [[nest-tracker-clickhouse-counts]].

**No return/refund ticket table.** The only RRF-ish data: `sales.events` event_name `return_request_started` (since 2026-09-27, props order_id, order_status), `return_request_submitted` (since 2026-10-04, props order_id, return_mode, return_reason, item_count, return_value, has_voice_note, result), `return_proof_added` (order_id, proof_type, file_count). ~30–70% of these rows have empty `pii_id` but always a `user_id` phone, so a by-customer query must OR on `pii_id` and `user_id`. Stockship `return_refunds` tickets (rrf_id, status, amounts) are not here — see [[rlm-rrf-tickets-hidden]] for that API ask.

**Gotcha:** Claude Code's auto-mode classifier blocks SELECTs that return raw customer rows with phone + properties (PII). Aggregates, key names and schema queries pass; give Darshan the row-level SQL to run himself in `/play`.
