import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Tasks.module.css'

export default function Tasks() {
  const { user, logout } = useAuth()

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

      <section className={styles.hero}>
        <h1 className={styles.title}>Mis Tareas</h1>
        <p className={styles.subtitle}>
          La sección de tareas estará disponible próximamente.
        </p>
      </section>
    </main>
  )
}

function CheckSquareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}
