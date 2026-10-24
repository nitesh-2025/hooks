---
name: rlm-beta-sync-pipeline
description: "2026-10-24 origin rlm-portal beta-deploy → fork nitesh-2025/rlm-portel-copy beta (Vercel) sync pipeline; workflow on fork main, disabled until SYNC_TOKEN is added"
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T12:13:56.618Z
---

2026-10-24: Darshan asked for a `beta-deploy` branch in Katyayani-Organics/rlm-portal (from aws-v2, made equal to the fork's beta) and an automated fork sync + CI/CD pipeline.

State:
- origin `beta-deploy` = fork beta 10a4153 (aws-v2 + PR merges #65–#70 incl. coins-master-2) + 4f2f824 notifier commit (`.github/workflows/notify-fork-beta.yml`, repository_dispatch to the fork; needs org-admin secret FORK_DISPATCH_TOKEN, exits with a notice without it).
- fork `nitesh-2025/rlm-portel-copy` (private, default branch main; beta auto-deploys on Vercel project `rlm-portel`, previews behind Vercel login → 302): `main` 43ab6f3 has `.github/workflows/beta-sync-deploy.yml` + `.github/scripts/beta-pipeline/*.sh` + `docs/BETA_SYNC_PIPELINE.md`. 8 jobs; build gates BEFORE push because the Vercel push IS the deploy; eslint/tsc report-only unless MAX_*_ERRORS vars.
- 2026-10-24 E2E PASS: run 40091059195 synced dev commits 2a7eb4a + 5e8c40c → fork beta 5e8c40c, Vercel Preview confirmed (1 deployment), stages 1–6 green, 7 skipped (no bypass secret). Workflow now ENABLED (cron */10). fork main 2e6658d (scope-error reason fix + developer guide).
- SYNC_TOKEN = gh CLI OAuth token (repo, NO workflow scope) → any sync that changes .github/workflows fails at stage 5. I bootstrapped my own CI-only commit 4f2f824 to fork beta by hand (GCM push). The two classic PATs the user pasted in chat had NO scopes — told them to add repo+workflow or delete.
- Deploy target is Vercel (user sometimes says "Render").
- Fork cron NEVER fired (GitHub skips schedules in forks) → cron now */30, best-effort only; the dependable trigger is origin secret FORK_DISPATCH_TOKEN, which only org admins Amphoze / vardhman-katyayani can add (nitesh-2025 = member/MAINTAIN). Until then: manual "Run workflow" in the fork.
- Visibility (user asked to see fork progress from origin): fork posts commit status "Beta pipeline (fork)" N/8 on the origin commit each stage (source-status.sh); origin notify-fork-beta (2 steps) follows it and prints stages, waits 35 min if dispatched / 20 min if not. Verified 2026-10-24 on 589b1b8 (fork run 40092711111, origin run 40092705253, all green). fork main 00ec1d5, origin beta-deploy 589b1b8. Run list shows branch `main` by design; run-name "beta ← beta-deploy · …".

**Why:** cron */10 with a missing token = a failure email every 10 min; also ~4,300 Actions min/month on a private repo → suggest */30 once the instant trigger is live.
**How to apply:** gh CLI token lacks `workflow` scope, but git pushes via GCM have it. YAML anchors work in Actions (verified). Pins: checkout v5.1.0 fbc6f39…, setup-node v5.0.0 a0853c2… (v4 = Node 20 deprecation warning).
