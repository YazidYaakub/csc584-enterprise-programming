import { z } from 'zod'

export const UpdateUserSchema = z.object({
  name: z.string().min(2),
  contactNumber: z.string(),
  address: z.string(),
  semester: z.number().int(),
  position: z.string().optional(),
  subject: z.string().optional(),
  password: z.string().min(6).optional(),
  imageLink: z.string().url().optional()
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
