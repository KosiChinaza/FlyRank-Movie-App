---
date: 2026-09-03
task: Lift useHomeViewModel() into App.jsx as the single instance, prop-drill query/setQuery/handleSearch into Header and query/movies/loading/error into HomeView so the Header search input and button actually trigger movie searches
category: debugging
---

Implement the search wiring fix using the existing MVVM structure.

Current problem:

- Header contains the search input and Search button.
- useHomeViewModel() currently runs inside HomeView.
- Header and HomeView are sibling components in App.jsx.
- Header therefore has no access to query, setQuery, or handleSearch.
- The search input currently has no value or onChange binding, and the form does not call handleSearch.

Use this architecture:

App.jsx
→ useHomeViewModel()
→ Header receives search-related props
→ HomeView receives display-related props

Requirements:

1. Update App.jsx
- Import and call useHomeViewModel() once in App.jsx.
- Destructure:
  - query
  - setQuery
  - movies
  - loading
  - error
  - handleSearch
- Pass query, setQuery, and handleSearch to Header.
- Pass query, movies, loading, and error to HomeView.
- Do not create a second useHomeViewModel() instance.

2. Update Header.jsx
- Receive query, setQuery, and handleSearch through props.
- Bind the existing search input value to query.
- Update query using setQuery when the user types.
- Keep the existing search input and Search button UI.
- When the form is submitted:
  - prevent the default browser behavior
  - call handleSearch()
- Pressing Enter in the search input should also trigger the form submission.
- Do not call APIs directly.
- Do not import HomeModel or omdbMovieService.
- Preserve the existing Header styling and navigation.

3. Update HomeView.jsx
- Remove the call to useHomeViewModel().
- Receive query, movies, loading, and error through props.
- Preserve the existing loading state.
- Preserve the existing error state.
- Preserve the empty state.
- Preserve the MovieCard rendering.
- Do not add another search input or Search button.

Architecture rules:

- useHomeViewModel should be called only once for this screen flow.
- App.jsx should act as the common owner of the Home ViewModel state.
- Header should only handle presentation and user interaction through props.
- HomeView should only render the state it receives.
- Keep HomeModel and omdbMovieService unchanged unless absolutely necessary.
- Do not call fetch directly from React components.
- Do not add Firebase.
- Do not implement Watchlist functionality yet.
- Do not make unrelated refactors.
