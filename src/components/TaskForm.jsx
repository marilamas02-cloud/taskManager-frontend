import { useTaskForm } from '../hooks/useTaskForm'
import InputField from './InputField'
import Button from './Button'
import styles from './TaskForm.module.css'

export default function TaskForm({ onAdd, onClose }) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useTaskForm(onAdd)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <PlusIcon />
          <h2 className={styles.title}>Nueva tarea</h2>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar formulario">
          <CloseIcon />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <InputField
          label="Título"
          type="text"
          placeholder="¿En qué necesitas trabajar?"
          icon={TitleIcon}
          error={errors.title?.message}
          autoFocus
          {...register('title')}
        />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Descripción</label>
          <div className={`${styles.textareaWrapper} ${errors.description ? styles.hasError : ''}`}>
            <textarea
              className={styles.textarea}
              placeholder="Describe los detalles de la tarea..."
              rows={3}
              aria-invalid={!!errors.description}
              {...register('description')}
            />
          </div>
          {errors.description && (
            <span className={styles.errorMsg} role="alert">
              {errors.description.message}
            </span>
          )}
        </div>

        <InputField
          label="Fecha de vencimiento"
          type="date"
          icon={CalendarIcon}
          error={errors.dueDate?.message}
          min={new Date().toISOString().split('T')[0]}
          {...register('dueDate')}
        />

        <div className={styles.formActions}>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Crear tarea
          </Button>
        </div>
      </form>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function TitleIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="18" y2="18" />
    </svg>
  )
}

function CalendarIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
