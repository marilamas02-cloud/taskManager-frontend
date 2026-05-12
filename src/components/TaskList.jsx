import TaskCard from './TaskCard'
import Loader from './Loader'
import styles from './TaskList.module.css'

const FILTERS = [
  { key: 'all',       label: 'Todas'       },
  { key: 'pending',   label: 'Pendientes'  },
  { key: 'completed', label: 'Completadas' },
]

const EMPTY_MESSAGES = {
  all:       { title: 'Sin tareas aún',           subtitle: 'Crea tu primera tarea para empezar.' },
  pending:   { title: '¡Al día!',                 subtitle: 'No tienes tareas pendientes.' },
  completed: { title: 'Nada completado aún',       subtitle: 'Completa una tarea para verla aquí.' },
}

export default function TaskList({ tasks, counts, loading, filter, setFilter, onToggle, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
            <span className={`${styles.count} ${filter === key ? styles.countActive : ''}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <Loader count={3} />
      ) : tasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <div className={styles.grid}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState({ filter }) {
  const { title, subtitle } = EMPTY_MESSAGES[filter] || EMPTY_MESSAGES.all
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <ClipboardIcon />
      </div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptySubtitle}>{subtitle}</p>
    </div>
  )
}

function ClipboardIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}
