---
name: run-ci-build-before-pr
description: "before opening a PR into a deploy branch, run the CI build command (nest: npm run build) on that base — a \"pre-existing\" tsc error there still blocks the deploy"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 94777b3e-a8c8-4c8d-8070-7fa94f2a62ce
  modified: 2026-10-23T11:19:49.875Z
---

Before opening a PR into a deploy branch (nest `aws-deployed`, frontends' deploy lines), run the exact command CI runs (nest: `npm run build` = `nest build`, which fails on ANY tsc error) on base + change. If it fails on an error "already on the base", that error is still the PR's problem: fix it in the PR, or flag it as a deploy blocker before the PR is merged — never just label it "pre-existing" and move on.

**Why:** 2026-10-23 nest PR #156 → aws-deployed: I saw `retailer-alerts.service.ts:283 'self' is possibly 'null'` (already on aws-deployed since 2cb4e2e) and called it pre-existing. Darshan merged, "Deploy to Production" failed, and he asked "tu test nahi kiya tha kya". Fixed in PR #158 (new branch from aws-deployed, since #156 was already merged).
**How to apply:** for any PR into a deploy branch, include `npm run build` (or the repo's CI build) on the PR tree in the checks, and check `gh run list --branch <base>` for an already-red deploy. See [[nest-s3-signed-urls]].
