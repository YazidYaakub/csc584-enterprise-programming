import { api } from '@/lib/axios'
import { UpdateActivity } from '@/schema/activity'
import { useActivityStore } from '@/store/activity'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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
