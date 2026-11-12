import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { ToastContext } from '../../context/ToastContext.jsx'
import { deleteFromWatchlist, loadWatchlist } from './WatchlistModel.js'

/**
 * ViewModel for the Watchlist screen. Manages the saved movie list, loading,
 * and error state, and drives Watchlist actions through the Watchlist model.
 * Loads the saved Watchlist automatically when the screen mounts, and
 * redirects to /auth when an unauthenticated user reaches this screen.
 * Reports the outcome of each removal with a toast once Firebase confirms
 * it, and ignores repeat removals of a movie while one is still pending.
 *
 * @returns {{
 *   watchlist: import('../../services/omdbMovieService.js').Movie[],
 *   loading: boolean,
 *   error: string | null,
 *   pendingIds: string[],
 *   loadMovies: () => Promise<void>,
 *   removeMovie: (imdbID: string) => Promise<void>,
 * }}
 */
function useWatchlistViewModel() {
  const { user, authLoading } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pendingIds, setPendingIds] = useState([])
  // Tracks pending removals synchronously so a rapid double-click can't
  // start a second removal before React re-renders with updated pendingIds.
  const pendingIdsRef = useRef(new Set())

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

  function setPending(imdbID, isPending) {
    if (isPending) {
      pendingIdsRef.current.add(imdbID)
    } else {
      pendingIdsRef.current.delete(imdbID)
    }
    setPendingIds([...pendingIdsRef.current])
  }

  async function removeMovie(imdbID) {
    if (!user || pendingIdsRef.current.has(imdbID)) {
      return
    }

    const title = watchlist.find((movie) => movie.imdbID === imdbID)?.Title || 'Movie'
    setPending(imdbID, true)

    try {
      await deleteFromWatchlist(user.uid, imdbID)
      setWatchlist((currentWatchlist) =>
        currentWatchlist.filter((movie) => movie.imdbID !== imdbID),
      )
      showToast({ type: 'success', message: `Removed “${title}” from your Watchlist.` })
    } catch (removeError) {
      console.error(removeError)
      showToast({
        type: 'error',
        message: `Couldn't remove “${title}” from your Watchlist. Please try again.`,
      })
    } finally {
      setPending(imdbID, false)
    }
  }

  return {
    watchlist,
    loading,
    error,
    pendingIds,
    loadMovies,
    removeMovie,
  }
}

export default useWatchlistViewModel
