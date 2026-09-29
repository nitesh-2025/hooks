---
name: md-doc-format
description: Every .md doc Claude creates needs a Title header (with base URL) and a bottom Description section with Created by + base URL
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 637aea7e-4561-4309-b6ca-98ce0ce6fbdc
  modified: 2026-09-29T08:03:26.168Z
---

Every `.md` file I create (API docs, plans, flow docs — any project) must have:

1. **Header:** `# <Title>` as the first line, right under it a small meta table — Project, **Base URL** (full local URL like `http://localhost:<port>/api/v2/...` plus the path), Content-Type (for APIs), Status.
2. **Bottom:** a `## Description` section after a `---` separator — short, proper explanation of what the doc/feature is, collections/DB involved, auth, **Base URL**, **Created by: Nitesh** (user 2026-09-18: "Nitesh rahega", not "Mr. Nitesh β"), **Created on: <YYYY-MM-DD>**.

3. **Schemas as copy-able code blocks:** any DB schema in a doc goes in fenced ```json blocks like the request payload does — one block with a full sample document (real-looking values), one with the same shape and `type | default | rules` as values. Tables are a supplement below, never the only form. Same for the update a flow runs (`$set` / `$push`). All blocks must be valid JSON.

**Why (schemas):** User (2026-09-29) asked for the schema "jaisa payload de rahe ho value me" in click-to-copy mode; a tables-only schema was not what they wanted.

**Why:** User (2026-09-17) asked that every md have a title in the header and a proper description at the bottom with created-by and base URL.

**How to apply:** Find the real port/prefix from the repo (e.g. `src/config/configuration.ts` PORT, `main.ts` setGlobalPrefix) instead of guessing. For docs with no API, skip Base URL rows. Related: [[assistant-identity]].
