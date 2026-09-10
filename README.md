# hooks

Backup of Claude Code global instructions, memory and hooks for **Mr. Nitesh β**.

| Path | What |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Global instructions (identity, role, skills, project aliases) |
| [`skills/projects/SKILL.md`](skills/projects/SKILL.md) | Project aliases skill — paths, stack, branch, npm scripts |
| [`projects/.../memory/`](projects/C--Users-Katyayani-Organics-Desktop-All/memory) | Persistent memory files (`MEMORY.md` index + one file per fact) |
| [`skills/nitesh-bug-fix/SKILL.md`](skills/nitesh-bug-fix/SKILL.md) | Standard bug-fix workflow (root cause → smallest fix → build/tests → diff review → report) |
| [`skills/nitesh-tester/SKILL.md`](skills/nitesh-tester/SKILL.md) | Professional QA & regression testing (expected vs actual → full flow → edge cases → PASS / FAIL / BLOCKED report) |
| [`skills/nitesh-feature-dev/SKILL.md`](skills/nitesh-feature-dev/SKILL.md) | Senior feature development (understand → inspect → design → smallest complete change → build → self-test → DEVELOPMENT REPORT → handoff to tester) |
| [`skills/nitesh-dev-workflow/SKILL.md`](skills/nitesh-dev-workflow/SKILL.md) | Full lifecycle: feature dev → feature QA → bug-fix loop → re-test → general regression → final release gate + WORKFLOW REPORT |
| [`commands/nitesh-test.md`](commands/nitesh-test.md) | `/nitesh-test [path or alias]` — find and run the project's tests, explain failures, summarize pass/fail/time |
| [`hooks/memory-backup.sh`](hooks/memory-backup.sh) | Stop hook that auto-commits and pushes changes here |
| [`hooks/skill-reminders.js`](hooks/skill-reminders.js) | UserPromptSubmit hook — bug/error prompts → `nitesh-bug-fix`, test/QA/regression prompts → `nitesh-tester`, feature/"banao" prompts → `nitesh-feature-dev`, workflow/production-ready prompts → `nitesh-dev-workflow` |

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
