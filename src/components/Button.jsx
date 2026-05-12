import Spinner from './Spinner'
import styles from './Button.module.css'

export default function Button({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={18} color="currentColor" />
          <span>Cargando...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
