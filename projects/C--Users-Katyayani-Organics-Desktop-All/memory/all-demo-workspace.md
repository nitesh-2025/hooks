---
name: all-demo-workspace
description: "Where the \"all-demo\" workspace lives (not in Downloads) and what its projects are — node-backend, staffcore, ticket frontend"
metadata:
  node_type: memory
  type: reference
  originSessionId: ca8c93aa-e4e4-45ff-a78d-f3668cf40aac
  modified: 2026-10-03T05:12:25.385Z
---

The **all-demo** workspace is at `C:\Users\Katyayani Organics\all-demo` — in the user home, **not** in Downloads (Darshan said "download folder" on 2026-10-03; it was not there).

It is a separate product from the Katyayani repos under `Desktop\All`: the Stockology staff / HRMS / ticketing system.

- `node-backend` (alias **sb**) — Express + TypeScript + Mongoose + Socket.IO; Supabase is used for file storage only, all data is in MongoDB.
- `staffcore` (alias **sf**) — Vite + React frontend that pairs with `node-backend`.
- `ticket-stocklogy-frontendQ` — ticket support frontend.

It has its own `CLAUDE.md` at the workspace root (aliases, commands, conventions) — read that first when working there. Doc format still follows [[md-doc-format]].
