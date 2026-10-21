---
name: rlm-retailer-status-vip
description: 2026-10-21 retailer Status/VIP/Stage on rlm Team+My Retailers — portal derives status with nest bucket rules; nest order_info/VIP count only Partner-app (MKTP-12) orders so RO/AR/LR rows had 0 orders; portal 0061b8c pushed, in PR #113
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-21T06:28:11.813Z
---

**Facts (checked read-only on prod CRM-Database, 2026-10-21):**
- GET /api/v2/retailers sends **no status**. The admin app (BucketMasters `deriveStatus`) and now the rlm portal (`src/lib/retailerStatus.ts`) both work it out from `is_verified`, `order_info` and `updated_data.action`.
- The portal uses nest's own 30 / 46 / 91-day bucket rules. Admin uses 30/45/90.
- **"Transition" does not exist** anywhere; Darshan means **Transacting**. "FO Pending" = nest bucket `without_order` (verified, never ordered).
- **Root cause of "RO shows FO Pending":**
  - nest `order_info` and `vip_level` (VipService + OrderInfoRecomputeService) count only `source: 'Retailer'`, which is marketplace **MKTP-12** (the Partner app).
  - They are also written only when an order event arrives.
  - The pipeline (order-delivered webhook) moves on orders from **every** channel (MKTP-6, Shopify MKTP-3, Bighaat MKTP-86 …).
  - Result: 469 RO, 295 AR and 1,388 LR retailers have `order_info.total_orders = 0`, all with real orders in `orders_v2`.
  - Example: PII-1827342 / KP-376002 has a delivered order KSK-305528 via MKTP-3.
  - `ORDER_INFO_RECOMPUTE` is **off** by default; production writes need Darshan's OK.
- **VIP:**
  - 8,085 retailers have a blank `current_tier`. The portal falls back to nest's tier table on the 90-day amount (`src/lib/vipTier.ts`).
  - 821 retailers have a stored tier higher than their current 90-day spend (stale).

**Portal (nitesh-announcements, commit 0061b8c, PUSHED 2026-10-21 with 44fa2ea/57d4e9c/6cd92a0; PR #113 MERGEABLE, 33 commits):**
- Status comes from the pipeline when the order count is 0 but the retailer is in RO / AR / LR (RO → Transacting, AR → At Risk, LR → Lost). Those badges are dashed, with a hover note.
- One shared `RetailerStatusBadge`.
- The Stage column shows on every view, with the DB workflow labels.
- The legends are rebuilt.

**Open, his call:**
- Should nest count all channels for order_info, and should the VIP tier stay Partner-app only?
- Turn on ORDER_INFO_RECOMPUTE (dry-run first).
- Backfill blank and stale VIP tiers.

**Env:** chrome-devtools-mcp plugin works, but opens its own unlogged Chrome. I never enter his real logins; he logs in himself.

Related: [[rlm-code-on-nitesh-announcements]], [[prod-vs-beta-mongo-and-netcore]].
