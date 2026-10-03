---
name: git-footprint-nitesh-2025-only
description: "Commits, pushes and PRs must carry only the nitesh-2025 GitHub footprint — no Claude co-author/attribution, no PRs from the vardhman-katyayani browser session"
metadata:
  node_type: memory
  type: feedback
  originSessionId: de161064-7692-4136-919f-6454432a5db0
  modified: 2026-10-03T09:01:45.256Z
---

Commits, pushes and PRs in the Katyayani-Organics repos must show only **nitesh-2025** as the footprint.

User's words (2026-10-03, rlm-portal, after I committed with a `Co-Authored-By: Claude` trailer and opened PR #88 through Chrome, which is logged in as `vardhman-katyayani`): "but foot pinit nitesh ka rahega" / "nitesh-2025 ka" / "in sareo me".

**Why:** GitHub showed the commit as "nitesh-2025 and claude committed" and the PR as opened by `vardhman-katyayani`. The user wants everything attributed to nitesh-2025 alone. (My interpretation: "footprint" covers commit author, co-author trailers, PR author and PR body attribution.)

**How to apply:**
- Do not add `Co-Authored-By: Claude …` to commit messages, and do not add the "Generated with Claude Code" line to PR bodies. This overrides the default attribution reminder.
- Git identity on this machine is `Nitesh Kumar` and the Git Credential Manager account is `nitesh-2025`, so plain `git commit` / `git push` already carry the right footprint.
- `gh` CLI is not logged in, and the Chrome GitHub session is `vardhman-katyayani` — a PR created through the browser gets the wrong author. Do not open PRs that way; hand over a prefilled compare link for nitesh-2025 to click, or ask the user to run `gh auth login` as nitesh-2025 first.

Related: [[rlm-portal-deployed-branch-aws-v2]]
