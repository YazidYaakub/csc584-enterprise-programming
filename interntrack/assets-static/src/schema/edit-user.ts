import { z } from 'zod'

export const EditUserSchema = z.object({
  name: z.string().min(2)
})

export type EditUserInput = z.infer<typeof EditUserSchema>
