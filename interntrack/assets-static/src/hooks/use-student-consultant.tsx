import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const useCreateStudentConsultant = (message: string, callback?: () => object | void) => {
  return useMutation({
    mutationFn: (data: { studentId: string; supervisorId: string; advisorId: string }) => {
      return api().post(
        `student-consultants?studentId=${data.studentId}&supervisorId=${data.supervisorId}&advisorId=${data.advisorId}`
      )
    },
    onSuccess: () => {
      toast.success(message)
      if (callback) callback()
    },
    onError: error => toast.error(error.message)
  })
}

export const useStudentConsultantStudent = (
  queryKey: unknown[],
  role: 'students' | 'advisors' | 'supervisors',
  id: string | undefined
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api().get(`student-consultants/${role}/${id}`)

      return data
    }
  })
}
