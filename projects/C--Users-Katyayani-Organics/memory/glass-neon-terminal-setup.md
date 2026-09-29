---
name: glass-neon-terminal-setup
description: "Where the user's custom \"Glass Neon\" terminal theme lives (Windows Terminal + PowerShell + WSL Ubuntu), how to roll it back, and its known quirks"
metadata:
  node_type: memory
  type: reference
  originSessionId: f155fdfc-c259-4e96-8e91-0c72958f2973
  modified: 2026-09-29T10:44:19.414Z
---

Built on 2026-09-29: dark glassmorphism terminal with a blue/purple/cyan gradient, powerline prompt, file icons, dashed divider between commands, and a DATABASE badge for database commands.

Rollback (dry run with `-WhatIf`, parts with `-Only Terminal|PowerShell|Ubuntu|Fonts`):
`C:\Users\Katyayani Organics\Documents\GlassNeon\rollback.ps1`

Files:
- Windows Terminal: `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json` — scheme `Glass Neon`, theme `Glass`, `profiles.defaults` (acrylic, opacity 90, `glass-gradient.png` at 0.3, font `CaskaydiaCove NF`, command marks, ctrl+up/down = scrollToMark). Original: `settings.backup-2026-09-29.json`.
- Font: 4 `CaskaydiaCoveNerdFont-*.ttf` installed per-user (`%LOCALAPPDATA%\Microsoft\Windows\Fonts` + HKCU font registry).
- PowerShell 5.1: `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` + `GlassNeon.format.ps1xml`. Skips itself for non-interactive `powershell -Command/-File`.
- WSL Ubuntu (user `niteshkumar`): `~/.glass-prompt.sh` (sourced from a marked block at the end of `~/.bashrc`), `~/.config/glass-neon/glass-neon.omp.json` (Oh My Posh theme), `~/.config/glass-neon/glass-db.sh` (DATABASE badge), `~/.tmux.conf` (status bar, alias `glass`), `~/.local/bin/oh-my-posh` 31.4.0 and `~/.local/bin/eza` 0.23.5. Original bashrc: `~/.bashrc.backup-2026-09-29`.

Design decisions the user asked for or accepted — keep them when editing:
- The glass must be DARK (opacity 78 looked grey over light windows).
- Prompt line is only `user@host  path  $`; git status sits on the left of the divider line, language version / exit code / clock on the right, so commands never wrap.
- Red = error only, yellow = changed only. File types use blue/cyan/purple/orange/slate.
- `ls` / `ll` are functions: eza only for a plain on-screen listing of readable, existing paths; anything else goes to the real `ls`.

Quirks worth knowing before editing:
- Ubuntu's `ls` is uutils (Rust) coreutils: an `fi=` rule in `LS_COLORS` overrides extension rules, so the catch-all is `*=` placed first.
- `wsl.exe -- bash -c '...'` expands `$VARS` in the outer shell; run a script file instead. The harness also misreads `rm` inside such a command line as PowerShell `Remove-Item`.
- The PowerShell profile must stay pure ASCII (PS 5.1 reads BOM-less files as ANSI); glyphs are built with `[char]0xE0B0` etc.
- This PSReadLine has a default `AddToHistoryHandler` (password filter); ours chains to it. PSReadLine re-runs `prompt` after Enter, so state must not be reset there.
- `$(...)` in PS0 drops a trailing newline; PS0 must not contain `\[ \]` (they print as 0x01/0x02).
- Oh My Posh segment `cache` must not hold anything that changes with the environment (venv name).
- Shells already open keep the old prompt until `source ~/.bashrc`; settings.json changes apply live.
- No sudo without password on this WSL: apt installs are the user's to run. `psql`, `mongosh`, `sqlite3`, `redis-cli`, `python3-venv` are not installed.

See also [[test-isolation-for-shell-work]] and [[no-screen-area-screenshots]].
