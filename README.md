# FlyRank AI — Movie Discovery App

A movie discovery web application built with React and Vite. Visitors can browse a randomized selection of movies on load and search for titles via the OMDb API, while signed-in users can save movies to a personal Watchlist backed by Firebase.

## Features

- **Movie discovery** — on load, the Home screen displays a random set of 20 unique movies gathered from a rotating set of seed keywords via the OMDb API.
- **Movie search** — the search input and button in the Header query OMDb and replace the displayed results with matches for the entered term.
- **Movie cards** — each result shows its poster (with an accessible placeholder when no poster is available), title, year, and type.
- **Watchlist** — authenticated users can add a movie to their Watchlist from a movie card on Home, view their saved Watchlist, and remove movies from it, with the list updating immediately on removal.
- **Per-user data** — Watchlist entries are stored in Firebase Realtime Database under `users/{userId}/watchlist/{imdbID}`, isolated per account.
- **Authentication** — email/password registration and login via Firebase Authentication, with the session restored automatically on reload and a Logout action in the Header.
- **Route protection** — `/watchlist` redirects unauthenticated visitors to `/auth`; `/auth` redirects an already-authenticated visitor back to `/`.
- **Responsive, dark cinematic UI** — consistent styling across desktop, tablet, and mobile.

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) 7
- [Firebase](https://firebase.google.com/) — Authentication and Realtime Database (the Firestore SDK is initialized in the service layer but not currently used by any feature)
- [OMDb API](https://www.omdbapi.com/)
- ESLint

## Architecture

Each screen follows an MVVM (Model–View–ViewModel) structure under `src/pages/<Screen>/`:

- **View** (`*View.jsx`) — renders UI only, driven entirely by the values and actions its ViewModel returns. Views never call services or Firebase directly.
- **ViewModel** (`use*ViewModel.js`) — a custom hook holding a screen's React state (data, loading, error) and the actions its View can trigger, such as searching, adding/removing a Watchlist entry, or submitting the auth form. ViewModels call their screen's Model, read shared auth state from `AuthContext`, and perform any React Router navigation a screen needs (for example, redirecting to `/auth`).
- **Model** (`*Model.js`) — plain functions holding a screen's business logic and validation (e.g. validating a search query, normalizing an email address), delegating actual data access to the service layer.
- **Services** (`src/services/`) — the only layer permitted to talk to external systems: `omdbMovieService.js` (OMDb API), `firebaseService.js` (Firebase initialization, Realtime Database Watchlist operations), and `authService.js` (Firebase Authentication actions).
- **AuthContext** (`src/context/AuthContext.jsx`) — a React context that subscribes to Firebase's auth state once at the app root and exposes `user`, `authLoading`, and `logout` to any component or ViewModel that needs them, so authentication state is never duplicated elsewhere.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flyrank-ai-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables by copying the example file and filling in your own values:
   ```bash
   cp .env.example .env
   ```
   `.env.example` lists the required variables: an OMDb API key and your Firebase project's configuration. Do not commit `.env` — it holds real credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```



## AI-Assisted Development

I used Claude Code as a development assistant throughout this project. Instead of asking AI to build the entire application at once, I divided the project into smaller tasks and used individual prompts for each stage of development.

I used AI to help with setting up the MVVM structure, implementing the OMDb movie service, building the movie search and watchlist features, integrating Firebase, implementing authentication, and setting up protected routes. I also used it to debug issues that came up while testing the application.

I reviewed and tested the generated code after each major change before moving to the next feature. When something did not work as expected, I investigated the problem and used more specific debugging prompts rather than simply regenerating the application.

This approach allowed me to use AI as a development assistant while still making decisions about the application's structure, features, UI, and how different parts of the application should work together.



## Manual Improvements, Corrections and Refactoring

While reviewing and testing the AI-assisted implementation, I identified several areas that needed to be corrected or improved.

### 1. Search State and Header Wiring

The search input and Search button were initially created as UI elements without any functionality. When I later implemented movie searching, I discovered that the Header and HomeView could not share the search state because the Home ViewModel was being instantiated inside HomeView.

I reviewed the component structure and corrected the state ownership by moving the Home ViewModel to their common parent and passing the required state and actions to the Header and HomeView. This allowed both clicking the Search button and submitting the search form to use the same movie search state.

### 2. Initial Movie Loading

The `initialMovies()` function was implemented to retrieve a random selection of movies, but during testing I noticed that no movies appeared when the Home page first opened. The function existed but was not being triggered by the application lifecycle.

I corrected this by connecting the initial movie loading to the Home ViewModel so that it runs when the Home screen opens while keeping the API logic outside the View.

### 3. Reusable MovieCard Refactoring

Movie information was initially rendered directly inside HomeView. As the application grew and the same movie presentation was also needed for the Watchlist, I refactored the movie display into a reusable `MovieCard` component.

This reduced duplicated UI code and allowed the same component to support actions such as adding a movie to the Watchlist and removing it from the Watchlist.

### 4. Add to Watchlist Functionality

The initial MovieCard contained an "Add to Watchlist" button, but the button was only presentational and did not save anything.

After testing the feature, I corrected the data flow so that the button passes the selected movie through the appropriate ViewModel and Model before reaching the Firebase service. This kept Firebase communication out of the UI components while making the button functional.

### 5. Firebase Configuration Error

While integrating Firebase, I encountered a `Cannot parse Firebase url` error. I checked the Firebase configuration and environment variables and found an issue with the Realtime Database URL configuration.

I corrected the environment configuration and restarted the development server to ensure Vite loaded the updated values. This restored the Firebase connection without hardcoding configuration values into the application.

### 6. Authentication and User-Specific Watchlists

The original Watchlist implementation was not associated with individual users. After authentication was introduced, I updated the structure so each signed-in user's movies are stored separately using:

`users/{userId}/watchlist/{imdbID}`

I also ensured protected routes redirect unauthenticated users to the authentication page and that authenticated users can log out through the Header.


## AI Prompt Log

The prompts used during development are documented in the [`/prompts`](./prompts/README.md) directory.

## Project Structure

```
src/
├── components/       # Reusable UI components (Header, MovieCard)
├── context/          # AuthContext — global Firebase auth state
├── pages/
│   ├── Home/         # Movie discovery screen (Model, ViewModel, View)
│   ├── Watchlist/    # Saved movies screen (Model, ViewModel, View)
│   └── Auth/         # Login/registration screen (Model, ViewModel, View)
├── services/         # External integrations: OMDb API, Firebase, auth actions
├── App.jsx           # Route definitions
├── main.jsx          # App entry point and providers (AuthProvider, BrowserRouter)
└── index.css         # Shared design tokens (colors, radii, shadows)
prompts/              # AI prompt log (see prompts/README.md)
```
