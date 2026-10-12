---
name: prod-vs-beta-mongo-and-netcore
description: rlm-backend-nest/.env active MONGODB_URI = BETA (beta.mongoserver); production Mongo = ko-sales-backend/.env (Atlas cluster0 okk1w). Netcore activity/upload validates only the API key.
metadata:
  node_type: memory
  type: project
  originSessionId: e33b625e-5ad5-4920-8658-672ef9a2f53e
  modified: 2026-10-12T13:37:51.138Z
---

On 2026-10-12, a Netcore backfill script read `retailevents` through `rlm-backend-nest/.env`. That file's active (uncommented) `MONGODB_URI` points at **beta.mongoserver.ko-tech.in** (it also has a `//CRM-Database` double slash, so `client.db()` throws "Invalid database name: '/CRM-Database'"). The data was beta, not production: beta had 48k retailevents and 421 "Order Placed"; production has 28.2M and 23,261. As a result, 33 beta-only events went to Netcore.

Production Mongo is the active `MONGODB_URI` in `ko-sales-backend/.env`: Atlas `cluster0-shard-00-0x.okk1w.mongodb.net/CRM-Database`, the same DB that api.b2bsales writes to.

**Why:** the nest `.env` is switched between beta and prod by commenting lines, so it cannot be trusted as "production".

**How to apply:** before any production read or backfill, print the masked host. Use the ko-sales `.env` for production. Say which DB the numbers came from.

Netcore facts (2026-10-12):
- `POST api2.netcoresmartech.com/v1/activity/upload` (Bearer key, array body) returns 401 for a bad key, but `200 {"status":"success"}` for a bogus asset_id or an undefined event name. So "success" does not prove an event was recorded.
- Custom event `purchase` (lowercase) is the target name for the Order Placed backfill. The App Id given by Darshan equals nest `NETCORE_ASSET_ID_2`.
- Production `retailevents` has indexes `{eventName:1, createdAt:-1}` and `{mdrId:1, createdAt:-1, eventName:1}`.

Related: [[nest-perf-gotchas]], [[nest-render-beta-deploy]].
