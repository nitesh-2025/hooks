---
name: gf-call-region-rule
description: gf calling — a number starting +91 is ALWAYS domestic (Vartalap); anything not +91 is international
metadata:
  type: feedback
---

In gf (global-connect-new) calling: a dialled number that is +91 is always domestic and must go through Vartalap (the agent's ko-sales mode: CallerApp or VoIP). Any number that is not +91 is international.

**Why:** the user said it twice on 2026-09-14 ("agar +91 hai to domestic hi hai", "+91 nahi hai to international hi manana hai"). A +91 call had silently fallen back to Exotel and failed with "Your profile has no phone number, so Exotel cannot ring you".

**How to apply:** `VITE_CALL_DOMESTIC_COUNTRY_CODES` must stay `91` only. Never quietly route a +91 call to Exotel when Vartalap is unavailable; `planCallRoutes`' vartalap→exotel fallback contradicts this rule. Surface the Vartalap problem instead, and confirm with the user before changing fallback behaviour. See [[gf-calling-integration]].
