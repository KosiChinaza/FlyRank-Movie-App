import { searchMovies } from '../../services/omdbMovieService.js'

const INITIAL_MOVIE_SEED_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

const INITIAL_MOVIES_TARGET_COUNT = 20
const INITIAL_MOVIES_KEYWORD_COUNT = 6

/**
 * Returns a new array containing the items of `array` in random order.
 *
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A shuffled copy of `array`.
 */
function shuffle(array) {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

/**
 * Removes movies with duplicate imdbID values, keeping the first occurrence.
 *
 * @param {import('../../services/omdbMovieService.js').Movie[]} movies - The movies to deduplicate.
 * @returns {import('../../services/omdbMovieService.js').Movie[]} The movies with duplicate imdbIDs removed.
 */
function dedupeByImdbId(movies) {
  const seen = new Set()
  const unique = []

  movies.forEach((movie) => {
    if (!seen.has(movie.imdbID)) {
      seen.add(movie.imdbID)
      unique.push(movie)
    }
  })

  return unique
}

/**
 * Fetches movies matching the given search query.
 *
 * @param {string} query - The raw search query entered by the user.
 * @returns {Promise<import('../../services/omdbMovieService.js').Movie[]>} The movies matching the query.
 * @throws {Error} If the cleaned query contains fewer than two characters.
 */
export async function getMovies(query) {
  const cleanedQuery = query.trim()

  if (cleanedQuery.length < 2) {
    throw new Error('Search query must contain at least two characters.')
  }

  return searchMovies(cleanedQuery)
}

/**
 * Builds a randomized initial selection of movies for the Home screen by
 * searching OMDb with a random sample of seed keywords, merging the results,
 * and removing duplicates. Individual keyword failures are tolerated as long
 * as enough movies are gathered overall.
 *
 * @returns {Promise<import('../../services/omdbMovieService.js').Movie[]>} Exactly 20 unique movies, in random order.
 * @throws {Error} If not enough movie data could be gathered to build the initial selection.
 */
export async function initialMovies() {
  const selectedKeywords = shuffle(INITIAL_MOVIE_SEED_KEYWORDS).slice(
    0,
    INITIAL_MOVIES_KEYWORD_COUNT,
  )

  const searchResults = await Promise.all(
    selectedKeywords.map((keyword) =>
      searchMovies(keyword)
        .then((movies) => movies ?? [])
        .catch(() => []),
    ),
  )

  const uniqueMovies = dedupeByImdbId(searchResults.flat())

  if (uniqueMovies.length < INITIAL_MOVIES_TARGET_COUNT) {
    throw new Error(
      'Not enough movie data could be loaded to build the initial selection. Please try again.',
    )
  }

  return shuffle(uniqueMovies).slice(0, INITIAL_MOVIES_TARGET_COUNT)
}
