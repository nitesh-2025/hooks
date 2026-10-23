---
name: pr-conflicts-new-branch
description: "Resolving a PR's conflicts = new branch + new PR; never push/merge into the PR's original head branch"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0ddaf111-a09f-4dae-be34-c47f0abb324f
  modified: 2026-10-23T07:09:13.752Z
---

When Darshan asks to resolve a PR's conflicts, never commit or push onto the PR's own head branch. Cut a NEW branch from the head, merge the base in there, push it and open a new PR from it; the original head branch keeps exactly the code it had.

**Why:** 2026-10-23 verification PR #46 (fork nitesh-2025/beta-retailer-verification-portel, head Katyayani-Organics:fix/unprofiled-lead-profile-locked → nitesh-aws-v4): I pushed the merge resolution onto the head branch; he objected ("is branch ko kyu update kiya… original code lao, new branch banao, PR banao"). I force-restored it to 82ff88f, but PR #46 had already been merged with the resolved head.

**How to apply:** same idea as [[deploy-branch-pr-reapply]] — leave the source branch untouched. Ask before force-pushing anything. Check PR state (`gh pr view --json state`) before and after, since he may merge while I work.
