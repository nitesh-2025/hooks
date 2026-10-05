---
name: wallet-history-trnastion-hist
description: "rlm-portal Wallet History module (branch trnastion_hist, worktree) — V3 wallet API shape, where its backend lives, CORS and access facts, what is still open"
metadata:
  node_type: memory
  type: project
  originSessionId: 658cc0f6-c954-413e-9b40-b62ef4ff92de
  modified: 2026-10-05T13:00:34.990Z
---

rlm-portal branch `trnastion_hist` (literal spelling the user gave) is cut from `origin/aws-v2` in a separate **git worktree**: `C:\Users\Katyayani Organics\Desktop\All\rlm-portal-trnastion_hist`. Its dev server runs on :8081 (the user's own :8080 runs from the main rlm-portal folder). Uncommitted, unpushed as of 2026-10-05.

**Why a worktree:** the main `rlm-portal` folder was on `wallet-card` with `.env` unmerged (`UU`) and a leftover `REBASE_HEAD` — the user's unfinished work, so it was not touched.

**Spec (product owner):** Wallet History module (sidebar + `/wallet-history`): available balance, amount credited against approved CN/RRF, credit/debit rows with date-time, reason, CN/UTR; search by CN, UTR, PII, mobile; Agent → own retailers, Manager/FM → team, admin → all; Retailer Details shows a balance chip that opens the module with the retailer pre-selected. `/wallet` is Coin Master — a different thing.

**The wallet backend IS in the workspace:** `C:\Users\Katyayani Organics\Desktop\All\Stockship_V3_Backend` → `src/modules/utr` (`getCustomerWallet`). Response (inside the global `{success,data}` envelope): `{customer_details:{pii_id,phone,email}, total_wallet_amount, total_refunded_amount, utr_count, utrs:[{utr_number, available_amount, amount, bank_name, transaction_history:[{order_id, action, wallet_used, performed_by, processing_amount, timestamp, type: credit|debit|refund}]}]}`. Needs permission `utr.read`; takes `pii_id` OR `phone`; **no team scoping**. A credit note is a UTR doc (`utr_number` = `CN`+digits, bank `ZOHO-…`) — read from source, not confirmed on live data. `GET /utr/:utr_number` returns the UTR doc (has `pii_id`) — used for CN/UTR search.

**Access is client-side only** (`useWalletScope`): nest `GET /retailers/:id` and the list do not scope by JWT on the deployed branch (the access layer exists only on `query-event-opt`, default warn), and managers' `search` is global. A real boundary needs a server-side check on the wallet service.

**CORS:** prod `api.stockshipv3.ko-tech.in` allows `localhost:8080` but NOT `:8081`; beta `beta.api.stockshipv3…` allows both. The worktree `.env` (aws-v2) points `VITE_COUPONS_V3_API_URL` at prod, the main folder's at beta — so on :8081 the wallet calls fail (chip shows `₹—`).

**How to apply:** base URL must stay `VITE_COUPONS_V3_API_URL` (shared via exported `COUPONS_V3_BASE_URL`). Token keys: `v2_access_token` then `rlm_portal_auth_token`. Typecheck `npx tsc -p tsconfig.app.json --noEmit` (~68 pre-existing errors elsewhere; filter to wallet files). Temp harness files (`harness-*.html`, `src/harness-*.tsx`) must be deleted before any commit. Unknown: whether portal agents' tokens carry `utr.read`. Related: [[rlm-portal-typecheck]], [[four-agent-review]].
