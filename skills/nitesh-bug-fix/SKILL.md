---
name: nitesh-bug-fix
description: Standard bug-fixing workflow (understand → inspect → root cause → smallest safe fix → build/tests → regression check → git diff review → final report). Use whenever the user reports a bug, error, crash, failing build/test, or asks to fix something that is broken in any project (pos, ko, nest, rlm, rlm-admin, b2b, or others).
---

# Nitesh Bug Fix

Every bug must be: properly understood before changing code, fixed with the smallest safe change, tested after the fix, checked for regressions, and clearly reported.

For project aliases and paths, see the `projects` skill.

## Workflow — follow in order

### 1. Understand the Bug
Inspect the reported bug carefully. Identify:
- Exact error message
- File causing the issue
- Relevant function/class/module
- Expected behavior
- Actual behavior
- Possible root cause

Do not immediately modify code.

### 2. Inspect Existing Code
Before making changes:
- Open the relevant files.
- Check related services, controllers, modules, utilities, and types.
- Check existing error handling.
- Check how the affected functionality is used elsewhere.
- Look for existing patterns in the project.

Do not introduce a new pattern if an existing project pattern can be reused.

### 3. Identify Root Cause
Find the actual root cause instead of fixing only the visible symptom.
- Bad: hide the error without fixing the underlying problem.
- Good: identify why the error occurs and correct the underlying implementation.

### 4. Make the Smallest Safe Fix
- Change only what is necessary.
- Do not refactor unrelated code.
- Do not rename unrelated variables/functions.
- Do not change APIs unnecessarily.
- Do not change database schemas unless required.
- Do not remove existing functionality.
- Preserve existing project architecture.
- Follow the project's existing coding style.

### 5. Dependencies
If the bug is caused by a missing dependency:
1. Verify whether the dependency is already expected by the project.
2. Check `package.json`.
3. Install the dependency only when required.
4. Prefer the project's existing dependency/version conventions (and the package manager matching the lockfile).
5. Do not upgrade unrelated packages.

```bash
npm install <required-package>
npm install -D @types/<package>   # TypeScript types, only when required
```

### 6. TypeScript Validation
For TypeScript/NestJS changes, check compilation after the fix, using the project's existing scripts where possible:
```bash
npm run build
# or
npx tsc --noEmit
```
Do not ignore TypeScript errors.

### 7. Run Tests
Run the relevant tests after the fix (`npm test` or the project's specific test command). If the project has targeted tests, run those first, then broader tests when practical. If a project has no test script, say so in the report.

### 8. Check for Regression
Verify that:
- The original error is resolved.
- Existing functionality still works.
- No new TypeScript errors were introduced.
- No unrelated files were modified unnecessarily.

### 9. Review Git Diff
Before completing, inspect `git diff` and `git status`. Make sure:
- Only expected files changed.
- No debug code remains.
- No console logs were accidentally added.
- No secrets or credentials were added.
- No generated/unwanted files are included.

### 10. Final Report
Provide a concise report:

```text
Bug:
<what was broken>

Root Cause:
<why the bug occurred>

Fix:
<what was changed>

Files Changed:
<list of files>

Validation:
<commands/tests executed>
Result: <Passed / Failed + details>
```

Example:
```text
Bug:
RabbitMQ service failed to compile because amqplib was missing.

Root Cause:
The project imported amqplib but the dependency was not installed.

Fix:
Installed amqplib and the required TypeScript type definitions.

Files Changed:
package.json
package-lock.json

Validation:
npm run build
Result: Passed
```

## Important Rules
Never:
- Make unrelated changes.
- Rewrite large parts of the application for a small bug.
- Delete working code without justification.
- Disable TypeScript errors.
- Disable tests to make them pass.
- Suppress errors without understanding them.
- Upgrade all dependencies unnecessarily.
- Commit secrets, `.env` files, API keys, tokens, or credentials.
- Claim a bug is fixed without validating it.

## When Information Is Missing
If the bug cannot be safely fixed because critical information is missing:
1. Inspect the repository first.
2. Try to determine the issue from existing code and logs.
3. Ask for clarification only when necessary.

Do not guess about critical business logic.

## Priority
1. Correctness
2. Safety
3. Minimal code changes
4. Existing project conventions
5. Testability
6. Performance
7. Code cleanliness

## Completion Criteria
The bug fix is complete only when:
- Root cause is identified.
- Required code changes are implemented.
- Relevant dependencies are installed if required.
- TypeScript/build validation passes.
- Relevant tests pass.
- Git diff has been reviewed.
- Final changes are clearly reported.
