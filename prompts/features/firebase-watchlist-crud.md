---
date: 2026-09-03
task: Add addToWatchlist(movie), removeFromWatchlist(imdbID), and getWatchlist() to firebaseService.js, keyed by imdbID, with readable errors on failure
category: features
---

Inside:

src/services/firebaseService.js

add functions for managing Watchlist movies in Firebase Realtime Database.

Create and export:

- addToWatchlist(movie)
- removeFromWatchlist(imdbID)
- getWatchlist()

Requirements:

- Use imdbID as the unique movie identifier.
- Keep all Firebase communication inside firebaseService.js.
- Use the existing Firebase Realtime Database instance already configured in this file.
- Store each movie using its imdbID as the Firebase key.
- addToWatchlist(movie) should save the movie data to Firebase.
- removeFromWatchlist(imdbID) should remove the matching movie from Firebase.
- getWatchlist() should read the saved movies from Firebase and return them as a JavaScript array.
- If Firebase returns no saved movies, return an empty array.
- Throw readable errors when add, remove, or load operations fail.
- Preserve the movie fields needed by the app, including imdbID, Title, Year, Type, and Poster.
- Use JSDoc where helpful to document parameters and returned values.

Do not use React hooks.
Do not use useState or useEffect.
Do not update the UI yet.
Do not modify HomeView.jsx.
Do not modify MovieCard.jsx.
Do not modify the Watchlist screen yet.
Do not add authentication yet.
Do not call Firebase directly from React components.

Keep all Watchlist persistence logic inside firebaseService.js.
