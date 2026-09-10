---
name: nitesh-dev-workflow
description: Complete Nitesh development & QA lifecycle that chains the other skills — nitesh-feature-dev → feature QA (nitesh-tester) → nitesh-bug-fix loop on FAIL → re-test → general regression (nitesh-tester) → final release gate with SAFE TO PROCEED / NOT SAFE TO PROCEED / BLOCKED and a WORKFLOW REPORT. Use when the user wants a feature taken end to end (build + test + fix + release check), asks for the full workflow, or asks whether work is production-ready / safe to release.
---

# Nitesh Development & QA Workflow

## Running This Workflow in Claude Code

This skill orchestrates the other skills. At each phase, load the named skill and follow it fully, including its report.

| Role in this workflow | Skill to load | Scope |
|---|---|---|
| `nitesh-feature-dev` | `nitesh-feature-dev` | Build the feature, self-test, DEVELOPMENT REPORT |
| `nitesh-feature-tester` | `nitesh-tester` (Feature QA mode) | Test **the feature**: requirement, expected vs actual, full feature flow, edge cases, errors, directly affected flows |
| `nitesh-bug-fix` | `nitesh-bug-fix` | Fix QA failures by root cause |
| `nitesh-tester` | `nitesh-tester` (General Regression mode) | Test **the wider application**: existing APIs, shared services, auth, DB, RabbitMQ/Redis, jobs, integrations, build, tests, security, code health |

Rules for running it:
- Keep the phases in order and show each phase's report before moving on.
- Tester phases must validate independently — re-read the code and re-run commands; do not trust the developer report's claims.
- Track every QA FAIL → bug fix → re-test cycle and count bug fixes for the final report.
- If the same failure survives repeated fix attempts, or a decision needs business input, stop and ask the user instead of looping forever.
- Project aliases, paths and npm scripts are in the `projects` skill.

---

## OBJECTIVE

This workflow defines the complete software development lifecycle for feature development, bug fixing, testing, regression testing, and release validation. It ensures that:

- Requirements are understood before coding.
- Existing code and flows are inspected before modification.
- New features are implemented safely.
- Bugs are fixed based on root cause.
- New functionality is tested against expectations.
- Existing functionality is protected from regression.
- Build and code health are verified.
- A feature is not considered complete until it passes QA.
- Failed QA sends the work back to development.
- The final result is safe to proceed toward release.

---

## AGENTS / ROLES

### 1. `nitesh-feature-dev`
Understanding requirements; inspecting existing architecture; designing the implementation; implementing the feature; writing/updating tests where appropriate; running build validation; performing developer self-testing; preparing QA handoff.

### 2. `nitesh-feature-tester`
Understanding feature requirements and expected behavior; understanding existing flow; comparing expected vs actual; testing complete feature flow, edge cases, failure scenarios and integrations; regression testing; checking build/code health; determining release safety.

### 3. `nitesh-bug-fix`
Investigating defects; finding root cause; inspecting existing implementation; applying minimal safe fixes; avoiding unrelated changes; validating the fix; running build/tests; preparing the fix for re-testing.

### 4. `nitesh-tester`
General regression testing; existing-flow validation; build validation; code health checks; integration checks; security checks; final validation.

---

## COMPLETE WORKFLOW

```text
                         REQUIREMENT
                              │
                              ▼
                  ┌─────────────────────┐
                  │ NITESH FEATURE DEV  │
                  └──────────┬──────────┘
                             │
                             ▼
                    Understand Requirement
                             │
                             ▼
                    Inspect Existing Code
                             │
                             ▼
                    Understand Existing Flow
                             │
                             ▼
                         Design
                             │
                             ▼
                       Implement
                             │
                             ▼
                      Self Testing
                             │
                             ▼
                    Build Validation
                             │
                             ▼
                  ┌─────────────────────┐
                  │   FEATURE TESTER    │
                  └──────────┬──────────┘
                             │
                             ▼
                    Expected vs Actual
                             │
                             ▼
                    Complete Flow Test
                             │
                             ▼
                       Edge Cases
                             │
                             ▼
                     Error Scenarios
                             │
                             ▼
                       Regression
                             │
                             ▼
                    Build / Code Health
                             │
                             ▼
                       ┌───────────┐
                       │ QA RESULT │
                       └─────┬─────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
               PASS                    FAIL
                 │                       │
                 ▼                       ▼
          GENERAL TESTER            BUG FIX
                 │                       │
                 │                       ▼
                 │                NITESH BUG FIX
                 │                       │
                 │                       ▼
                 │                  Self Test
                 │                       │
                 │                       ▼
                 │                Feature Tester
                 │                       │
                 │                 ┌─────┴─────┐
                 │                 │           │
                 │               PASS        FAIL
                 │                 │           │
                 │                 │           └──────► BUG FIX
                 │                 │
                 └──────────┬──────┘
                            │
                            ▼
                     NITESH TESTER
                            │
                            ▼
                  Final Regression Test
                            │
                            ▼
                       Build Check
                            │
                            ▼
                    Security / Integration
                            │
                            ▼
                       FINAL GATE
                            │
                 ┌──────────┴──────────┐
                 │                     │
               PASS                  FAIL
                 │                     │
                 ▼                     ▼
          SAFE TO PROCEED          BUG FIX
```

---

## PHASE 1 — REQUIREMENT

The requirement must be understood before implementation. Determine:
- What needs to be built?
- Why is it required?
- What should happen?
- What should NOT happen?
- What are the acceptance criteria?
- What existing functionality is involved?

If the requirement is unclear, inspect the existing system first. Do not invent business logic.

---

## PHASE 2 — FEATURE DEVELOPMENT

