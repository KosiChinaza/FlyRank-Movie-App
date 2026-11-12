import './MovieCard.css'

/**
 * Purely presentational card showing a single movie's poster and metadata.
 * Renders an "Add to Watchlist" button when `onAddToWatchlist` is provided,
 * or a "Remove from Watchlist" button when `onRemoveFromWatchlist` is
 * provided, so the same card works on both the Home and Watchlist screens.
 * While `isPending` is true the button shows a progress label and ignores
 * clicks. It uses aria-disabled rather than disabled so keyboard focus stays
 * on the button during the operation.
 *
 * @param {{
 *   movie: import('../../services/omdbMovieService.js').Movie,
 *   onAddToWatchlist?: (movie: import('../../services/omdbMovieService.js').Movie) => void,
 *   onRemoveFromWatchlist?: (imdbID: string) => void,
 *   isPending?: boolean,
 * }} props
 */
function MovieCard({ movie, onAddToWatchlist, onRemoveFromWatchlist, isPending = false }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <article className="movie-card">
      {hasPoster ? (
        <img
          className="movie-card__poster"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      ) : (
        <div
          className="movie-card__poster movie-card__poster--placeholder"
          role="img"
          aria-label={`${movie.Title} poster not available`}
        >
          No poster available
        </div>
      )}

      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">
          <span>{movie.Year}</span>
          <span className="movie-card__type">{movie.Type}</span>
        </p>

        {onAddToWatchlist && (
          <button
            type="button"
            className="movie-card__watchlist-button"
            aria-disabled={isPending || undefined}
            onClick={() => {
              if (!isPending) onAddToWatchlist(movie)
            }}
          >
            {isPending ? 'Adding…' : 'Add to Watchlist'}
          </button>
        )}

        {onRemoveFromWatchlist && (
          <button
            type="button"
            className="movie-card__watchlist-button movie-card__watchlist-button--remove"
            aria-disabled={isPending || undefined}
            onClick={() => {
              if (!isPending) onRemoveFromWatchlist(movie.imdbID)
            }}
          >
            {isPending ? 'Removing…' : 'Remove from Watchlist'}
          </button>
        )}
      </div>
    </article>
  )
}

export default MovieCard
