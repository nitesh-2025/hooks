---
name: sb-render-free-blocks-smtp
description: sb mail send fails with 502 on Render because the free plan blocks outbound SMTP ports; IMAP still works.
metadata:
  type: project
---

`sb` (node-backend) is deployed on Render at https://node-stocklogy-backend.onrender.com with `plan: free` in `render.yaml`. Render free web services block outbound traffic to SMTP ports 25/465/587 (rolled out Sept 2025), so `POST /mail/send` fails while reading/syncing mail keeps working.

**Why:** IMAP (993) is not blocked, SMTP (Zoho 465) is. That asymmetry — "GET works, send doesn't" — is the signature of this block, not a code bug. The 502 is the app's own status from `mail.service.ts` → `AppError(mailErrorMessage(e), 502)`, not a Render gateway error.

**How to apply:** If mail send breaks on the deployed `sb`, check Render logs for `code=ETIMEDOUT command=CONN` before touching `mail.transport.ts` or `mail.service.ts` — no code change can fix a blocked port. The fix is infra: paid Render instance, or move off Render. Do NOT propose SendGrid/Resend as the fix; it breaks the per-user "send from your own mailbox with your own app password" design. Port 25 stays blocked even on paid plans. Verified 2026-09-21; stale if the plan is upgraded.
