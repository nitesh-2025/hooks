---
name: nest-access-control
description: "2026-09-30 nest (rlm-backend-nest) access-control layer in src/common/access — the rule, the settings, what stays open by decision, what to do before enforce"
metadata:
  node_type: memory
  type: project
  originSessionId: 6106db4e-dda2-48c5-a332-9ecbb1b52fe4
  modified: 2026-09-30T04:35:56.735Z
---

`rlm-backend-nest` branch `query-event-opt` (2026-09-30) has an access layer in `src/common/access/` (AccessService, RetailerAccessService, ScopedGuard + `@ScopedBy`, AdminOnlyGuard, MaintenanceGuard, PublicWriteGuard). Doc: `docs/access-control.md` (gitignored; copy in `Downloads/retailers-api-access-control.md`).

**Why:** every read route took its scope from the request, not the token (review findings C1–C5); three review rounds found more (self-promotion via `PATCH /agents`, default webhook secret on `/db/indexes`, sibling routes, unchecked writes).

**The rule:** caller = token email → `agents_v2`. Admin (`USR-1000/1001/1002`) and managers (`USR-1021/1003/1019`) read everything; verification roles (`USR-1020/1030/1012`) open any one retailer but list only their own; everyone else: self + everyone below in `agent_manager`, one retailer only if they cover its owner/profiler/KYC agent. Settings `ACCESS_SCOPE_MODE` (default **warn** = log only), `ACCESS_PUBLIC_WRITES` (default warn), `ACCESS_*_ROLES`, `ACCESS_SERVICE_EMAILS`. Always enforced even in warn: `/logs`, agents writes, maintenance routes, `/db/indexes`.

**How to apply:** deploy with defaults, read `[access] would refuse` lines, fix frontends (rlm-portal shows MOCK retailer data on 403 in RetailerDetail/CallScreen), then `enforce`. Decisions still open (Darshan's): the four no-login routes (`POST /retailers/register|lead`, `POST /retailer`, `PATCH /retailer/:contact` — retailer/KSR app), the hard-coded `ko-sales-webhook-2024`, `USR-1002` (194 active agents) counted as admin, the retailer app's shared login.

**Test scripts** live in the session scratchpad (guards-e2e3.ts, lqs-harness.ts, boot-check.ts, parity.sh); they run with `TS_NODE_PROJECT=<repo>/tsconfig.json TS_NODE_COMPILER_OPTIONS='{"module":"commonjs","moduleResolution":"node"}' npx ts-node -T -r tsconfig-paths/register`. Related: [[nest-perf-gotchas]], [[nest-rps-replaced-by-lqs]].
