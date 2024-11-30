import { api } from '@/lib/axios'
import { Company } from '@/schema/entity'
import { useQuery } from '@tanstack/react-query'

export const useCompany = (queryKey: string[], companyId: number | undefined) => {
  return useQuery<Company>({
    queryKey: [...queryKey, companyId],
    queryFn: async () => {
      const { data } = await api().get(`company/${companyId}`)

      return data
    },
    enabled: Boolean(companyId)
  })
}
