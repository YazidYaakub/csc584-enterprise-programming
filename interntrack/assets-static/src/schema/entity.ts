import { z } from 'zod'

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['STUDENT', 'SUPERVISOR', 'ADMIN']),
  companyId: z.number().nullable(),
  universityId: z.number().nullable()
})

export type User = z.infer<typeof User>
