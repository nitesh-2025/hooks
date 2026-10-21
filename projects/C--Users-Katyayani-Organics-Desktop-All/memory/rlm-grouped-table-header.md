---
name: rlm-grouped-table-header
description: "2026-10-21 two-row grouped header on Team + My Retailers, branch multiple-label-table-design pushed as abbf4c4 (redesign worktree, no PR); Darshan's design choices and the pin rewrite"
metadata:
  node_type: memory
  type: project
  originSessionId: 508f4ada-cf8c-4897-8d9f-5447ac679d9c
  modified: 2026-10-21T12:54:06.015Z
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
- The header line colour is `foreground/0.1`. `border/0.4` disappears on `bg-muted`, and `border/0.7` disappears on a tinted cell.
- Check designs with the real-component harness: a page on :8090 that imports modules from the :8081 dev server, because the Chrome extension was not connected. The harness lives in the scratchpad.

Related: [[rlm-code-on-nitesh-announcements]], [[rlm-retailer-status-vip]].

**Settings → Table headers playground (added after the push, not committed yet):**
- `src/lib/tableHeaderTheme.ts` holds the settings in localStorage key `rlm_portal_pref_table_header` and applies them to both tables:
  - Multi or single header (default multi).
  - Heading colour fill on or off.
  - One colour, or per group: separate heading and column-heading colours.
  - Heading and column-heading shade sliders.
  - Block order, set by drag and drop or ↑/↓. S.N and Actions stay first.
- The settings card is `src/components/settings/TableHeaderCard.tsx`.
- Darshan's rules for this:
  - Fill the cell, never an underline or border.
  - Column headings use a lighter shade of their group's colour.
  - The sorted column takes exactly its group heading's colour and shade (not darker), not the orange sort tint.
  - Light dividers must stay visible on a tinted cell. They are drawn as an inset box-shadow layer, because the tint hides the collapsed border.

**Extended to Events and Orders (2026-10-21, in progress after commit 7d66f6c):**
- Theme now keeps a block order per table (`blockOrder.retailers / events / orders`) in `HEADER_TABLES`. Events keeps Actions last; Orders has no S.N.
- Columns with no group can have their own colour (`columns[id]`). S.N and Actions are listed as fixed rows in Settings.
- Darshan's rules:
  - Every portal table looks like the Retailers one: same header, cells, borders, hover and pinned styles.
  - Orders order: Order ID (no group) → People (Customer, Agent) → Order (Date & Time, Source, Status) → Billing → Actions.
  - A column with no group must show as one tall cell. shadcn `TableHeader`'s `[&_tr]:border-b` cut it in two; the group row's `<tr>` now has `!border-b-0`.
- Done on the branch, not committed as of 2026-10-21 evening:
  - All 7 tables (Team/My Retailers, Events, Orders; Event Tracker `team-tracker/EventsTable.tsx`) follow one spec, `scratchpad UNIFORM_TABLE_SPEC.md`:
    - The table has the class `.grouped-table` and its inline CSS is scoped to it. Global `table …` rules drew lines inside date-picker calendars.
    - `stickyHeaderCss` draws the header lines as box-shadows: collapsed borders leave a see-through gap in a sticky header.
    - Header background is `bg-card`, header `z-30`.
    - Scroll box `max-h-[max(18rem,calc(100dvh-280px))]`.
    - One pagination footer inside the card, with numbered pages.
  - Settings has a Tabs navigator (Retailers / Events / Event Tracker / Orders), a colour selector under "One for all", and colours for ungrouped and fixed columns.
  - A sorted ungrouped column highlights its whole tall cell; a sorted grouped column highlights only its heading.
  - The Team Events Tracker 422 with `?unique=1` comes from the beta server, not the UI.
