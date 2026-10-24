---
name: rlm-coins-master-2
description: "2026-10-24 rlm /wallet agent screen replaced with Oct-2026 \"My Incentive\" (Coin Master SSO API) on branch coins-master-2 (from aws-v2), uncommitted"
metadata:
  node_type: memory
  type: project
  originSessionId: 0fcdf28b-d6a8-465b-bcb0-36063a1e0d74
  modified: 2026-10-24T07:56:24.774Z
---

2026-10-24: Darshan asked (Hinglish "replace purana wala with new, fast") to replace the old agent coin screen with the Retailer agent-portal integration guide (Downloads/"Retailer — Agent Portal Integration.md", Coin Master from Oct 2026: category-weighted ₹ coins, RO slab 8L→₹1k…25L+, viability, HRMS target on Net Sales).

Done on rlm-portal branch `coins-master-2` (cut from origin/aws-v2 83207ff); one commit 44473c6 pushed, PR #121 → aws-v2 opened 2026-10-24 (mergeable/clean, not merged, not deployed):
- new `src/redux_v2/apis/coin_incentive_api.service.ts` — SSO bearer (`rlm_portal_auth_token`), /coins/my-access, /coins/agent/{ref}, /coins/progress → /coins/agent-month-kpi fallback, section 9 approx fallbacks.
- new `coin-master/MyIncentive.tsx` (+ `incentiveFormat.ts`); agents get it on /wallet; FM/admin Agent View tab shows it for the picked agent, old hrms view (`LegacyAgentDetail`) only on 401/403/404/400.
- Balance Master / Distribution untouched (still `/coins/hrms/*` shared key, 5% figures).

**Why:** old screen showed 5% coins as rupees and downloaded all 156 agents on a shared key in the bundle.
**How to apply:** open items — `/coins/ks/order` after order create not built; no SSO refresh-once on 401; PR #139 live status + my-access/kpi shapes unverified; no logged-in render test; agents lost withdrawable strip / payout dialog / coins-by-month / status chart (alerted to Darshan per [[never-remove-modules]]). Test harness: scratchpad esbuild + mocked fetch pattern.
