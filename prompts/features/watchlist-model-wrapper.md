---
date: 2026-09-03
task: Implement WatchlistModel.js as a thin wrapper over firebaseService.js — loadWatchlist(), saveToWatchlist(movie), deleteFromWatchlist(imdbID)
category: features
---

Implement the Watchlist model inside:

src/pages/Watchlist/WatchlistModel.js

Import the Watchlist-related Firebase service functions from:

src/services/firebaseService.js

Create and export:

- loadWatchlist()
- saveToWatchlist(movie)
- deleteFromWatchlist(imdbID)

Requirements:

- loadWatchlist() should call getWatchlist() from firebaseService.js and return the saved movie array.
- saveToWatchlist(movie) should call addToWatchlist(movie).
- deleteFromWatchlist(imdbID) should call removeFromWatchlist(imdbID).
- Act only as a wrapper between the Watchlist ViewModel and firebaseService.js.
- Keep all direct Firebase communication inside firebaseService.js.
- Do not call Firebase directly from WatchlistModel.js.
- Do not use React hooks.
- Do not use useState or useEffect.
- Do not manage loading or error state.
- Do not modify WatchlistView.jsx yet.
- Do not modify useWatchlistViewModel.js yet.
- Do not modify MovieCard.jsx.
- Do not add authentication.
- Do not make unrelated changes 

Use JSDoc where useful to document the movie parameter and return values.

Keep the implementation minimal and focused only on the Watchlist model.
