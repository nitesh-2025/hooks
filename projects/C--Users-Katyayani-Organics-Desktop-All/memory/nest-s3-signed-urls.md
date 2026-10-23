---
name: nest-s3-signed-urls
description: "2026-10-23 nest POST /api/v2/s3/signed-urls ({name: storedKey} → presigned GET URLs under retailers/), uncommitted on alpha; env names, open points"
metadata:
  node_type: memory
  type: project
  originSessionId: 94777b3e-a8c8-4c8d-8070-7fa94f2a62ce
  modified: 2026-10-23T08:14:39.700Z
---

2026-10-23: added `POST /api/v2/s3/signed-urls` in rlm-backend-nest (`src/modules/s3/`, S3Module, deps `@aws-sdk/client-s3` + `s3-request-presigner`, e2e `test/s3.e2e-spec.ts` + S3Module in `test/support/e2e-app.ts`). Body is a flat map `{ aadhar_card_front: "<key>", … }` → `{ urls: {name: url|null}, expires_in }`; validated by `parseKeyMap` (not a DTO: the global pipe has forbidNonWhitelisted). Left uncommitted on branch `alpha`.

Key fact: retailer `documents.*.key` is the BARE file name (`1754982976552-aadhar_front.jpeg`) but the object lives at `retailers/<key>` in the bucket. So keys are signed under `AWS_S3_KEY_PREFIX` (default `retailers/`, not doubled if already present); bare key without prefix = 404. Live-verified 2026-10-23 with Darshan's 4 real keys: 206 image/jpeg each.

Env: AWS_REGION, AWS_S3_BUCKET (falls back to S3_BUCKET_NAME), AWS_ACCESS_KEY_ID/SECRET (blank → SDK default chain; prod EC2 role `prasar-ec2-profile` likely has no access to this bucket), AWS_S3_URL_EXPIRES_SEC (900, clamped 60…604800), AWS_S3_KEY_PREFIX. Values are in local `.env` + `.env.local` (never in memory: this repo is public, see [[memory-github-backup]]).

**Why:** Darshan wanted presigned URLs from the stored keys (aadhar, pesticide, …).
**How to apply:** before deploy, raise: any logged-in user can sign any key under retailers/ (no per-retailer scope, see [[nest-access-control]]); the prod host `.env` needs the AWS_* keys; not tested through the live server with a real SSO token.
