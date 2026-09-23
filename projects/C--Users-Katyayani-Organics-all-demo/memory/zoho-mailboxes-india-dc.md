---
name: zoho-mailboxes-india-dc
description: Stockology Zoho mailboxes live in the India DC — smtppro.zoho.in / imappro.zoho.in, never the .com pair.
metadata:
  type: project
---

Zoho mailboxes on `stockologysecurities.com` live in the **India** data centre.
Working hosts: `smtppro.zoho.in:587` STARTTLS (SMTP — 465 is blocked on the deployed host) and `imappro.zoho.in:993` (IMAP).
Company-domain addresses need the `pro` prefix; only addresses on Zoho's own
domains use the plain hosts.

**Why:** a Zoho account exists in exactly ONE region, and every other region
rejects it with a plain auth failure — byte-for-byte the same as a wrong
password. `smtp.zoho.com` / `imap.zoho.com` therefore return "rejected the app
password" for a perfectly valid credential, which sends debugging down the
wrong path for hours.

**How to apply:** never trust an "app password rejected" error from a Zoho host
until the region is confirmed. Probe every region before blaming the password —
`zohoHostCandidates()` in `sb` (`mail-account.model.ts`) has the list, and both
`connect()` paths now call `resolveZohoHosts()`. Related: [[sb-render-free-blocks-smtp]].
