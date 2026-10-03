---
name: supabase-to-nest-migration
description: "2026-10-03 rlm-portal's direct Supabase calls moved behind nest /portal (24 routes); branch migration, not merged or deployed; server env needs 3 new settings; verification and rlm-admin not started"
metadata:
  node_type: memory
  type: project
  originSessionId: 98d21418-67c1-4b07-a093-865b2a675974
  modified: 2026-10-03T09:51:57.840Z
---

rlm-portal no longer talks to Supabase from the browser: every call goes to nest `/portal/*` (24 routes, module `src/modules/portal-data`, client `rlm-portal/src/services/portalData.ts`). Tracker with everything: `Desktop/All/DEV Task/supabase-to-nest.md`. Contract: `rlm-backend-nest/docs/portal-data-apis.md` (gitignored `*.md`, commit with `git add -f`).

State on 2026-10-03: pushed on branch `migration` in nest and rlm-portal. **Not merged into `query-event-opt`, not deployed** (Darshan says when, as he did for [[firebase-to-nest-migration]]). verification: DONE the same day (nest `3a6aa15`, verification `37d3ab3`, branch `migration`): one module per screen group `src/modules/portal-<group>/`; realtime → polling; Profiled WhatsApp → Saathi socket. rlm-admin (92 Supabase call sites + Supabase Auth login + heavy Firebase CMS writing live retailer-app data) still in the browser.

Things that are not obvious from the code:
- **Server env**: `SUPABASE_SERVICE_KEY` is NEW for nest's code, so a server has it only if somebody set it. Needed on AWS and Render before the portal build goes out: `SUPABASE_SERVICE_KEY`, `MARKETING_SUPABASE_URL`, `MARKETING_SUPABASE_KEY` (check `SUPABASE_URL`). Missing → 503, screens show empty or sample content. Hosting env is Darshan's job.
- **Supabase drops a long address**: a PostgREST query of about 14,900 characters is answered, one of about 16,200 is not (connection dropped, no status). A team list goes into one `in.(…)`; the route caps at 300 agents and 14,000 characters.
- Default `ACCESS_SCOPE_MODE=warn`: the manager rule and the notification `user_id` check only log. Before `enforce`, compare HRMS `GET /api/me` with the `self.id` the portal sends, using one real token (never checked on the real service).
- The retailer app's shared login gets 403 on every `/portal` route, in `warn` too.
- Bucket `test_recordings` does not exist: recording uploads fail today and after; the session is still logged.
- **Nest body-parser trap:** mounting `express.json()` on one path makes Nest skip its global JSON parser (it checks for a middleware NAMED `jsonParser`), breaking every JSON body. Use a differently named wrapper (`common/boot/drafts-body.ts`), mounted after CORS.
- Whole-company writes (department/tenure targets, onboarding) use `assertReadsAll`; a team lead is not enough.
- Read-only live check of all GET routes: `npx ts-node --transpile-only -r tsconfig-paths/register scripts/supabase/portal-smoke-readonly.ts` (nest repo root).

**Why:** the Supabase keys sat in the bundle and nobody signs in to Supabase, so anyone with the bundle could read and write the tables.

**How to apply:** deploy nest before rlm-portal; do not tell Darshan a setting "exists on the server" from the local `.env` (I did that once in a commit message and had to correct it); for the next portal (verification) reuse `src/common/supabase` and the same contract-first, build, three-reviewer loop.
