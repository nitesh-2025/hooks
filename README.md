# hooks

Backup of Claude Code global instructions, memory and hooks for **Mr. Nitesh β**.

| Path | What |
|---|---|
| `CLAUDE.md` | Global instructions (identity, role, skills, projects) |
| `projects/*/memory/` | Persistent memory files (`MEMORY.md` index + one file per fact) |
| `hooks/memory-backup.sh` | Stop hook that auto-commits and pushes changes here |

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
