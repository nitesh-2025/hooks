---
name: all-demo-commits-gmail-identity-no-claude-trailer
description: sb/sf/ticket commits go out as Nitesh Kumar <niteshkumar61725@gmail.com> with no Claude co-author or session lines and no Katyayani text.
metadata:
  node_type: memory
  type: feedback
  originSessionId: b5e1730b-bed4-4955-8062-576a34ac27c3
  modified: 2026-10-03T06:52:32.694Z
---

In the all-demo repos (sb `node-backend`, sf `staffcore`, ticket `ticket-stocklogy-frontendQ`, all under github.com/Nitesh2-0) the user wants commits to carry only their personal identity `Nitesh Kumar <niteshkumar61725@gmail.com>` (GitHub account Nitesh2-0, "original main hai"). On 2026-10-03 they asked to strip every `Co-Authored-By: Claude …` / `Claude-Session: …` line and the company email `niteshkumar@katyayaniorganics.com` (GitHub account nitesh-2025) from the history, and to drop "Katyayani" text from files (brand in code is "Stockology").

**Why:** They do not want these repos to show up as contributions on the company-linked `nitesh-2025` profile, and do not want Claude attribution on the commits.

**How to apply:** Do not add `Co-Authored-By: Claude` or `Claude-Session` lines to commit messages or PR bodies in these repos (my inference from the history request — they did not state a rule for future commits in so many words). sb and sf have repo-local `user.name`/`user.email` set to the gmail identity since 2026-10-03; the global git config still holds the company email for company repos, so check `git config user.email` before committing in ticket. Do not write "Katyayani" into docs examples or placeholders — use `example.com` / "Support Team" / "Stockology". The history rewrite itself needs a force-push; Claude Code's auto-mode permission check denied it on 2026-10-03, so only run it when the user approves that push themselves. Related: [[sb-git-branch-and-main-merge]].
