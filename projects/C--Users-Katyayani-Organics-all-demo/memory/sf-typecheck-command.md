---
name: sf-typecheck-command
description: "staffcore typechecks with `npx tsc -p tsconfig.json --noEmit`; `tsc -b --noEmit` errors out."
metadata: 
  node_type: memory
  type: project
  originSessionId: 28143910-ef6d-4c3d-98eb-90bcafe662e5
  modified: 2026-09-22T06:30:33.039Z
---

In `sf` (staffcore) the typecheck command is `npx tsc -p tsconfig.json --noEmit`.

`npx tsc -b --noEmit` fails with `TS6310: Referenced project 'tsconfig.node.json' may not disable emit` — build mode cannot take `--noEmit`. `npm run build` (`tsc -b && vite build`) works because it does not pass the flag. There is no `tsconfig.app.json` here (unlike [[gf-typecheck-command]]); the root `tsconfig.json` has real `compilerOptions` and `include: ["src"]`, so `-p` on it genuinely checks the whole source tree — verified by planting a type error and seeing it reported.
