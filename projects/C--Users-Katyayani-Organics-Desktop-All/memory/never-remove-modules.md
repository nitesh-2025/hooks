---
name: never-remove-modules
description: "Darshan 2026-10-14 — never remove, hide, disable or gate any existing module/page/route/feature in any project; before any such step stop and ask him explicitly as an alert"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 72bcf505-debe-42dc-84fd-4ab5944a40f7
  modified: 2026-10-14T11:12:17.524Z
---

**Rule (Darshan, 2026-10-14):** "koi bhi module kabhi bhi nahi hatana hai; hatane se pehle mujhe puch, as alert." No existing module, page, route, sidebar row, API, flag-gate or feature is ever removed, hidden, commented out or switched off on my own judgement — in any project (rlm, verification, gf, nest, ko, pos…). Reverting someone else's work counts too.

**Why:** On 2026-10-14 a vague mid-turn "hide karna hai" message led to the Return/Refund ticket pages being hidden behind a flag (after a guessed-option question). Darshan did not want that; it cost a revert and a rebuild. See [[rlm-rrf-tickets-hidden]].

**How to apply:**
- Before any removal/hide/disable, stop and ask with a clear **alert-style** question that names exactly what would disappear, for whom (agent / manager / admin), and where (branch, local vs deployed). Wait for an explicit yes. Do not proceed under an assumption.
- If a message is ambiguous about *which* feature, ask with the real candidates **and** "none of these / meant for another session" as an option — never put a guessed feature as the recommended first option.
- "Hide" and "comment out" are removals for this rule. Adding something new next to an existing module is fine; replacing or retiring the old one is not, without the alert.
- When a cleanup genuinely needs something removed (dead code, duplicate route), list it in the report as a proposal and let Darshan decide.
