import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { loginSchema } from '../schemas/loginSchema'

export function useLoginForm() {
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/tasks', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (err) {
      const status  = err?.response?.status
      const message = err?.response?.data?.message || err?.response?.data?.error

      if (status === 401 || status === 403) {
        setError('password', { message: 'Email o contraseña incorrectos' })
      } else if (status === 422 || status === 400) {
        toast.error(message || 'Datos inválidos. Verifica el formulario.')
      } else if (status === 429) {
        toast.error('Demasiados intentos. Espera un momento.')
      } else {
        toast.error(message || 'Error al conectar con el servidor')
      }
    }
  }

  return { register, handleSubmit, onSubmit, errors, isSubmitting, authLoading }
}
