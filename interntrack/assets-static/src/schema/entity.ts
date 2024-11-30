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

export const Company = z.object({
  companyId: z.number(),
  name: z.string(),
  sector: z.string().nullable(),
  location: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  code: z.string().nullable(),
  email: z.string().email(),
  website: z.string().url(),
  contactNumber: z.string(),
  logoLink: z.string().nullable()
})

export type Company = z.infer<typeof Company>

export const User = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['STUDENT', 'SUPERVISOR', 'ADMIN', 'ADVISOR']),
  companyId: z.number().nullable(),
  company: Company.nullable(),
  universityId: z.number().nullable(),
  university: University.nullable(),
  semester: z.number().nullable(),
  position: z.string().nullable(),
  imageLink: z.string().nullable(),
  contactNumber: z.string().nullable(),
  address: z.string().nullable()
})

export type User = z.infer<typeof User>
