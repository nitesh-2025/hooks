---
name: firebase-to-nest-migration
description: "2026-10-01 branch `migration` (merged into query-event-opt, not deployed) in rlm-backend-nest, rlm-portal, retailer-verification-portel: all direct Firebase calls moved behind nest APIs; rules Darshan set; what is not verified"
metadata:
  type: project
---

On 2026-10-01 Darshan asked for a FULL migration: rlm-portal and retailer-verification-portel must not call Firebase directly; nest holds the service account. Committed and pushed 2026-10-01 on branch `migration` (cut from `query-event-opt`) in all three repos: nest `594cfcc`, verification `63f717c`, rlm-portal `d0f6ee9`. Merged into `query-event-opt` the same day with `--no-ff` and a detailed merge message (nest `bf31411`, verification `c1dd222`, rlm-portal `de45b6f`), pushed. Not deployed. Contract: `rlm-backend-nest/docs/firebase-apis.md`. Task list: `Desktop/All/DEV Task/firebase-to-nest.md`.

Darshan's rules (do not undo without asking):
- Branch name is `migration`.
- Firestore keys the retailer app reads must NOT change, and every update that reached `Retailer Users` before must still reach it. nest writes the exact old app keys (`shop_name`, `documents.shop`, `documents.aadhar_card_front/back`, top-level `profile_image`, `rr: true`, `updatedAt`, `documents_meta.<card>.rejection.timestamp`); `APP_USER_MIRROR` defaults to `on`.
- Firebase credentials are not rotated as part of this; Darshan removes the `VITE_FIREBASE_*` keys from the frontends himself.
- D1 PC requests stay in Firestore; D2 calls go through the nest `/calls` socket (no Firebase SDK left in the portals); D3 rlm-admin-final is not covered yet.

What exists on nest: `POST /files`, `GET/PATCH /app-users/:phone`, `GET/PUT /pc-requests`, `GET /calls/:uuid`, `POST /calls/:uuid/force-end`, socket namespace `/calls`, implicit mirror inside `PATCH /retailers/:id` and `PATCH /retailers/lead/update`.

**Why:** the portals never signed in to Firebase, so every read/write/upload ran unauthenticated with keys in the bundle.
**How to apply:** nothing was tested against real Firebase or a running nest (unit tests and builds only). The calls RTDB is in project `katyayani-sales-cc409`, not `micro-dealer`; nest supports optional `FIREBASE_RTDB_*` for it. nest `.env` has no `FIREBASE_DATABASE_URL` (calls routes answer 503 without it) and duplicate `FIREBASE_*` lines. Deploy order: nest first, then both portals, then Firebase rules. Commit/push only when Darshan says. Related: [[nest-open-tasks-branch]], [[query-event-opt-branches]].
