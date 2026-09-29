---
name: nest-rps-replaced-by-lqs
description: "2026-09-29 decisions for nest — every rps field/filter/sort is answered with the lead's LQS from leads_v2; names unchanged"
metadata:
  node_type: memory
  type: project
  originSessionId: 6106db4e-dda2-48c5-a332-9ecbb1b52fe4
  modified: 2026-09-29T07:45:59.109Z
---

In **nest** (`rlm-backend-nest`, branch `query-event-opt`) the retailer RPS is dead (nothing computes it). On 2026-09-29 Darshan decided:

- Request params (`minRpsScore`, `maxRpsScore`, `sortBy=rpsScore`, `rps_min`, `rps_max`, `sort_by=rps`, `priority`, `action`) and response keys (`rps_info.overall_rps_score`, `rps_score`, `rps`, `rpsHigh/Medium/Low`, `avg_rps`) keep their names.
- The number behind them is `leads_v2.lqs.priority_score`, capped at 100, whole number, 0 when missing. Join by `pii_id`.
- Read at request time (snapshot of retailers' scores, ~60 s) — **no production writes**, no sync job into `retailers_v2`.
- Every breakdown (`rps_breakdown`, `rpsBreakdown`) is `null`, key kept.

**Why:** RPS sync is manual-only and not running; LQS is the score ko-sales actually maintains. Darshan rejected the sync-job option because it needs production writes/approval.

**How to apply:**
- New RPS-looking reads in nest go through `LqsScoreService` (`src/common/lqs-score/`), never `retailers_v2.rps_info`.
- In-memory ordering is acceptable only while retailers_v2 is small (~25–30k); past ~40–50k retailers revisit the declined option (denormalise the score onto retailers_v2 with an index).
- NOT covered: rlm-admin RPS screens (Control Tower, Master Table, Analysis, Tracker, Dashboard Avg-RPS card) call the **utils host**, which has no local repo — they still show old RPS.
- Left untouched on purpose: `RpsSyncService` / `POST /rps/sync`, schema indexes on `rps_info.overall_rps_score`, `update` DTO accepting `rps_info`.

Related: [[four-agent-review]], [[md-doc-format]]
