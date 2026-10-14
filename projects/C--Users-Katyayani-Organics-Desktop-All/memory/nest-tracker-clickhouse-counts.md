---
name: nest-tracker-clickhouse-counts
description: "2026-10-14 Team Events Tracker exact counts are ClickHouse-first (sales.retailer_events up to a watermark, Mongo head/tail) via a new global ClickhouseService in nest; rows/joins stay Mongo because the warehouse's calls/leads stopped syncing 28-30 Sep; committed on nest alpha, not pushed, not deployed"
metadata:
  node_type: memory
  type: project
  originSessionId: 72bcf505-debe-42dc-84fd-4ab5944a40f7
  modified: 2026-10-14T12:25:05.051Z
---

**What shipped (nest `alpha`, 2026-10-14, not pushed, not deployed):** `src/common/clickhouse/` (global read-only HTTP client, axios, typed `param_x` binding, JSONEachRow, 60 s back-off, off without `CLICKHOUSE_URL`), config keys `CLICKHOUSE_URL/DB/USER/PASSWORD` (blank = unset; on EC2 keep ABOVE `FIREBASE_PRIVATE_KEY`), `team-tracker.clickhouse.ts` (coverage cached 60 s = min / watermark = max(event_timestamp) − 10 min / last load; `countGroups` per IST day or hour, pii parts of 5,000 × 2 parallel — ClickHouse `http_max_field_value_size` 128 KiB caps a parameter, 10k ids fail), and `TeamTrackerService.countEvents` = CH for `[max(prevFrom, chMin), min(to, watermark))` + Mongo head/tail summed through one `foldGroups`; `coverage.source` on `/analytics`. Specs: clickhouse.service.spec, team-tracker.clickhouse.spec, team-tracker.service.count-events.spec.

**Why only counts:** the tracker's statuses/agents/SLA need leads_v2, calls_v2, orders, notes. In ClickHouse `sales` those copies are stale — calls max 2026-09-28, lead_owner_history 09-28, leads 09-30 — while retailer_events start 09-29, so no event has call data there. Darshan asked "leads/pii/calls/notes bhi hain, dekho" → answered with that freshness table. Phase 2 (joins in CH) only once the CRM sync is live again.

**Measured (live, from this PC):** all-scope 14-day count 77–90 ms, hourly 53 ms, 2,000-retailer team 128 ms, parity exact. Prod Mongo baseline unmeasured (no JWT locally; RS256 JWKS via SSO). BETA Mongo lacks `pii_id_1_createdAt_-1_eventName_1` only because `NODE_ENV=development` skips `ensureIndexesOnBoot`; prod index state unverified.

**Open / for Darshan:** (1) prod `.env` has no CLICKHOUSE_* yet → prod runs Mongo-only until added (use `sales_reader`; local `.env.local` uses `sales_writer`). (2) ClickHouse `retailer_events` flush stalled since 2026-10-13 20:30 UTC — leading hypothesis Stockship Redis/lock (commit 425a15c "Redis OOM storms", deploy churn v1.0.114–116 on 14 Oct); checklist: Stockship `GET /api/clickhouse/sync/retailer-events/status`, Supabase staging count, Stockship logs `retailer_events:` / `Redis unavailable`, nest logs `[ch-sync]`. (3) Stockship DDL asks: table is keyed `(pii_id, event_timestamp, stage_seq)` so every count scans the month partition; recommend time-first key or a `retailer_events_daily` SummingMergeTree MV (agent report in session). (4) portal `apiTypes.ts` may add `coverage.source` (optional, nothing breaks).

Related: [[clickhouse-sales-db]], [[rlm-team-events-tracker]], [[never-remove-modules]].
