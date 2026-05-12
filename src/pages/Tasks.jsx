import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../hooks/useTasks'
import Button from '../components/Button'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import styles from './Tasks.module.css'

export default function Tasks() {
  const { user, logout }                                              = useAuth()
  const { tasks, counts, loading, filter, setFilter, addTask, toggleTask, removeTask } = useTasks()
  const [showForm, setShowForm]                                       = useState(false)

  const handleAdd = async (data) => {
    await addTask(data)
    setShowForm(false)
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <CheckSquareIcon />
          <span>Task Manager</span>
        </div>
        <div className={styles.userBar}>
          <span className={styles.userEmail}>{user?.email}</span>
          <Button variant="secondary" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Mis Tareas</h1>
            <p className={styles.subtitle}>
              {counts.all === 0
                ? 'No tienes tareas aún'
                : `${counts.pending} pendiente${counts.pending !== 1 ? 's' : ''} · ${counts.completed} completada${counts.completed !== 1 ? 's' : ''}`}
            </p>
          </div>
          {!showForm && (
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <PlusIcon />
              Nueva tarea
            </Button>
          )}
        </div>

        {showForm && (
          <TaskForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
        )}

        <TaskList
          tasks={tasks}
          counts={counts}
          loading={loading}
          filter={filter}
          setFilter={setFilter}
          onToggle={toggleTask}
          onDelete={removeTask}
        />
      </div>
    </main>
  )
}

function CheckSquareIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
