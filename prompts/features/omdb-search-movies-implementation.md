---
date: 2026-09-02
task: Implement the searchMovies(query) async function in omdbMovieService.js, calling the OMDb API with the VITE_OMDB_API_KEY env var and JSDoc-documented Movie/OmdbSearchResponse shapes
category: features
---

Implement the OMDb movie search request inside:

src/services/omdbMovieService.js

Create an exported async function:

searchMovies(query)

Requirements:

- Use the OMDb API.
- Use the API URL: https://www.omdbapi.com/
- Read the API key from the Vite environment variable VITE_OMDB_API_KEY.
- Encode the search query before adding it to the API request.
- Use the Movie and OmdbSearchResponse data structures already defined in the project, if they exist.
- Return the Search array from the OMDb response as the movie results.
- Throw a readable error when the HTTP request fails.
- Throw a readable error when OMDb returns Response: "False".
- Add JSDoc documentation to clearly describe the expected parameter and return value.

Do not use React hooks.
Do not use useEffect.
Do not manage loading, error, or component state.
Do not create or modify React components.
Do not implement the search UI yet.
Do not connect this service to the Home screen yet.
Do not add Firebase functionality.

Keep all OMDb API communication inside this service file.
