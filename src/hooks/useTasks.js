import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'

const normalize = (task) => ({ ...task, _id: task._id ?? task.id })

export function useTasks() {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getTasks()
      const list =
        Array.isArray(data)       ? data       :
        Array.isArray(data.tasks) ? data.tasks :
        Array.isArray(data.data)  ? data.data  :
        []
      setTasks(list.map(normalize))
    } catch {
      toast.error('Error al cargar las tareas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const addTask = async (formData) => {
    const { data } = await createTask(formData)
    const newTask = normalize(data.task ?? data.data ?? data)
    setTasks((prev) => [newTask, ...prev])
    toast.success('¡Tarea creada!')
  }

  const editTask = async (id, formData) => {
    const { data } = await updateTask(id, formData)
    const updatedTask = normalize(data.task ?? data.data ?? data)
    setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)))
    toast.success('Tarea actualizada')
  }

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id)
    try {
      const { data } = await updateTask(id, { completed: !task.completed })
      const updatedTask = normalize(data.task ?? data.data ?? data)
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)))
      toast.success(updatedTask.completed ? '¡Tarea completada! ✓' : 'Tarea marcada como pendiente')
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

  return { tasks: filteredTasks, counts, loading, filter, setFilter, addTask, editTask, toggleTask, removeTask }
}
