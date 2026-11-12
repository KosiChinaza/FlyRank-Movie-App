---
date: 2026-11-12
task: Align database.rules.json with the published owner-only Realtime Database rules (no movie-field validation yet)
category: setup
---

Before creating the CineScope baseline commit, please update database.rules.json to match the exact owner-only Firebase Realtime Database rules we already published and successfully tested.

The rules should:
- Allow authenticated users to read and write only their own users/{uid}/watchlist.
- Deny access to other users' Watchlists.
- Deny access to all other database paths.
- Not include additional movie-field validation rules yet.

Do not modify any application code, Firebase Console settings, or unrelated files.

Validate the JSON and confirm the final rules match the published version.
