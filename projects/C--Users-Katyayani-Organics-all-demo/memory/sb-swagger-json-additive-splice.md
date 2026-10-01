---
name: sb-swagger-json-additive-splice
description: "node-backend swagger.json is a hand-formatted static file (2-space, CRLF, some inline arrays); Darshan wants only additions — splice new entries into the original text, never re-stringify the whole file."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 473ad943-3e19-48da-a903-078a93c68666
  modified: 2026-10-01T09:18:15.381Z
---

`node-backend/swagger.json` is the whole Swagger spec (served via `/stoc/docs`, filtered by module-config). It is hand-formatted: 2-space indent, CRLF, and some arrays inline (`"tags": ["Leave"]`). Darshan's rule (2026-10-01): "existing kuch bhi remove nahi hoga, bas add hoga". Payroll APIs are deliberately NOT documented there.

**Why:** Re-serialising with `JSON.stringify` expands inline arrays and changes line endings, which shows up as thousands of deletions in `git diff` even though nothing changed semantically — and that reads as "you removed things".

**How to apply:** Add new tags / schemas / paths by splicing text into the original file at the closing bracket of each block (brace-matching, 2-space CRLF), then verify `git diff --minimal` shows 0 deletions and every original line is still present in order. Check registered Express routes vs spec paths with a script (mounts from `main.ts` + `router.<verb>("…")` in `*.routes.ts`); as of 2026-10-01 only the 22 payroll ops are undocumented. Related: [[sb-git-branch-and-main-merge]].
