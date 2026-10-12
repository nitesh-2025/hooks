---
name: order-agent-audit-trail
description: "Where to find who changed an order's agent — CRM-Database order_update_history (Stockship PATCH writes it); 2026-10-10 bulk agent=lead-owner run by praveen.dev"
metadata:
  node_type: memory
  type: reference
  originSessionId: d30e61c7-4cd7-44ba-83d2-8c4ba3646ac1
  modified: 2026-10-12T05:51:56.243Z
---

"Why did this order's agent change?" → query `order_update_history` in CRM-Database by `order_id` (fields: `updated_by`, `previous_values`, `changed_values`, `order_status`, `created_at`). The Stockship V3 order PATCH (`Partially update an order`, Stockship_V3_Backend orders.controller.ts) writes it and also syncs v1 `orders`, so v1 and `orders_v2` change together. Order creator is `orders_v2.order_status_map[stage_name=created].user`; the lead's FO→RO move shows as `leads_v2.assigned_by: "fo-to-ro"` right after delivery (not in owner_history). Read-only Mongo user = the MONGODB_URI in ko-sales-backend .env (never copy the value here).

2026-10-12 finding: on 2026-10-10 16:10–16:11 IST praveen.dev@katyayaniorganics.com PATCHed `agent` on 17 KSR orders, setting each to the lead's current owner (16/17). It fixed null / A0-1126 (Praveen's dev id) agents, but on fo-to-ro leads it also moved delivered orders from the FO agent to the RO agent (KSR-27122 A0-1768→A0-1328, KSR-27134 A0-1377→A0-1320, likely also KSR-27094, 27223, 27239, 27423). Reported to Darshan; no revert done (read-only access).
