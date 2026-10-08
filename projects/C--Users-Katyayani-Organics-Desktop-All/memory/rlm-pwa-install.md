---
name: rlm-pwa-install
description: "2026-10-08 rlm-portal PWA (vite-plugin-pwa): Settings → Install App only entry point; dev server has NO service worker (devOptions off — workbox-build cannot bundle the dev worker here); test with build + vite preview"
metadata:
  node_type: memory
  type: project
  originSessionId: e1154b7b-4550-4ca0-9acc-150d43a8a515
  modified: 2026-10-08T13:33:51.696Z
---

On 2026-10-08 rlm-portal became installable (commit 28f43f8 on `new-events-added-api`): `vite-plugin-pwa` 2.0 (dev dep), manifest "Katyayani RetailHub"/"RetailHub", start_url `/manager/events`, theme `#28AF60`, icons `public/pwa-{192x192,512x512,maskable-512x512}.png` generated from `katyayani-organics-original.png` with Windows System.Drawing (no sharp). Workbox: precache app shell only, `navigateFallback /index.html`, `/api/*` denylisted, no runtime caching, `autoUpdate`. `src/hooks/usePWAInstall.ts` (beforeinstallprompt / appinstalled / display-mode standalone) + `src/components/settings/InstallAppCard.tsx` rendered only by `src/pages/agent/Settings.tsx`.

**Why:** Darshan pasted a PWA spec ("Events Manager") and asked if it was possible without breaking anything; brand name used instead of the spec's placeholder (two strings if he wants "Events Manager").

**How to apply:** `devOptions.enabled` must stay false: with workbox-build 7.4 + this rollup the dev worker fails ("Source phase import ./_version.js must be external", both module and classic), and the prod build is unaffected. Local install testing = `npm run build && npx vite preview` (Chrome treats localhost as secure). The install prompt is Chromium-only; Safari/iOS/Firefox get the Add-to-Home-Screen hint. Install state is read from the browser, never localStorage. Related: [[rlm-sidebar-rail]], [[rlm-portal-typecheck]].
