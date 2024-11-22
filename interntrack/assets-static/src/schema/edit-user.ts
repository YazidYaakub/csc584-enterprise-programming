import { z } from 'zod'

export const EditUserSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(6)
})

export type EditUserInput = z.infer<typeof EditUserSchema>
