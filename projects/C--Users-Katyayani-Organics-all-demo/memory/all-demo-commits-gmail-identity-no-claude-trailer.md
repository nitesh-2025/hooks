---
name: all-demo-commits-gmail-identity-no-claude-trailer
description: sb/sf/ticket commits go out as Nitesh Kumar <niteshkumar61725@gmail.com> with no Claude co-author or session lines and no Katyayani text; history was rewritten 2026-10-03.
metadata:
  node_type: memory
  type: feedback
  originSessionId: b5e1730b-bed4-4955-8062-576a34ac27c3
  modified: 2026-10-03T07:04:29.754Z
---

In the all-demo repos (sb `node-backend`, sf `staffcore`, ticket `ticket-stocklogy-frontendQ`, all under github.com/Nitesh2-0) the user wants commits to carry only their personal identity `Nitesh Kumar <niteshkumar61725@gmail.com>` (GitHub account Nitesh2-0, "original main hai"). On 2026-10-03 they had every `Co-Authored-By: Claude …` / `Claude-Session: …` line and the company email `niteshkumar@katyayaniorganics.com` (GitHub account nitesh-2025) stripped from the full history of all three repos, and "Katyayani" text replaced in files (brand in code is "Stockology").

**Why:** They do not want these repos to show up as contributions on the company-linked `nitesh-2025` profile, and do not want Claude attribution on the commits.

**How to apply:** Do not add `Co-Authored-By: Claude` or `Claude-Session` lines to commit messages or PR bodies in these repos (my inference from the history request — they did not state a rule for future commits in so many words). All three repos have repo-local `user.name`/`user.email` set to the gmail identity; the global git config still holds the company email for company repos, so confirm `git config user.email` before committing in any new clone. Do not write "Katyayani" into docs examples or placeholders — use `example.com` / "Support Team" / "Stockology". Every commit SHA from before 2026-10-03 changed in the rewrite, so SHAs quoted in older notes (e.g. in [[sb-git-branch-and-main-merge]]) no longer exist — find commits by subject instead. A force-push is blocked by Claude Code's auto mode; it only went through after the user left auto mode and approved it.
