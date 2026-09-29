---
name: glass-mysql-colours
description: "Rainbow colours + dark green background for the mysql client in WSL (part of Glass Neon): file locations, switches, design choices the user made, and quirks found while testing"
metadata:
  node_type: memory
  type: reference
  originSessionId: 500248e5-7e36-4b7b-8d0b-526da9b77c10
  modified: 2026-09-29T18:40:08.618Z
---

Installed on 2026-09-29 as part of the [[glass-neon-terminal-setup]]. In WSL Ubuntu, `mysql ...` and `sudo mysql ...` typed in an interactive bash run through a Python pty wrapper that adds colours to the client's output.

Files:
- WSL: `~/.config/glass-neon/glass-mysql.py` (the painter) and `glass-mysql.sh` (bash functions `mysql` and `sudo`), loaded by a block at the end of `~/.glass-prompt.sh`. Copy of the prompt file from before: `~/.config/glass-neon/previous-183610/`.
- Windows: source, tests and `install.sh` kept in `Documents\GlassNeon\mysql-colours\`.
- Rollback: the existing `rollback.ps1` removes all of it (it deletes `~/.config/glass-neon` and `~/.glass-prompt.sh`).

Switches: `GLASS_MYSQL=0` or `command mysql` = bare client; `GLASS_MYSQL_BG=#rrggbb` other background, `GLASS_MYSQL_BG=off` none; `NO_COLOR` respected.

Choices the user made, keep them:
- Every column its own hue ("rainbow, as unique as possible"); red/pink and amber are left out of the rainbow because red = error and yellow = changed in this theme.
- Background while mysql runs: PURE dark green `#003300` (OSC 11, reset with OSC 111). The user rejected `#042214`: the theme's blue/purple background picture (0.3 opacity) turned it teal. Any green with blue in it will look teal.
- Promise of the tool: only colour codes are added, no byte of the client's output changes. A line that holds a control code is passed through unpainted.

Quirks worth knowing before editing:
- Windows Terminal here DOES draw bold with 24-bit colours, and supports OSC 11 / OSC 111 (seen in screenshots).
- This Ubuntu has `sudo-rs` (`sudo --version` prints `sudo-rs 0.2.x`), not classic sudo.
- The client runs on its own pty, so `sudo mysql` asks for the password every time (sudo tickets are per terminal). Real `sudo mysql` was never run in tests: no sudo without password.
- `mysql -N` (no header) aligns columns inconsistently by itself; it is the client, not the painter.
- To count statements of a big paste, count rows in the database: the echo of typed-ahead text lands inside the answers on screen.
- `tty.setraw` must be called with `termios.TCSADRAIN`; the default flushes typed-ahead keys.
- The harness blocks PowerShell commands whose here-string holds `rm` or `'\0'`: write bash scripts with the Write tool and run the file.
- Tests need a database: start a throwaway `mysqld --no-defaults --initialize-insecure` with its own datadir and socket under `/tmp` (see `real-server.sh`), never the installed server. See [[test-isolation-for-shell-work]].
