import { useQuery } from '@tanstack/react-query'
import { LoaderCircle, MapPin } from 'lucide-react'

import { config } from '@/lib/config'

type CompanyCardContentProps = {
  companyId: string
}

export function CompanyCardContent(props: CompanyCardContentProps) {
  const { companyId } = props

  const {
    data: company,
    error,
    isPending
  } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetch(`${config.apiUrl}/api/company/${companyId}`).then(res => res.json())
  })

  if (isPending) return <LoaderCircle className="animate-spin" />
  if (error) return <div>Failed to load company</div>

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-center">
        <img src={company?.logoLink} alt={` logo`} className="h-32" />
      </div>
      <span className="text-lg font-semibold">{company?.name}</span>
      <div className="flex space-x-2">
        <MapPin />
        <span>{company?.location ?? 'Not Specified'}</span>
      </div>
    </div>
  )
}
