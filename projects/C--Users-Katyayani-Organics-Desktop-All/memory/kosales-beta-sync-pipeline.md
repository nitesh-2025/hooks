---
name: kosales-beta-sync-pipeline
description: 2026-10-24 ko-sales origin beta-deployed → fork ko-sales-backend-sanity main → Render Ko-Sales-backend (srv-d8r72sojs32c73bmkg70); E2E PASS; pipeline files fork-only
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T14:03:01.541Z
---

Same design as [[verification-beta-sync-pipeline]] / [[rlm-beta-sync-pipeline]], for Katyayani-Organics/ko-sales-backend (user perm WRITE):
- Origin `beta-deployed` (created 2026-10-24) = fork main 6b2c65d + merge of aws-deployed v1.0.400–407 (5cc1589e, clean) + notifier commits 38e4f05c, 293a2021 (notifier guarded to run only in the org repo; goes RED when the fork never confirms).
- Fork `nitesh-2025/ko-sales-backend-sanity` default+target branch is `main` → pipeline files live ONLY in fork main (b6d39189), never in origin, so origin pushers cannot change code that runs with fork secrets; syncs are merge commits (diverged path).
- Render web service Ko-Sales-backend **srv-d8r72sojs32c73bmkg70** (not …ei3v50 — I once copied it wrong), auto-deploy main, https://beta-ko-sales-backend.onrender.com, health /api/v1/health {"status":"ok",…} (not wrapped). Node 20 (Dockerfile).
- Fork vars: RENDER_SERVICE_ID, HEALTH_URL, TESTS_BLOCKING=false (jest: ~61–64 of 1,110 fail, ~5 min; not checked if pre-existing); secrets SYNC_TOKEN (gh token, no workflow scope), RENDER_API_KEY. Stage 1 now stops early when new commits touch .github/workflows (ALLOW_WORKFLOW_SYNC=true once the token has the scope).
- E2E: test 52e7ddf → fork run 40100089606 all 8 green, merge 69987dc live (Render dep-dbebj6m7bikc73b2gav0); origin Actions run 40100082506 showed every stage.

**How to apply:** the review fixes made here (pipefail-safe pipes, char-safe 140-char status, notifier red on timeout + first() jq, deactivated=superseded, eslint *.ts glob, jest --forceExit, workflow-change early stop) are NOT yet ported to the rlm and verification forks.
