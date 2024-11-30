import { config } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'

type UniversityCardContentProps = {
  universityId: number
}

export function UniversityCardContent(props: UniversityCardContentProps) {
  const { universityId } = props

  const { data: university } = useQuery({
    queryKey: ['university', universityId],
    queryFn: () =>
      fetch(`${config.apiUrl}/api/university/${universityId}`).then((res) => res.json())
  })

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-center justify-center'>
        <img
          src='https://static.wixstatic.com/media/b2f731_d7732210aabb493295a23edb6cf59335~mv2.png/v1/fill/w_560,h_658,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/b2f731_d7732210aabb493295a23edb6cf59335~mv2.png'
          alt={`${university?.name} logo`}
          className='h-32'
        />
      </div>
      <span className='text-lg font-semibold'>{university?.name}</span>
      <div className='flex space-x-2'>
        <MapPin />
        <span>{university?.location ?? 'Not specified'}</span>
      </div>
    </div>
  )
}
