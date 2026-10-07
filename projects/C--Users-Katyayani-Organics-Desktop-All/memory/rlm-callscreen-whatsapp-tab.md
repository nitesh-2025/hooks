---
name: rlm-callscreen-whatsapp-tab
description: "2026-10-07 rlm-portal CallScreen WhatsApp tab (real partner ChatPanel, kept alive) + Roster redesign; branch nitesh-callscreen-whatsapp-roster pushed from aws-v2, not merged/deployed; open follow-ups"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-07T12:31:55.449Z
---

On 2026-10-07 the rlm-portal call screen (`/events/:id/call?tab=whatsapp`) got the real partner WhatsApp chat (same `ChatPanel` + ko-sales API as Partner Messages) via `src/components/call/WhatsAppChatTab.tsx`, with a measured viewport-fill height (`useFillViewportHeight`). Committed as two commits (call-screen 1fbf8a8, roster 7147516) on branch **`nitesh-callscreen-whatsapp-roster`**, cut from `aws-v2` @ 59a3528 and pushed 2026-10-07; **not merged, not deployed**, PR not opened. Darshan saw it live on his local Vite :8080 only. The same working tree also holds the Roster fix (`/manager/roster` grouped only Retailer-FO-Sale / Retailer-Sale and dropped every other department; now one tab per department the HRMS API returns) and the keep-alive WhatsApp tab (forceMount + hidden, unread badge, right column scrolls internally), the shimmer `Skeleton` prop and the WhatsApp brand glyph.

**Why:** Darshan asked for the Partner Messages API on the call screen's WhatsApp tab and a proper height fit. Decisions made: thread phone wins over retailer-doc phone (24h window comes from the thread), "Partner Messages" opens a new tab (never navigate away mid-call), draft kept per PII in sessionStorage, deep link carries `name` only (no raw phone in URLs).

**How to apply:** Before touching these files again, check `git status` in rlm-portal: if still uncommitted, this work is the diff. Known follow-ups not done: ko-sales returns `data: []` (not 403) when a non-admin lacks access to a PII, so a real thread can look empty; Main/Alt toggle does not affect the WhatsApp target (always main contact); phone-search fallback is fuzzy (pre-existing); inbox and app use two greens (emerald vs primary). Related: [[wallet-history-trnastion-hist]] (aws-v2 is the deploy branch), [[rlm-portal-branch-switch-deps]].
