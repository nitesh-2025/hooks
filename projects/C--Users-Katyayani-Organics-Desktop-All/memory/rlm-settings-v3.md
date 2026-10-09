---
name: rlm-settings-v3
description: "2026-10-09 rlm-portal Settings v3 (Image-38 mock) on new-events-added-api — Darshan's rules (no green page bg, full width, Edit Profile disabled, session timeout row, header Settings icon), dark-mode audit = report only, other sessions switch branches in the same checkout"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-09T06:03:14.410Z
---

Settings page v3 shipped 2026-10-09 on rlm-portal branch `new-events-added-api` (commits e10f132 + the follow-up "header menu Settings shortcut + round-2 polish"); not merged to aws-v2, no PR opened.

**Darshan's explicit rules for this page (keep on any further change):**
- Profile details are admin-managed: Edit Profile stays **disabled** (not removed), camera badge decorative, caption "Managed by your admin".
- **No green/coloured page background** — he rejected the ambient orbs twice ("keep uniform color as other pages"); hero is a plain Card. Only brand accent left: the animated plant SVG (motion-safe, xl+).
- **Full width**, no `max-w` column; standard layout padding only (he noticed even the 16px the sr-only span added as first child of `space-y-*`).
- Account card must show **when the session times out**: `useSessionExpiry` reads the access token `exp`/`iat` (same clock as `useAutoLogout`, which checks every 60 s); portal never refreshes the access token, so exp = real timeout.
- Header account popover has a **Settings icon right of Logout** → `/settings`.
- He wanted the SVG **animated** ("svg laga do animated").

**Known, consciously left:** push/sound switches persist to `rlm_portal_pref_push/_sound` but nothing consumes them (pre-existing dead switches); breadcrumb is the only one in the app (mock asked for it); nested `<main>` in the shell (sidebar.tsx + MainLayout) is pre-existing.

**Dark-mode audit (2026-10-09, report only — Darshan said "keval batao", no fixes asked):** worst pages CreateOrder, MyHandovers, RetailerDetail, PreDeliveryPage, FullScreenTestRunner (navy surfaces), MyRetailers/TeamRetailers (score chips), TestResultPage, NDRPage, MyEvents/TeamEvents (event-type chip map), TestProctoringLogs, LeadAudit, AgentTests, AgronomyKB, CreateCoupon, MessagingModule, BugReportDetail; manager Dashboard "Orders Placed/Order Value" cards and navy agent cards. Scripts: scratchpad `events/dark-audit.js` (per-class, accurate) and `dark-audit3.js` (file-level).

**Why:** several decisions came as mid-turn corrections after screenshots; re-adding tint, max-width or a colour page bg would be re-litigating them.
**How to apply:** before changing Settings, re-read this; keep gates `npx eslint`, `npx tsc -p tsconfig.app.json --noEmit` (62 baseline errors), `npx vite build`. See [[rlm-pwa-install]] for the Install card and [[rlm-sidebar-rail]] for deploy-compat notes.

**Workspace gotcha (2026-10-09):** another Claude session stashed my uncommitted work ("stashed by MB before order-rist"), switched to aws-v2/order-rist and came back without popping. Commit early on shared checkouts; if files silently revert to HEAD, check `git stash list` / `git reflog` before rewriting anything.
