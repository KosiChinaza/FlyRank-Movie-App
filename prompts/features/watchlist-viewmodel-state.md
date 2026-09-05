---
date: 2026-09-03
task: Implement useWatchlistViewModel() — watchlist/loading/error state, mount-effect initial load via WatchlistModel, loadMovies() and removeMovie(imdbID) with optimistic local removal
category: features
---

Implement a custom React hook inside:

src/pages/Watchlist/useWatchlistViewModel.js

Create and export:

useWatchlistViewModel()

Manage these properties using useState:

- watchlist
- loading
- error

Create functions:

- loadMovies()
- removeMovie(imdbID)

Requirements:

- Use WatchlistModel.js only.
- Import the required functions from:
  src/pages/Watchlist/WatchlistModel.js
- loadMovies() should load the saved Watchlist movies through WatchlistModel.
- Load the Watchlist automatically when the screen opens.
- Use useEffect for the initial load.
- Set loading to true while loading movies.
- Clear any previous error before starting the load.
- Store the returned movie array in watchlist state.
- Store a readable error message if loading fails.
- Set loading to false when loading finishes.

For removeMovie(imdbID):

- Remove the movie through WatchlistModel.
- After successful removal, update the local watchlist state so the removed movie disappears immediately.
- Do not reload the entire Watchlist from Firebase unless necessary.
- Store a readable error message if removal fails.

Return all state and actions required by WatchlistView, including:

- watchlist
- loading
- error
- loadMovies
- removeMovie

Architecture requirements:

- Do not render JSX.
- Do not import firebaseService.js directly.
- Do not call Firebase directly.
- Do not modify WatchlistView.jsx yet.
- Do not modify MovieCard.jsx yet.
- Do not add authentication.
- Do not modify the Home screen.
- Do not make unrelated changes.

Keep Firebase communication inside firebaseService.js and keep the ViewModel focused on React state and Watchlist actions.
