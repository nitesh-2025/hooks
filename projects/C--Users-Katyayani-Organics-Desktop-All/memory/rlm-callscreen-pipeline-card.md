---
name: rlm-callscreen-pipeline-card
description: "2026-10-08 rlm-portal call screen: real pipeline card (arrow chevrons, read-only, one row) replaced the VIP mock; spec in docs/CALLSCREEN_PIPELINE_CARD.md; uncommitted on new-events-added-api; Darshan's design rules for it"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-08T12:40:45.655Z
---

On 2026-10-08 the call screen's mock "Repeat Order Pipeline" (VIP tiers Bronze→Diamond, `PipelineVisual` + `mockRetailerPipelines`) was replaced by `src/components/call/RetailerPipelineCard.tsx`, driven by `retailers_v2.pipeline_info` + `GET /pipeline/workflows` (DB workflows PW-100 RO, PW-101 AR, PW-102 LR, PW-103 FO). Spec: `rlm-portal/docs/CALLSCREEN_PIPELINE_CARD.md`. Final form after five rounds of Darshan's feedback: ONE row, `[RO – Reorder Pipeline] ⟩ chevron steps…`, arrow chevrons ported from Global Connect `global-connect-new/src/components/ArrowPipeline.tsx` (wash/deepen `color-mix`, `--stage-wash` 12%/28% added to `index.css`, `stage-wave` keyframe in `tailwind.config.ts`), popovers for details, no header row, no action buttons, exits with "exit → RO" caption. Also: `useStageMove` got menu a11y + `requestMove` + keyboard anchor; `adminPipelines.ts` hints now English with `reason` + `fill`; MyRetailers/TeamRetailers pre-existing type errors fixed (`filterArgs: RetailerListQuery`, `baseParams={{ ...filterArgs }}`, readonly-tuple includes, stage-count `myteam: 'false'`, narrowed viewMode) — tsc 68 → 62. Committed and pushed 2026-10-08 on `origin/new-events-added-api` as b475199 (pipeline card + app-version header pill + theme + docs), 914810e (useStageMove menu a11y / requestMove), 982773b (MyRetailers/TeamRetailers type fixes); not merged to aws-v2, no PR opened.

**Why:** Darshan rejected the VIP bar ("ye nahi hai, RO ka pipeline dikhao, user kahan tak pahuncha"), then asked step by step: compact height, no actions on the call screen ("action yahan se le nahi sakta"), remove the header row, show `RO ⇒ step 1 ⇒ step 2`, only one pipeline active at a time, and "arrow wala" like the Global Connect pipeline.

**How to apply:** Keep the call-screen pipeline read-only and single-row; a retailer is in exactly one of FO/RO/AR/LR, so never draw two chains. Stage moves stay on My/Team Retailers. Terminal stages are exits (forks), not steps. Backend facts: `PATCH /retailers/:id/pipeline` no longer resets pipeline_info on a terminal stage (Swagger is stale); FO→RO manual promotion is accepted by nest, so UI must not offer it; `reason_mapping` is backend-valid for AR but not in the seeded workflow. Browser verification was not possible (Chrome extension not connected) — Darshan checks on localhost:8080 himself. Related: [[rlm-event-card-and-filter]], [[rlm-callscreen-whatsapp-tab]], [[four-agent-review]].
