import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '../schemas/taskSchema'
import toast from 'react-hot-toast'

export function useTaskForm(onSuccess) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(taskSchema) })

  const onSubmit = async (data) => {
    try {
      await onSuccess(data)
      reset()
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear la tarea'
      toast.error(msg)
      throw err
    }
  }

  return { register, handleSubmit, onSubmit, errors, isSubmitting, reset }
}
