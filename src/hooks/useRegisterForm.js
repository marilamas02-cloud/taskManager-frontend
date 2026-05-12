import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { registerSchema } from '../schemas/registerSchema'
import { registerRequest } from '../services/authService'

export function useRegisterForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data) => {
    try {
      await registerRequest(data)
      toast.success('¡Cuenta creada exitosamente! Inicia sesión.')
      navigate('/login', { replace: true })
    } catch (err) {
      const status  = err?.response?.status
      const message = err?.response?.data?.message || err?.response?.data?.error

      if (status === 409) {
        setError('email', { message: 'Este email ya está registrado' })
      } else if (status === 422 || status === 400) {
        toast.error(message || 'Datos inválidos. Verifica el formulario.')
      } else {
        toast.error(message || 'Error al conectar con el servidor')
      }
    }
  }

  return { register, handleSubmit, onSubmit, errors, isSubmitting }
}
