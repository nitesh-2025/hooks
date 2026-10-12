---
name: order-agent-audit-trail
description: "Where to find who changed an order's agent — CRM-Database order_update_history (Stockship PATCH writes it); 2026-10-10 bulk agent=lead-owner run by praveen.dev"
metadata:
  node_type: memory
  type: reference
  originSessionId: d30e61c7-4cd7-44ba-83d2-8c4ba3646ac1
  modified: 2026-10-12T06:05:42.229Z
---

"Why did this order's agent change?" → query `order_update_history` in CRM-Database by `order_id` (fields: `updated_by`, `previous_values`, `changed_values`, `order_status`, `created_at`). The Stockship V3 order PATCH (`Partially update an order`, Stockship_V3_Backend orders.controller.ts) writes it and also syncs v1 `orders`, so v1 and `orders_v2` change together. Order creator is `orders_v2.order_status_map[stage_name=created].user`; the lead's FO→RO move shows as `leads_v2.assigned_by: "fo-to-ro"` right after delivery (not in owner_history). Read-only Mongo user = the MONGODB_URI in ko-sales-backend .env (never copy the value here).

2026-10-12 finding: on 2026-10-10 16:10–16:11 IST praveen.dev@katyayaniorganics.com PATCHed `agent` on 17 KSR orders, setting each to the lead's current owner (16/17). It fixed null / A0-1126 (Praveen's dev id) agents, but it also moved credit off the selling agent: 7 FO→RO (KSR-27094, 27122, 27134, 27184, 27223, 27239, 27423) + creator→later owner (24245, 26679, 27243, 24876). Whole history (since 2026-07-17) has only 30 agent-change rows; ravikumarjain's 11 all set agent = order creator (looks like legit fixes). Full list given to Darshan 2026-10-12; no revert done (read-only access). Script: scratchpad agent-changes.js pattern (history → orders_v2/orders → agents_v2/leads_v2).
