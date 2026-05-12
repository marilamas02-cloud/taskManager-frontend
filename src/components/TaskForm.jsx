import { useTaskForm } from '../hooks/useTaskForm'
import { toInputDate } from '../utils/formatDate'
import InputField from './InputField'
import Button from './Button'
import styles from './TaskForm.module.css'

export default function TaskForm({ task, onAdd, onClose }) {
  const isEditing = Boolean(task)
  const defaultValues = isEditing
    ? { title: task.title, description: task.description, dueDate: toInputDate(task.dueDate) }
    : {}
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useTaskForm(onAdd, defaultValues)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {isEditing ? <EditIcon /> : <PlusIcon />}
          <h2 className={styles.title}>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>
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
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
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
