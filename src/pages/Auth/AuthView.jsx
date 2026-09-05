import useAuthViewModel from './useAuthViewModel.js'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  const isLogin = mode === 'login'
  const submitLabel = isLogin ? 'Login' : 'Create Account'

  function handleFormSubmit(event) {
    event.preventDefault()
    handleSubmit()
  }

  return (
    <main className="auth">
      <form className="auth__card" onSubmit={handleFormSubmit}>
        <h1 className="auth__title">{submitLabel}</h1>

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <label className="auth__field">
          <span className="auth__label">Email</span>
          <input
            type="email"
            className="auth__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="auth__field">
          <span className="auth__label">Password</span>
          <input
            type="password"
            className="auth__input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
          />
        </label>

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Please wait…' : submitLabel}
        </button>

        <button type="button" className="auth__toggle" onClick={toggleMode}>
          {isLogin
            ? "Don't have an account? Create one"
            : 'Already have an account? Login'}
        </button>
      </form>
    </main>
  )
}

export default AuthView
