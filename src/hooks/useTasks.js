import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'


export function useTasks() {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getTasks()
      setTasks(Array.isArray(data) ? data : (data.tasks ?? []))
    } catch {
      toast.error('Error al cargar las tareas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const addTask = async (formData) => {
    const { data } = await createTask(formData)
    setTasks((prev) => [data, ...prev])
    toast.success('¡Tarea creada!')
  }

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id)
    try {
      const { data } = await updateTask(id, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)))
      toast.success(data.completed ? '¡Tarea completada! ✓' : 'Tarea marcada como pendiente')
    } catch {
      toast.error('Error al actualizar la tarea')
    }
  }

  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((t) => t._id !== id))
    toast.success('Tarea eliminada')
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending')   return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const counts = {
    all:       tasks.length,
    pending:   tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) =>  t.completed).length,
  }

  return { tasks: filteredTasks, counts, loading, filter, setFilter, addTask, toggleTask, removeTask }
}
