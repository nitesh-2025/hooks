---
name: rlm-sidebar-rail
description: "2026-10-08 rlm-portal collapsed sidebar rail redesign (4rem, 40px rows, scrollable, favicon mark, full-width wordmark) + deploy-compat facts for branch new-events-added-api vs aws-v2 / aws-deployed"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-08T13:08:56.709Z
---

On 2026-10-08 the rlm-portal collapsed sidebar ("icon" rail) was redesigned on branch `new-events-added-api` (`src/components/ui/sidebar.tsx` icon-mode variants + `src/components/layout/AppSidebar.tsx`): rail 4rem, 40px `rounded-lg` rows with 20px icons, active = `bg-primary/10` + 3px edge bar (green-700 ink in light mode), hairline dividers, scrollable with hidden scrollbar, brand mark = `/favicon.png` (the hand-drawn SVG mark was rejected by design review as a lookalike), expanded header wordmark `w-full` (Darshan: "left/right se space nahi chhodna"), footer rail = switch / avatar / logout. sr-only labels on every rail row. Committed and pushed the same day.

**Why:** Darshan: collapsed sidebar "ganda", wants premium/professional like the reference (leaf mark top, tinted active with edge bar, gear → avatar → logout at bottom), scrollable in collapsed mode too.

**How to apply:** Keep expanded sidebar byte-identical when touching the rail (`collapsed ? railLink(...) : <old classes>` pattern); `group-data-[collapsible=icon]:*` only reaches the desktop rail, never the mobile sheet. Deploy-compat facts checked the same day: the branch contains `origin/aws-v2` fully (merge clean); `origin/aws-deployed` is 232 commits behind aws-v2 and has its own PR #88 (OrderDetail.tsx) → the merge conflict there is pre-existing, not from this branch. Events filter sends CSV `eventName` (`$in`, exact spellings — DB uses lowercase `v2`: `Cart Visit v2`), supported on nest main/beta; `GET /pipeline/workflows` exists on nest main/beta; nest main ranks unknown event names 99 (sort order differs until the nest branch deploys). Related: [[rlm-callscreen-pipeline-card]], [[rlm-event-card-and-filter]], [[four-agent-review]].
