---
name: sb-git-branch-and-main-merge
description: "sb and sf work on a dated branch (e.g. 2026-10-01) that is merged to main via GitHub PRs; Darshan asks to \"push to main\" — merge the dated branch into main and push both. ticket repo folder does not exist locally."
metadata:
  node_type: memory
  type: project
  originSessionId: 473ad943-3e19-48da-a903-078a93c68666
  modified: 2026-10-01T09:18:54.023Z
---

Both `node-backend` (sb) and `staffcore` (sf) repos live under github.com/Nitesh2-0 and work happens on a dated branch (`2026-10-01` on 2026-10-01), which is then merged to `main` through a PR (sb PR #25, sf PR #18). Darshan's instruction on 2026-10-01: "saara code main par push kar do".

**Why:** `git branch --show-current` is NOT main, so committing on the current branch alone does not land on main; and `origin/main` can carry small direct commits (sf README header fixes) that must be merged first.

**How to apply:** Commit on the dated branch, push it, then `checkout main`, `pull`, `merge <dated-branch>`, resolve (README.md is the usual conflict), push main, and switch back. Never force-push. The `ticket` project folder listed in the project CLAUDE.md does not exist under `all-demo` (checked 2026-10-01), so ticket-frontend changes (e.g. its permissions catalog mirroring `seed-ticket-permissions.ts`) cannot be made here — say so. Related: [[sb-swagger-json-additive-splice]], [[sb-ticket-keys-govern-department-hierarchy-reads]].
