---
name: nest-patch-role-forward
description: "2026-10-14 nest PATCH /retailer/:contact now forwards body `role` to ko-sales on every update (pickRole); local branch nitesh-patch-role-forward, uncommitted, not pushed; source stays 'ksr-app' (Darshan)"
metadata:
  node_type: memory
  type: project
  originSessionId: f967d507-f826-4998-9e0a-33548b98aa36
  modified: 2026-10-14T13:22:27.323Z
---

On 2026-10-14, Darshan asked that the `role` key in the `PATCH /api/v2/retailer/:contact` body (a string such as "nitesh" or an object such as `{ ksr_role: 'farmer' }`) reach the lead on EVERY update. Before this, it only reached `leads_v2` through the `is_verified` path (`retailers.service.ts` `mirrorRoleToLeads`, a direct `leads_v2.updateMany`).

Darshan then clarified that the app sends a plain STRING: `"role": "retailer"` (or `"farmer"`). The change is in `rlm-backend-nest/src/modules/retailer/retailer.service.ts`: a `pickRole()` helper wraps a trimmed string as `{ ksr_role: <value> }`, because the verification portal and sales-app (`role?.ksr_role`) read the object, and existing leads have that shape. A non-empty plain object is kept as-is. null/''/{}/array/number are ignored. A guard was added after a QA pass on 2026-10-14. `roleSkipReason()` sends `role` to ko-sales ONLY when a lead exists and its role differs. A new `RetailersService.findLeadRole(pii_id)` reads the first `{pii_id}` lead, the same one ko-sales updates. The reason: ko-sales stamps `updated_at`/`last_updated_by` on every update and 404s a phone with no lead, so an unchanged role riding on an `app_version`-only call would otherwise change the old flow. With no lead and `is_verified`, the role still lands through the `mirrorRoleToLeads` path. Full suite: 958/958. It is used in `buildUpdatePayload` and in `buildRetailerUpsertDto`. The Swagger example and description were updated, and 14 specs were added (31/31 and 46/46 pass; 6 of them fail on the old code). It is commit `cd8e935` on branch `nitesh-patch-role-forward` (cut from `aws-deployed` 8349f36), PUSHED to origin on Darshan's ask ("current new branch me karna"). No PR was opened and nothing was merged. Pushing this branch does not deploy: `deploy.yml` triggers only on `aws-deployed`. The commit also adds `test/retailer-patch-role.e2e-spec.ts`: real HTTP through the guards and the pipe to a local fake ko-sales server. Final results: e2e 606/606, unit 958/958. The payloads were validated offline against the ko-sales DTOs.

Darshan's decision: lead `source` stays `'ksr-app'`, never `'retailer'`. ko-sales keys the KSR-KYC SLA, the auto referral regex `/^(kkd|ksr)/`, the KYC skip rules, profile-doc config and LQS on `'ksr-app'`. See commit 673aa56.

**Why:** the app sends `role` without `is_verified`, so it was silently dropped. A Swagger call on prod for 9155061725 showed this.

**How to apply:** do not hardcode `source: 'retailer'` on lead create or update. If asked to ship, commit on the branch and open a PR to `aws-deployed` (the real deploy branch, per repo AGENTS.md). POST /retailer (create) still drops `role`; that is open and not requested. Related: [[prod-vs-beta-mongo-and-netcore]], [[nest-access-control]].
