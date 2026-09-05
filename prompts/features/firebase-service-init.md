---
date: 2026-09-03
task: Create firebaseService.js — initialize Firebase from Vite env vars and export the Realtime Database instance, no read/write/auth/UI yet
category: features
---

Create and configure Firebase for the app.

Create:

src/services/firebaseService.js

Requirements:

- Initialize Firebase using environment variables.
- Export the Firebase Realtime Database instance.
- Do not save or load any Watchlist movies yet.
- Do not modify HomeView.jsx.
- Do not modify Header.jsx.
- Do not add authentication.
- Do not implement Watchlist functionality yet.
- Do not add any UI.
- Do not hardcode Firebase credentials directly in the source file.
- Read the Firebase configuration values from Vite environment variables.

Keep this file focused only on Firebase initialization and exporting the database instance.
