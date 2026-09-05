import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import './HomeView.css'

function HomeView({ query, movies, loading, error, watchlistError, onAddToWatchlist }) {
  return (
    <main className="home">
      {loading && <p className="home__status">Loading movies…</p>}

      {!loading && error && (
        <p className="home__status home__status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="home__status">
          {query.trim()
            ? 'No movies found. Try a different search.'
            : 'Search for a movie to start discovering.'}
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          {watchlistError && (
            <p className="home__watchlist-error" role="alert">
              {watchlistError}
            </p>
          )}

          <ul className="home__grid">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <MovieCard movie={movie} onAddToWatchlist={onAddToWatchlist} />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}

export default HomeView
