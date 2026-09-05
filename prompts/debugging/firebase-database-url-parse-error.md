---
date: 2026-09-05
task: Fix "FIREBASE FATAL ERROR: Cannot parse Firebase url" — root cause was a duplicate VITE_FIREBASE_DATABASE_URL key in .env (a stale empty stub plus the real value); firebaseService.js itself was already correct
category: debugging
---

Fix the Firebase Realtime Database initialization error.

Current error:

FIREBASE FATAL ERROR: Cannot parse Firebase url

Inspect:

src/services/firebaseService.js

and the Firebase environment variable usage.

Requirements:

- use VITE_FIREBASE_DATABASE_URL from .env for Realtime Database
- do not use placeholder database URLs
- preserve the existing Authentication and Firestore setup
- preserve the existing Watchlist functions
- keep auth exported from getAuth
- keep db exported from getFirestore
- initialize Realtime Database separately with getDatabase for the existing Watchlist logic
- do not modify the UI
- do not add new functionality
- make only the changes necessary to fix the Firebase initialization error
