import { Link } from 'react-router-dom'
import { useRegisterForm } from '../hooks/useRegisterForm'
import InputField from '../components/InputField'
import Button from '../components/Button'
import styles from './Register.module.css'

export default function Register() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useRegisterForm()

  return (
    <main className={styles.page}>
      <div className={styles.bgOrb1} aria-hidden />
      <div className={styles.bgOrb2} aria-hidden />
      <div className={styles.bgOrb3} aria-hidden />

      <div className={`${styles.card} animate-slide-up`}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <TaskIcon />
          </div>
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>Únete a Task Manager hoy</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.row}>
            <InputField
              label="Nombre"
              type="text"
              placeholder="Juan"
              icon={UserIcon}
              error={errors.name?.message}
              autoComplete="given-name"
              {...register('name')}
            />
            <InputField
              label="Apellido"
              type="text"
              placeholder="García"
              icon={UserIcon}
              error={errors.lastname?.message}
              autoComplete="family-name"
              {...register('lastname')}
            />
          </div>

          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            icon={MailIcon}
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
          />

          <InputField
            label="Contraseña"
            type="password"
            placeholder="Mín. 6 · mayúscula · minúscula · número"
            icon={LockIcon}
            error={errors.password?.message}
            autoComplete="new-password"
            {...register('password')}
          />

          <InputField
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            icon={LockIcon}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            {...register('confirmPassword')}
          />

          <Button type="submit" variant="primary" fullWidth loading={isSubmitting} disabled={isSubmitting}>
            Crear cuenta
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  )
}

function TaskIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="url(#rg)" />
      <path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c63ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function UserIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function MailIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LockIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
