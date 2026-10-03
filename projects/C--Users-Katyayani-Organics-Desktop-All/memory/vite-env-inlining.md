---
name: vite-env-inlining
description: "Vite frontends: only the exact form import.meta.env.VITE_X is replaced per variable; any other spelling inlines EVERY env variable into the bundle. Check with a marker variable before saying a key is not shipped"
metadata:
  type: feedback
---

In the Vite frontends (rlm-portal, rlm-admin-final, retailer-verification-portel, and any other), never say "the code does not read that env key, so it is not in the bundle" without testing it.

**Why:** on 2026-10-03 I told Darshan unused `VITE_*` keys do not reach the bundle. That was wrong. Vite replaces only the exact text `import.meta.env.VITE_X`. A cast of the whole object (`import.meta.env as Record<…>`), `import.meta.env?.X`, `(import.meta as any).env?.X` or `import.meta.env[...]` makes it inline the WHOLE env object, so every `VITE_*` variable of the build environment ships to the browser. That is how rlm-admin shipped `VITE_SUPABASE_SERVICE_ROLE_KEY`. Fixed in verification `d406c7e`, rlm-admin `4f44955`, rlm-portal (branch `migration`).

**How to apply:** grep for `\(import\.meta as any\)\.env|import\.meta\.env\?\.|import\.meta\.env\s+as\s|=\s*import\.meta\.env\s*;|import\.meta\.env\[` and rewrite to the plain form. Prove it: `VITE_ZZ_UNUSED_MARKER=leakmarker npx vite build`, then `grep -rl leakmarker dist` must find nothing. Only `VITE_`-prefixed names are exposed at all. Related: [[firebase-to-nest-migration]].
