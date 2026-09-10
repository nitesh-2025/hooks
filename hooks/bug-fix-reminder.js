// UserPromptSubmit hook: when the prompt looks like a bug report,
// remind Claude to follow the nitesh-bug-fix skill workflow.
let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  let prompt = '';
  try {
    prompt = JSON.parse(input).prompt || '';
  } catch {
    return;
  }

  const bugPattern =
    /\b(bugs?|errors?|fix(es|ing)?|crash(es|ed|ing)?|broken|exceptions?|fail(s|ed|ing|ure)?|issues?|not working)\b|kaam nahi|nahi chal|chal nahi|nahi ho raha|galat/i;
  if (!bugPattern.test(prompt)) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext:
          'nitesh-bug-fix: this prompt looks like a bug report. If it is, load the nitesh-bug-fix skill and follow its workflow in order (understand -> inspect -> root cause -> smallest safe fix -> build/tests -> regression -> git diff review -> final report). Do not claim it is fixed without validation.',
      },
    })
  );
});
