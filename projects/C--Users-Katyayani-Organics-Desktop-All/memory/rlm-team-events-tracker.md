---
name: rlm-team-events-tracker
description: "Team Events Tracker (/manager/events/team) — 2026-10-13 build state, decisions (cached analytics API, scoping, 31-day max, 1-week default), demo vs live modes, open gaps"
metadata:
  node_type: memory
  type: project
  originSessionId: 76a0eeef-751b-4371-97dc-fc686b832ccb
  modified: 2026-10-13T07:50:01.461Z
---

Manager analytics page in rlm-portal at `/manager/events/team` (branch `alpha`, uncommitted as of 2026-10-13), built from Darshan's mockup `Downloads/RLM-Events-Tracker.html`, then re-skinned to the reference screenshot (6 KPI cards, underline tabs Overview / Event Types / Agents / Pending & SLA / Day by Day, 3 chart cards, toolbar, rich events table with numbered pagination). Spec: `rlm-portal/docs/TEAM_EVENTS_TRACKER_REQUIREMENTS.md` (§21 = UI spec). Code: `src/components/team-tracker/*`, `src/lib/teamTracker/*` (contract: `types.ts`, `rules.ts`, `format.ts`, `eventTypes.ts`, `apiTypes.ts`), API service `src/redux_v2/apis/team_tracker_api.service.ts`.

**Decisions (Darshan, 2026-10-13):**
- Real data first. Analytics = server-side cached snapshot per (scope, range, settingsVersion), aggregates only (`GET /retailer-events/team-tracker/analytics`); events list paged + filtered on the server (`…/events`). Never ship the whole range to the browser.
- Scoping on the server: manager = own team only (client `manager_id` ≠ own → 403), admin = all teams (may pass `manager_id`/`agent_id`), agent → 403.
- Date range max **31 days** (validated server + clamped client with a toast). Default = **today only** (Darshan 2026-10-13, changed from 1 week the same day).
- Overview list = tracker table (image), NOT the My Team Events table (asked 2026-10-13, chose tracker table).
- Demo data stays only as an explicit mode `?trackerData=demo` (`?trackerDemo=error` simulates a failed load); demo Call/Message/Copy are disabled because random numbers may belong to real people.
- Event types come from `EVENT_PRIORITY_OPTIONS` (16 real names), HOT + HIGH INTENT default to Priority; mockup-only types (cart ×3, view ×3, order failed, signed-up-no-order) are listed as "Not tracked yet" in SLA settings. "Order Placed" (also stored as "Purchase") IS tracked since 2026-10-13 as a secondary type, rank 16.
- Order attribution (assumption, configurable `attributionDays`, default 3): first order by the same retailer within N days after the event.
- Sidebar is NOT changed (pixel brief's nav list ≠ app's global sidebar).
- Admin detection: `localStorage.rlm_portal_user_role` does NOT flag super admins — use `/auth/me` role code via `isNoScopeAdmin` (USR-1000/1001/1002), as `usePlaygroundAgents` / `TrackerContext` LiveSource / `useTeamBandwidthV2` do.
- FO = USR-1029, RO = USR-1022 (Darshan 2026-10-13). nest `GET /statics/report?all_teams=true` (admin only, 403 otherwise) = every active FO+RO agent; the Manager Dashboard hook sends it for admins (Dashboard.tsx untouched — other session's file).
- Event type filter = the shared `EventPriorityFilter` (tier groups, P1…P16), same as My Team Events. No order line above the table (removed on request); Date/Time header cycles priority → newest → oldest.
- Table order default = `priority` (one row per retailer, RPS desc → type rank → newest, exactly like My Team Events; `/events` `total` = retailers, analytics = every event). Table cells copied from My Team Events (PII/KP copy icons, App Version pill, RPS bar, Last Note). Agent filter = roster only (active FO/RO); analytics-only owners resolve names in rows only.
- Logic info (ℹ️ "How this page works" guide + every info button) is ADMIN / SUPER ADMIN ONLY (Darshan 2026-10-13); managers/agents never see it. Agent My Events + manager My Team Events show the real SLA column via `GET …/team-tracker/sla-status?ids=` (same rules/settings), no rules popover there.
- Every tracker view state lives in the URL (`tab, from, to, type, agent, status, q, page, size, sort, view=agent:<id>|event:<id>[:from], atype, achip, amore`); tab/detail changes push history, filters replace.
- Local nest `.env.local` = production **read-only** replica (CRM-Database-ReadOnly) → SLA settings PUT fails locally; test writes on BETA.

**Why:** API load and speed were Darshan's main worries ("api par load nahi aana chahiye", "fast hone chahiye"); the browser-side demo was only to unblock the UI.

**How to apply:** Any tab must read through `useTrackerAnalytics()` / `useTrackerEvents()` (contract in `dataHooks.ts`), never compute from a full event list. Keep `rules.ts` as the single source of the business rules (server mirrors it). Lead moves have no endpoint yet (phase 2) — never fake them in live mode. Related: [[rlm-agents-v2-only]], [[nest-perf-gotchas]], [[toolbar-overflow-three-dot]], [[searchable-dropdowns]].
