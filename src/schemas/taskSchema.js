import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(100, 'Máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(500, 'Máximo 500 caracteres'),
  dueDate: z.string().min(1, 'La fecha de vencimiento es obligatoria'),
})
