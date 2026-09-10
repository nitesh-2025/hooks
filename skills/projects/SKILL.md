---
name: projects
description: Katyayani Organics project aliases and how to work in each one. Use whenever the user names a project by alias — pos, pos-backend, ko, nest, rlm, rlm-admin, b2b — or asks to run, build, test, lint, fix, or check git in one of these projects.
---

# Project aliases

| Alias | Folder | Path | Stack | Usual branch |
|---|---|---|---|---|
| **pos** | `franchise-pos` | `C:\Users\Katyayani Organics\Desktop\All\franchise-pos` | Vite + React + TS + shadcn, Firebase | nitesh-nitu |
| **ko** | `ko-sales-backend` | `C:\Users\Katyayani Organics\Desktop\All\ko-sales-backend` | NestJS + Mongoose + Socket.io | nitesh-nitu |
| **nest** | `rlm-backend-nest` | `C:\Users\Katyayani Organics\Desktop\All\rlm-backend-nest` | NestJS + MongoDB/Mongoose + Socket.io | main |
| **rlm** | `rlm-portal` | `C:\Users\Katyayani Organics\Desktop\All\rlm-portal` | Vite + React + TS + shadcn, Redux Toolkit, Firebase | main |
| **rlm-admin** | `rlm-admin-final` | `C:\Users\Katyayani Organics\Desktop\All\rlm-admin-final` | Vite + React + TS + shadcn, Redux Toolkit, Firebase | main |
| **b2b** | `sales-app` | `C:\Users\Katyayani Organics\Desktop\All\sales-app` | Vite + React + TS + shadcn, Firebase | main |
| **pos-backend** | `franchise-offline-hub` | `C:\Users\Katyayani Organics\Desktop\All\franchise-offline-hub` | NestJS + Mongoose | main |

No alias: `Inventory-Management-Backend` (Express + Mongoose + Socket.io).

Don't mix these up:
- **pos** = `franchise-pos` (frontend). **pos-backend** = `franchise-offline-hub` (NestJS backend).
- **nest** = `rlm-backend-nest`. `ko-sales-backend` is also NestJS but its alias is **ko**.
- **rlm** = `rlm-portal` only. **rlm-admin** = `rlm-admin-final`.

All repos live in the GitHub org **Katyayani-Organics**.

## npm scripts per project

| Alias | Scripts |
|---|---|
| pos | dev, build, build:dev, lint, typecheck, preview, test, test:watch |
| ko | build, format, start, dev, start:debug, start:prod, lint, test, test:watch, test:cov, test:debug, test:e2e, postman:generate, postman:upload, clean, build:clean |
| nest | build, start, dev, start:prod, lint, typecheck |
| rlm | dev, build, build:dev, lint, preview |
| rlm-admin | dev, build, build:dev, lint, preview, test:partner, typecheck:partner-api |
| b2b | dev, build, build:dev, lint, preview |
| pos-backend | build, format, start, dev, start:debug, start:prod, lint (no test script) |

Scripts can change — re-check `package.json` before relying on one.

## Working in a project

1. Use the full path from the table (quote it — the path has a space).
2. Before editing, check `git status` and the current branch; don't switch branches or discard changes without asking.
3. Use the package manager matching the lockfile in that folder.
4. As Dev + PM + QA: after a change, run the project's `lint`, `typecheck` (if present) and `test` (if present), and report results honestly.
