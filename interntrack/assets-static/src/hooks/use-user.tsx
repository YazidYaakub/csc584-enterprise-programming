import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'
import { EditUserInput } from '@/schema/edit-user'
import { User } from '@/schema/entity'
import { Pagination } from '@/schema/pagination'

export const usePaginatedUsers = (
  queryKey: string[],
  params?: {
    page?: number
    size?: number
    role?: 'STUDENT' | 'ADVISOR' | 'SUPERVISOR'
    universityId?: number | null
    companyId?: number | null
  }
) => {
  return useQuery<Pagination<User>>({
    queryKey,
    queryFn: async () => {
      const { data } = await api().get('auth/', { params })

      return data
    }
  })
}

export const useUser = (id: string | undefined) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await api().get(`auth/${id}`)

      return data
    }
  })
}

export const useUpdateUser = (userId: number, message: string, callback?: () => object | void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditUserInput) => {
      return api().put(`auth/${userId}`, data)
    },
    onSuccess: () => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
      if (callback) callback()
    },
    onError: error => toast.error(error.message)
  })
}
