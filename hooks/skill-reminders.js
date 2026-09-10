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
