import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const database = getDatabase(firebaseApp)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

/**
 * Builds a database reference to a Watchlist entry, or a user's whole
 * Watchlist when `imdbID` is omitted.
 *
 * @param {string} userId - The owning user's ID.
 * @param {string} [imdbID] - The movie's imdbID.
 * @returns {import('firebase/database').DatabaseReference}
 * @throws {Error} If `userId` is missing.
 */
function watchlistRef(userId, imdbID) {
  if (!userId) {
    throw new Error('A userId is required to access the watchlist.')
  }

  const basePath = `users/${userId}/watchlist`
  return ref(database, imdbID ? `${basePath}/${imdbID}` : basePath)
}

/**
 * Saves a movie to a user's Watchlist in Firebase, keyed by its imdbID.
 *
 * @param {string} userId - The owning user's ID.
 * @param {import('./omdbMovieService.js').Movie} movie - The movie to save.
 * @returns {Promise<void>}
 * @throws {Error} If `userId` is missing, or the movie could not be saved.
 */
export async function addToWatchlist(userId, movie) {
  try {
    await set(watchlistRef(userId, movie.imdbID), {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster,
    })
  } catch (error) {
    throw new Error(`Failed to add movie to watchlist: ${error.message}`, {
      cause: error,
    })
  }
}

/**
 * Removes a movie from a user's Watchlist in Firebase.
 *
 * @param {string} userId - The owning user's ID.
 * @param {string} imdbID - The imdbID of the movie to remove.
 * @returns {Promise<void>}
 * @throws {Error} If `userId` is missing, or the movie could not be removed.
 */
export async function removeFromWatchlist(userId, imdbID) {
  try {
    await remove(watchlistRef(userId, imdbID))
  } catch (error) {
    throw new Error(`Failed to remove movie from watchlist: ${error.message}`, {
      cause: error,
    })
  }
}

/**
 * Reads every movie currently saved in a user's Watchlist.
 *
 * @param {string} userId - The owning user's ID.
 * @returns {Promise<import('./omdbMovieService.js').Movie[]>} The saved movies, or an empty array if none are saved.
 * @throws {Error} If `userId` is missing, or the Watchlist could not be loaded.
 */
export async function getWatchlist(userId) {
  try {
    const snapshot = await get(watchlistRef(userId))

    if (!snapshot.exists()) {
      return []
    }

    return Object.values(snapshot.val())
  } catch (error) {
    throw new Error(`Failed to load watchlist: ${error.message}`, {
      cause: error,
    })
  }
}
