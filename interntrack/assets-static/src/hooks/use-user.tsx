import { api } from '@/lib/axios'
import { User } from '@/schema/entity'
import { Pagination } from '@/schema/pagination'
import { useQuery } from '@tanstack/react-query'

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
