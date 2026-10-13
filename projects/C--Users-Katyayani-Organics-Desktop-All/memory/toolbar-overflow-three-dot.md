---
name: toolbar-overflow-three-dot
description: Darshan rule 2026-10-13 — toolbars never wrap or run off-screen; overflow goes into a ⋮ at the end of the same row; Columns + Filters always in ⋮; card bg waves static and sized by value
metadata:
  node_type: memory
  type: feedback
  originSessionId: 98e51c78-0b81-4cc8-8f28-ef42718be40d
  modified: 2026-10-13T06:00:58.263Z
---

Toolbar / filter rows (rlm-portal, and any app UI):
- **One row at every width.** Never `flex-wrap` controls onto a second line and never let them run off-screen; whatever does not fit moves into a ⋮ (MoreVertical, outline icon button) at the END of that same row. "Keep full responsive with 3 dot properly."
- **Columns and Filters live inside the ⋮ by default, at every screen size.** Filter content (e.g. RPS slider) goes straight inside the ⋮ panel — no big expandable card under the row.
- The ⋮ belongs to the row whose controls it holds (status tabs ⋮ stays in the header row next to All Agents; filter ⋮ in the filter row). Darshan rejected moving the header ⋮ into the filter row.
- One refresh control only: the ↺ in the filter row does the data refetch; no separate header "Refresh" button.
- Shared building block: `src/components/common/OverflowToolbar.tsx` (measured fit, `menuOnly`, `priority`, `active` dot; items stay mounted invisible so e.g. ColumnVisibilityToggle still loads prefs — panel copy gets `syncPrefs={false}`).

Metric cards: decorative background waves (`src/components/common/TileWaves.tsx`) — **static** (Darshan disliked the breathing animation), height **by the card's value** vs the largest sibling card. Compact card height (px-4 py-2.5, "Coming Soon" inline with the label).

Date range: use the dashboard's `DateRangePresetPicker` (presets + range calendar) everywhere instead of ad-hoc calendar popovers.

**Why:** Darshan reviews on a smaller laptop screen; wrapped rows and off-screen buttons look broken, and he wants the same pattern on every page (events, retailers, …).
**How to apply:** any new or touched toolbar → OverflowToolbar; check narrow widths; never reintroduce wrapping. Related: [[searchable-dropdowns]], [[four-agent-review]], [[ui-copy-english]].
