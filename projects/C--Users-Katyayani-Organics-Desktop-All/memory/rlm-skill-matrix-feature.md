---
name: rlm-skill-matrix-feature
description: "2026-10-19 rlm-portal Skill Matrix (/manager/skills-matrix + /my-skills) = port of Sales Ops agri-sales-hub /training/skills UI, read-only, on nitesh-announcements (local commits 1fa7b95..8ba0084, not pushed); preview :8081"
metadata:
  node_type: memory
  type: project
  originSessionId: bfc8429b-a706-46e6-b5af-f617a33b203a
  modified: 2026-10-19T10:02:07.262Z
---

**What it is:** the Skill Matrix in rlm-portal, a copy of the Sales Ops page at agri-sales-hub.ko-tech.in/training/skills.
- Darshan asked: "UI copy karo as like agri-sales-operation ka sara".
- It was ported from that site's public JS bundle (the decoded copies are under the job tmp `ash/pretty/`).
- There was no login; I refused to enter the credentials he gave.

**Where it lives:** branch `nitesh-announcements`, worktree `.claude/worktrees/redesign`.
- Local commits: 1fa7b95 → fb0a4f3 → ee5cb20 → 476715b (port) → 8ba0084 (review fixes + spacing).
- **NOT pushed.**
- Plan doc: `Desktop\All\SKILLS_MATRIX_RLM_PLAN.md`.

**Code:**
- `src/components/skills/live/*`:
  - SkillScoreLive: farm hero, Almost there, Teams, table.
  - AgentSkillSheetLive: sheet + AgentSkillScoreView; certificates shown in a sandboxed iframe.
  - AgentSkillsLive, SkillsLibraryLive.
  - TrainingsLive, TrainingLibraryLive: read-only.
- Shared helpers: `levels.ts`, `SkillUi.tsx`, `stageStyle.ts`.
- Pages: `pages/manager/SkillsMatrix.tsx` and `pages/agent/MySkills.tsx`.
- Font: `font-display` = Plus Jakarta Sans.

**Data:** sales-operation-backend via `salesOperationSlice`, Bearer `rlm_portal_auth_token`, tag 'SkillScore'.
- skill-score: list / agent / me.
- skill-matrix, skills, agent-categories.
- training, templates, videos, my-trainings.
- certificate HTML.
- Real data loads on :8081: 19 skills, 125 trainings (from his screenshots).

**His UI rules from this round:**
- Copy Sales Ops exactly.
- No extra space: no page padding of our own, actions on the title row.
- A normal user must understand it.
- Not "too simple".

**Left out on purpose:**
- Every write action (Add Skill, Create Training, edit, delete, attendance, templates). Ask him before adding any.
- Session Requests tab.
- MasterFilter date range (does nothing on that page).
- xlsx: we export CSV.

**How to apply:**
- Keep editing on nitesh-announcements.
- Run the 4-agent review loop for any change.
- Push only on his go.

Related: [[rlm-code-on-nitesh-announcements]], [[rlm-skills-matrix-branch]].
