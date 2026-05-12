import styles from './ConfirmModal.module.css'
import Button from './Button'

export default function ConfirmModal({ title, message, onConfirm, onCancel, loading }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrap}>
          <TrashIcon />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}

function TrashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}
