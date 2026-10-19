---
name: rlm-code-on-nitesh-announcements
description: "Darshan 2026-10-19 — rlm-portal code goes on nitesh-announcements ONLY, never on nitesh-announcements-alpha (supersedes the old \"mirror to -alpha / land on the :8080 branch\" rule)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-19T08:09:17.077Z
---

Darshan's rule (2026-10-19, repeated firmly): **"nitesh-announcements-alpha is branch me kabhi bhi code nahi karna hai — nitesh-announcements is branch me code karna hai, yaad rakho."**

- All rlm-portal work goes on **`nitesh-announcements`**, in worktree `rlm-portal/.claude/worktrees/redesign`.
- **Never** commit to, copy files into, or "mirror" onto `nitesh-announcements-alpha`.
  - That branch is checked out in the main checkout, and :8080 serves it.
  - This replaces the older lesson in [[rlm-utility-tab-branch]] ("mirror to -alpha so :8080 shows it"). That lesson is now WRONG.
- **To let him see work:** run a separate dev server for `nitesh-announcements` (e.g. **:8081**) with an untracked `vite.preview.config.ts` that sets port 8081, strictPort and its own cacheDir, plus a copied, git-ignored `.env.local`.
  - Never commit `vite.preview.config.ts`.
  - :8081 is another origin, so he must log in there once.
  - Do not switch the main checkout's branch without asking: another session keeps uncommitted `Dashboard.tsx` there.
- Pushes still only on his explicit say-so.

**Why:**
- He keeps `-alpha` off-limits.
- On 2026-10-19 the Skill Matrix was copied into `-alpha` uncommitted; it was undone at once.
- Earlier Utility mirrors (6cb8715, 6455f99, e92a32d, a7a6ea3) are local `-alpha` commits, not pushed. Ask him before removing them.

**How to apply:** before any rlm-portal edit, check the branch is `nitesh-announcements` (or a branch he named that is cut from it, like `skills-matrix`). If he says ":8080 doesn't show it", explain that :8080 runs `-alpha` and offer :8081. Never copy work to `-alpha`.
