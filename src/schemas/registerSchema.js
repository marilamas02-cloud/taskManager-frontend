import { z } from 'zod'

const onlyLetters = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(15, 'El nombre no puede superar 15 caracteres')
      .regex(onlyLetters, 'El nombre solo puede contener letras'),
    lastname: z
      .string()
      .min(3, 'El apellido debe tener al menos 3 caracteres')
      .max(15, 'El apellido no puede superar 15 caracteres')
      .regex(onlyLetters, 'El apellido solo puede contener letras'),
    email: z
      .string()
      .min(1, 'El email es obligatorio')
      .email('Ingresa un email válido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .regex(passwordPattern, 'Debe incluir mayúscula, minúscula y un número'),
    confirmPassword: z
      .string()
      .min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
