import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { login, register } from './AuthModel.js'

/**
 * ViewModel for the Auth screen. Manages the login/register form state and
 * drives authentication through the Auth model. Redirects to / once the
 * user is authenticated, whether they arrived already signed in or just
 * signed in/registered.
 *
 * @returns {{
 *   email: string,
 *   setEmail: React.Dispatch<React.SetStateAction<string>>,
 *   password: string,
 *   setPassword: React.Dispatch<React.SetStateAction<string>>,
 *   mode: 'login' | 'register',
 *   loading: boolean,
 *   error: string | null,
 *   handleSubmit: () => Promise<void>,
 *   toggleMode: () => void,
 * }}
 */
function useAuthViewModel() {
  const { user, authLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true })
    }
  }, [authLoading, user, navigate])

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }

      setPassword('')
    } catch (authError) {
      setError(authError.message)
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))
    setError(null)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  }
}

export default useAuthViewModel
