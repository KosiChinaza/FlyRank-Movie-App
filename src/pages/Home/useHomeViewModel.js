import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { ToastContext } from '../../context/ToastContext.jsx'
import { getMovies, initialMovies } from './HomeModel.js'
import { saveToWatchlist } from '../Watchlist/WatchlistModel.js'

/**
 * ViewModel for the Home screen. Manages search query, results, loading, and
 * error state, and drives searches through the Home model. Loads a fresh
 * random movie selection from the Home model whenever the screen mounts.
 * Also drives saving a movie to the Watchlist through the Watchlist model,
 * redirecting to /auth instead when the current user isn't authenticated.
 * Reports the outcome of each save with a toast once Firebase confirms it,
 * and ignores repeat saves of a movie while its save is still pending.
 *
 * @returns {{
 *   query: string,
 *   setQuery: React.Dispatch<React.SetStateAction<string>>,
 *   movies: import('../../services/omdbMovieService.js').Movie[],
 *   loading: boolean,
 *   error: string | null,
 *   pendingIds: string[],
 *   handleSearch: () => Promise<void>,
 *   handleAddToWatchlist: (movie: import('../../services/omdbMovieService.js').Movie) => Promise<void>,
 * }}
 */
function useHomeViewModel() {
  const { user } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pendingIds, setPendingIds] = useState([])
  // Tracks pending saves synchronously so a rapid double-click can't start a
  // second save before React has re-rendered with the updated pendingIds.
  const pendingIdsRef = useRef(new Set())

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

  function setPending(imdbID, isPending) {
    if (isPending) {
      pendingIdsRef.current.add(imdbID)
    } else {
      pendingIdsRef.current.delete(imdbID)
    }
    setPendingIds([...pendingIdsRef.current])
  }

  async function handleAddToWatchlist(movie) {
    if (!user) {
      navigate('/auth')
      return
    }

    if (pendingIdsRef.current.has(movie.imdbID)) {
      return
    }

    const title = movie.Title || 'Movie'
    setPending(movie.imdbID, true)

    try {
      await saveToWatchlist(user.uid, movie)
      showToast({ type: 'success', message: `Added “${title}” to your Watchlist.` })
    } catch (saveError) {
      console.error(saveError)
      showToast({
        type: 'error',
        message: `Couldn't add “${title}” to your Watchlist. Please try again.`,
      })
    } finally {
      setPending(movie.imdbID, false)
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    pendingIds,
    handleSearch,
    handleAddToWatchlist,
  }
}

export default useHomeViewModel
