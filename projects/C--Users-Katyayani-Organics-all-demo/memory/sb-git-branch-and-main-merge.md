---
name: sb-git-branch-and-main-merge
description: "sb and sf work on a dated branch (e.g. 2026-10-01) that is merged to main via GitHub PRs; Darshan asks to \"push to main\" — merge the dated branch into main and push both. ticket frontend lives in all-demo/ticket-stocklogy-frontendQ (not `ticket`); local main can lag origin — fetch and reset before merging."
metadata:
  node_type: memory
  type: project
  originSessionId: 473ad943-3e19-48da-a903-078a93c68666
  modified: 2026-10-01T09:18:54.023Z
---

Both `node-backend` (sb) and `staffcore` (sf) repos live under github.com/Nitesh2-0 and work happens on a dated branch (`2026-10-01` on 2026-10-01), which is then merged to `main` through a PR (sb PR #25, sf PR #18). Darshan's instruction on 2026-10-01: "saara code main par push kar do".

**Why:** `git branch --show-current` is NOT main, so committing on the current branch alone does not land on main; and `origin/main` can carry small direct commits (sf README header fixes) that must be merged first.

**How to apply:** Commit on the dated branch, push it, then `checkout main`, `pull`, `merge <dated-branch>`, resolve (README.md is the usual conflict), push main, and switch back. Never force-push. The ticket frontend is the folder `all-demo/ticket-stocklogy-frontendQ` (the `ticket` alias path in CLAUDE.md is stale; found 2026-10-01). Its local `main` had drifted 6 commits behind `origin/main` with a stale `nitesh-mailboxes` checkout, so always `git fetch` + `reset --hard origin/main` on main before branching or merging there. Ticket main already carries a per-user `allowed_devices` allow-list (utils/device.js, ProtectedRoute, DeviceBlocked); device gating goes through it, not a separate global gate. The 2026-10-01 desktop-site hardening is on main (commit 6a748d3). Related: [[sb-swagger-json-additive-splice]], [[sb-ticket-keys-govern-department-hierarchy-reads]].
