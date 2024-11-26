import { z } from 'zod'

export const ActivitySchema = z.object({
  activityId: z.number(),
  studentId: z.string(),
  activityTitle: z.string(),
  activityDescription: z.string(),
  activityDate: z.string(),
  isApproved: z.number(),
  approvedById: z.string(),
  approvedAt: z.string().nullable()
})

export type Activity = z.infer<typeof ActivitySchema>

export const CreateActivitySchema = z.object({
  studentId: z.number(),
  activityTitle: z.string(),
  activityDescription: z.string(),
  approvedById: z.number()
})

export type CreateActivity = z.infer<typeof CreateActivitySchema>

export const UpdateActivitySchema = z.object({
  activityId: z.number(),
  activityTitle: z.string(),
  activityDescription: z.string(),
  approvedById: z.number(),
  isApproved: z.number(),
  approvedAt: z.string().nullable()
})

export type UpdateActivity = z.infer<typeof UpdateActivitySchema>
