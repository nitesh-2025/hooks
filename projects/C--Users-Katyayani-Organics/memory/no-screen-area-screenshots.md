---
name: no-screen-area-screenshots
description: Never verify a window by capturing a screen region or the foreground window; capture the specific window by handle instead
metadata:
  node_type: memory
  type: feedback
  originSessionId: f155fdfc-c259-4e96-8e91-0c72958f2973
  modified: 2026-09-29T09:32:18.027Z
---

When a visual check of a desktop window is needed, do not use `CopyFromScreen` on a window's rectangle or on the foreground window. Find the exact window (class + title) and use `PrintWindow` with flag 2, which draws only that window.

**Why:** On 2026-09-29, while checking the [[glass-neon-terminal-setup]], a screen-region capture picked up the user's VS Code and then their Slack (colleague names, a DM) because those were on top of the terminal while the user kept working. The files were deleted unread-for-purpose, but it should not have happened.

**How to apply:** The user works on multiple monitors and keeps using the machine while tasks run, so the foreground window is not predictable. `PrintWindow` does not show acrylic see-through, so say plainly that the blur itself was not verified.
