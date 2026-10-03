---
name: rlm-portal-deployed-branch-aws-v2
description: "rlm-portal's deployed (AWS) branch is aws-v2, not aws-deployed — base hotfix branches and PRs on origin/aws-v2"
metadata:
  node_type: memory
  type: project
  originSessionId: de161064-7692-4136-919f-6454432a5db0
  modified: 2026-10-03T09:01:45.296Z
---

For `rlm-portal`, the branch that is actually deployed is **`aws-v2`**. `aws-deployed` is an older branch (tip was from 2026-07-19, ~214 commits behind aws-v2) and `aws-deplpyed` is an even older typo branch.

**Why:** On 2026-10-03 the user first said "aws-dpeloyed se branch banao", I branched from `origin/aws-deployed` and the PR (#88) got merged there; the user then corrected: "deployed brnach was aws-v2 to aap isae base rkahi". The work had to be redone on aws-v2.

**How to apply:** When the user asks for a fix "on the deployed branch" in rlm-portal, branch from `origin/aws-v2` and target PRs at `aws-v2`. If they name `aws-deployed`, confirm once that they do not mean `aws-v2`. Branch naming seen in the repo: `nitesh-<topic>-aws-v2`.

Related: [[git-footprint-nitesh-2025-only]]
