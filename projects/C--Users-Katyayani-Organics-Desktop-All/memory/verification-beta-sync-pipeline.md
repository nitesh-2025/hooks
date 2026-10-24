---
name: verification-beta-sync-pipeline
description: "2026-10-24 verification origin beta-deploy → fork beta-retailer-verification-portel nitesh-aws-v4 → Render (srv-daocl9rm8hqs73e5o0v0, auto-deploy OFF) pipeline; E2E PASS incl. Render confirm"
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T13:05:13.574Z
---

Same design as [[rlm-beta-sync-pipeline]], for Katyayani-Organics/retailer-verification-portel:
- Source origin `beta-deploy` (created 2026-10-24 from aws-v4 71a529b + empty 23f165c). Target fork `nitesh-2025/beta-retailer-verification-portel` branch **`nitesh-aws-v4`** — Darshan: "that branch is the one deployed on Render" (not `beta`, not `beta-deployed`).
- Render beta = static site `beta-retailer-verification-portel-1` srv-daocl9rm8hqs73e5o0v0 (https://beta-retailer-verification-portel-1.onrender.com), **autoDeploy=no** → stage 6 (`wait-for-render.sh`) starts one deploy for the pushed commit via Render API and waits for `live`. Other services on that branch: `main-…-1` (stale, last deploy Sep 24), `beta-retailer-verification-portel` web service (suspended).
- Fork secrets: SYNC_TOKEN (gh token, no workflow scope), RENDER_API_KEY; var RENDER_SERVICE_ID. Fork main 65b662b holds workflow+scripts+docs. Vitest blocks in stage 3 (292 tests).
- Before the first sync I merged aws-v4 into nitesh-aws-v4 in 3 steps keeping beta's USR-1036/migration (Darshan's choice): merge db283f0, `merge -s ours` the revert 24f1c5f (PR #128), merge the rest; 0 files deleted, 0 new tsc errors (86=86), 292/292 tests. History: 523cee0, a7c2e12, 5b81fe1.
- E2E 2026-10-24: test e510e19 — fork run 40096222818 all 8 green, Render deploy dep-dbeaoqtg1s2s73f03pv0 live; origin Actions run 40096213713 showed every stage. Notifier commit 50adbe4 bootstrapped to the fork by hand (workflow-file push needs a scope SYNC_TOKEN lacks).

**Why:** remote devs on the org repo could not see whether their push to beta-deploy actually deployed.
**How to apply:** rlm fork beta ALSO deploys to Render (`beta-rlm-portel` srv-d8r4q1mgvqtc73ei3v50, autoDeploy yes) — the rlm pipeline only confirms Vercel; offered to add Render there. Automatic trigger still needs org-admin FORK_DISPATCH_TOKEN in each origin repo.
