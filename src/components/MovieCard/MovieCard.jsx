import './MovieCard.css'

/**
 * Purely presentational card showing a single movie's poster and metadata.
 * Renders an "Add to Watchlist" button when `onAddToWatchlist` is provided,
 * or a "Remove from Watchlist" button when `onRemoveFromWatchlist` is
 * provided, so the same card works on both the Home and Watchlist screens.
 *
 * @param {{
 *   movie: import('../../services/omdbMovieService.js').Movie,
 *   onAddToWatchlist?: (movie: import('../../services/omdbMovieService.js').Movie) => void,
 *   onRemoveFromWatchlist?: (imdbID: string) => void,
 * }} props
 */
function MovieCard({ movie, onAddToWatchlist, onRemoveFromWatchlist }) {
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
            onClick={() => onAddToWatchlist(movie)}
          >
            Add to Watchlist
          </button>
        )}

        {onRemoveFromWatchlist && (
          <button
            type="button"
            className="movie-card__watchlist-button movie-card__watchlist-button--remove"
            onClick={() => onRemoveFromWatchlist(movie.imdbID)}
          >
            Remove from Watchlist
          </button>
        )}
      </div>
    </article>
  )
}

export default MovieCard
