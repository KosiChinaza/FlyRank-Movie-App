import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { getMovies, initialMovies } from './HomeModel.js'
import { saveToWatchlist } from '../Watchlist/WatchlistModel.js'

/**
 * ViewModel for the Home screen. Manages search query, results, loading, and
 * error state, and drives searches through the Home model. Loads a fresh
 * random movie selection from the Home model whenever the screen mounts.
 * Also drives saving a movie to the Watchlist through the Watchlist model,
 * redirecting to /auth instead when the current user isn't authenticated.
 *
 * @returns {{
 *   query: string,
 *   setQuery: React.Dispatch<React.SetStateAction<string>>,
 *   movies: import('../../services/omdbMovieService.js').Movie[],
 *   loading: boolean,
 *   error: string | null,
 *   watchlistError: string | null,
 *   handleSearch: () => Promise<void>,
 *   handleAddToWatchlist: (movie: import('../../services/omdbMovieService.js').Movie) => Promise<void>,
 * }}
 */
function useHomeViewModel() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [watchlistError, setWatchlistError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadInitialMovies() {
      setLoading(true)
      setError(null)

      try {
        const results = await initialMovies()
        if (!cancelled) {
          setMovies(results)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadInitialMovies()

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSearch() {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (searchError) {
      setError(searchError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddToWatchlist(movie) {
    if (!user) {
      navigate('/auth')
      return
    }

    try {
      await saveToWatchlist(user.uid, movie)
      setWatchlistError(null)
    } catch (saveError) {
      setWatchlistError(saveError.message)
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    watchlistError,
    handleSearch,
    handleAddToWatchlist,
  }
}

export default useHomeViewModel
