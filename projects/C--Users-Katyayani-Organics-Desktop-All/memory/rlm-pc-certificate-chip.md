---
name: rlm-pc-certificate-chip
description: "2026-10-17 rlm-portal PC / Form-'O' status chip on Retailer Details + Certificate Request retailer filter + phone-out-of-URL; pushed to origin/alpha as one squashed commit 0d91723, not deployed"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-17T06:35:39.990Z
---

rlm-portal, 2026-10-17. First version (2304783) never rendered: it read `items` but GET /agronomy/principal-certificates (sales-operation-backend, FastAPI, spec at /openapi.json) returns `certificates`. Darshan asked to push: 2304783 + the fixes were squashed into ONE commit 0d91723 on origin/alpha (2026-10-17, not deployed; aws-v2 is the deploy branch). Step-by-step history stays on origin/nitesh-pc-tag-pii.

- `src/components/retailer/PcCertificateChips.tsx`, right after WalletBalanceChip. Shares the Certificate Request page's `useGetAllPCCertificatesQuery({limit:500})` cache; match = phone last-10 OR pii_id (Darshan: that page's data is keyed by phone).
- Darshan rules: no chip at all when the retailer has no request (no "No PC", no loading/error chip); the phone must not show in URLs.
- Chip → Certificate Request with router state `{pcRetailer:{pii,phone}}` (not URL); that filter bypasses the created_by role scope so all of the retailer's certs show.
- Call-screen links carry `phone=e1.<base64url>` (`src/utils/phoneParam.ts`, CallScreen decodes, legacy plain values pass). Retailer Details links dropped `&phone=` (never read).

**Why:** sales agents must see PC status on the profile at a glance (product ask).
**How to apply:** Open with Darshan:
- No expiry field exists anywhere (API/KB), so the chip shows the issued date; real expiry needs a backend field or a rule.
- Confirm agents may see other agents' certs under the retailer filter.
- The Lookup-by-phone tab was already broken before this work (it reads `.items` and old PCCert fields).
- KP/PII id chips are emerald/amber like status colours (design suggestion, not changed).
- The 500-row full-list fetch per profile; a server pii/phone filter would be lighter.

No logged-in browser test was done (Claude in Chrome was off).
