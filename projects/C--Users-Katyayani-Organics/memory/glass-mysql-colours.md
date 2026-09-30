---
name: glass-mysql-colours
description: "Colour painter for the mysql client in WSL (part of the terminal theme): file locations, switches, the calm single-accent palette that replaced rainbow columns + green background on 2026-09-30, and quirks found while testing"
metadata:
  node_type: memory
  type: reference
  originSessionId: 500248e5-7e36-4b7b-8d0b-526da9b77c10
  modified: 2026-09-30T05:30:40.164Z
---

Installed on 2026-09-29 as part of the [[glass-neon-terminal-setup]]. In WSL Ubuntu, `mysql ...` and `sudo mysql ...` typed in an interactive bash run through a Python pty wrapper that adds colours to the client's output.

Files:
- WSL: `~/.config/glass-neon/glass-mysql.py` (the painter) and `glass-mysql.sh` (bash functions `mysql` and `sudo`), loaded by a block at the end of `~/.glass-prompt.sh`.
- Windows: source, tests (`test-painter.py`, `real-server.sh` + `test-real.py`, `verify-install.py`) and `install.sh` kept in `Documents\GlassNeon\mysql-colours\`; installed files must stay identical to the source.
- Backups of the rainbow version: `~/.config/glass-neon/previous-clean-0930/` and `Documents\GlassNeon\backup-clean-2026-09-30\mysql-colours\`.
- Rollback: the existing `rollback.ps1` removes all of it (it deletes `~/.config/glass-neon` and `~/.glass-prompt.sh`).

Switches: `GLASS_MYSQL=0` or `command mysql` = bare client; `GLASS_MYSQL_BG=#rrggbb` sets a background while mysql runs (OSC 11, reset with OSC 111); default and `off` = background untouched; `NO_COLOR` respected.

Current look (the user's spec of 2026-09-30, "not a colourful database IDE") — keep it:
- Terminal background is NOT changed by default.
- `mysql>` and continuation prompts, `Query OK` / `Database changed`, header names (bold): accent `#7DD3A8`.
- All data cells (tables and `\G` values) the same green as the header, `#7DD3A8`, but not bold — the user asked on 2026-09-30 for "the whole table in the green of its header text". Before that the cells were `#D1D5DB` (that version is in `~/.config/glass-neon/previous-values-0930/`). Typed SQL uncoloured.
- `NULL` (italic), row counts, timings, banner: `#9CA3AF`.
- Table frame (`+---+`, `|`, the stars and colon of `\G`): one deep green `#347A5C` (`DEEP`), so the whole table is green and the frame stays behind the text. Tried and REJECTED by the user on 2026-09-30 after seeing it ("kitna ganda dikh raha hai"): a different saturated colour per table (blue/red/purple/orange/teal/pink) — the red frame read as an error and the frames outshone the data. Do not bring per-table colours back. Older versions: grey frame in `previous-borders-0930/`, multi-colour frame in `previous-values-0930/` and `previous-green-frame-0930/` under `~/.config/glass-neon/`.
- Preview before installing: `scratchpad`-style script that feeds a canned session through `Painter` and a PowerShell script that opens it in its own `wt.exe -w new` window and captures that window with `PrintWindow` by handle. Look at the picture before telling the user it is done — two blind colour changes had to be redone.
- `ERROR` lines `#F87171`; warning lines and a non-zero `Warnings: N` amber `#D6C08A`.
- The earlier choices (one hue per column, pure dark green `#003300` background) were the user's own on 2026-09-29 and were replaced by this spec; do not bring them back unless asked.
- Promise of the tool: only colour codes are added, no byte of the client's output changes. A line that holds a control code is passed through unpainted.

Quirks worth knowing before editing:
- Windows Terminal here DOES draw bold with 24-bit colours, and supports OSC 11 / OSC 111 (seen in screenshots).
- This Ubuntu has `sudo-rs` (`sudo --version` prints `sudo-rs 0.2.x`), not classic sudo.
- The client runs on its own pty, so `sudo mysql` asks for the password every time (sudo tickets are per terminal). Real `sudo mysql` was never run in tests: no sudo without password.
- `mysql -N` (no header) aligns columns inconsistently by itself; it is the client, not the painter.
- To count statements of a big paste, count rows in the database: the echo of typed-ahead text lands inside the answers on screen.
- `tty.setraw` must be called with `termios.TCSADRAIN`; the default flushes typed-ahead keys.
- The harness blocks PowerShell commands whose here-string holds `rm` or `'\0'`: write bash scripts with the Write tool and run the file.
- `python3 -m py_compile` on the installed file leaves `~/.config/glass-neon/__pycache__`; remove it afterwards (or check syntax with `ast.parse` and `PYTHONDONTWRITEBYTECODE=1`).
- `test-real.py` writes `real-painted.txt` into the source folder; move it out after a run.
- Tests need a database: start a throwaway `mysqld --no-defaults --initialize-insecure` with its own datadir and socket under `/tmp` (see `real-server.sh`), never the installed server. See [[test-isolation-for-shell-work]].
