// This file will contain communication with the OMDb API.

/**
 * @typedef {Object} Movie
 * @property {string} Title
 * @property {string} Year
 * @property {string} imdbID
 * @property {string} Type
 * @property {string} Poster
 */

/**
 * @typedef {Object} OmdbSearchResponse
 * @property {Movie[]} [Search]
 * @property {string} [totalResults]
 * @property {'True' | 'False'} Response
 * @property {string} [Error]
 */

const OMDB_API_URL = 'https://www.omdbapi.com/'
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY

/**
 * Searches the OMDb API for movies matching the given query.
 *
 * @param {string} query - The search term to look up on OMDb.
 * @returns {Promise<Movie[]>} The movies returned by OMDb for the query.
 * @throws {Error} If the HTTP request fails, or if OMDb responds with Response: "False".
 */
export async function searchMovies(query) {
  const url = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`

  let response
  try {
    response = await fetch(url)
  } catch (error) {
    throw new Error(`Failed to reach the OMDb API: ${error.message}`, { cause: error })
  }

  if (!response.ok) {
    throw new Error(`OMDb API request failed with status ${response.status}`)
  }

  /** @type {OmdbSearchResponse} */
  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error || 'OMDb API returned no results')
  }

  return data.Search
}
