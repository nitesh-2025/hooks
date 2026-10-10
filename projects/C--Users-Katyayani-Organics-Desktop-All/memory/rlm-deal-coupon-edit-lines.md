---
name: rlm-deal-coupon-edit-lines
description: "2026-10-10 Deal Coupons → Create new: editable QTY/RATE + PATCH cohort then create, per executive-level-coupon-integration.md; local branch nitesh-deal-coupon-edit-lines (ff8c4d3, not pushed, no upstream); worktree + 8091 dev server; review-loop lessons"
metadata:
  node_type: memory
  type: project
  originSessionId: 4dbdd793-2f78-4d40-ab03-283c8895bc3a
  modified: 2026-10-10T09:29:40.174Z
---

rlm-portal `/manager/coupons/deal` → Create new now lets the operator raise deal-line QTY/RATE; "Create coupon" = PATCH `/api/coupons/cohorts/:id` `{conditions}` (whole tree, `rate`→`amount`, only if a line changed) THEN `POST /api/coupons/create`. Spec: `Downloads/executive-level-coupon-integration.md` ("for this screen, this document wins").

- Branch `nitesh-deal-coupon-edit-lines` from origin/aws-v2 @ a61e78f, commit ff8c4d3 (2 files: DealCoupon.tsx, coupons_v3_api.service.ts). **Local only, NOT pushed**; upstream unset on purpose (it was auto-tracking origin/aws-v2, the deploy branch).
- Built in a worktree at `<scratchpad>/rlm-deal` because the main rlm-portal checkout keeps being switched by other sessions (was on `pctv` = aws-v2 HEAD). Vite in a worktree must be started from the LONG path (`C:\Users\Katyayani Organics\...`), not `KATYAY~1`, or main.tsx 404s.
- 2026-10-10 Darshan decision (overrides spec §4 single button): **Save is its own step** — "Save N lines" under the table PATCHes; "Create coupon" is locked while anything is unsaved and only POSTs create. Plus a totals row (units, deal value Σqty×rate, at DP Σqty×DP, customer saves). Commit 7ceed3b (local, on top of ff8c4d3).
- Tests live only in the scratchpad: Playwright e2e vs mocked V3 (`deal-edit/e2e-deal-lines-v3.cjs`), 68/68.
- Known limitation: portal has no `coupons:update` source, so lines go read-only only after the first 403 (spec §2 wants it up front).

- 2026-10-10 (user ask): rlm-portal local dev now uses BETA Stockship V3 — `VITE_COUPONS_V3_API_URL="https://beta.api.stockshipv3.ko-tech.in/api"` in the main checkout's `.env.local` (gitignored; prod value kept in a comment above it). That one var also drives V3 orders (Create Order), wallet and the V3 catalogue locally.
- Worktree gotcha: a node_modules JUNCTION shares `node_modules/.vite` with the main checkout; when both dev servers restart together (e.g. an .env.local change) they clobber each other → "Cannot read properties of null (reading 'useEffect')". Run the worktree server with its own cacheDir (wrapper config `scratchpad/deal-edit/vite.worktree.config.mjs`).

**Why:** a 4-agent review + re-verify round found 9+ real bugs a passing first e2e missed (RTK `data` keeps the previous arg's result → use `currentData`; identical refetch returns the same object → discard must reset state itself; `digitsOnly` turned "50.00" into 5000; switching cohort mid-save re-targets the PATCH; busy must cover every awaited step incl. lookups).
**How to apply:** for any "edit then save" UI over RTK Query, check those four traps first; never base a worktree branch on origin/<deploy> without unsetting upstream. Related: [[rlm-create-order-lookup]], [[four-agent-review]].
