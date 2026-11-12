# Prompts

A running log of the prompts that produced meaningful changes to this project. Each prompt is saved verbatim — never edited, corrected, or paraphrased — as its own Markdown file, grouped by category.

## Structure

- `features/` — prompts that added or changed a feature
- `ui/` — prompts about visual design, styling, and UI structure
- `debugging/` — prompts that fixed a bug or error
- `setup/` — prompts about project scaffolding/initialization
- `meta/` — prompts about this logging process itself, or other project process/tooling

New category folders are added as new kinds of work come up.

## File format

Each file has:

- A short, descriptive filename (no numeric prefix — chronological order is tracked below)
- Frontmatter with the date and a brief description of the task
- The original prompt, copied exactly as given

## Chronological index

1. [setup/clear-default-vite-content.md](setup/clear-default-vite-content.md) — 2026-09-02 — Strip default Vite scaffold content down to a minimal app with an empty App component
2. [ui/dark-cinematic-design-direction.md](ui/dark-cinematic-design-direction.md) — 2026-09-02 — Establish the standing dark cinematic design direction for the app
3. [meta/prompt-logging-convention.md](meta/prompt-logging-convention.md) — 2026-09-02 — Set up this prompts/ log and its folder convention
4. [ui/header-component.md](ui/header-component.md) — 2026-09-02 — Build the reusable Header component (brand, nav links, search, Sign In CTA)
5. [features/home-screen-mvvm-structure.md](features/home-screen-mvvm-structure.md) — 2026-09-02 — Create the empty MVVM file structure for the Home screen
6. [features/watchlist-screen-mvvm-structure.md](features/watchlist-screen-mvvm-structure.md) — 2026-09-02 — Create the empty MVVM file structure for the Watchlist screen
7. [features/omdb-movie-service-stub.md](features/omdb-movie-service-stub.md) — 2026-09-02 — Create an empty OMDb movie service file with a placeholder comment
8. [features/omdb-search-movies-implementation.md](features/omdb-search-movies-implementation.md) — 2026-09-02 — Implement searchMovies(query) in omdbMovieService.js
9. [features/home-model-get-movies.md](features/home-model-get-movies.md) — 2026-09-02 — Implement getMovies(query) in HomeModel.js
10. [features/home-viewmodel-search-state.md](features/home-viewmodel-search-state.md) — 2026-09-03 — Implement useHomeViewModel() search state and handleSearch()
11. [ui/home-view-movie-grid.md](ui/home-view-movie-grid.md) — 2026-09-03 — Implement HomeView.jsx movie results grid with loading/error/empty states
12. [features/home-model-initial-movies.md](features/home-model-initial-movies.md) — 2026-09-03 — Implement initialMovies() in HomeModel.js
13. [ui/movie-card-component.md](ui/movie-card-component.md) — 2026-09-03 — Create MovieCard component and refactor HomeView to use it
14. [debugging/home-initial-movies-not-loading.md](debugging/home-initial-movies-not-loading.md) — 2026-09-03 — Fix initialMovies() never being triggered by adding a mount effect to useHomeViewModel.js
15. [debugging/header-search-wiring.md](debugging/header-search-wiring.md) — 2026-09-03 — Lift useHomeViewModel() into App.jsx and prop-drill search state into Header/HomeView
16. [features/firebase-service-init.md](features/firebase-service-init.md) — 2026-09-03 — Create firebaseService.js initializing Firebase and exporting the Realtime Database instance
17. [features/firebase-watchlist-crud.md](features/firebase-watchlist-crud.md) — 2026-09-03 — Add addToWatchlist/removeFromWatchlist/getWatchlist to firebaseService.js
18. [features/watchlist-model-wrapper.md](features/watchlist-model-wrapper.md) — 2026-09-03 — Implement WatchlistModel.js as a thin wrapper over firebaseService.js
19. [features/watchlist-viewmodel-state.md](features/watchlist-viewmodel-state.md) — 2026-09-03 — Implement useWatchlistViewModel() state, initial load effect, loadMovies(), removeMovie()
20. [features/watchlist-view-and-add-wiring.md](features/watchlist-view-and-add-wiring.md) — 2026-09-03 — Implement WatchlistView.jsx and wire the Home Add to Watchlist button end-to-end
21. [features/firebase-auth-firestore-init.md](features/firebase-auth-firestore-init.md) — 2026-09-03 — Add getAuth/getFirestore to firebaseService.js and create .env.example
22. [debugging/firebase-database-url-parse-error.md](debugging/firebase-database-url-parse-error.md) — 2026-09-05 — Fix "Cannot parse Firebase url" caused by a duplicate VITE_FIREBASE_DATABASE_URL in .env
23. [features/auth-service.md](features/auth-service.md) — 2026-09-05 — Create authService.js wrapping Firebase Authentication
24. [features/auth-screen-mvvm-structure.md](features/auth-screen-mvvm-structure.md) — 2026-09-05 — Create the empty MVVM file structure for the Auth screen
25. [features/auth-model-validation.md](features/auth-model-validation.md) — 2026-09-05 — Implement AuthModel.js register/login/logout with email normalization and validation
26. [features/auth-viewmodel-form-state.md](features/auth-viewmodel-form-state.md) — 2026-09-05 — Implement useAuthViewModel() form state, handleSubmit(), toggleMode()
27. [ui/auth-view-form.md](ui/auth-view-form.md) — 2026-09-05 — Implement AuthView.jsx login/register form
28. [features/auth-context-provider.md](features/auth-context-provider.md) — 2026-09-05 — Create AuthContext/AuthProvider and wrap the app in main.jsx
29. [features/routing-and-auth-guards.md](features/routing-and-auth-guards.md) — 2026-09-05 — Add /, /watchlist, /auth routes and auth-gated navigation via ViewModels
30. [features/per-user-watchlist-and-logout.md](features/per-user-watchlist-and-logout.md) — 2026-09-05 — Move Watchlist to users/{userId}/watchlist and add Header Logout button
31. [setup/phase-0-project-hygiene.md](setup/phase-0-project-hygiene.md) — 2026-11-12 — Capstone Phase 0: rename to CineScope, add meta description, remove unused Firestore, verify secrets, lint and build
32. [features/watchlist-toast-notifications.md](features/watchlist-toast-notifications.md) — 2026-11-12 — Accessible toast notifications for Watchlist add/remove success and failure, with duplicate-submission protection
33. [setup/stable-baseline-preparation.md](setup/stable-baseline-preparation.md) — 2026-11-12 — Version database rules, document Firebase setup, harden .env ignores, lint/build, review pending changes for the baseline commit
34. [setup/database-rules-match-published.md](setup/database-rules-match-published.md) — 2026-11-12 — Align database.rules.json with the published owner-only rules (field validation removed)
