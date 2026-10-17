---
name: rlm-success-stories
description: "2026-10-17 Success Stories (approved testimonials + reviews from ko-sales) in rlm-portal + verification portal; branches, owner rules (masked phone, no banner/header, tight space)"
metadata:
  node_type: memory
  type: project
  originSessionId: 206f57a7-d901-43d7-9de5-764c9fc75df2
  modified: 2026-10-17T11:49:32.457Z
---

**Success Stories** went into rlm-portal at the route `/success-stories` (agents and managers), on the SAME two branches as [[rlm-announcements-module]].

**Where the code lives**
- **`nitesh-announcements-alpha`**:
  - 35b1d89 — first version.
  - 9b695b5 — hero + masked phone.
  - fc51e9a — owner removed banner/header, plus fixes from the 10-agent review.
  - 131dbe4 — mask precision and focus.
  - f70027b — tabs container query, icon-only FilterX.
- **`nitesh-announcements`** (aws-v2, PR #113): d87a068 → 66884be → d27ca5a → 6cbf24b, same content. PR #113's title and body were updated on 2026-10-17 to cover Announcements + Success Stories; it is mergeable/clean and not merged.
- Any change goes to BOTH branches. The 11 files are identical on both, so a `git checkout <alpha-commit> -- files` in a temp worktree is safe.
- **Verification portal** (`retailer-verification-portel`): branch `nitesh-success-stories` (061b4d2 is the first port), built by an agent in a scratchpad worktree from origin/main.
  - Its token is `sso_token` and its base URL is `VITE_BACKEND_URL`.
  - 2762af0 = synced to RLM 131dbe4, with a manager route + FMSidebar entry (the owner wants both sides). 14869cc = synced to f70027b (final). Merges clean into main; the worktree is removed.
  - No PR.

**API:** ko-sales `/success-stories/testimonials?limit=500`, `/reviews?limit=2000`, and `/product?search=SKU`.
- The UI accepts a product only when its SKU is an exact match.
- Mappers live in `success_stories_api.service.ts`.
- API notes and design: `Desktop\All\success-stories-testimonials.md`.

**Owner rules (Darshan, 2026-10-17)**
- **Phone:** never show the farmer's number. Mask it with crosses as `+91 XXXXX X0472` (last 4 only).
  - The raw number never reaches state or the DOM.
  - Numbers typed into names or texts are masked too.
  - No tel: links. The phone is never put in share text.
- **Banner:** the owner asked for an animated SVG hero with a glass panel, then said "hata hi do". There is no banner and no visible page header (breadcrumb/title); only an sr-only h1. The page starts at the filter row.
  - Don't re-add these without asking.
- **Phone mask regex:** Indian mobiles only, Latin + Devanagari digits, NO lookbehind — the api file is in the main bundle and old Safari crashes on a lookbehind.
- **Spacing:** keep vertical space tight. The owner complained about gaps 3 times: root `space-y-3`, h1 inside the toolbar wrapper.
- **Behaviour:**
  - The overview is carousels.
  - "View all" opens an infinite-scroll grid.
  - Shimmer skeletons show on loading AND refetch, on both the agent and manager side.
  - The page is lazy-loaded with a cache.
- **Uniformity:** one ↺ refresh, an outline "Clear filters" button, searchable selects, and one toolbar row with ⋮ (see [[toolbar-overflow-three-dot]], [[searchable-dropdowns]]).

**Open (backend, not fixed, owner's call)**
- ko-sales returns the raw `contact`, email and pii_id in the GET responses; it needs a projection.
- `/product` returns every review of the SKU; the UI only needs a batch names endpoint.
- `?limit=0` is unbounded.
- There is no Cache-Control.
- There is no approve/reject API.

**Why:** the owner iterated live on localhost:8080. The design calls above are his and are recorded so they are not undone.

**How to apply:** read this before touching Success Stories. Use the 10-agent loop with headless Chrome measurements. The QA harness is a scratchpad `stories.qa.ts` with 36 checks on the mappers.
