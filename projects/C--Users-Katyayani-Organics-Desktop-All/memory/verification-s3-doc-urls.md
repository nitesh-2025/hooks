---
name: verification-s3-doc-urls
description: "verification + rlm show expired S3 doc photos via nest /s3/signed-urls (display only); verification PR #129 → aws-v4, rlm PR #117 → aws-deployed (2026-10-23); KYC-approved leads lock docs by design"
metadata:
  node_type: memory
  type: project
  originSessionId: 94777b3e-a8c8-4c8d-8070-7fa94f2a62ce
  modified: 2026-10-23T11:07:46.988Z
---

2026-10-23. Shared design: `src/lib/s3SignedUrls.ts` (only bucket ko-inventory-bucket and only an EXPIRED presigned link is re-signed; key = URL path; batched ≤50/tick, cache, 8s timeout, pause 15s/10min on 404, refused token remembered) + `src/components/shared/StoredMedia.tsx` (`StoredImg`/`StoredFrame`/`StoredLink` drop-ins, shimmer + spinner) + `openStoredUrl`. Display only — the stored URL stays in state/saves/comparisons.

- **Verification**: branch `nitesh-s3-doc-urls` (from aws-v4), commit 933666c, **PR #129 → aws-v4** (its aws-deployed is 268 commits behind and has no /profiled). Covers /profiled (+StoredPhoto.tsx, header avatar) and every page with stored docs (DocumentsPanel, KYCApproval, KYCModuleDetail/Edit, LeadDetail, KYCWorking, RetailerInfoPanel, WhatsApp media, SkillMatrix…). Main checkout is on this branch (:8005). tsc 249 = aws-v4 baseline, vitest 199/199.
- **rlm**: worktree `rlm-portal/.claude/worktrees/s3-doc-urls`; branch `nitesh-s3-doc-urls-aws-deployed` (1417fcb) **PR #117 → aws-deployed** (RetailerDetail, RetailerEdit, EventValueCard); local-only `nitesh-s3-doc-urls` (aws-v2 base, 277fae2 wip) also has ReturnRefundsTab + ExpectedPriceTab (missing on aws-deployed). rlm token: portal token FIRST (stale v2_access_token). Preview :8082 via git-excluded `vite.config.s3preview.mts` + worktree `.env.local` → nest :4002.
- Not yet covered in rlm (audit): RetailerAvatar (MyRetailers/TeamRetailers), RegisterCaseDialog, PCApprovalJourney, CallScreen avatar, RetailerMap, PCCertificates.

**Why:** Darshan: stored S3 doc links expired; call nest with the key only for AWS-footprint URLs; existing flow must not break.
**How to apply:** lead K0-1354163 has is_kyc=true → docs read-only even in Edit (Profiled.tsx:3714) — not a bug; test edits on K0-1577798/PII-533 or K0-363300/PII-2143. Needs nest [[nest-s3-signed-urls]] deployed first. No logged-in browser test done yet.
