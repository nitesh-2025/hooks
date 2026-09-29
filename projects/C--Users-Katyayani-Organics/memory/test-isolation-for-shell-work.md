---
name: test-isolation-for-shell-work
description: "Interactive shell tests must never write to the user's shell history or run in their real HOME; brief subagents the same way"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f155fdfc-c259-4e96-8e91-0c72958f2973
  modified: 2026-09-29T10:44:27.685Z
---

When driving an interactive shell for tests (tmux `send-keys`, `bash -i script`, interactive `powershell.exe`), isolate it:
- bash: `tmux -L <private-socket> new-session -e HISTFILE=/dev/null`, and for anything that reads config use a throwaway `HOME` (copy the files under test into it).
- PowerShell: start with `-NoExit -Command "Set-PSReadLineOption -HistorySaveStyle SaveNothing"`.
- Never run a script with `bash -i file.sh` in the real HOME: every line of the script lands in history.
- Put the same rules in the brief of every subagent that will test a shell.

**Why:** On 2026-09-29, while building the [[glass-neon-terminal-setup]], test sessions (mine and two review agents') appended about 310 lines to the user's `~/.bash_history`, including `mongosh --eval "db.users.deleteMany({})"` and `psql -c "DROP TABLE users"`, on a machine where the user had just installed mysql-server. Up-arrow / Ctrl+R could have recalled them. The file had to be cleaned by line ranges from a reviewed backup. PowerShell history got about 29 test lines too; the harness then refused permission to rewrite that file, so it was left for the user.

**How to apply:** Set up isolation before the first interactive test, not after. Afterwards, verify with a checksum that the history file did not change. If history was polluted anyway, back it up, show the user the classification, and remove only lines that are positively test lines.
