import { config } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'

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
    queryFn: () => fetch(`${config.apiUrl}/api/company/${companyId}`).then((res) => res.json())
  })

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-center justify-center'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png'
          alt={` logo`}
          className='h-32'
        />
      </div>
      <span className='text-lg font-semibold'>{company?.name}</span>
      <div className='flex space-x-2'>
        <MapPin />
        <span>{company?.location ?? 'Not Specified'}</span>
      </div>
    </div>
  )
}
