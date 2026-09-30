---
name: query-event-opt-branches
description: "2026-09-30 state of the retailers-api perf+security work — five `query-event-opt` branches (nest, rlm-admin, rlm-portal, verification, ko-sales), decisions taken, what still waits on Darshan / production"
metadata:
  node_type: memory
  type: project
  originSessionId: 6106db4e-dda2-48c5-a332-9ecbb1b52fe4
  modified: 2026-09-30T06:16:15.203Z
---

Branch `query-event-opt` exists in five repos (all pushed 2026-09-30, none deployed):
- `rlm-backend-nest` @ `55aadde` — merged with `aws-deployed`, `v2-orders` inside. **Decided (Darshan 2026-09-30): ship as is, no rebase, RPS→LQS released with it, no separate PR.**
- `rlm-admin-final` (from `aws-v2`), `rlm-portal` (from `aws-v2`), `retailer-verification-portel` (from `aws-v4`): 422/503/403 handling, no mock retailer on error, before-enforce fixes of `docs/access-control.md` §8.
- `ko-sales-backend` (from `aws-deployed`): keeps `piis.phone_number_rev` on its writes (D3).

Checklist with status: `Desktop/All/BA&DBReports.md` (copy in Downloads). Still waiting on a person: the three `scripts/perf/*.mjs --apply` runs on production (never run by me), `EVENTS_DEFAULT_WINDOW_DAYS` value (7/30/90), the enforce date (proposed deploy + 3 working days), the PR (gh not logged in), Q26 app counters (left as is, low).

**Why:** future sessions should not redo the review or re-ask the decisions above.
**How to apply:** when asked about retailers-api perf/security status, read BA&DBReports.md first; do not rebase or split the branch; never run `--apply` on prod. Related: [[nest-access-control]], [[nest-rps-replaced-by-lqs]].
