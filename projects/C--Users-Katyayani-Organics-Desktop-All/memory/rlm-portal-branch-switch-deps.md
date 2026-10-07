---
name: rlm-portal-branch-switch-deps
description: rlm-portal branches migration/wallet-card dropped @supabase/supabase-js + firebase; switching back to aws-v2 needs npm install, and aws-v2 tsc has ~68 pre-existing errors while vite build passes
metadata:
  type: project
---

2026-10-07: In rlm-portal the `migration` and `wallet-card` branches removed `@supabase/supabase-js` and `firebase` from package.json (see [[supabase-to-nest-migration]], [[firebase-to-nest-migration]]). `aws-v2` (the deploy branch) still has both. After `npm install` on those branches, node_modules is pruned, so checking out `aws-v2` again gives Vite `Failed to resolve import "@supabase/supabase-js" from src/lib/supabaseHrms.ts`.

`aws-v2` state on 2026-10-07: `npx tsc -p tsconfig.app.json --noEmit` reports 68 errors in files untouched for months (redux_v2 api services, PipelineSelector, firebase/*, TestProctoringLogs, ...); `npx vite build` passes (esbuild does not typecheck). `.env` is tracked in git and `src/lib/supabaseHrms.ts` reads `VITE_HRMS_SERVICE_ROLE_KEY` in browser code (service-role key lands in the bundle) — flagged to Darshan, not changed.

**Why:** cost a debugging round when the error looked like a broken branch; it is only stale node_modules.
**How to apply:** after any checkout between `aws-v2` and `migration`/`wallet-card`, run `npm install` before `vite`. Do not treat the 68 tsc errors as a regression unless they are in files the current change touched. Use [[rlm-portal-typecheck]] command.
