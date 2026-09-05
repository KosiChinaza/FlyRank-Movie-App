import { createContext, useEffect, useState } from 'react'
import { logoutUser, subscribeToAuthChanges } from '../services/authService.js'
import './AuthContext.css'

// The context object must be exported alongside AuthProvider so consumers
// can read it; that trips react-refresh's component-only-exports check.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined)

/**
 * Provides the current Firebase user, the initial-session-restore loading
 * state, and a logout action to the rest of the application. Renders a
 * loading state until Firebase has restored (or ruled out) a session.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  if (authLoading) {
    return <p className="auth-context__loading">Loading…</p>
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
