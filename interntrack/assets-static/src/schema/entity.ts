import { z } from 'zod'

export const University = z.object({
  universityId: z.number(),
  name: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  courses: z.string(),
  website: z.string(),
  email: z.string().email(),
  contactNumber: z.string(),
  logoLink: z.string()
})

export type University = z.infer<typeof University>

export const User = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['STUDENT', 'SUPERVISOR', 'ADMIN', 'ADVISOR']),
  companyId: z.number().nullable(),
  universityId: z.number().nullable(),
  university: University.nullable()
})

export type User = z.infer<typeof User>
