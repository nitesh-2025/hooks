// UserPromptSubmit hook: when the prompt matches a workflow, remind Claude
// to load the matching skill (nitesh-bug-fix, nitesh-tester).
const rules = [
  {
    skill: 'nitesh-bug-fix',
    pattern:
      /\b(bugs?|errors?|fix(es|ing)?|crash(es|ed|ing)?|broken|exceptions?|fail(s|ed|ing|ure)?|issues?|not working)\b|kaam nahi|nahi chal|chal nahi|nahi ho raha|galat/i,
    context:
      'nitesh-bug-fix: this prompt looks like a bug report. If it is, load the nitesh-bug-fix skill and follow its workflow in order (understand -> inspect -> root cause -> smallest safe fix -> build/tests -> regression -> git diff review -> final report). Do not claim it is fixed without validation.',
  },
  {
    skill: 'nitesh-tester',
    pattern:
      /\b(test(s|ing|er)?|qa|regression|verify|verification|release|ship)\b|test kar|check kar|sahi hai kya|safe hai kya|chal raha hai kya/i,
    context:
      'nitesh-tester: this prompt looks like a testing/QA request. If it is, load the nitesh-tester skill: understand EXPECTED vs ACTUAL and the existing flow, test the full flow, edge cases, errors, build and regression, then give the NITESH TESTER QA REPORT with a PASS / FAIL / BLOCKED verdict. Never call BLOCKED a PASS.',
  },
  {
    skill: 'nitesh-feature-dev',
    pattern:
      /\b(features?|implement(s|ed|ing|ation)?|develop|new (page|screen|api|endpoint|module|component|flow))\b|banao|bana do|banana hai|add kar|naya|nayi/i,
    context:
      'nitesh-feature-dev: this prompt looks like a new feature request. If it is, load the nitesh-feature-dev skill: understand the requirement, inspect the existing code and flow, design first, make the smallest complete change following project conventions, build, self-test, review git diff, then give the NITESH FEATURE DEV development report and hand off to nitesh-tester. Do not claim completion without validation.',
  },
  {
    skill: 'nitesh-dev-workflow',
    pattern:
      /\b(workflow|end[- ]to[- ]end|production[- ]ready|release gate|go[- ]live)\b|poora process|pura process|shuru se end tak|live karna/i,
    context:
      'nitesh-dev-workflow: this prompt asks for the full development lifecycle or release readiness. If it does, load the nitesh-dev-workflow skill and run its phases in order (feature dev -> feature QA -> bug-fix loop on FAIL -> re-test -> general regression -> final release gate), ending with the NITESH DEVELOPMENT WORKFLOW REPORT. Never skip a phase or turn BLOCKED into PASS.',
  },
  {
    skill: 'nitesh-designer',
    pattern:
      /\b(design(s|ed|ing|er)?|redesign|ui|ux|mockups?|wireframes?|layouts?|figma|look and feel)\b|dikhne|dikhna|sundar|achha dikh/i,
    context:
      'nitesh-designer: this prompt involves UI/UX design. If it does, load the nitesh-designer skill: establish Figma-level structure (grid, spacing, type scale, tokens, states), weigh conventional -> better -> exceptional solutions, check every persona (first-time, expert, power user, manager, support, developer, business), pick the right information density, and avoid trend-copying and generic SaaS templates. Stay consistent with the existing app components.',
  },
];

let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  let prompt = '';
  try {
    prompt = JSON.parse(input).prompt || '';
  } catch {
    return;
  }

  const matched = rules.filter((rule) => rule.pattern.test(prompt));
  if (matched.length === 0) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: matched.map((rule) => rule.context).join('\n'),
      },
    })
  );
});
