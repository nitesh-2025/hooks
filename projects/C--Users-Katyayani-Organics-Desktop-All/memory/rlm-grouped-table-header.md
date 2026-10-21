---
name: rlm-grouped-table-header
description: "2026-10-21 two-row grouped header on Team + My Retailers, branch multiple-label-table-design pushed as abbf4c4 (redesign worktree, no PR); Darshan's design choices and the pin rewrite"
metadata:
  node_type: memory
  type: project
  originSessionId: 508f4ada-cf8c-4897-8d9f-5447ac679d9c
  modified: 2026-10-21T12:29:24.447Z
---

Branch `multiple-label-table-design` was cut from `nitesh-announcements` 0061b8c in the `redesign` worktree, so :8081 serves it. Pushed 2026-10-21 as one commit abbf4c4, tracking origin; no PR opened, not deployed.

**What was built:**
- New `GroupedHeaderRow` with `groupedHeader.ts`, plus `columnPins.ts`. The pin rewrite orders cells by `data-col`; the old `data-orig-idx` logic misaligned body rows after a page change.
- `ColumnDef.group` added; the column menu shows group headings.

**Darshan's choices:**
- Group order: Retailer → Calls → Status & Stage → RPS Score (standalone) → Ownership → Sales → KYC & Profiling.
- On My Retailers, Ownership goes last.
- Profile Score sits in KYC & Profiling.
- Parent label is centred. "Clean merged band" style: no lines inside a parent cell; lines between groups run full height.
- S.N, Actions and RPS Score labels are centred across both rows.
- All column lines are the same light colour. No stronger group-edge lines (he rejected them).
- Actions column unchanged.

**Why:** he went through several rounds ("border same rakho", "upar tak border", "accha nahi lag raha"). When screenshots alone are not settling it, offer AskUserQuestion with ASCII previews.

**How to apply:**
- The header line colour is `border/0.7`, because `border/0.4` disappears on `bg-muted`.
- Check designs with the real-component harness: a page on :8090 that imports modules from the :8081 dev server, because the Chrome extension was not connected. The harness lives in the scratchpad.

Related: [[rlm-code-on-nitesh-announcements]], [[rlm-retailer-status-vip]].
