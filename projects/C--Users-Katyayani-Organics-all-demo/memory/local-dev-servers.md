---
name: local-dev-servers
description: "Where sf/sb run locally (ports, IPv6-only Vite, devtunnel) and that Claude-in-Chrome could not render localhost:5174"
metadata:
  node_type: memory
  type: project
  originSessionId: 7d705f78-570c-4ec4-b494-5036b84b59a6
  modified: 2026-09-26T08:53:41.166Z
---

sf (staffcore) dev server runs on port 5174 bound to IPv6 only (`[::1]`, curl to 127.0.0.1 fails); sb (node-backend) runs on port 5005 and sf reaches it through a devtunnel URL set in `staffcore/.env.development` (VITE_BASE_URL). Both run via `npm run dev` with auto-reload, so code edits go live without restarts.

**Why:** On 2026-09-26 Claude-in-Chrome returned "showing error page" / "couldn't determine page" for localhost:5174 and [::1]:5174 even though curl got 200, so live UI verification failed.
**How to apply:** Verify sb/sf changes by typecheck + build + code-review agents; say plainly that logged-in rendering was not exercised unless Darshan confirms it in his own browser. Don't burn attempts on the Chrome tools for this host.
