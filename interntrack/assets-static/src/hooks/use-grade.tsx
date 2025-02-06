import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const useGrade = (queryKey: unknown[], studentId: string, month: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api().get(`grade?studentId=${studentId}&month=${month}`)

      return data
    }
  })
}

export const useCreateGrade = (message: string, callback?: () => object | void) => {
  return useMutation({
    mutationFn: (data: { studentId: string; grade: string; month: string }) => {
      return api().post(`grade?studentId=${data.studentId}&grade=${data.grade}&month=${data.month}`)
    },
    onSuccess: () => {
      toast.success(message)
      if (callback) callback()
    },
    onError: error => toast.error(error.message)
  })
}
