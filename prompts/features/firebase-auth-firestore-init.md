---
date: 2026-09-03
task: Add getAuth/getFirestore to firebaseService.js (export auth and db) alongside the existing Realtime Database Watchlist functions, and create .env.example with placeholder Firebase/OMDb vars
category: features
---

Install Firebase if it is not already installed and update the existing Firebase configuration.

Create or update:

src/services/firebaseService.js

Requirements:

- initialize Firebase using the existing Vite environment variables
- initialize Firebase Authentication using getAuth
- initialize Cloud Firestore using getFirestore
- export auth and db
- use the modern modular Firebase SDK
- preserve the existing Watchlist functions and do not break their current functionality
- do not add registration or login UI yet
- do not add anything new regarding Watchlist logic
- do not modify other components

Also create:

.env.example

Add placeholder versions of the Firebase environment variables and VITE_OMDB_API_KEY.

Do not put real credentials in .env.example.
