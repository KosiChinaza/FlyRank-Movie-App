---
date: 2026-09-03
task: Create the presentational MovieCard component (poster, title, year, type, unwired Add to Watchlist button) and refactor HomeView to render it instead of the duplicated inline card markup
category: ui
---

Create a reusable MovieCard component for the app.

Create:

src/components/MovieCard/MovieCard.jsx

Requirements:

- Receive one movie object through props.
- Display:
  - poster
  - title
  - year
  - type
- Add a "Add to Watchlist" button, but do not connect it to any functionality yet.
- Keep the component purely presentational.
- Do not call APIs.
- Do not use Firebase.
- Do not manage the movie list.
- Do not use React state unless strictly necessary for presentation.

UI DESIGN REQUIREMENTS:

- Match the existing CineScope dark cinematic theme.
- Use a clean movie-card layout with the poster as the dominant visual element.
- Display the title prominently beneath the poster.
- Show the year and type as smaller supporting metadata.
- Style the "Add to Watchlist" button clearly but keep it secondary to the movie information.
- Add subtle hover feedback to the card.
- Keep spacing, typography, border radius, and shadows consistent with the existing CineScope design.
- Ensure the card works well inside a responsive grid.
- Handle movies with no valid poster by showing a simple placeholder instead of a broken image.
- Use accessible alt text for poster images.
- Keep the component visually polished but avoid excessive animation or effects.

Then update:

src/pages/Home/HomeView.jsx

Requirements for HomeView:

- Import MovieCard.
- Render the movies array using .map().
- Render one MovieCard for each movie.
- Pass the movie object to MovieCard through props.
- Use imdbID as the React key.
- Remove the duplicated movie card markup that currently exists inside HomeView.
- Preserve the existing loading, error, and empty-state logic.
- Do not call APIs directly.
- Do not import HomeModel or omdbMovieService.
- Do not implement Watchlist functionality yet.
- Do not use Firebase.
- Do not modify the Header.

Keep HomeView focused on rendering the state provided by useHomeViewModel.
