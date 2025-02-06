import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { GraduationCap } from 'lucide-react'

import { ErrorFull } from '@/components/error-full'
import { LoadingFull } from '@/components/loading-full'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useUniversity } from '@/hooks/use-university'
import { usePaginatedUsers } from '@/hooks/use-user'

export function University() {
  const { universityId } = useParams()
  const navigate = useNavigate()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API ?? ''
  })

  const { data: advisors } = usePaginatedUsers(
    ['advisor', universityId ?? 'university', 'advisor-table'],
    { role: 'ADVISOR', universityId: universityId }
  )
  const { data: students } = usePaginatedUsers(
    ['student', universityId ?? 'university', 'student-table'],
    { role: 'STUDENT', universityId: universityId }
  )
  const { data: university, isPending, error } = useUniversity(['university'], universityId)

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: university?.latitude ?? 0,
        lng: university?.longitude ?? 0
      })
      map.fitBounds(bounds)

      setMap(map)
    },
    [university?.latitude, university?.longitude]
  )

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const nonDisplay = ['universityId', 'latitude', 'longitude', 'logoLink']

  if (isPending) return <LoadingFull message="Loading university..." />
  if (error) return <ErrorFull message={error.message} />

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-center space-x-4">
        {university.logoLink ? (
          <img src={university.logoLink} alt={`${university.name} logo`} className="h-12" />
        ) : (
          <GraduationCap className="size-8 text-primary" />
        )}
      </div>
      <Table>
        <TableBody>
          {(Object.keys(university) as (keyof typeof university)[])
            .filter(key => !nonDisplay.includes(key))
            .map(key => (
              <TableRow key={key}>
                <TableCell>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </TableCell>
                <TableCell>{university[key] ?? '-'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isLoaded && university.latitude && university.longitude && (
        <div className="flex items-center justify-center">
          <GoogleMap
            mapContainerStyle={{ width: '600px', height: '400px' }}
            center={{
              lat: university.latitude,
              lng: university.longitude
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={{
                lat: university.latitude,
                lng: university.longitude
              }}
              onClick={() => {
                const infowindow = new google.maps.InfoWindow({
                  content: 'Hello World'
                })
                infowindow.open({
                  anchor: new google.maps.Marker({
                    position: {
                      lat: university.latitude ?? 0,
                      lng: university.longitude ?? 0
                    },
                    map
                  }),
                  map,
                  shouldFocus: false
                })
              }}
            />
          </GoogleMap>
        </div>
      )}
      <div className="flex space-x-4">
        <Card className="flex-1 p-4">
          <Table>
            <TableCaption>List of advisors registered in {university.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advisors?.data?.map(advisor => (
                <TableRow
                  className="cursor-pointer"
                  key={advisor.userId}
                  onClick={() => navigate(`/profile/${advisor.userId}`)}
                >
                  <TableCell>{advisor.name}</TableCell>
                  <TableCell>{advisor.email}</TableCell>
                  <TableCell>{advisor.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="flex-1 p-4">
          <Table>
            <TableCaption>List of students taking courses in {university.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.data?.map(student => (
                <TableRow
                  className="cursor-pointer"
                  key={student.userId}
                  onClick={() => navigate(`/profile/${student.userId}`)}
                >
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.company?.name ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
