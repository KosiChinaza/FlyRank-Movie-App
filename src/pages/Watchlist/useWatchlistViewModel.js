import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { deleteFromWatchlist, loadWatchlist } from './WatchlistModel.js'

/**
 * ViewModel for the Watchlist screen. Manages the saved movie list, loading,
 * and error state, and drives Watchlist actions through the Watchlist model.
 * Loads the saved Watchlist automatically when the screen mounts, and
 * redirects to /auth when an unauthenticated user reaches this screen.
 *
 * @returns {{
 *   watchlist: import('../../services/omdbMovieService.js').Movie[],
 *   loading: boolean,
 *   error: string | null,
 *   loadMovies: () => Promise<void>,
 *   removeMovie: (imdbID: string) => Promise<void>,
 * }}
 */
function useWatchlistViewModel() {
  const { user, authLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true })
    }
  }, [authLoading, user, navigate])

  useEffect(() => {
    if (!user) {
      return undefined
    }

    let cancelled = false

    async function loadInitialWatchlist() {
      setLoading(true)
      setError(null)

      try {
        const movies = await loadWatchlist(user.uid)
        if (!cancelled) {
          setWatchlist(movies)
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

    loadInitialWatchlist()

    return () => {
      cancelled = true
    }
  }, [user])

  async function loadMovies() {
    if (!user) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const movies = await loadWatchlist(user.uid)
      setWatchlist(movies)
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  async function removeMovie(imdbID) {
    if (!user) {
      return
    }

    try {
      await deleteFromWatchlist(user.uid, imdbID)
      setWatchlist((currentWatchlist) =>
        currentWatchlist.filter((movie) => movie.imdbID !== imdbID),
      )
    } catch (removeError) {
      setError(removeError.message)
    }
  }

  return {
    watchlist,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}

export default useWatchlistViewModel
