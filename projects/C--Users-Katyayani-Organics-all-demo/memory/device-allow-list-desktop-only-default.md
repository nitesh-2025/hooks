---
name: device-allow-list-desktop-only-default
description: "sf + ticket enforce per-user allowed_devices on login AND every protected render; no list = desktop-only; detection uses pointer/hover/touch hardware signals so phone \"Desktop site\" mode is still a phone."
metadata:
  node_type: memory
  type: project
  originSessionId: 767f4f90-b9a5-41fe-b2c6-658f172cbb2f
  modified: 2026-10-01T12:12:24.059Z
---

Both portals (staffcore `src/utils/device.ts`, ticket `src/utils/device.js`) gate by the user's `allowed_devices` list (mobile/tablet/desktop/laptop, admin-set on the employee/user record). Darshan's decision on 2026-10-01: an account with **no list at all is desktop-only**, same as an empty list. Enforced at sign-in (Login) and again in ProtectedRoute with a full-screen DeviceBlocked + Sign out. Shipped on both mains on 2026-10-01 (ticket 6a748d3 + 2a55140, sf on the 2026-10-01 branch merged to main).

**Why:** Agents were opening the portals on phones with the browser's "Desktop site" switch on, which fakes a PC User-Agent and a ~980px viewport. UA sniffing cannot catch that; input hardware can: `(pointer: coarse)` AND `(hover: none)` AND `maxTouchPoints > 1` is a touch-only handheld, and no desktop-site mode changes those. Touchscreen laptops keep a fine, hovering primary pointer and pass.

**How to apply:** Do not add a separate global "desktop only" gate; route any device rule through `detectDeviceType` / `isDeviceAllowed` so the admin's per-user allowances keep working. Never use `any-pointer` (flags touch laptops). Known accepted gaps: phone + Bluetooth mouse passes, DevTools spoofing passes, Surface without keyboard reads as tablet, ticket embedded (iframe) sessions are exempt. Testing without a phone: headless Chrome via CDP with `Emulation.setTouchEmulationEnabled` + `setDeviceMetricsOverride({mobile:true})` + a desktop UA override reproduces desktop-site mode (scripts lived in the session scratchpad). Related: [[sb-git-branch-and-main-merge]], [[access-is-permission-based]].
