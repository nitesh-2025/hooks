---
name: deploy-branch-pr-reapply
description: PR for a deploy branch (aws-v2 etc.) = fresh branch from it with the same changes re-applied file by file; never cherry-pick + resolve conflicts; gh not logged in → open prefilled compare URL
metadata:
  node_type: memory
  type: feedback
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-17T06:48:11.323Z
---

When Darshan asks for a PR into a deploy branch (e.g. rlm-portal `aws-v2`), cut a NEW branch from `origin/<deploy-branch>` and re-apply the same change there.
- Files identical to the original base: write them from the source commit (`git show <sha>:<file> > <file>`).
- Files that differ on the deploy branch: apply the same edits by hand.
- Verify each file's added/removed lines equal the source commit, then run tsc against the deploy-branch baseline and a build.

**Why:** 2026-10-17 he stopped a `git cherry-pick` mid-way: "configlict resolve mat karo aws-v2 se ek naya branch nikal lo … same change usme karo". He also asked for 10 parallel agents to make it fast.

**How to apply:**
- Never open a PR from `alpha` straight into `aws-v2`; it drags unrelated alpha commits along.
- `gh` is not logged in on this machine. Push the branch, then open `https://github.com/Katyayani-Organics/<repo>/compare/<base>...<branch>?expand=1&title=…&body=…` with Start-Process; he clicks Create.
- If he asks for N agents, give each agent its own files. Agents must never run state-changing git commands; I stage, verify and commit myself.

Related: [[rlm-pc-certificate-chip]], [[wallet-history-trnastion-hist]]
