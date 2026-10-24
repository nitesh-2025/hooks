---
name: nest-beta-deploy-status
description: "2026-10-24 nest beta → Render (rlm-backend-nest-3) deploy-status workflow; PR #164 into beta (not merged); health now returns commit/branch"
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T13:11:49.727Z
---

Darshan (2026-10-24): pushes to rlm-backend-nest `beta` deploy on Render but the pusher cannot see whether it went live.

Built (PR #164, branch nitesh-beta-deploy-status @460ae46 → beta, NOT merged — auto-mode blocked my `gh pr merge` [Merge Without Review]; Darshan must merge; see [[nest-render-beta-deploy]]). Also validates PRs into beta (stage 1 only; run 40097328445 build ✅ 49s):
- `GET /api/v2/health` adds `commit`/`branch` from RENDER_GIT_COMMIT/RENDER_GIT_BRANCH.
- `.github/workflows/beta-deploy-status.yml`: on push to beta → 1 Build check (npm ci + nest build), 2 Render deploy (polls https://rlm-backend-nest-3.onrender.com/api/v2/health until it serves github.sha; 30 min), 3 Result (summary + commit status "Beta deploy (Render)"). No secret needed (user has only WRITE on the org repo, cannot add RENDER_API_KEY).
- Render service: rlm-backend-nest-3 srv-d9acfpgk1i2s73fe5jsg, branch beta, auto-deploy yes. (rlm-backend-nest-beta is suspended.)

**How to apply:** first real proof is the merge of #164 itself (merge sha must come back from /api/v2/health). If RENDER_GIT_COMMIT is missing in the Docker runtime, the job falls back to "restarted after the push" (uptime) with a warning.
