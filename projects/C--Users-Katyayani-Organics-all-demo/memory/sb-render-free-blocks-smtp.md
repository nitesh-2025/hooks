---
name: sb-render-free-blocks-smtp
description: Deployed sb (Railway/Render) blocks outbound SMTP port 465 but 587 works — Zoho must use 587 STARTTLS.
metadata:
  node_type: memory
  type: project
  originSessionId: 950a22b0-49d9-4b0c-943b-475f6f2c1b0d
  modified: 2026-09-23T20:14:12.715Z
---

On the deployed `sb` (Railway, earlier Render free), outbound SMTP on **465 is blocked but 587 works**. Proof (2026-09-24): Gmail (`smtp.gmail.com:587`) connected fine on Railway while Zoho (`:465`) failed; locally both worked. IMAP 993 is open.

**Why:** Earlier I told the user "the platform blocks all SMTP, upgrade the plan" — that was wrong, the user's Gmail observation disproved it. The real split is per port.

**How to apply:** For deployed mail failures, compare ports before blaming the plan. Zoho SMTP now goes out on 587 + STARTTLS: `zohoHostCandidates` / `PROVIDER_HOSTS` use 587, and `toSubmissionPort()` in `mail-account.model.ts` maps stored Zoho rows on 465 → 587 at dial time. System mail (`SMTP_*` / `SUPPORT_SMTP_*` env in `common/mailer.ts`) must also use port 587 on the deployed env. Do NOT propose SendGrid/Resend — breaks the per-user "send from your own mailbox" design. Related: [[zoho-mailboxes-india-dc]].
