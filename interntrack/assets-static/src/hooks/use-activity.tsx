import { api } from '@/lib/axios'
import { Activity, CreateActivity, UpdateActivity } from '@/schema/activity'
import { Pagination } from '@/schema/pagination'
import { useActivityStore } from '@/store/activity'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateActivity = (
  message: string = 'Activity log successfully created',
  callback?: () => object | void
) => {
  const queryClient = useQueryClient()

  const { selectedMonth } = useActivityStore()

  return useMutation({
    mutationFn: (activity: CreateActivity) => api().post('activity/create', activity),
    onSuccess: () => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['activity', selectedMonth] })
      // setOpenActivityLog(false)
      if (callback) callback()
    },
    onError: (error) => toast.error(error.message)
  })
}

export const usePaginatedActivity = () => {
  const { selectedMonth } = useActivityStore()
  const { token } = useAuthStore()

  return useQuery<Pagination<Activity>>({
    queryKey: ['activity', selectedMonth],
    queryFn: async () => {
      const { data } = await api().get('activity/', {
        params: { month: selectedMonth, studentId: token?.userId }
      })
      return data
    }
  })
}

export const useUpdateActivity = (message: string, callback?: () => object | void) => {
  const queryClient = useQueryClient()

  const { selectedMonth } = useActivityStore()

  return useMutation({
    mutationFn: (activity: UpdateActivity) =>
      api().put(`activity/${activity.activityId}`, activity),
    onSuccess: () => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['activity', selectedMonth] })
      if (callback) callback()
    },
    onError: (error) => toast.error(error.message)
  })
}

export const useDeleteActivity = (
  message: string = 'Activity log successfully deleted',
  callback?: () => object | void
) => {
  const queryClient = useQueryClient()

  const { selectedMonth } = useActivityStore()

  return useMutation({
    mutationFn: (activityId: number) => api().delete(`activity/${activityId}`),
    onSuccess: () => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['activity', selectedMonth] })
      if (callback) callback()
    },
    onError: (error) => toast.error(error.message)
  })
}
