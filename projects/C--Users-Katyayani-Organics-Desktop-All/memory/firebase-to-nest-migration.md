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

Update 2026-10-03 (all pushed on `query-event-opt`: nest `49f5cab`, `08e575c`; verification `63c4f98`; rlm-portal `1b5c112`, `3fbcca8`):
- A read-only live check exists: `rlm-backend-nest/scripts/firebase/smoke-readonly.ts` (run with `-r tsconfig-paths/register`). Facts it found: the calls RTDB (project `katyayani-sales-cc409`) REFUSES the `micro-dealer` service account, so calls need `FIREBASE_RTDB_PROJECT_ID/_CLIENT_EMAIL/_PRIVATE_KEY`; this is the one blocker before deploying verification. PC request docs: 41 of 46 keyed `+91`+10 digits (mobile app), 5 by ten digits (portal); only 5 carry `agent_email`. nest now resolves any id shape, matches agent by e-mail OR name, and needs no composite index below 2000 docs.
- Boot crash lesson: a DTO property typed `null` with no @ApiProperty makes SwaggerModule.createDocument die ("circular dependency … property key"); tsc/build/unit tests do not catch it. `scripts/security/swagger-check.ts` builds the document offline; run it after a `nest build` before saying the app boots.
- `VITE_FIREBASE_*` removed from both portals' `.env` and `.env.local`; hosting env still has them. nest local env has `FIREBASE_DATABASE_URL`; the server env does not (deploy excludes `.env`).
- Tests: nest unit 162 + e2e 99 (`npm run test:e2e`). Still not run live: any write path (upload, mirror, PC request save, force-end).
