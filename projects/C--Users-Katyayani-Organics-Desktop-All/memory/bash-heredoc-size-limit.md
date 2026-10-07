---
name: bash-heredoc-size-limit
description: "In this Windows Git-Bash tool, a command with a heredoc over roughly 8 KB gets cut off and bash reports \"unexpected EOF while looking for matching\"; use the Write tool for whole files"
metadata:
  node_type: memory
  type: feedback
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-07T12:32:04.715Z
---

A Bash tool command carrying a heredoc of roughly 8 KB or more was truncated on 2026-10-07 (bash: `unexpected EOF while looking for matching `''`), while the same pattern worked at 5 to 7 KB.

**Why:** The tool call itself gets cut, not the shell; the quoted heredoc (`<<'EOF'`) was fine syntactically.

**How to apply:** Keep scripted edits (node/python replacement scripts in a heredoc) under about 6 KB each, split big ones per file, and write whole new or rewritten files with the Write tool (Read the file first if it already exists). Related: [[rlm-callscreen-whatsapp-tab]].
