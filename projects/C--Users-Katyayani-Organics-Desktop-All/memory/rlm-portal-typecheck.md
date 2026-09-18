---
name: rlm-portal-typecheck
description: "rlm-portal typecheck must use tsconfig.app.json; plain `npx tsc --noEmit` checks 0 files and always passes"
metadata: 
  node_type: memory
  type: project
  originSessionId: 648a844b-727d-4889-81bf-c18ac329fc05
  modified: 2026-09-18T05:57:06.245Z
---

`rlm-portal` has the same root-tsconfig trap as `gf` (global-connect-new): `tsconfig.json` is `files: []` + project references to `tsconfig.app.json` / `tsconfig.node.json`.

- **Wrong:** `npx tsc --noEmit` — verified with `--listFilesOnly`: **0 files under src/** are checked. It exits 0 even with broken code.
- **Right:** `npx tsc -p tsconfig.app.json --noEmit`

**Why:** a green plain-`tsc` run in this repo is meaningless, so it can make a broken change look validated.

**How to apply:** always use the `-p tsconfig.app.json` form in rlm-portal. Note the repo has ~68 PRE-EXISTING errors (in `firebase/connection.ts`, `firebase/storage.ts`, `src/components/retailer/PipelineSelector.tsx` and others), so a non-zero exit is normal — grep the output for the files you actually touched instead of reading the exit code.

Checked 2026-09-18. CLAUDE.md documents this trap only for `gf`; it applies here too. Related: [[assistant-identity]]
