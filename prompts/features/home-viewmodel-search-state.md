---
date: 2026-09-03
task: Implement useHomeViewModel() with query/movies/loading/error state and handleSearch(), driving searches through HomeModel.getMovies rather than the API service directly
category: features
---

Implement a custom React hook inside:

src/pages/Home/useHomeViewModel.js

Create and export:

useHomeViewModel()

Import getMovies from:

src/pages/Home/HomeModel.js

Use React useState to manage these properties:

- query
- movies
- loading
- error

Create a function:

handleSearch()

The function should:

- set loading to true before starting the search
- clear the previous error
- call getMovies from HomeModel using the current query
- save the returned movie list in the movies state
- catch errors from getMovies and store a readable error message in error state
- set loading to false when the search is finished, whether it succeeds or fails

Return:

- query
- setQuery
- movies
- loading
- error
- handleSearch

Requirements:

- Use React's useState hook.
- Do not render JSX.
- Do not call fetch directly.
- Do not import omdbMovieService.js directly.
- The ViewModel must communicate with the HomeModel rather than directly with the API service.
- Do not modify HomeView.jsx.
- Do not modify HomeModel.js.
- Do not modify Header.jsx.
- Do not add Firebase functionality.
- Do not add any UI.

Keep the implementation focused only on the Home ViewModel.
