---
name: nest-open-tasks-branch
description: "2026-10-01 rlm-backend-nest branch nest-open-tasks pushed as ONE commit e92aae7, tags before-nest-open-tasks / nest-open-tasks-v1 (undo = git revert nest-open-tasks-v1); all 30 nest tasks in code, not deployed; Supabase/Mongo packs + Desktop/All/db-run-pack hand-over; frontends pushed on query-event-opt; decisions not to undo"
metadata:
  type: project
---

`rlm-backend-nest` branch `nest-open-tasks` was cut from `query-event-opt` on 2026-10-01 so the release branch stays "ship as is". Pushed on 2026-10-01 as one commit `e92aae7` (157 files) with tags `before-nest-open-tasks` (= `c5f1b59`, the state before) and `nest-open-tasks-v1`; Darshan asked for the tag so the whole work can be removed on request: `git revert nest-open-tasks-v1` (or reset to `before-nest-open-tasks`). NOT deployed. Frontends (rlm-portal `54c8967`, rlm-admin-final `dfb2e1f`, retailer-verification-portel `5737de6`) are pushed on their `query-event-opt` branches. Hand-over pack for the DB admin: `Desktop/All/db-run-pack/` (project name + id on every SQL file). Task list with status: `Desktop/All/BA&DB(RLM).md` (🔵 = code done, not deployed).

Choices made that a later session should not undo without asking:
- Merged/split exclusion from order totals is OPT-IN (`exclude_merged_split=true`); default totals still match listed rows; `excluded` counts always returned.
- `sortBy` validation keeps `value` and `leadAssignDate` (portals send them); `profileScore` now sorts by `profile_score`.
- `distinct-wise` default still groups by `state`/`district`, fields `retailers_v2` does not have; `group_by=district_id` is the correct path (cached 5 min).
- `merge: 12` alias added to orders-v2 compat (affects VIP spend, foro, dashboard, sales-potential totals).
- Round 2 (same day): NEST-02/03/08/10/14/20/23/24/26/27/28/29/30 done. New settings, all inert by default: `ADDRESS_PINCODE_CHECK` (warn), `KYC_SIGNED_URLS` (off, signs only when the URL's token matches the file's own token), `ORDER_INFO_RECOMPUTE` (off | dry-run | on, needs Darshan's approval), `ORDER_INFO_CRON`. `agent-summary` and `retailer-groups/summary` are AdminOnlyGuard. `/agents` and `/agents/:id` now allow-list projections (staff projection for admins/managers). Sales-potential state names are upper-case canonical, `unknown` stays lower-case for the admin page. Offline token check: `npx nest build && npx ts-node --transpile-only scripts/security/token-check.ts` (PASS). `docs/*.md` is gitignored (`*.md` in .gitignore): add with -f.
- Round 3: NEST-09 (scripts/parity, run with PARITY_TOKEN / MONGODB_URI), NEST-15 (`after` cursor + `total=none|estimate|exact` on GET /retailers, defaults unchanged, LQS sort has no cursor), NEST-21 (`SLOW_REQUEST_LOG_MS` default 2000, `[slow]` line, keys only), NEST-22 (`X-Response-Envelope: v1`, no shape changed, docs/response-envelope.md).
- Round 4: `scripts/supabase/<project>/NN-SUPA-xx.sql` + `.rollback.sql` (44 files, libpg_query-parsed) and `scripts/db/DB-NN-*.mjs` (dry-run default, `--apply --confirm=<db>`, change log in scripts/db/out/). Nothing applied. Finding: rlm-admin/rlm-portal call Marketing-360 as anon → 14 content tables must stay anon-readable (frozen in SUPA-10).
- Deploy parts of 03/20/21 remain (need the branch deployed).
- Retailer 360 (NEST-28) finding: the missing fields are a rlm-admin mapper problem (FE-47), fix lives on rlm-admin `origin/v2` commit 202695f.

**Why:** the release branch was frozen by Darshan's decision; these defaults avoid visible changes on live screens.
**How to apply:** commit/push only when Darshan says; mention the open items above. Related: [[query-event-opt-branches]], [[nest-access-control]].
