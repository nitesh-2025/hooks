---
name: rlm-utility-tab-branch
description: "rlm-portal Retailer Details \"Utility\" tab (Sales B2B Crop & Product Suggestion port) lives on branch nitesh-announcements-alpha — the branch localhost:8080 runs — per Darshan 2026-10-17"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-19T06:49:46.942Z
---

> **SUPERSEDED 2026-10-19:** never mirror to -alpha any more — see [[rlm-code-on-nitesh-announcements]].

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

State 2026-10-19: on nitesh-announcements-alpha (main checkout, :8080), not pushed.
- Commits: 2152855 (feature), b71a190 (fixes from the 10-agent review), c4aa3f4 (toast text).
- Built from branch nitesh-utility-crop-suggestion; its worktree is .claude/worktrees/utility-ann.
- The old branch nitesh-crop-product-suggestion is superseded.
- Verified: parity 137,241 checks with 0 fails; resolver 48/49 checks pass plus 13 new stop/abort checks (the 1 "fail" is the deliberate rule change: in-stock same-size beats an out-of-stock exact match); tsc output identical to the branch baseline; build ok; eslint clean.
- Not verified: logged-in API calls (ko-sales /crops/active, /bulks/enrich, /product-usp, Stockship /cases/product).
- PUSHED 2026-10-19: origin/nitesh-announcements-alpha de505b7..d8a4e64 (adds d8a4e64 phone-width labels fix). It is now part of PR #111 → aws-v2; not deployed.
- 2026-10-19, also on the aws-v2-based branch (Darshan: "nitesh-announcements is the latest"): pushed origin/nitesh-announcements c21c02e..f29db77.
  - The 11 utility, PushToCartTab and cropsSlice files are identical to the alpha side.
  - RetailerDetail gets only the Utility parts: that branch has its own ghost-measured tab-bar overflow, so the alpha tabsFit change is NOT applied.
  - Correction: PR #111's head ref is frozen at 32b8cc7 and is not on any branch tip, so PR #111 is probably closed and does NOT carry these commits. The live branches are nitesh-announcements (aws-v2 base) and nitesh-announcements-alpha (alpha base, :8080).
  - Keep both in step when adding to the announcements work.
- 2026-10-19 UI redesign (Darshan's CROP_PRODUCT_SUGGESTION_UI_REDESIGN_PROMPT.md; he said "code on nitesh-announcements, push to GitHub ONLY when I say"):
  - Commits: nitesh-announcements 1ade6df + 5f44663 (10-agent review round), in worktree .claude/worktrees/redesign. Same 7 files are on nitesh-announcements-alpha as 6cb8715.
  - Status: LOCAL ONLY, NOT PUSHED; wait for his explicit go before pushing either branch.
  - Darshan checks :8080, which runs -alpha, so he reported "not reflecting" until -alpha got the files.
  - Lesson: when told to code on nitesh-announcements, still mirror to -alpha so :8080 shows it.
  - Flow change: the cart finds products first ("N ready") and hands off only on "Go to Push to Cart".
  - Left open: shared shadcn dialog.tsx Close X size and reduced motion (app-wide, not touched); Problems tab search does not auto-expand groups (as before).
  - Later the same day, at Darshan's asks:
    - Removed the step indicator ("ye mat dikhao"): 1fc22bf / -alpha 6455f99.
    - Readable sizing pass ("too small, ganda"): 14px body, 40px controls; f5d2815 / e92a32d.
    - Crop logo SVG (CropLogo.tsx) plus real in-season crop photos on the Utility card ("logo or image"), and the review round: 120ffb8 / a7a6ea3.
  - Darshan wants everything on nitesh-announcements; -alpha only mirrors it for :8080, and the utility files are identical on both.
  - PUSHED on Darshan's go, 2026-10-19: origin/nitesh-announcements f29db77..120ffb8.
  - -alpha commits (6cb8715, 6455f99, e92a32d, a7a6ea3) are still local, not pushed (he named only nitesh-announcements).
