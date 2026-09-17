---
name: sf-mail-is-personal
description: "sf Quick → Mail is a personal per-user mailbox like gf PersonalMail, not a shared company inbox"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5f66aec9-eebe-4717-bec9-47fcd9307015
  modified: 2026-09-17T05:49:48.087Z
---

On 2026-09-17 the user decided that StaffCore Mail (`/mail`, under Quick in the sidebar) works like the gf (`global-connect-new`) PersonalMail page. Every user connects their OWN Gmail / Zoho / IMAP mailbox with an app password and reads and replies there. It is not a shared support@ inbox, even though I had proposed that first.

**Why:** they said "jaisa gf me hai osa". The admin "Mailboxes" module (`mail-accounts`, org mailboxes with `users[]`) is a separate feature and stays admin-only.

**How to apply:**
- Keep sb `src/modules/mail` (personal: `personal_mail_account`, `mail_thread`, `mail_message`) apart from `mail-accounts`.
- No permission gate on `/api/mail`. Scope everything to the token's user and the current account id.
- The Mail nav row is visible to everyone and shows the connect form until a mailbox is connected.

See [[module-access-portal-wise]] and [[portal-ui-text-english-only]].
