import { useQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'

import { config } from '@/lib/config'

type UniversityCardContentProps = {
  universityId: string
}

export function UniversityCardContent(props: UniversityCardContentProps) {
  const { universityId } = props

  const { data: university } = useQuery({
    queryKey: ['university', universityId],
    queryFn: () => fetch(`${config.apiUrl}/api/university/${universityId}`).then(res => res.json())
  })

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-center">
        <img src={university?.logoLink} alt={`${university?.name} logo`} className="h-32" />
      </div>
      <span className="text-lg font-semibold">{university?.name}</span>
      <div className="flex space-x-2">
        <MapPin />
        <span>{university?.location ?? 'Not specified'}</span>
      </div>
    </div>
  )
}
