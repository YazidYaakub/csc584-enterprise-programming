import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.string(),
  university: z.string().optional(),
  company: z.string().optional()
})

export type RegisterInput = z.infer<typeof RegisterSchema>
