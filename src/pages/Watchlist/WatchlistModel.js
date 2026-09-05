import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from '../../services/firebaseService.js'

/**
 * Loads the saved Watchlist movies for a user.
 *
 * @param {string} userId - The owning user's ID.
 * @returns {Promise<import('../../services/omdbMovieService.js').Movie[]>} The saved movies, or an empty array if none are saved.
 */
export async function loadWatchlist(userId) {
  return getWatchlist(userId)
}

/**
 * Saves a movie to a user's Watchlist.
 *
 * @param {string} userId - The owning user's ID.
 * @param {import('../../services/omdbMovieService.js').Movie} movie - The movie to save.
 * @returns {Promise<void>}
 */
export async function saveToWatchlist(userId, movie) {
  return addToWatchlist(userId, movie)
}

/**
 * Removes a movie from a user's Watchlist.
 *
 * @param {string} userId - The owning user's ID.
 * @param {string} imdbID - The imdbID of the movie to remove.
 * @returns {Promise<void>}
 */
export async function deleteFromWatchlist(userId, imdbID) {
  return removeFromWatchlist(userId, imdbID)
}
