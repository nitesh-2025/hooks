---
name: wallet-history-trnastion-hist
description: "rlm-portal Wallet History module (branch trnastion_hist, worktree) — reference-based master-detail UI, V3 wallet API shape, env/CORS and access facts, what is still open"
metadata:
  node_type: memory
  type: project
  originSessionId: 658cc0f6-c954-413e-9b40-b62ef4ff92de
  modified: 2026-10-05T13:34:03.671Z
---

rlm-portal branch `trnastion_hist` (literal spelling the user gave) is cut from `origin/aws-v2` in a separate **git worktree**: `C:\Users\Katyayani Organics\Desktop\All\rlm-portal-trnastion_hist`. Its dev server runs on :8081 (the user's own :8080 runs from the main rlm-portal folder). Uncommitted, unpushed as of 2026-10-05.

**Why a worktree:** the main `rlm-portal` folder was on `wallet-card` with `.env` unmerged (`UU`) and a leftover `REBASE_HEAD` — the user's unfinished work, so it was not touched.

**Design = the user's reference screenshot ("exact UI"):** Back · header · Customer Details (PII ID, phone, email, "View Retailer Profile") · 3 tiles (Total Wallet Amount / Total Refunded Amount / Total UTRs) · left "UTR Transactions (n)" list with search · right selected-UTR card + "Transaction History" table (#, Order ID, Action, Amount, Type, Performed By, Date & Time). Number format `₹ 12,810` / `₹ 4,462.1` (space, no forced decimals). Default state (from sidebar) = search by PII / mobile / CN / UTR. **Phone must always be masked** (user instruction). Bank marks are letter avatars — no bank logo assets exist in the repo.

**Spec (product owner):** sidebar module + `/wallet-history`; search by CN, UTR, PII, mobile; Agent → own retailers, Manager/FM → team, admin → all; Retailer Details shows a balance chip that opens the module for that retailer. `/wallet` is Coin Master — a different thing.

**The wallet backend IS in the workspace:** `C:\Users\Katyayani Organics\Desktop\All\Stockship_V3_Backend` → `src/modules/utr`. `GET /utr/customer/wallet?pii_id=` (inside the global `{success,data}` envelope): `{customer_details:{pii_id,phone,email}, total_wallet_amount, total_refunded_amount, utr_count, utrs:[{utr_number, available_amount, amount, bank_name, transaction_history:[{order_id, action, wallet_used, performed_by, processing_amount, timestamp, type: credit|debit|refund}]}]}`. Needs `utr.read`; **no team scoping**. A credit note is a UTR doc (`utr_number` = `CN`+digits, bank `ZOHO-…`) — read from source, not confirmed on live data. CN/UTR search uses `GET /utr?search=` (partial, case-insensitive; also matches linked order ids).

**Access is client-side only** (`useWalletScope`: identity from `/auth/me` only, roster from `useGetAllAgentsV2Query`, never the localStorage mirrors). Nest `GET /retailers/:id` and the list do not scope by JWT on the deployed branch; a real boundary needs a server-side check on the wallet service.

**Env / CORS:** code reads `VITE_COUPONS_V3_API_URL` (shared via exported `COUPONS_V3_BASE_URL`), never a hard-coded host. Tracked `.env` on aws-v2 = prod `api.stockshipv3.ko-tech.in`; main folder `.env` line 23 = beta, BUT the main folder's `.env.local` overrides it back to prod. Prod CORS allows `localhost:8080` only; beta allows :8080 and :8081. The worktree has a git-ignored `.env.local` pointing the key at beta for local dev.

**How to apply:** token keys `v2_access_token` then `rlm_portal_auth_token`. Typecheck `npx tsc -p tsconfig.app.json --noEmit` (~68 pre-existing errors elsewhere; filter to wallet files). Temp harness files (`harness-*.html`, `src/harness-*.tsx`) must be deleted before any commit. Unknown: whether portal agents' tokens carry `utr.read`; live data never seen. Heredocs containing `""` or `\"` break the Bash tool here — write patch scripts with the Write tool instead. Related: [[rlm-portal-typecheck]], [[four-agent-review]].
