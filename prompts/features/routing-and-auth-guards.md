---
date: 2026-09-05
task: Add /, /watchlist, /auth routes in App.jsx (Header persists across all); protect /watchlist and redirect /auth when already authenticated via useNavigate() calls inside useWatchlistViewModel/useAuthViewModel reading AuthContext; gate Home's handleAddToWatchlist on auth, redirecting to /auth instead of saving when signed out
category: features
---

Update the application routing and authentication behaviour.

Requirements:

- add an /auth route that displays AuthView
- keep HomeView publicly accessible
- protect the /watchlist route
- when an unauthenticated user opens /watchlist, redirect them to /auth
- when an authenticated user opens /auth, redirect them to /
- preserve the Header on every page
- use user and authLoading from AuthContext
- respect authLoading before deciding whether to redirect

Add to Watchlist behaviour:

- if an authenticated user clicks "Add to Watchlist" from a MovieCard on Home, save the movie using the existing Watchlist flow
- if an unauthenticated user clicks "Add to Watchlist", do not attempt to save the movie and redirect them to /auth
- do not call Firebase directly from MovieCard or HomeView

Architecture:

- keep authentication checks, navigation decisions, and Add to Watchlist action logic in the appropriate ViewModel rather than putting business logic directly in the View
- HomeView and MovieCard should receive the required state/actions through props
- use React Router navigation through the ViewModel where navigation is required
- keep Firebase communication in the existing service/model layers
- do not import authService or firebaseService directly into Views
- do not duplicate authentication state outside AuthContext
- preserve existing search, initial movies, Watchlist, and authentication functionality
- make only the changes required for routing and this authentication behaviour
