---
name: b2b-aws-deployed
description: sales-app (b2b) deploy branch is aws-deployed (main is far behind); how to check a branch against it; tsc baseline 220 errors
metadata:
  node_type: memory
  type: project
  originSessionId: 206f57a7-d901-43d7-9de5-764c9fc75df2
  modified: 2026-10-17T07:19:27.808Z
---

In sales-app (b2b), `origin/aws-deployed` is the real deploy line: on 2026-10-17 it was 632 commits ahead of `origin/main` and main was 0 ahead. The local `aws-deployed` branch can be stale (it was 63 behind origin), so always compare against `origin/aws-deployed` after a fetch.

**Why:** feature branches (for example `nitesh-partner-media-preview`) are cut from aws-deployed, not main, so "check it against aws-deployed" means checking that it merges and builds on top of that branch.

**How to apply:** fetch, then run `git cherry`, `git merge-tree --write-tree`, and check which files both sides touched. Then build the merged tree in a temporary worktree with a node_modules junction (remove the junction with `cmd /c rmdir` BEFORE running `git worktree remove`). Typecheck with `npx tsc -p tsconfig.app.json --noEmit` (the root tsconfig has `files: []`). aws-deployed itself has about 220 tsc errors that were already there (for example a TS2308 ambiguous `useMessages` re-export in `hooks/api/index.ts`), so compare against that baseline. `vite build` passes. Related: [[deploy-branch-pr-reapply]].
