import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { Company } from '@/schema/entity'

export const useCompany = (queryKey: string[], companyId: string | undefined) => {
  return useQuery<Company>({
    queryKey: [...queryKey, companyId],
    queryFn: async () => {
      const { data } = await api().get(`company/${companyId}`)

      return data
    },
    enabled: Boolean(companyId)
  })
}

export const useCompanyList = (queryKey: string[]) => {
  return useQuery<Company[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api().get('company/list')

      return data
    }
  })
}
