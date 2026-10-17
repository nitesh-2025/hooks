---
name: rlm-announcements-module
description: 2026-10-17 rlm-portal Announcements (megaphone + module + create) on branch nitesh-announcements; owner rules; ko-sales backend gaps
metadata:
  node_type: memory
  type: project
  originSessionId: 206f57a7-d901-43d7-9de5-764c9fc75df2
  modified: 2026-10-17T10:26:21.436Z
---

On 2026-10-17 rlm-portal got an Announcements feature. It lives on two branches, both pushed and neither merged.
- **`nitesh-announcements`** is one clean commit, **32b8cc7**, on top of **aws-v2** f6cd2eb. It holds only the 18 announcement files. It is **PR #113 into aws-v2**, which is mergeable/clean and has a full description.
- **`nitesh-announcements-alpha`** is the original alpha-based history, 11 commits ending a212121. It is for a later PR into alpha.
- The main checkout is on `nitesh-announcements-alpha`.
- The first version of PR #113 had conflicts, because the alpha-based branch pulled other alpha work into aws-v2. Fix used: back up the branch, re-apply the files onto aws-v2, then force-with-lease.
- **Any further change must go into BOTH branches.** The 5 existing files it touches are identical on alpha and aws-v2. It was ported from sales-app (b2b) `origin/aws-deployed`. Data comes from ko-sales `/announcements` (`for_me=true`). The ko-sales deploy branch is `origin/aws-deployed`; main and nitesh-nitu are stale.

Owner rules (Darshan, 2026-10-17):
- Use the **same rules as sales-app**: every unread announcement opens the full viewer by itself once per tab, in the order **Urgent → Important → Normal**, latest first within each. No toast. Lists follow the same order.
- The portal-only guard stays: nothing opens by itself on the call screen, on agronomy tests, on the retailer map, over another dialog, or while the user is typing.
- **The create form behaves like the B2B form, with the RLM look**: Title, Content, Type | Priority, Target Audience | Expiry Date. The audience is **My Team / Selected Agents**, never "All Teams", because in ko-sales that would reach every B2B agent.
- FM/Manager can create (`role !== 'agent'`). Agents and FMs can see.
- Colours use rlm theme tokens only. The sidebar row shows the unread **count only, with no NEW badge**.
- **Hero colour follows priority**: Normal is the green gradient, Important is warning amber, Urgent is destructive red. There is also a priority edge on the card.
- **Re-login re-alerts** (owner, 2026-10-17): after logout and login, every still-unread announcement opens by itself again, even in the same tab. `reset_announcement_alerts()` in announcementMeta.ts clears the sessionStorage `rlm_alerted_announcements:*` keys on logout (AuthContext), on SSO login (Login.tsx) and on an embed ?token= change (App.tsx). Commits: alpha 2850432, aws-v2 f1ed01c.
- An **author never gets their own post as an alert** (no auto-open, badge or count). It still lists under "Created by me".
- Order is Urgent > Important > Normal, with latest first inside each group. If the owner asks for pure latest-first, that is a one-line change.
- The **spotlight is an embla carousel** of all unread announcements. It auto-advances every 6s and pauses on hover, focus or a hidden tab, with a Pause/Play button and no autoplay under reduced motion.
- **Header**: megaphone and bell are grey circles with bigger bold badges. The announcements count is white on yellow (red when urgent).
- **Sidebar**: the Notifications row shows the bell's real count, from the shared `useNotificationUnreadCount` hook.
- Gotcha: re-map `--warning` only on an inner wrapper around the SVG. Re-mapping it on an element with `bg-warning` blanks that element's background (this happened twice).
- Announcements have their **own sound**, a C6-E6-G6 chime (twice for urgent), different from the notification bell. It plays when an announcement opens and when the author publishes. Admins get no sound.
- Realtime uses the same Supabase `announcements` broadcast as sales-app. rlm, sales-app and ko-sales all point at the same Supabase project.

ko-sales backend gaps, reported and **not fixed** (Darshan's call):
- POST has no role check.
- DELETE and PUT have no ownership check.
- The PUT body is not validated.
- `agent_manager` matching is case-sensitive.
- rlm agent categories are missing from CATEGORY_AUDIENCE_MAP, so rlm agents receive every B2B `'all'` announcement.
- A Sales Ops floor manager must not list themselves in `agent_ids`.

**Why:** the owner tested on localhost:8080 with a real login, and the feed works with `rlm_portal_auth_token`.

**How to apply:** before changing announcements, read these rules first. Reviews need the 10-agent loop, with measurements in headless Chrome. Related: [[b2b-aws-deployed]], [[toolbar-overflow-three-dot]], [[searchable-dropdowns]], [[never-remove-modules]].
