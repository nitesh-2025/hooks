---
name: rlm-event-card-and-filter
description: "2026-10-08 rlm-portal EventValueCard rewrite (every payload key rendered, line items both shapes) + EventPriorityFilter dropdown redesign; uncommitted on branch new-events-added-api; events API facts (recent = pii_id only, portal shows first 100)"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-08T10:47:14.084Z
---

On 2026-10-08, on rlm-portal branch **`new-events-added-api`** (on top of aws-v2 incl. PR #91), `src/components/EventValueCard.tsx` was rewritten and `src/components/events/EventPriorityFilter.tsx` redesigned to Darshan's mockup (pill search, green "All Events" bar, tier headings with dot + description, P-rank badges). Also `CallScreen.tsx` / `RetailerDetail.tsx` event grids → `grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]` and CallScreen BRAND_COLOR got dark variants. Committed and pushed 2026-10-08 as df3b173 (card + grids) and d6575ae (filter + eventPriority.ts + MyEvents/TeamEvents wiring) on `origin/new-events-added-api`; not merged to aws-v2, no PR opened.

**Why:** Purchase cards showed empty item boxes (items use `name/sku/prid/qty/amount`, the old card only knew `product_name/product_sku/quantity/price`) and the review HTML (`Downloads/EVENTS_PARAMS_REVIEW_2026-09-19.html`) demanded complete info. Card rule now: a section consumes a key only when it rendered that value; everything else goes through generic key/value rows (money ₹, dates, URLs, phones masked incl. inside strings, nested objects). Verified by an SSR harness over 185 real prod payload samples (scratchpad `events/` — db-keys.json, render.js, render4.js).

**How to apply:** Facts learned: nest `GET /retailer-events/recent/:pii_id` filters by `pii_id` only (no eventName allowlist; 53,400 legacy rows have no pii_id); portal Events tab loads only page 1 (limit 100) and mis-reads `pagination.totalItems` (nest sends `pagination.total`), so chips/counts cover ~the newest 100 docs only (open follow-up, not fixed). `retailevents` stores Title-Case names ("Login Started"); DB has 186 distinct names, review HTML 196 events (145 exist, 51 proposed/not in DB; report in `Downloads/EVENTS_DB_CHECK_2026-10-08.md`). Theme: `text-primary` is 2.85:1 on white — use `text-emerald-700 dark:text-emerald-300` for small text. Related: [[rlm-callscreen-whatsapp-tab]], [[rlm-portal-typecheck]], [[four-agent-review]].
