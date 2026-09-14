---
name: searchable-dropdowns
description: "Darshan's standing UI rule — any dropdown/select with MORE THAN 3 options must be searchable (type-to-filter); 3 or fewer may stay a plain Select"
metadata:
  node_type: memory
  type: feedback
  originSessionId: d958fe4b-bcc4-4fb0-bbdc-6ef15aa784b2
  modified: 2026-09-14T05:36:46.617Z
---

Any dropdown with **more than 3 options** must be **searchable**: a type-to-filter input inside the menu, not a plain scrolling list. A dropdown with 3 options or fewer may stay a plain Select. Refined on 2026-09-14 from the earlier blanket "every dropdown" wording to the exact threshold: "sare dropdown searchable rahega jisme 3 se jada item hai". Count the options as rendered, including an "All …" entry, and treat any list built from data (`.map()` over countries, agents, SKUs, stages) as over 3.

**Why:** the portals run on real option lists (countries, products/SKUs, customers, assignees, stages) where scrolling to find one entry is slow and error-prone. The user set the cut-off at 3 so tiny fixed choices (Yes/No, a two-way toggle) stay one click.

**How to apply:** apply without being asked to new dropdowns and convert existing ones when touching that code. In gf (global-connect-new) use the existing `src/components/ui/searchable-select.tsx` (`SearchableSelect`, Popover + cmdk `Command`), whose trigger matches `SelectTrigger` so the swap is invisible in layout. In the other shadcn projects (pos, rlm, rlm-admin, b2b; see [[assistant-identity]]) build the same Popover + `Command` pattern. Shared controls count too, e.g. a page-size picker with 10/20/50/100 is 4 options and must be searchable.
