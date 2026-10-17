---
name: rlm-pc-certificate-chip
description: "2026-10-17 rlm-portal PC / Form-'O' status chip on Retailer Details + Certificate Request retailer filter + phone-out-of-URL; pushed to origin/alpha as one squashed commit 0d91723, not deployed"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-17T06:35:39.990Z
---

rlm-portal, 2026-10-17. First version (2304783) never rendered: it read `items` but GET /agronomy/principal-certificates (sales-operation-backend, FastAPI, spec at /openapi.json) returns `certificates`. Darshan asked to push: 2304783 + the fixes were squashed into ONE commit 0d91723 on origin/alpha (2026-10-17, not deployed; aws-v2 is the deploy branch). Step-by-step history stays on origin/nitesh-pc-tag-pii. For aws-v2 the PR branch is `nitesh-pc-chip-only-aws-v2` (0301688): PC module only, 4 files, fresh from aws-v2, tsc identical to the aws-v2 baseline, build ok. Its prefilled PR page was opened for Darshan to click Create (gh is not logged in). Not merged or deployed as of 2026-10-17. The earlier branch `nitesh-pc-chip-aws-v2` (0703190) also carried the phone-URL change and is superseded; do not PR it. Darshan wants the deploy PR to hold PC changes only.

Open risk on alpha (0d91723): the phone-URL change alters CallScreen input.
- piis.country_code defaults to "+91". Old unencoded links turned '+' into a space, which was then stripped, so CallScreen got "9199…".
- Encoded links keep the '+', so CallScreen now gets "+9199…".
- The 10-digit search is unaffected; dial and display paths (CallScreen.tsx contact, about lines 1280, 1346 and 1942) now receive a different string.
- Fix to exact compatibility, or revert, before this reaches aws-v2.

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
