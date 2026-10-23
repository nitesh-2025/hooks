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

2026-10-23 later: rlm PR #119 (head cut from aws-deployed → base aws-v2) conflicted (dragged #88 OrderDetail + aws-deployed versions of RetailerDetail/EventValueCard). Replaced by **PR #120** (branch nitesh-s3-doc-urls-aws-v2 from aws-v2 12f32d6: 85e2c44 + eddc3fd), 7 files, MERGEABLE. eddc3fd/verification 8a9f360: a bucket-root key (no "/") is never re-signed (nest would prefix retailers/ → wrong object). Nest #156+#158 deployed; prod route answers 401 without token.

2026-10-23 evening: S3 commits cherry-picked onto **nitesh-announcements** (25c5da3 + 23d996a, pushed → PR #113). Darshan: :8080 must run nitesh-announcements → worktree `rlm-portal/.claude/worktrees/s3-doc-urls` is now on nitesh-announcements and serves :8080 (git-excluded `vite.config.s3preview.mts`, port 8080, own cacheDir; `.env.local` = copy of the main checkout env, v2 = prod api.retailers). Main checkout stays on nitesh-announcements-alpha (someone else's uncommitted Dashboard.tsx) and is NOT served now.
2026-10-23: nitesh-announcements also merged origin/aws-v2 (9371d91) and multiple-label-table-design-beta (ced4e03: table header design, PC chip, phoneParam e1. encoding — only CallScreen reads ?phone and it decodes); pushed, PR #113 MERGEABLE; :8080 serves it. tsc 62 throughout (pre-existing).
2026-10-23: RetailerDetail EXPIRED badge/red frame/Refresh URLs/preview Expired go by the stored LINK expireAt — fixed: isDocExpired(expireAt, url) returns false when resignKey(url) (shown freshly signed). nitesh-announcements 1dbe8ec, PR #120 branch 518593f.
2026-10-23 (Darshan, on nitesh-announcements): CreateOrder phone is NEVER typed in — only from the PII lookup (fieldDisabled phone always; no-phone record → amber hint + step-1 error) 1a50ab9; Crop & Product Suggestion "+" (add to cart) hidden via SHOW_ADD_TO_CART=false in CropProductSuggestion.tsx 4cb1d5b (cart pill still shows if old cart items exist).
- 2026-10-23 Darshan rule (CreateOrder, nitesh-announcements aebb577): first name, last name, phone, email are ALWAYS locked — only from the PII lookup, never typed/edited even when the record lacks them (fieldDisabled always true, lock icon inside each input b50c0d9; drafts restore a value only if lockedFields says the lookup filled it). Address stays editable.
