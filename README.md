# hooks

Backup of Claude Code global instructions, memory and hooks for **Mr. Nitesh β**.

| Path | What |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Global instructions (identity, role, skills, project aliases) |
| [`skills/projects/SKILL.md`](skills/projects/SKILL.md) | Project aliases skill — paths, stack, branch, npm scripts |
| [`projects/.../memory/`](projects/C--Users-Katyayani-Organics-Desktop-All/memory) | Persistent memory files (`MEMORY.md` index + one file per fact) |
| [`skills/nitesh-bug-fix/SKILL.md`](skills/nitesh-bug-fix/SKILL.md) | Standard bug-fix workflow (root cause → smallest fix → build/tests → diff review → report) |
| [`hooks/memory-backup.sh`](hooks/memory-backup.sh) | Stop hook that auto-commits and pushes changes here |
| [`hooks/bug-fix-reminder.js`](hooks/bug-fix-reminder.js) | UserPromptSubmit hook — on bug/error prompts, reminds Claude to use `nitesh-bug-fix` |

Note: the `projects/` folder is Claude Code's memory store (named after the workspace path) — it does **not** contain project source code. The code lives in each repo under the Katyayani-Organics org.

## Project aliases

| Alias | Project folder |
|---|---|
| pos | `franchise-pos` |
| ko | `ko-sales-backend` |
| nest | `rlm-backend-nest` |
| rlm | `rlm-portal` |
| rlm-admin | `rlm-admin-final` |
| b2b | `sales-app` |

Lives at `~/.claude` on the machine. Session transcripts, settings and credentials are excluded by `.gitignore`.

## Restore on a new machine
```bash
cd ~/.claude
git init -b main
git remote add origin https://github.com/nitesh-2025/hooks.git
git fetch origin && git checkout -f main
```
Then add the Stop hook to `~/.claude/settings.json`:
```json
{
  "hooks": {
    "Stop": [{ "hooks": [{ "type": "command", "command": "bash \"$HOME/.claude/hooks/memory-backup.sh\" >/dev/null 2>&1 || true", "async": true }] }]
  }
}
```
