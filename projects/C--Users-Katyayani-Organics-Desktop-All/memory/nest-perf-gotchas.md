---
name: nest-perf-gotchas
description: "nest (rlm-backend-nest) — facts measured on production 2026-09-29 that are not in the code: owner sizes, Mongo regex behaviour, Mongoose casting of filters, $indexStats not permitted, $group order"
metadata:
  node_type: memory
  type: project
  originSessionId: 6106db4e-dda2-48c5-a332-9ecbb1b52fe4
  modified: 2026-09-29T11:38:33.627Z
---

Measured read-only on the production database (MongoDB 8.0.32, `CRM-Database`) on 2026-09-29 while optimising **nest** on branch `query-event-opt`. None of this is visible in the repository.

- **Owners are huge.** The largest `leads_v2.lead_owner.agent_id` holds about 1,075,000 leads, the second 410,000, the third 75,000; the largest role (102 agents) 177,000. Almost none of those leads are retailers (10 of the million). Anything that reads "all leads of an owner" to find retailers must go from the retailers' side (32k) instead.
- **Mongoose casts filter VALUES through the schema.** `addressModel.find({ city: { $in: ['indore '] } })` is sent as `'indore'` because the field has `trim: true` (and `uppercase` where set). To match stored values exactly as they are, use `RawDbService`, not the model. Aggregation pipelines are not cast.
- **Mongo's regex is not JavaScript's.** On the server `\s` is ASCII only (no-break space is not white space), and case-insensitive matching treats `ſ` (U+017F) as `s` and the Kelvin sign (U+212A) as `k`. `$in: [null]` matches a missing field.
- **`$group` output order is not stable** between two runs of the same query. Any response object or array built from `$group` rows (stage counts, `by_pipeline_type`) can differ in order from run to run. Compare such responses by value, not byte for byte.
- **`$indexStats` is not allowed** for the application's database user (needs `clusterMonitor`). Index use counts cannot be read with it.
- **Driver default batch is 1,000 rows.** A read of 72k rows was 73 round trips; at 22 to 30 ms each from a developer machine that was most of its time. Set `batchSize` on large reads.
- `addresses`: 558 different `state` values, 6,310 `district`, 118,493 `city`; 19,426 documents hold the postcode in `pincode` (477 of them with a different `zipcode`). `notes_v2`: 202,974 documents have `note_id`, no duplicates, no index.
- Heredocs in the Bash tool break on backticks and on backslash-backtick: write scripts with the Write tool and run them.

**Why:** each of these cost a wrong first attempt or a failed comparison during the work.

**How to apply:** check them again before relying on them after a long time (collections grow; the server may be upgraded). Dry-run scripts for the production changes are in `rlm-backend-nest/scripts/perf/`; the plan is `rlm-backend-nest/docs/scale-and-security-plan.md`. Production writes still need Darshan's approval each time.

Related: [[nest-rps-replaced-by-lqs]], [[md-doc-format]]
