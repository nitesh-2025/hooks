---
name: sf-mail-thread-display-rules
description: "sf Mail — every message in a thread opens expanded, and all replies share one surface (white light / #18233F dark)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 28143910-ef6d-4c3d-98eb-90bcafe662e5
  modified: 2026-09-22T06:30:41.823Z
---

Two standing rules for the Mail reading pane in `sf`, set by Darshan on 2026-09-22:

1. **Every message in a thread renders expanded by default.** Collapsing is manual only (the header is still a toggle, plus a Collapse all item). Do not reintroduce "only the newest and the unread ones open".
2. **All replies / thread messages share ONE surface**: `#FFFFFF` in light mode, `#18233F` in dark mode (`--mail-msg-surface`), on a `#F8FAFC` / `#060B14` pane. No green tint on sent messages.

**Why:** a thread is read, not audited — folding it cost the reader the content they came for; and the old green "sent" tint collided with the green selected-row state that is on screen at the same time.

**How to apply:** authorship is carried by the solid brand avatar and the "You" chip, never by the card fill. Related: [[sf-mail-is-personal]].
