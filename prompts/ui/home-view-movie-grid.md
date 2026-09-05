---
date: 2026-09-03
task: Implement HomeView.jsx — render loading/error/empty/results states from useHomeViewModel as a responsive dark-cinematic movie grid, no search controls (those live in Header)
category: ui
---

Implement the Home view inside:

src/pages/Home/HomeView.jsx

This is the main movie discovery screen for the application.

Important:
The search input and Search button already exist in the Header component. Do NOT create another search input, search form, or Search button inside HomeView.

Requirements:

- Import and use useHomeViewModel from ./useHomeViewModel.js.
- Use the values returned by useHomeViewModel to display the movie search results and their states.
- Do not create a second search input in the Home view.
- Do not create a second Search button in the Home view.
- The existing Header is responsible for the search controls.
- Render the movie list using .map().
- For each movie, display:
  - movie title
  - year
  - type
  - poster
- Display a loading message while loading is true.
- Display the error message when error exists.
- Display an appropriate message when there are no movie results.
- Use semantic HTML and accessible image alt text.
- Make the movie results visually consistent with the apps dark, cinematic UI design.
- Use a responsive grid for the movie results so the layout works on desktop, tablet, and mobile.
- Keep the styling clean, modern, and production-like.
- Do not create a reusable MovieCard component yet.

Do not call fetch directly.
Do not import HomeModel.js.
Do not import omdbMovieService.js.
Do not implement Firebase.
Do not implement the Watchlist yet.
Do not modify the existing Header component.
Do not create any additional components.
Do not add API requests directly to HomeView.

Keep the HomeView focused on presenting the data and UI provided by the ViewModel. The View should not contain the movie-fetching/business logic.
