---
name: glass-neon-terminal-setup
description: "Where the user's custom \"Glass Neon\" terminal theme lives (Windows Terminal + PowerShell + WSL Ubuntu) and its known quirks"
metadata:
  node_type: memory
  type: reference
  originSessionId: f155fdfc-c259-4e96-8e91-0c72958f2973
  modified: 2026-09-29T09:02:06.669Z
---

On 2026-09-29 a custom "Glass Neon" terminal look was set up (glassmorphism + aurora background + powerline prompt + coloured file listings), matched to a reference image the user supplied.

Files:
- Windows Terminal: `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json` — scheme `Glass Neon`, theme `Glass`, `profiles.defaults` (acrylic, opacity 70, background image `glass-aurora.png` in the same folder). Original backup: `settings.backup-2026-09-29.json`.
- PowerShell 5.1: `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` + `GlassNeon.format.ps1xml` (coloured `ls`).
- WSL Ubuntu (user `niteshkumar`): `~/.glass-prompt.sh` sourced from a marked block at the end of `~/.bashrc`; `~/.tmux.conf` for the bottom status bar (alias `glass`). Backup: `~/.bashrc.backup-2026-09-29`.

Quirks worth knowing before editing:
- Ubuntu's `ls` is uutils (Rust) coreutils: an `fi=` rule in `LS_COLORS` overrides extension rules, so the catch-all is `*=` placed first.
- `wsl.exe -- bash -c '...'` expands `$VARS` in the outer shell; run a script file instead.
- The PowerShell profile must stay pure ASCII (PS 5.1 reads BOM-less files as ANSI); glyphs are built with `[char]0xE0B0` etc.
- No Nerd Font is installed; powerline arrows come from Windows Terminal's built-in glyphs and the folder icon is an emoji.
