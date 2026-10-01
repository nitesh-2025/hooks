---
name: nest-open-tasks-branch
description: "2026-10-01 rlm-backend-nest local branch nest-open-tasks (from query-event-opt, uncommitted): 24 nest tasks done in code (all but 09/15/21/22 and the deploy parts); new settings default off/warn; decisions a later session must not undo"
metadata:
  type: project
---

`rlm-backend-nest` branch `nest-open-tasks` was cut from `query-event-opt` on 2026-10-01 so the release branch stays "ship as is". Work is uncommitted, not pushed, not deployed. Task list with status: `Desktop/All/BA&DB(RLM).md` (🔵 = code done, not deployed).

Choices made that a later session should not undo without asking:
- Merged/split exclusion from order totals is OPT-IN (`exclude_merged_split=true`); default totals still match listed rows; `excluded` counts always returned.
- `sortBy` validation keeps `value` and `leadAssignDate` (portals send them); `profileScore` now sorts by `profile_score`.
- `distinct-wise` default still groups by `state`/`district`, fields `retailers_v2` does not have; `group_by=district_id` is the correct path (cached 5 min).
- `merge: 12` alias added to orders-v2 compat (affects VIP spend, foro, dashboard, sales-potential totals).
- Round 2 (same day): NEST-02/03/08/10/14/20/23/24/26/27/28/29/30 done. New settings, all inert by default: `ADDRESS_PINCODE_CHECK` (warn), `KYC_SIGNED_URLS` (off, signs only when the URL's token matches the file's own token), `ORDER_INFO_RECOMPUTE` (off | dry-run | on, needs Darshan's approval), `ORDER_INFO_CRON`. `agent-summary` and `retailer-groups/summary` are AdminOnlyGuard. `/agents` and `/agents/:id` now allow-list projections (staff projection for admins/managers). Sales-potential state names are upper-case canonical, `unknown` stays lower-case for the admin page. Offline token check: `npx nest build && npx ts-node --transpile-only scripts/security/token-check.ts` (PASS). `docs/*.md` is gitignored (`*.md` in .gitignore): add with -f.
- Not done: NEST-09 (needs the utils service), NEST-15 (keyset paging), NEST-21 (prod profiler), NEST-22 (one envelope on every controller), and the deploy parts of 03/20/21.
- Retailer 360 (NEST-28) finding: the missing fields are a rlm-admin mapper problem (FE-47), fix lives on rlm-admin `origin/v2` commit 202695f.

**Why:** the release branch was frozen by Darshan's decision; these defaults avoid visible changes on live screens.
**How to apply:** commit/push only when Darshan says; mention the open items above. Related: [[query-event-opt-branches]], [[nest-access-control]].
