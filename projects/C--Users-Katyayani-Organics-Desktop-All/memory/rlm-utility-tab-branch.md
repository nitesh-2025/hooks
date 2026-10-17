---
name: rlm-utility-tab-branch
description: "rlm-portal Retailer Details \"Utility\" tab (Sales B2B Crop & Product Suggestion port) lives on branch nitesh-announcements-alpha — the branch localhost:8080 runs — per Darshan 2026-10-17"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-17T13:36:51.283Z
---

Darshan, 2026-10-17: put the rlm-portal Retailer Details **Utility** tab on **`nitesh-announcements-alpha`**. That is the branch the main checkout and localhost:8080 run. Do not use alpha or a separate branch, and never just a :8082 preview. He said "remember this".
- He was blunt about it: "glat branch me code kar rahe ho … 8080 par run ho raha hai usme hi change karna tha".

Feature: Utility tab (after Suggestions) → a card in the Sales B2B lead-flow style (🌱 "Crop & Product Suggestion", "Crop Calendar & Issue Identification", Multi, Action) → opens a sales-app-identical dialog (CropIssueDialog port).
- Code: `src/components/retailer/utility/*` plus cropsSlice crop endpoints (ko-sales).
- The cart hands off to the Push to Cart tab through a two-phase seed: crop-cart items are removed only after Push to Cart reports which lines it kept.
- Parity check: 127k checks against sales-app on live data, 0 mismatches. One intended difference: an empty district calendar falls back to the state calendar.

**Why:** he reviews on 8080; work on another branch is invisible to him.
**How to apply:** for rlm-portal UI work, first check which branch the main checkout and :8080 are on (`git branch --show-current` in rlm-portal) and land changes on that branch, after checking no other session has uncommitted work there.
- Moving the work onto `nitesh-announcements-alpha` folds it into that branch's PR #111 (announcements → aws-v2) when it is pushed.

Related: [[deploy-branch-pr-reapply]], [[rlm-pc-certificate-chip]]
