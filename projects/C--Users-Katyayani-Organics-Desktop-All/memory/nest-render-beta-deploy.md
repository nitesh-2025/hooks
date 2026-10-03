---
name: nest-render-beta-deploy
description: "rlm-backend-nest deploys branch `beta` on Render (Docker); a silent 'Timed Out' deploy means the app could not reach MongoDB while logs were buffered; read the `[boot +Ns]` lines"
metadata:
  type: project
---

`rlm-backend-nest` has a Render web service that builds branch `beta` with the repo's Dockerfile (Darshan merges `query-event-opt` into `beta` through GitHub PRs; `beta` differs only by `EXPOSE 4003`). The AWS deploy (`aws-deployed`, rsync, `.env` on the server) is separate. Render's env is set in its dashboard; the image has no `.env`.

On 2026-10-03 a Render deploy ended with "Timed Out" and a single log line (`[tracing] OTel disabled`). Cause found by reproduction: `NestFactory.create(..., { bufferLogs: true })` waits for the MongoDB connection and holds every log meanwhile, so an unreachable database = silence (2 min for an unreachable server, about 13 min when the SRV lookup times out because main.ts forced public DNS 8.8.8.8/1.1.1.1). Fixed in `7109df2` on `query-event-opt`: `[boot +Ns]` lines printed at once (`src/common/boot/boot-log.ts`) and a fall-back to the system resolver (`src/common/boot/dns.ts`, env `DNS_SERVERS=system|list`).

**Why:** tsc, build and unit tests cannot see a boot that hangs; only the boot lines can.
**How to apply:** when a deploy of nest hangs or times out, ask for the log and read the `[boot]` lines first: they name the MongoDB host (no credentials) and the reason of each failed attempt. Atlas needs the host's outbound IPs in Network Access. Never push to `beta` myself: that triggers a Render deploy. Related: [[firebase-to-nest-migration]], [[query-event-opt-branches]].
