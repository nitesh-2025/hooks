---
name: memory-github-backup
description: "~/.claude (CLAUDE.md, memory, hooks) is a git repo backed up to the PUBLIC GitHub repo nitesh-2025/hooks via a Stop hook"
metadata: 
  node_type: memory
  type: reference
  originSessionId: aa3eb520-a894-4e35-9787-a0dc388c5000
  modified: 2026-09-10T10:03:03.689Z
---

`~/.claude` is a git repo (branch `main`) pushed to **https://github.com/nitesh-2025/hooks** — a **public** repo; the user explicitly approved public on 2026-09-10.

- Tracked (whitelist in `~/.claude/.gitignore`): `CLAUDE.md`, `README.md`, `hooks/`, `projects/*/memory/`. Sessions, `settings.json`, credentials are excluded.
- `hooks/memory-backup.sh` runs as an async Stop hook (in `~/.claude/settings.json`): commits any change and pushes.

**How to apply:** Anything written to memory or CLAUDE.md becomes public on GitHub — never store secrets, passwords, API keys, or customer data there. Related: [[assistant-identity]].
