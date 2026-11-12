import { createContext, useCallback, useMemo, useState } from 'react'
import ToastViewport from '../components/Toast/ToastViewport.jsx'

// The context object must be exported alongside ToastProvider so consumers
// can read it; that trips react-refresh's component-only-exports check.
// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext(undefined)

const MAX_VISIBLE_TOASTS = 3

let nextToastId = 0

/**
 * @typedef {Object} Toast
 * @property {number} id
 * @property {'success' | 'error'} type
 * @property {string} message
 */

/**
 * Provides a `showToast` action to the rest of the application and renders
 * the toast stack plus the screen-reader live regions that announce each
 * toast. Toasts never take keyboard focus.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState(/** @type {Toast[]} */ ([]))

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  /**
   * @param {{ type: 'success' | 'error', message: string }} toast
   */
  const showToast = useCallback(({ type, message }) => {
    nextToastId += 1
    const toast = { id: nextToastId, type, message }
    setToasts((current) => [...current, toast].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
