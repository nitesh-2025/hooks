---
name: rlm-beta-sync-pipeline
description: "2026-10-24 origin rlm-portal beta-deploy → fork nitesh-2025/rlm-portel-copy beta (Vercel) sync pipeline; workflow on fork main, disabled until SYNC_TOKEN is added"
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T11:21:14.858Z
---

2026-10-24: Darshan asked for a `beta-deploy` branch in Katyayani-Organics/rlm-portal (from aws-v2, made equal to the fork's beta) and an automated fork sync + CI/CD pipeline.

State:
- origin `beta-deploy` = fork beta 10a4153 (aws-v2 + PR merges #65–#70 incl. coins-master-2) + 4f2f824 notifier commit (`.github/workflows/notify-fork-beta.yml`, repository_dispatch to the fork; needs org-admin secret FORK_DISPATCH_TOKEN, exits with a notice without it).
- fork `nitesh-2025/rlm-portel-copy` (private, default branch main; beta auto-deploys on Vercel project `rlm-portel`, previews behind Vercel login → 302): `main` 43ab6f3 has `.github/workflows/beta-sync-deploy.yml` + `.github/scripts/beta-pipeline/*.sh` + `docs/BETA_SYNC_PIPELINE.md`. 8 jobs; build gates BEFORE push because the Vercel push IS the deploy; eslint/tsc report-only unless MAX_*_ERRORS vars.
- Workflow **disabled_manually** until the user adds fork secret `SYNC_TOKEN` (classic PAT, `repo`+`workflow`; fine-grained can't span org+user). Then: `gh workflow enable` + manual run → first real sync of 4f2f824.

**Why:** cron */10 with a missing token = a failure email every 10 min; also ~4,300 Actions min/month on a private repo → suggest */30 once the instant trigger is live.
**How to apply:** gh CLI token lacks `workflow` scope, but git pushes via GCM have it. YAML anchors work in Actions (verified). Pins: checkout v5.1.0 fbc6f39…, setup-node v5.0.0 a0853c2… (v4 = Node 20 deprecation warning).
