import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginRequest, logoutRequest, verifyTokenRequest } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]         = useState(null)
  const [token, setToken]       = useState(null)
  const [loading, setLoading]   = useState(true)
  const navigate                = useNavigate()

 
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser  = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      verifySession(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifySession = async (tkn) => {
    try {
      await verifyTokenRequest(tkn)
    } catch {
      clearSession()
    } finally {
      setLoading(false)
    }
  }

  const persistSession = (jwt, userData) => {
    localStorage.setItem('token', jwt)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(jwt)
    setUser(userData)
  }

  const clearSession = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const login = async (credentials) => {
    const { data } = await loginRequest(credentials)
    const jwt      = data.token ?? data.accessToken
    const userData = data.user  ?? { email: credentials.email }

    persistSession(jwt, userData)
    toast.success(`¡Bienvenido, ${userData.name ?? userData.email}!`)
    navigate('/tasks')
  }

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } catch {
      // silent — clear regardless
    } finally {
      clearSession()
      toast.success('Sesión cerrada correctamente')
      navigate('/login')
    }
  }, [clearSession, navigate])

  const isAuthenticated = Boolean(token)

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
