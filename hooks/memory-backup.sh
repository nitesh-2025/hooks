#!/usr/bin/env bash
# Stop hook: auto-backup CLAUDE.md + memory files (~/.claude git repo) to GitHub.
# Only whitelisted files are tracked (see ~/.claude/.gitignore).
cd "$HOME/.claude" || exit 0

git add -A
if ! git diff --cached --quiet; then
  git commit -q -m "Auto-backup memory $(date '+%Y-%m-%d %H:%M')"
fi

# Push only once a remote exists and there is something new to send
git remote get-url origin >/dev/null 2>&1 || exit 0
if ! git rev-parse --verify -q origin/main >/dev/null || [ -n "$(git log origin/main..main --oneline)" ]; then
  git push -q -u origin main
fi
