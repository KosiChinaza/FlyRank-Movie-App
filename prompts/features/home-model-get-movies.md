---
date: 2026-09-02
task: Implement getMovies(query) in HomeModel.js — trims/validates the query and delegates to searchMovies from the OMDb service
category: features
---

Implement the Home model inside:

src/pages/Home/HomeModel.js

Import searchMovies from:

src/services/omdbMovieService.js

Create and export:

getMovies(query)

Responsibilities:

- Trim the query before processing it.
- Validate that the cleaned query contains at least two characters.
- If the query contains fewer than two characters, throw a readable error explaining that the search query must contain at least two characters.
- Call searchMovies with the cleaned query.
- Return the movie list returned by searchMovies.
- Keep the Home model focused on Home-specific data and business logic.

Since this project uses JavaScript, use JSDoc comments where useful to document the expected parameter and return value.

Do not use React hooks.
Do not use useState.
Do not use useEffect.
Do not call fetch directly.
Do not make API requests directly from HomeModel.js.
Do not modify HomeView.jsx.
Do not modify useHomeViewModel.js.
Do not modify the Header or Watchlist files.
Do not add any UI.

Keep the implementation limited to the Home model.
