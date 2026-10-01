---
name: nest-open-tasks-branch
description: "2026-10-01 rlm-backend-nest local branch nest-open-tasks (from query-event-opt, uncommitted): NEST-04/05/06/07/11/12/13/16/17/18/19 done in code; defaults kept backward compatible"
metadata:
  type: project
---

`rlm-backend-nest` branch `nest-open-tasks` was cut from `query-event-opt` on 2026-10-01 so the release branch stays "ship as is". Work is uncommitted, not pushed, not deployed. Task list with status: `Desktop/All/BA&DB(RLM).md` (🔵 = code done, not deployed).

Choices made that a later session should not undo without asking:
- Merged/split exclusion from order totals is OPT-IN (`exclude_merged_split=true`); default totals still match listed rows; `excluded` counts always returned.
- `sortBy` validation keeps `value` and `leadAssignDate` (portals send them); `profileScore` now sorts by `profile_score`.
- `distinct-wise` default still groups by `state`/`district`, fields `retailers_v2` does not have; `group_by=district_id` is the correct path (cached 5 min).
- `merge: 12` alias added to orders-v2 compat (affects VIP spend, foro, dashboard, sales-potential totals).
- Open from review: `GET /agents` and `GET /agents/:id` still return full agent docs (block-list only).

**Why:** the release branch was frozen by Darshan's decision; these defaults avoid visible changes on live screens.
**How to apply:** commit/push only when Darshan says; mention the open items above. Related: [[query-event-opt-branches]], [[nest-access-control]].
