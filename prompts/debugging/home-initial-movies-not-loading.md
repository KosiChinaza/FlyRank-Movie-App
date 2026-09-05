---
date: 2026-09-03
task: Fix Home screen never loading initialMovies() — add a mount-only useEffect in useHomeViewModel.js that calls HomeModel.initialMovies() and populates movies/loading/error, so a fresh random set loads whenever the screen mounts
category: debugging
---

Debug the Home screen behavior of the app.
Current problem:

- When the application first opens, the Home screen should load the random movie selection from initialMovies().
- After I search for a movie, search results replace the initial movies.
- When I navigate away from Home and then return to the Discover/Home route, I expect a fresh random set of movies to load again.
- Currently, returning to Home does not reload the random movies.

Please inspect the current MVVM flow and identify why initialMovies() is not being triggered when the Home screen loads or reloads.

Relevant architecture:

HomeView.jsx
→ useHomeViewModel.js
→ HomeModel.js
→ omdbMovieService.js

Requirements:

- Fix the issue using the existing MVVM structure.
- initialMovies() must remain in HomeModel.js.
- The API service must remain in omdbMovieService.js.
- HomeView must not call initialMovies() directly.
- HomeView must not call the API directly.
- The logic for triggering the initial movie load should live in the ViewModel where React lifecycle/state logic belongs.
- Preserve the existing manual search functionality.
- Preserve loading and error handling.
- Returning to the Discover/Home screen should result in a fresh random movie selection.
- Do not implement Firebase.
- Do not implement Watchlist functionality yet.
- Do not make unrelated changes.

Use JavaScript and JSX only. Do not use TypeScript.

Before changing the code, briefly explain the cause of the problem and which file should own the fix.
