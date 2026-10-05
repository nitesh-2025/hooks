---
name: wallet-history-trnastion-hist
description: "2026-10-05 rlm-portal Wallet History work — branch trnastion_hist in a worktree, V3 wallet API, what is still unknown (response shape, CN/UTR search, team scoping)"
metadata:
  node_type: memory
  type: project
  originSessionId: 658cc0f6-c954-413e-9b40-b62ef4ff92de
  modified: 2026-10-05T12:33:15.945Z
---

rlm-portal branch `trnastion_hist` (literal spelling the user gave) is cut from `origin/aws-v2` in a separate **git worktree**: `C:\Users\Katyayani Organics\Desktop\All\rlm-portal-trnastion_hist`. Dev server for it runs on :8081 (the user's own :8080 runs from the main rlm-portal folder). Uncommitted, unpushed as of 2026-10-05.

**Why a worktree:** the main `rlm-portal` folder was on `wallet-card` with `.env` unmerged (`UU`) and a leftover `REBASE_HEAD` — the user's unfinished work, so it was not touched.

**What exists:** `customerWalletApi` (RTK Query, `redux_v2/apis/customer_wallet_api.service.ts`, base URL = `VITE_COUPONS_V3_API_URL` via the exported `COUPONS_V3_BASE_URL`), `/wallet-history` page, wallet-balance chip on RetailerDetail (next to KP/PII chips), sidebar row under Reports. `/wallet` is Coin Master — a different thing.

**Still unknown (ask before assuming):** the real response shape of `GET /utr/customer/wallet?pii_id=` (walletModel.ts is a best-effort normalizer; DEV shows a raw-JSON panel), whether any API searches by CN/UTR across retailers, whether Stockship V3 enforces per-agent/team ownership on that endpoint (the page only requests the wallet after `/retailers/:id` loads, which nest scopes).

**How to apply:** get a real JSON sample first (user pastes it from DevTools), then tighten walletModel.ts. Token keys: `v2_access_token` then `rlm_portal_auth_token`. Typecheck: `npx tsc -p tsconfig.app.json --noEmit` (~68 pre-existing errors elsewhere; filter to wallet files). Related: [[rlm-portal-typecheck]].