Trigger: `nitesh-feature-dev`

1. Understand requirement.
2. Inspect existing architecture.
3. Trace existing flow.
4. Identify impacted components.
5. Design solution.
6. Implement feature.
7. Add/update relevant tests.
8. Run build.
9. Perform self-test.
10. Review Git diff.
11. Prepare QA handoff.

The developer must NOT hand off obviously broken code.

---

## PHASE 3 — FEATURE QA

Trigger: `nitesh-feature-tester` (→ `nitesh-tester`, Feature QA mode)

Tester independently validates:
- **Requirement** — does implementation match requirement?
- **Expected vs Actual** — does actual behavior match expected behavior?
- **Complete Flow** — does the entire flow work?
- **Edge Cases** — does the feature behave correctly in unusual scenarios?
- **Error Handling** — does failure behave correctly?
- **Integration** — do connected services continue working?
- **Regression** — did anything existing break?
- **Build** — does the project still compile?
- **Security** — did the feature introduce security problems?

---

## PHASE 4 — QA DECISION

The feature tester must produce one of three results.

### PASS
Use when: requirement is satisfied; expected matches actual; complete flow works; relevant edge cases work; existing flow remains intact; build passes; no significant regression exists.
→ Proceed to general testing.

### FAIL
Use when: requirement is not satisfied; expected differs from actual; existing functionality broke; critical edge case fails; integration fails; security issue exists; build failure was introduced.
→ Send the issue to `nitesh-bug-fix`.

### BLOCKED
Use when testing cannot be completed because of: missing environment, missing credentials, unavailable service, infrastructure problem, database unavailable, RabbitMQ unavailable, external dependency unavailable.

Never convert BLOCKED into PASS.

---

## PHASE 5 — BUG FIX

When QA returns FAIL, `nitesh-bug-fix` must:
1. Read the QA failure.
2. Reproduce the problem.
3. Identify root cause.
4. Inspect related code.
5. Apply minimal safe fix.
6. Avoid unrelated refactoring.
7. Run targeted tests.
8. Run build.
9. Review diff.
10. Return to `nitesh-feature-tester`.

---

## PHASE 6 — RE-TEST

After a bug fix, `nitesh-feature-tester` must NOT only test the changed line. It must:
1. Re-test the original failure.
2. Test the complete affected flow.
3. Test relevant edge cases.
4. Run regression checks.
5. Verify the fix did not introduce another problem.

If FAIL:
```text
nitesh-bug-fix → feature tester → FAIL → nitesh-bug-fix
```
Continue until the defect is resolved or explicitly blocked.

---

## PHASE 7 — GENERAL REGRESSION

After feature QA passes, `nitesh-tester` (General Regression mode) performs broader validation. Check: existing APIs, existing flows, shared services, authentication, authorization, database operations, RabbitMQ, Redis, background jobs, integrations, build, tests, security, code health.

The purpose is to ensure that the feature is safe within the larger application.

---

## PHASE 8 — FINAL RELEASE GATE

The final tester must provide a FINAL VERDICT, one of:
- **SAFE TO PROCEED** — everything relevant passed.
- **NOT SAFE TO PROCEED** — a significant defect or regression exists.
- **BLOCKED** — required validation could not be completed.

---

## NO BYPASS RULE

The following shortcuts are NOT allowed:
- Developer cannot declare feature production-ready without QA.
- Passing the build alone is not enough.
- Passing unit tests alone is not enough.
- Feature tester cannot ignore existing-flow regression.
- Tester cannot ignore failed scenarios.
- Failed QA cannot be marked PASS without re-testing.
- BLOCKED cannot be marked PASS.
- Tests must not be disabled to achieve PASS.
- Errors must not be suppressed to achieve PASS.
- Unrelated refactoring must not be introduced during bug fixing.

---

## CHANGE CONTROL

Every change:
```text
Understand → Inspect → Design → Implement → Self-Test → QA → Regression → Final Gate
```

If a defect appears:
```text
Defect → Root Cause → Bug Fix → Self-Test → QA Re-Test → Regression
```

---

## DEFINITION OF DONE

A feature is NOT DONE when: code is written; build passes; developer says it works; one API test passes.

A feature is DONE only when:
```text
Requirement + Expected Behavior + Actual Behavior + Complete Flow + Edge Cases + Error Handling + Integration + Regression + Build + Security + Code Health = DONE
```

---

## FINAL WORKFLOW REPORT

```text
========================================
NITESH DEVELOPMENT WORKFLOW REPORT
========================================

Feature:
<feature name>

Requirement:
<summary>

Developer:
nitesh-feature-dev

Feature QA:
PASS / FAIL / BLOCKED

Bug Fixes:
<number>

Re-Test:
PASS / FAIL / BLOCKED

Regression:
PASS / FAIL

Build:
PASS / FAIL

Integration:
PASS / FAIL / BLOCKED / N/A

Security:
PASS / FAIL / N/A

Code Health:
PASS / FAIL

Issues:
<summary>

Final Verdict:
SAFE TO PROCEED
OR
NOT SAFE TO PROCEED
OR
BLOCKED

Release Recommendation:
<recommendation>
========================================
```

---

## GOLDEN PRINCIPLE

The workflow exists to protect the existing application.

Never optimize for:
> "Make the feature work."

Optimize for:
> "Make the feature work correctly while preserving everything that already works."

Every new feature must pass through:
```text
FEATURE DEV → FEATURE TESTER → BUG FIX (if required) → FEATURE TESTER RE-TEST → GENERAL TESTER → FINAL RELEASE GATE
```

No step should be skipped without an explicit and documented reason.
