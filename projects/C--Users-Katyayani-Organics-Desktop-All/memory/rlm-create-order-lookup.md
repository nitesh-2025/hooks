---
name: rlm-create-order-lookup
description: "2026-10-09 Create Order customer lookup facts — stale v2_access_token shadows the portal token in 16 call sites, name autofill is dead, nest GET /retailers/:id now also accepts a phone; local nest is `nest start --watch`, nest files are CRLF"
metadata:
  node_type: memory
  type: project
  originSessionId: 4dbdd793-2f78-4d40-ab03-283c8895bc3a
  modified: 2026-10-09T06:54:44.055Z
---

Findings from the 2026-10-09 "order-rist" session on rlm-portal Create Order (`/manager/create-order`):

- **Token precedence bug (HIGH, not fixed yet):** `contactsSlice`, `base_api.service`, `stockshipV3Order` and ~13 other call sites read `localStorage.v2_access_token` BEFORE `rlm_portal_auth_token`. Logout only clears the portal token, so a stale Stockship-platform token (seen: issued 19 Sep 2026, 10 h validity) stays forever and every nest V2 call gets 401 → "Failed to fetch customer". Workaround: `localStorage.removeItem('v2_access_token')`. Proper fix: portal token first + clear v2 key on logout/login.
- **Name autofill is dead:** nest PII and Address schemas have no first_name/last_name, so `contactsSlice.getContactByPii` never fills a name and the toast reads "Customer found: undefined". Name lives on the retailer doc (`retailer_name`) → use `GET /api/v2/retailers/:id` (returns retailer + `pii` + resolved `pii.addresses`) instead of `/pii/:id`.
- **Nest `GET /api/v2/retailers/:id` now accepts a phone** — full (10–13 digits, 0/91/+91, spaces/dashes) or its last 4–9 digits — via `idOrPhoneFilter` → `resolvePiiIdsByPhoneTerm`. Tail rule: bare digits that are an existing KP-/PI- code keep the old meaning; one customer → answered; several → 400 "N customers' numbers end with XXXX — enter more digits" (PHONE_TAIL_MAX_HITS=5). Portal `contactsSlice.getContactByPii` now calls this route (portal token first), Create Order field accepts PII / phone / last 4 digits and fills name from `retailer_name`. Edited on branch `new-events-added-api`, uncommitted as of 2026-10-09 12:25; live-tested only to the 401 boundary (no fresh token in hand). Swagger: http://localhost:4002/api-doc.
- Nest list smart-search (`GET /retailers?search=<phone>`) returns only `pii_id`/retailer_name/has_address rows; addresses come from the detail route.

- **State end of 2026-10-09 session:** nest `GET /retailers/:id` tail lookup ONLY with `?by=phone` (default = old code meaning); by=phone never falls back to a code (404 / 503 on lookup timeout). Portal Create Order: name/phone/email inputs are `disabled` and filled only by lookup (a value the record lacks becomes editable); not-found shows an amber "Verified retailers only" panel (Partner app steps + copy-message + store links from `@/lib/appLinks` PARTNER_APP, Krishi Direct link). Tests live in the session scratchpad only (nest jest 21, slice 14, Playwright e2e 47 via global-connect-new/node_modules/playwright-core + system Chrome, hermetic route mocks). Nest change PUSHED 2026-10-09 as 6283480 on origin/new-events-added-api (not deployed, not on beta). Portal edits still uncommitted on `new-events-added-api` working tree (another session switched the checkout from order-rist at 11:20). PARTNER_APP.playStoreUrl points at com.zoho.zohoapp — unverified.

- **Prod DB fact (read-only test 2026-10-09):** `piis.phone_number_rev` is NOT backfilled, so every phone-TAIL search falls back to a suffix regex that hits the 2 s limit. PhoneSearchService now has `lookup(d, { strict: true })` (give-up throws PhoneLookupUnavailableError; default still returns [] for list search); `/retailers/:id?by=phone` uses strict → tail = 503 "enter the full 10-digit number" instead of a false 404. Full numbers resolve in 22–46 ms. Tail search needs `scripts/db/DB-18-piis-phones-and-document-keys.mjs` (DB write — Darshan decides). Nest full jest suite 787/787 after the change.

**Why:** these three facts cost ~1 h to rediscover and explain most "lookup not working" reports on the portal.
**How to apply:** when a portal → nest call 401s in a logged-in browser, check `v2_access_token` first. For customer autofill prefer `/retailers/:id`. Never assume the token in `v2_access_token` belongs to the portal.

Local-dev gotchas (nest): `localhost:4002` is run by `nest start --watch` (PID tree: nest.js → cmd → node dist/main); it recompiles + respawns the child on src changes, so never kill/restart it by hand (EADDRINUSE). Nest `.ts` files are CRLF — `file` output is misleading; patch scripts must match `\r\n`. Related: [[nest-render-beta-deploy]], [[rlm-portal-branch-switch-deps]].
