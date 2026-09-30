---
name: glass-neon-terminal-setup
description: "Where the user's custom terminal theme lives (Windows Terminal + PowerShell + WSL Ubuntu), its current calm single-accent palette (since 2026-09-30, replacing the neon glass look), how to roll it back, and its known quirks"
metadata:
  node_type: memory
  type: reference
  originSessionId: f155fdfc-c259-4e96-8e91-0c72958f2973
  modified: 2026-09-30T04:53:40.606Z
---

Built on 2026-09-29 as "Glass Neon" (dark glass, blue/purple/cyan gradient). On 2026-09-30 the user replaced the look with a calm single-accent palette ("premium Ubuntu developer terminal, not neon / gaming / colourful database IDE"). The file names and folders still say `glass` / `GlassNeon`; only the colours changed, the prompt structure stayed.

Current palette — keep it when editing, do not reintroduce other hues:
- Background `#111827` uniform (no acrylic, no background image, no gradient, opacity 100). Neutral surface for pills/tabs `#1F2937`.
- Text `#D1D5DB`, secondary `#9CA3AF`, dim (dividers, table borders) `#6B7280`, brightest `#F9FAFB`.
- ONE accent `#7DD3A8` (soft green): prompts, success, directories, important elements.
- Error `#F87171` only for real errors. Amber `#D6C08A` only for real warnings / git dirty / the DESTRUCTIVE badge.
- Cursor `#E5E7EB`, selection `#374151` with `#F9FAFB` text.
- Font `JetBrains Mono, CaskaydiaCove NF, Ubuntu Mono` (the fallback supplies powerline/icon glyphs), size 11, cellHeight 1.5, padding `12, 10`.
- Typed commands and all syntax colouring are plain `#D1D5DB`; hierarchy comes from brightness and the one green, not from hues.

Rollback (dry run with `-WhatIf`, parts with `-Only Terminal|PowerShell|Ubuntu|Fonts`):
`C:\Users\Katyayani Organics\Documents\GlassNeon\rollback.ps1` — removes the whole custom theme (back to stock). To go back only to the neon look, restore from `Documents\GlassNeon\backup-clean-2026-09-30\` (Windows files) and `~/.config/glass-neon/previous-clean-0930/` (WSL files).

Files:
- Windows Terminal: `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json` — scheme `Clean Green`, theme `Clean`, `profiles.defaults`. The old `Glass Neon` scheme and `Glass` theme are still in the file, unused. Command marks, ctrl+up/down = scrollToMark. Original stock file: `settings.backup-2026-09-29.json`.
- Fonts, per-user (`%LOCALAPPDATA%\Microsoft\Windows\Fonts` + HKCU font registry): 4 `CaskaydiaCoveNerdFont-*.ttf` and 4 `JetBrainsMono-*.ttf` (v2.304, plain build without Nerd glyphs).
- PowerShell 5.1: `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` + `GlassNeon.format.ps1xml`. Skips itself for non-interactive `powershell -Command/-File`. The file listing uses ANSI slots 32/39/34 (not 24-bit), so its colours come from the `Clean Green` scheme: 24-bit codes made PS 5.1's table formatter wrap names early.
- WSL Ubuntu (user `niteshkumar`): `~/.glass-prompt.sh` (sourced from a marked block at the end of `~/.bashrc`), `~/.config/glass-neon/glass-neon.omp.json` (Oh My Posh theme, 7-entry palette), `~/.config/glass-neon/glass-db.sh` (DATABASE badge), `~/.tmux.conf` (status bar, alias `glass`), `~/.local/bin/oh-my-posh` 31.4.0 and `~/.local/bin/eza` 0.23.5. Original bashrc: `~/.bashrc.backup-2026-09-29`.

Design decisions the user asked for or accepted — keep them when editing:
- Prompt line is only `user@host  path  $`; git status sits on the left of the divider line, language version / exit code / clock on the right, so commands never wrap.
- Red = error only, amber = changed/warning only.
- `ls` / `ll` are functions: eza only for a plain on-screen listing of readable, existing paths; anything else goes to the real `ls`. Directories accent, files primary, metadata secondary, broken links red; no per-file-type colours, and Ubuntu's `dircolors` defaults are not loaded.

Quirks worth knowing before editing:
- Ubuntu's `ls` is uutils (Rust) coreutils: an `fi=` rule in `LS_COLORS` overrides extension rules, so the catch-all is `*=` placed first.
- `wsl.exe -- bash -c '...'` expands `$VARS` in the outer shell; run a script file instead (`wsl.exe -d Ubuntu -- bash /mnt/c/.../x.sh`). The harness also misreads `rm` inside such a command line as PowerShell `Remove-Item`.
- The PowerShell profile must stay pure ASCII (PS 5.1 reads BOM-less files as ANSI); glyphs are built with `[char]0xE0B0` etc.
- This PSReadLine (2.0.0) has a default `AddToHistoryHandler` (password filter); ours chains to it. PSReadLine re-runs `prompt` after Enter, so state must not be reset there. 2.0.0 has no prediction colours.
- `$(...)` in PS0 drops a trailing newline; PS0 must not contain `\[ \]` (they print as 0x01/0x02).
- Oh My Posh segment `cache` must not hold anything that changes with the environment (venv name).
- Shells already open keep the old prompt until `source ~/.bashrc` / a new tab; settings.json changes apply live; a new font may need Windows Terminal restarted.
- No sudo without password on this WSL: apt installs are the user's to run. `psql`, `mongosh`, `sqlite3`, `redis-cli`, `python3-venv` are not installed.

See also [[glass-mysql-colours]], [[test-isolation-for-shell-work]] and [[no-screen-area-screenshots]].
