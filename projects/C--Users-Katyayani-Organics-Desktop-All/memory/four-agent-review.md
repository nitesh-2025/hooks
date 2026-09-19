---
name: four-agent-review
description: "Every UI build/fix round, fan out 4 review agents in parallel (QA, loophole, design, a11y/responsive) — user wants speed"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f46adb9a-0eba-4fec-a758-3795a63cc24d
  modified: 2026-09-19T06:13:49.056Z
---

After every UI build or fix round, launch **4 agents in one message**: QA (nitesh-tester), Loophole, Design review, and Accessibility + responsive. They review and report; I do all the fixing, then re-verify.

**Why:** User (2026-09-19, retailer-verification-portel docs grid): "use hamesa karo 4 agent to finish this fast" — they want parallel review every round, not 1–3 agents.

**How to apply:** Applies on top of the CLAUDE.md "UI work: run it as a team" loop — default the fan-out to 4, not 3. Give each agent exact files, what changed, and the reference screenshots' requirements. Related: [[ui-copy-english]].
