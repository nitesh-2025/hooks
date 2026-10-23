---
name: verification-s3-doc-urls
description: "2026-10-23 verification /profiled shows expired S3 doc photos via nest /s3/signed-urls (display only); branch nitesh-s3-doc-urls from aws-v4, uncommitted in the MAIN checkout (:8005); KYC-approved leads lock docs by design"
metadata:
  node_type: memory
  type: project
  originSessionId: 94777b3e-a8c8-4c8d-8070-7fa94f2a62ce
  modified: 2026-10-23T10:23:21.355Z
---

2026-10-23: retailer-verification-portel branch `nitesh-s3-doc-urls` (cut from origin/aws-v4 4a504b3, upstream unset) checked out in the MAIN checkout, so Vite :8005 serves it (was `re-think`, clean + pushed). Uncommitted: src/lib/s3SignedUrls.ts (+ .test.ts), src/components/profiled/StoredPhoto.tsx, ProfiledDocsGrid / ProfiledVerification / DocReview / pages/agent/Profiled.tsx (header avatar).

Rules built in: only bucket `ko-inventory-bucket` (VITE_S3_DOCS_BUCKET) and only an EXPIRED presigned link is re-signed; key = URL path (`retailers/<key>`); display only (doc.url still saved/compared); onError → re-sign once → stored URL → fail; 8s timeout; pause 15s on failure, 10 min on 404; a 401 token is remembered (no pause); PhotoPending = shimmer + spinner (Darshan asked for the spinner). 5 review agents x2 rounds; tsc 249 = aws-v4 baseline (pre-existing), vitest 199/199, build ok. Needs nest [[nest-s3-signed-urls]] deployed first; prod portal → 404 → stored links, same as before.

**Why:** Darshan: stored S3 doc links expired ("Photo could not load"); call nest with the key only when the URL has the AWS footprint.
**How to apply:** lead K0-1354163 has is_kyc=true → docs pane read-only even in Edit (Profiled.tsx:3714 `editing && !kycLocked`) — not a bug; test edits on non-KYC leads with S3 docs, e.g. K0-1577798/PII-533, K0-363300/PII-2143. Local VITE_BACKEND_URL = localhost:3000 ko-sales → warn before any Save on real leads. Browser check not done (extension Chrome could not open localhost).
