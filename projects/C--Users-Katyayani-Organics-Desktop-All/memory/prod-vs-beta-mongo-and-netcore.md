---
name: prod-vs-beta-mongo-and-netcore
description: rlm-backend-nest/.env active MONGODB_URI = BETA (beta.mongoserver); production Mongo = ko-sales-backend/.env (Atlas cluster0 okk1w). Netcore activity/upload validates only the API key.
metadata:
  node_type: memory
  type: project
  originSessionId: e33b625e-5ad5-4920-8658-672ef9a2f53e
  modified: 2026-10-15T05:08:24.709Z
---

On 2026-10-12, a Netcore backfill script read `retailevents` through `rlm-backend-nest/.env`. That file's active (uncommented) `MONGODB_URI` points at **beta.mongoserver.ko-tech.in** (it also has a `//CRM-Database` double slash, so `client.db()` throws "Invalid database name: '/CRM-Database'"). The data was beta, not production: beta had 48k retailevents and 421 "Order Placed"; production has 28.2M and 23,261. As a result, 33 beta-only events went to Netcore.

Production Mongo is the active `MONGODB_URI` in `ko-sales-backend/.env`: Atlas `cluster0-shard-00-0x.okk1w.mongodb.net/CRM-Database`, the same DB that api.b2bsales writes to.

**The two files get swapped by hand, so always read BOTH before trusting either.** On 2026-10-15, `.env.local` (changed 10-14 18:32) had BETA active, and `.env` (changed 10-15 10:22) had PROD active. Because `.env.local` wins, local nest was on BETA. `/auth/me` for a prod-only agent then came back all null: the agent was not in beta `agents_v2`. To tell which DB is live, compare the active `MONGODB_URI` in `.env.local` first, then in `.env`. A change to an env file needs a nest restart; `--watch` does not reload env files.

**The RUNNING nest app is different (checked 2026-10-14):** `app.module.ts` loads `envFilePath: ['.env.local', '.env']` and the first file wins. `rlm-backend-nest/.env.local` (gitignored, dated 2026-10-08) has `MONGODB_URI` = Atlas `cluster0.okk1w` = PRODUCTION. So local nest on :4002 writes PROD, while a script that reads only `.env` gets beta. Local nest `KO_SALES_BACKEND_URL=http://localhost:3000/api/v1`, and local ko-sales is also on prod cluster0, so every local PATCH/POST test writes production.

**Why:** the nest `.env` is switched between beta and prod by commenting lines, so it cannot be trusted as "production".

**How to apply:** before any production read or backfill, print the masked host. Use the ko-sales `.env` for production. Say which DB the numbers came from.

Netcore facts (2026-10-12):
- `POST api2.netcoresmartech.com/v1/activity/upload` (Bearer key, array body) returns 401 for a bad key, but `200 {"status":"success"}` for a bogus asset_id or an undefined event name. So "success" does not prove an event was recorded.
- Custom event `purchase` (lowercase) is the target name for the Order Placed backfill. The App Id given by Darshan equals nest `NETCORE_ASSET_ID_2`.
- Production `retailevents` has indexes `{eventName:1, createdAt:-1}` and `{mdrId:1, createdAt:-1, eventName:1}`.

Related: [[nest-perf-gotchas]], [[nest-render-beta-deploy]].
