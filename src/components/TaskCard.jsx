import { useState } from 'react'
import styles from './TaskCard.module.css'
import ConfirmModal from './ConfirmModal'
import { formatDate, isOverdue } from '../utils/formatDate'

export default function TaskCard({ task, onToggle, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting]       = useState(false)
  const [toggling, setToggling]       = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    try { await onToggle(task._id) }
    finally { setToggling(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(task._id)
    } catch {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  const overdue = !task.completed && isOverdue(task.dueDate)

  return (
    <>
      <article className={`${styles.card} ${task.completed ? styles.done : ''} ${overdue ? styles.overdueCard : ''}`}>
        <div className={`${styles.indicator} ${task.completed ? styles.indicatorDone : ''}`} />

        <div className={styles.body}>
          <div className={styles.topRow}>
            <div className={styles.titleRow}>
              <span className={`${styles.dot} ${task.completed ? styles.dotDone : ''}`} />
              <h3 className={styles.title}>{task.title}</h3>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.iconBtn} ${styles.toggleBtn} ${task.completed ? styles.toggleActive : ''}`}
                onClick={handleToggle}
                disabled={toggling}
                aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                title={task.completed ? 'Reactivar' : 'Completar'}
              >
                {toggling ? <SpinIcon /> : <CheckIcon />}
              </button>
              <button
                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                onClick={() => setShowConfirm(true)}
                aria-label="Eliminar tarea"
                title="Eliminar"
              >
                <TrashIcon />
              </button>
            </div>
          </div>

          <p className={styles.description}>{task.description}</p>

          <div className={styles.footer}>
            <span className={`${styles.dueDate} ${overdue ? styles.overdueDate : ''}`}>
              <CalendarIcon />
              {overdue && <span className={styles.overdueTag}>Vencida</span>}
              {formatDate(task.dueDate)}
            </span>
            <span className={`${styles.badge} ${task.completed ? styles.badgeDone : styles.badgePending}`}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        </div>
      </article>

      {showConfirm && (
        <ConfirmModal
          title="¿Eliminar tarea?"
          message="Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          loading={deleting}
        />
      )}
    </>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function SpinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.6s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
