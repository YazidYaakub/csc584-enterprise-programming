import { z } from 'zod'

export const ActivitySchema = z.object({
  activityId: z.string(),
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
  studentId: z.string(),
  activityTitle: z.string(),
  activityDescription: z.string(),
  approvedById: z.string()
})

export type CreateActivity = z.infer<typeof CreateActivitySchema>

export const UpdateActivitySchema = z.object({
  activityId: z.string(),
  activityTitle: z.string(),
  activityDescription: z.string(),
  approvedById: z.string(),
  isApproved: z.number(),
  approvedAt: z.string().nullable()
})

export type UpdateActivity = z.infer<typeof UpdateActivitySchema>
