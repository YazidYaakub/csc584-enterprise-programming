import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { University } from '@/schema/entity'

export const useUniversity = (queryKey: string[], universityId: number | undefined) => {
  return useQuery<University>({
    queryKey: [...queryKey, universityId],
    queryFn: async () => {
      const { data } = await api().get(`university/${universityId}`)

      return data
    },
    enabled: Boolean(universityId)
  })
}
