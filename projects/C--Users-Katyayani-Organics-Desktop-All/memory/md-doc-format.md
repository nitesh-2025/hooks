---
name: md-doc-format
description: Every .md doc Claude creates needs a Title header (with base URL) and a bottom Description section with Created by + base URL
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 637aea7e-4561-4309-b6ca-98ce0ce6fbdc
  modified: 2026-09-17T13:04:48.308Z
---

Every `.md` file I create (API docs, plans, flow docs — any project) must have:

1. **Header:** `# <Title>` as the first line, right under it a small meta table — Project, **Base URL** (full local URL like `http://localhost:<port>/api/v2/...` plus the path), Content-Type (for APIs), Status.
2. **Bottom:** a `## Description` section after a `---` separator — short, proper explanation of what the doc/feature is, collections/DB involved, auth, **Base URL**, **Created by: Nitesh** (user 2026-09-18: "Nitesh rahega", not "Mr. Nitesh β"), **Created on: <YYYY-MM-DD>**.

**Why:** User (2026-09-17) asked that every md have a title in the header and a proper description at the bottom with created-by and base URL.

**How to apply:** Find the real port/prefix from the repo (e.g. `src/config/configuration.ts` PORT, `main.ts` setGlobalPrefix) instead of guessing. For docs with no API, skip Base URL rows. Related: [[assistant-identity]].
