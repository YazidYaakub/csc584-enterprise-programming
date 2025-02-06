import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'
import { UpdateUserInput } from '@/schema/edit-user'
import { User } from '@/schema/entity'
import { Pagination } from '@/schema/pagination'
import { RegisterInput } from '@/schema/register'

export const useCreateUser = (message: string, callback?: () => object | void) => {
  return useMutation({
    mutationFn: (data: RegisterInput) => {
      const body = {
        ...data,
        universityId: data.universityId,
        companyId: data.companyId
      }

      return api().post('auth/register', body)
    },
    onSuccess: () => {
      toast.success(message)
      if (callback) callback()
    },
    onError: error => toast.error(error.message)
  })
}

export const usePaginatedUsers = (
  queryKey: string[],
  params?: {
    page?: number
    size?: number
    role?: 'STUDENT' | 'ADVISOR' | 'SUPERVISOR'
    universityId?: string | null
    companyId?: string | null
    isApproved?: 1 | 0
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

export const useUser = (queryKey: unknown[], id: string | undefined) => {
  return useQuery<User>({
    queryKey,
    queryFn: async () => {
      const { data } = await api().get(`auth/${id}`)

      return data
    }
  })
}

export const useUpdateUser = (userId: string, message: string, callback?: () => object | void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserInput) => {
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
