---
name: searchable-dropdowns
description: "Darshan's standing UI rule — every dropdown/select in any project must be searchable (type-to-filter), not a plain scrolling list"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d958fe4b-bcc4-4fb0-bbdc-6ef15aa784b2
  modified: 2026-09-12T05:46:18.368Z
---

Every dropdown in any project must be **searchable** — a type-to-filter input inside the menu — not a plain scrolling option list. Stated as a blanket rule ("everywhere dropdown is, please keep them searchable"), so apply it to new dropdowns without being asked, and convert existing ones when touching that code.

**Why:** the portals run on long real-world option lists — countries, products/SKUs, customers, assignees, stages — where scrolling to find one entry is slow and error-prone. Search is the difference between a usable and an unusable picker at that length.

**How to apply:** in the shadcn projects (gf, pos, rlm, rlm-admin, b2b — see [[assistant-identity]] for the stack) build the picker as Popover + `Command` (cmdk) with `CommandInput`/`CommandEmpty`/`CommandItem`, rather than a bare `Select`/`SelectItem` list. Keep the trigger looking like the existing `SelectTrigger` so the change is invisible in the layout. A genuinely short, fixed list (2–4 options, e.g. Yes/No, a view toggle) can stay a plain Select.
