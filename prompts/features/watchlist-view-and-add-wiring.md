---
date: 2026-09-03
task: Implement WatchlistView.jsx (loading/error/empty/list via useWatchlistViewModel + MovieCard remove action) and wire the Home screen's Add to Watchlist button through a new handleAddToWatchlist action in useHomeViewModel.js -> WatchlistModel -> firebaseService, with MovieCard made prop-driven for both add and remove actions
category: features
---

Implement the Watchlist view and complete the Add to Watchlist.

PART 1, WATCHLIST VIEW

Implement:

src/pages/Watchlist/WatchlistView.jsx

Requirements:

- Use useWatchlistViewModel().
- Display a loading message while Watchlist movies are loading.
- Display a readable error message when an error exists.
- Render saved Watchlist movies using MovieCard and .map().
- Show a friendly empty-state message when there are no saved Watchlist movies.
- Allow a movie to be removed from the Watchlist.
- Do not call Firebase directly.
- Do not import WatchlistModel directly.
- Keep the View focused on rendering and user interactions.

For each movie in the Watchlist:

- Render MovieCard.
- Pass the existing movie object to MovieCard.
- Provide a remove action so clicking the Watchlist removal button calls removeMovie(movie.imdbID).
- The movie should disappear from the local Watchlist immediately after a successful removal.

PART 2, CONNECT THE EXISTING "ADD TO WATCHLIST" BUTTON

The MovieCard used on the Home screen already contains an "Add to Watchlist" button, but it must now actually save the selected movie to Firebase.

Inspect the current implementation and wire this functionality correctly.

Requirements:

- Clicking "Add to Watchlist" on a movie card from the Home screen must save that specific movie to Firebase Realtime Database.
- Use the existing architecture instead of calling Firebase from MovieCard.

The data flow should remain:

MovieCard / Home UI
→ Home ViewModel or appropriate ViewModel action
→ WatchlistModel
→ firebaseService
→ Firebase Realtime Database

- Do not import firebaseService directly into MovieCard.
- Do not call Firebase directly from MovieCard, HomeView, or Header.
- Reuse the existing saveToWatchlist(movie) function from WatchlistModel.
- Add the minimum ViewModel action required to save a selected movie.
- Pass that action down to MovieCard as a callback prop.

MovieCard should remain primarily presentational.

The MovieCard button should call the callback supplied by its parent rather than communicating with Firebase itself.

MOVIECARD BEHAVIOUR

The reusable MovieCard should support both contexts:

1. On the Home screen:
   - Show "Add to Watchlist".
   - Clicking it saves that movie to Firebase.

2. On the Watchlist screen:
   - Show a remove action such as "Remove from Watchlist".
   - Clicking it removes the movie using removeMovie(movie.imdbID).

Use props to determine which action the card should perform.

Do not create separate duplicated movie card components unless necessary.

ERROR HANDLING

- If adding a movie fails, expose/store a readable error through the appropriate ViewModel.
- Do not silently fail.
- Do not use alert() unless the existing application already uses alerts.
- Prevent duplicate implementation of Firebase logic.

ARCHITECTURE RULES

Keep this flow intact:

HomeView / MovieCard
- ViewModel
- WatchlistModel
-  firebaseService
-  Firebase

and:

WatchlistView
- useWatchlistViewModel
- WatchlistModel
- firebaseService
- Firebase

Do not:
- call Firebase directly from React components
- import firebaseService into MovieCard
- duplicate Firebase functions
- add authentication
- modify OMDb search logic
- modify the Header search functionality
- make unrelated refactors

Before making changes:
1. Inspect the current MovieCard, HomeView, Home ViewModel, WatchlistModel, useWatchlistViewModel, and firebaseService.
2. check which files need to change.
3. Then implement the minimum changes required.
