---
name: nest-rps-replaced-by-lqs
description: "2026-09-29 decisions for nest — every rps field/filter/sort is answered with the lead's LQS from leads_v2; names unchanged; RPS write side removed; API must be ms-fast"
metadata:
  node_type: memory
  type: project
  originSessionId: 6106db4e-dda2-48c5-a332-9ecbb1b52fe4
  modified: 2026-09-29T09:58:09.446Z
---

In **nest** (`rlm-backend-nest`, branch `query-event-opt`) the retailer RPS is dead (nothing computes it). On 2026-09-29 Darshan decided:

- Request params (`minRpsScore`, `maxRpsScore`, `sortBy=rpsScore`, `rps_min`, `rps_max`, `sort_by=rps`, `priority`, `action`) and response keys (`rps_info.overall_rps_score`, `rps_score`, `rps`, `rpsHigh/Medium/Low`, `avg_rps`) keep their names — the frontends still read `rps`.
- The number behind them is `leads_v2.lqs.priority_score`, capped at 100, whole number, 0 when missing. Join by `pii_id`. Database-level filter/sort is on LQS.
- Read at request time (snapshot of retailers' scores, kept warm in the background) — **no production writes**, no sync job into `retailers_v2`.
- Every breakdown (`rps_breakdown`, `rpsBreakdown`) is `null`, key kept.
- **RPS write side removed** (his words: "rps ka write side hata do, ab use nahi hota"): no scoring, no `rps_info` writes, `rps_info` is not a stored schema path any more. The sync service and its two routes stay because they also sync orders / calls / VIP tier / inactivity stage.
- **Speed is a requirement**: he wants the API in milliseconds, including team scoping. Only changes that return the same response faster.

**Why:** RPS sync is manual-only and not running; LQS is the score ko-sales actually maintains. Darshan rejected the sync-job option because it needs production writes/approval.

**How to apply:**
- New RPS-looking reads in nest go through `LqsScoreService` (`src/common/lqs-score/`), never `retailers_v2.rps_info`.
- Everything in the list path keys on `retailers_v2.pii_id $in [...]`. Production has the index (`pii_id_plain`), confirmed by a read-only check on 2026-09-29; the KB index list of 2026-07-08 is out of date on this. Beta was not checked.
- On 2026-09-29 Darshan allowed a **read-only** test against the production MongoDB (URI from the repo's `.env`, never printed). Done with every driver write blocked in the script and the app not booted. Numbers are in `rlm-backend-nest/docs/rps-to-lqs-merge.md` section 9.7. This was approval for that test, not a standing permission.
- Real data: 32,322 retailers, 30,871 with LQS > 0 (old RPS: only 10,127 > 0 and 9 at 50+). So score filters select thousands of retailers, not a handful — anything that embeds "retailers in a score range" into another query must be bounded.
- The real fix for team-scope latency is storing the owner on `retailers_v2` with an index — needs his approval (production write).
- NOT covered: rlm-admin RPS screens (Control Tower, Master Table, Analysis, Tracker, Dashboard Avg-RPS card) call the **utils host**, which has no local repo — they still show old RPS.
- Left untouched on purpose: the orphan index `rps_info.overall_rps_score_-1` and old stored `rps_info` blocks in the database (dropping = production change); `update` DTO still accepts `rps_info` and ignores it.

Related: [[four-agent-review]], [[md-doc-format]]
