---
date: 2026-09-03
task: Implement initialMovies() in HomeModel.js — random seed-keyword OMDb searches in parallel, dedupe by imdbID, shuffle, return exactly 20 movies, tolerating individual keyword failures
category: features
---

Implement an initialMovies() function inside:

src/pages/Home/HomeModel.js

The purpose of this function is to provide an initial selection of movies for the Home screen when the application first opens.

Requirements:

- Create and export an async function named initialMovies().
- Automatically fetch enough movie results to return exactly 20 unique movies.
- Every application launch should be able to display a different selection of movies.
- Use a predefined seed list of movie-related search keywords.

Use a seed list similar to:

[
  "Batman",
  "Avengers",
  "Harry Potter",
  "Star Wars",
  "Spider-Man",
  "Marvel",
  "Disney",
  "Matrix",
  "Lord of the Rings",
  "Fast",
  "Mission Impossible",
  "Pixar",
  "Horror",
  "Comedy",
  "Action"
]

- Randomly select multiple keywords from the seed list for each initial load.
- Use the existing searchMovies function from:

src/services/omdbMovieService.js

- Use Promise.all() to execute the selected OMDb search requests in parallel.
- Merge the returned movie arrays into one array.
- Remove duplicate movies based on imdbID.
- Shuffle the unique movie array so the displayed order changes.
- Return exactly 20 unique movies.

Error handling:

- Handle individual search failures in a way that does not necessarily cause the entire initial movie load to fail if one seed request fails.
- If enough successful results are available, still return the final movie selection.
- Throw a readable error if the function cannot obtain enough movie data to create the initial selection.

Architecture requirements:

- Keep the fetching and movie-selection logic inside HomeModel.js.
- Use the existing omdbMovieService.
- Do not call fetch directly.
- Do not use React hooks.
- Do not use useState.
- Do not use useEffect.
- Do not modify HomeView.jsx.
- Do not modify useHomeViewModel.js yet.
- Do not modify the Header.
- Do not add Firebase functionality.
- Do not implement Watchlist functionality.

Keep the implementation focused only on adding initialMovies() to HomeModel.js.
Do not remove or unnecessarily change the existing getMovies(query) function.
