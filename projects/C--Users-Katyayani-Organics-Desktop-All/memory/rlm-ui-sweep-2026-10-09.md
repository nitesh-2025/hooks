---
name: rlm-ui-sweep-2026-10-09
description: rlm-portal app-wide sweep on new-events-added-api (250eccb, a181644): shared Empty/Error/NotFound + skeletons + KpiValue on every stat card + dark mode on every page + theme cross-fade + color-scheme; how it was gated; files deliberately left out
metadata:
  type: project
---

2026-10-09, rlm-portal branch `new-events-added-api` (pushed, not merged to aws-v2, no PR):
- 905092b foundation: `components/common/StateScreens.tsx` (EmptyState/ErrorState/NotFoundState), `ErrorBoundary.tsx` (RouteErrorBoundary wraps all routes in App.tsx), `PageSkeletons.tsx`; `ui/skeleton.tsx` shimmer is DEFAULT now.
- d46dc4c `KpiValue` (odometer while loading, count-up, em dash empty/error, `loaderSide`); Darshan: "no progress bar, only the number".
- 250eccb theme: `theme-transition` class cross-fade in useDarkMode + index.css; `color-scheme` light/dark; VIP badge colours are CSS vars (`--vip-*`); `.dark .ko-leaf-card`.
- a181644: 96 files — spinners→skeletons (spinners only in buttons/inline refresh), empty/error states, KpiValue on all KPI tiles, dark-mode sweep by 17 agent groups (recipe: neutrals→tokens; tints keep light class + `dark:bg-{c}-500/10-15 dark:text-{c}-300/400 dark:border-{c}-500/30`).

**Gate recipe that worked:** tsc -p tsconfig.app.json stays at 62 (verify error lines in touched files exist in HEAD); lint parity script (HEAD copies as `*.__head__.tsx` next to originals, eslint in batches of 20 — Windows command-line limit) at scratchpad `lint-parity.js`; vite build.

**Left out on purpose (other sessions' uncommitted work in the same checkout):** `src/pages/manager/CreateOrder.tsx` (another session's dark edits + 5 skeleton blocks of mine still uncommitted), `src/components/PriceGrievanceDialog.tsx`, `src/redux/api/contactsSlice.ts`.

**Why:** Darshan repeatedly reported dark-mode pages via screenshots; the rule is "every page follows dark mode, uniform background". **How to apply:** new UI must use tokens / dark variants from day one; reuse StateScreens/PageSkeletons/KpiValue rather than spinners. See [[rlm-settings-v3]], [[four-agent-review]].
