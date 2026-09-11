---
name: portal-ui-text-english-only
description: "All user-visible portal UI text must be written in English, never Hinglish — code comments may stay Hinglish"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c38aae5d-9e46-4fad-9fcd-ace092294dda
  modified: 2026-09-11T20:18:39.192Z
---

Every user-visible string in the StaffCore portal (card labels, subtitles, section
headings, empty states, button text, tooltips) must be written in **English**.
Hinglish like "Action baaki hai", "Sab requests" or "ke numbers" is not acceptable
in the UI, even though Darshan writes and speaks to me in Hinglish.

Code comments and commit messages in Hinglish are fine — the rule is about what an
end user reads on screen.

**Why:** the portal is used by staff across the company; the chat between Darshan
and me is informal, the product is not. Mixing scripts in the UI reads as unfinished.

**How to apply:** when writing or editing any JSX string, `label`, `sub`, `title`,
`placeholder`, or a backend-supplied display string that reaches the UI (e.g. KPI
card `sub`/`label` in `dashboard.service.ts`), write it in English. Reply to Darshan
in Hinglish as usual — just never put Hinglish into the product.
