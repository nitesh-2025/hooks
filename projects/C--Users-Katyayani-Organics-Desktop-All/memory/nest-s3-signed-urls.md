---
name: nest-s3-signed-urls
description: nest POST /api/v2/s3/signed-urls ({name: storedKey} → presigned GET URLs under retailers/); PR #156 → aws-deployed (2026-10-23); env names, open points
metadata:
  type: project
  modified: 2026-10-23T11:07:38.012Z
---

2026-10-23: `POST /api/v2/s3/signed-urls` in rlm-backend-nest (`src/modules/s3/`, deps `@aws-sdk/client-s3` + `s3-request-presigner`). Pushed as branch `nitesh-s3-signed-urls` (re-applied on origin/aws-deployed, 28e1664) → **PR #156 MERGED into aws-deployed 2026-10-23 11:09Z (d1ab8c9)**; its "Deploy to Production" FAILED on the pre-existing retailer-alerts.service.ts:283 tsc error → fix PR #158 (branch nitesh-fix-retailer-alerts-build, 7af854a). See [[run-ci-build-before-pr]]. The same changes are ALSO still uncommitted in the main nest checkout on `alpha` (the running :4002 watch server uses them).

Contract: flat `{ name: key }` (≤50) → `{ urls: {name: url|null}, expires_in, skipped? }`. Bare key → `retailers/<key>`; key already under prefix kept; other folder / URL / `..` / >1024 bytes → null + `skipped` reason (no 422); 422 only for malformed body. Key fact: `documents.*.key` is the bare file name, object lives at `retailers/<key>`.

Env: AWS_REGION (eu-north-1), AWS_S3_BUCKET (falls back to S3_BUCKET_NAME; ko-inventory-bucket), AWS_ACCESS_KEY_ID/SECRET (blank → SDK chain), AWS_S3_URL_EXPIRES_SEC, AWS_S3_KEY_PREFIX. Values in local `.env` + `.env.local` only (never in memory — public backup, see [[memory-github-backup]]).

**Why:** Darshan wanted fresh links for the expired Partner App document URLs.
**How to apply:** before deploy: prod host `.env` needs the AWS_* keys; a dedicated read-only IAM key is advised (the current key is also committed in verification `.env`, fc8eaea — rotate); any logged-in user can sign any retailers/ key (no per-retailer scope, see [[nest-access-control]]). aws-deployed already has a tsc error in retailer-alerts.service.ts:283 (not ours). Windows: nest worktrees under the scratchpad need `git -c core.longpaths=true` (long supabase script names).
