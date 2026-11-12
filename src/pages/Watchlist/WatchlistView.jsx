import useWatchlistViewModel from './useWatchlistViewModel.js'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import './WatchlistView.css'

function WatchlistView() {
  const { watchlist, loading, error, pendingIds, removeMovie } = useWatchlistViewModel()

  return (
    <main className="watchlist">
      {loading && <p className="watchlist__status">Loading your watchlist…</p>}

      {!loading && error && (
        <p className="watchlist__status watchlist__status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && watchlist.length === 0 && (
        <p className="watchlist__status">
          Your watchlist is empty. Add movies from Discover to see them here.
        </p>
      )}

      {!loading && !error && watchlist.length > 0 && (
        <ul className="watchlist__grid">
          {watchlist.map((movie) => (
            <li key={movie.imdbID}>
              <MovieCard
                movie={movie}
                onRemoveFromWatchlist={removeMovie}
                isPending={pendingIds.includes(movie.imdbID)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default WatchlistView
