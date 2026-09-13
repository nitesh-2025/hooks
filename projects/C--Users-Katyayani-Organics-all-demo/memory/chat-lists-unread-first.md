---
name: chat-lists-unread-first
description: "In sf (staffcore) chat lists (Team Chats page + chat drawer), unread conversations must always be listed first"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4085fbc7-2518-481d-b4a5-56fa0cd125da
  modified: 2026-09-13T18:21:48.213Z
---

In staffcore's chat lists — the Team Chats page (`/chats`) and the chat drawer behind the Topbar message icon — conversations with unread messages always sort to the top; within the unread and read bands, newest activity first. Applies to people and groups, including search results.

**Why:** The user (Darshan) asked explicitly and said to remember it ("unread chat pahle dikhega, yaad rakho").

**How to apply:** Keep the sort in the shared `useChatLists` hook (`staffcore/src/components/chat/useChatLists.ts`) so both surfaces inherit it; any new chat list, filter or search result list must preserve unread-first ordering. Related: [[portal-ui-text-english-only]].
