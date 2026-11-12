import { useEffect, useState } from 'react'
import './Toast.css'

const TOAST_DURATION_MS = {
  success: 4000,
  error: 8000,
}

/**
 * A single visual toast. Auto-dismisses after its duration, pausing while
 * hovered or while its dismiss button has keyboard focus. The message is
 * hidden from assistive technology here because it is announced through the
 * live regions in ToastViewport instead; the dismiss button's label carries
 * the message for screen-reader users who browse to it.
 *
 * @param {{
 *   toast: import('../../context/ToastContext.jsx').Toast,
 *   onDismiss: (id: number) => void,
 * }} props
 */
function ToastItem({ toast, onDismiss }) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      return undefined
    }

    const timer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION_MS[toast.type])
    return () => clearTimeout(timer)
  }, [paused, toast.id, toast.type, onDismiss])

  return (
    <li
      className={`toast toast--${toast.type}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="toast__icon" aria-hidden="true">
        {toast.type === 'success' ? '✓' : '!'}
      </span>
      <p className="toast__message" aria-hidden="true">
        {toast.message}
      </p>
      <button
        type="button"
        className="toast__dismiss"
        aria-label={`Dismiss notification: ${toast.message}`}
        onClick={() => onDismiss(toast.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

/**
 * Renders the visual toast stack and two always-present, visually hidden live
 * regions: a polite one for successes and an assertive one for errors. The
 * regions exist before any toast appears so screen readers reliably announce
 * each new message without focus moving.
 *
 * @param {{
 *   toasts: import('../../context/ToastContext.jsx').Toast[],
 *   onDismiss: (id: number) => void,
 * }} props
 */
function ToastViewport({ toasts, onDismiss }) {
  const successes = toasts.filter((toast) => toast.type === 'success')
  const errors = toasts.filter((toast) => toast.type === 'error')

  return (
    <>
      <div className="toast-sr-only" role="status" aria-live="polite">
        {successes.map((toast) => (
          <p key={toast.id}>{toast.message}</p>
        ))}
      </div>
      <div className="toast-sr-only" role="alert" aria-live="assertive">
        {errors.map((toast) => (
          <p key={toast.id}>{toast.message}</p>
        ))}
      </div>

      {toasts.length > 0 && (
        <ol className="toast-viewport" aria-label="Notifications">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </ol>
      )}
    </>
  )
}

export default ToastViewport
