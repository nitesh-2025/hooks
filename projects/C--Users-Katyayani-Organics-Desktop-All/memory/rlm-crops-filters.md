---
name: rlm-crops-filters
description: "2026-10-19 rlm /manager/crops State/District/Pincode/Month filter row = port of B2B sales-app CropBrowser; month is browser-side (ko-sales /crops 400s on month); pushed 4d178f0 on nitesh-announcements, in PR #113"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-19T11:31:18.722Z
---

**What:** the rlm Crops page (`src/pages/shared/Crops.tsx`, routes /crops and /manager/crops) got a filter row: State / District / Pincode / Month + Apply.
- The reference is the B2B **sales-app `src/pages/CropBrowser.tsx` on `origin/aws-deployed`**. Darshan's screenshot came from there. The local sales-app checkout is stale, so read it with `git show origin/aws-deployed:…`.
- Commit **4d178f0** on nitesh-announcements (worktree redesign). **Pushed 2026-10-19 on his go.** PR #113 (→ aws-v2) carries it: 29 commits, MERGEABLE.
- gh CLI is logged in now (account nitesh-2025), so PR bodies can be set with `gh pr edit 113 --body-file Desktop\All\PR_113_nitesh-announcements.md`.

**Month facts (checked live 2026-10-19):**
- ko-sales GET /crops and /state-crops/current have **no month param**. Sending `month` returns 400 "property month should not exist" (global `forbidNonWhitelisted`).
- This holds on aws-deployed c5e3d585 and on every remote branch.
- B2B filters month **in the browser**, and rlm now does the same:
  - one `/crops?limit=100` call gets the whole catalogue (32 crops);
  - a crop the state has mapped follows that state's calendar (`/state-crops/current?state_id`, which is public);
  - any other crop follows its season.
  - Helper: `src/lib/crop-season.ts`, a typed copy of sales-app `src/lib/crop-season.ts`.
- `CROPS_MONTH_FILTER_LIVE` in cropsSlice wires a server-side `month` (1–12) for the day ko-sales adds one.
- Expected live counts for Jan/Jun/Oct: no state 20/24/31, MP 7/8/8, Maharashtra 15/17/17.

**Area facts:**
- `pincode` wins over state/district on the server.
- The response echoes `area`, with names in capitals.
- An unknown pin means no area filter. But `999999` really resolves to Nizamabad (it is in the pincode map).
- `/state-crops/districts/:id` needs auth.
- A district with no mappings silently falls back to the whole state; the backend gives no flag for it.

**Open, his call:** B2B uses only the State dropdown's calendar with a pin, while rlm uses the pin's state; filters are not kept in the URL.

**Env note:** the connected Chrome showed an error page for localhost:8081 and 127.0.0.1:8081 while curl got 200, so no logged-in render could be checked from here.

Related: [[rlm-code-on-nitesh-announcements]], [[searchable-dropdowns]], [[toolbar-overflow-three-dot]].
