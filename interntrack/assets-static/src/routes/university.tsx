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
import { usePaginatedUsers } from '@/hooks/use-user'
import { center } from '@/lib/google-map'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

export function University() {
  const { universityId } = useParams()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API ?? ''
  })

  const { data: advisors } = usePaginatedUsers(
    ['advisor', universityId ?? 'university', 'advisor-table'],
    { role: 'ADVISOR', universityId: Number(universityId) }
  )

  const { data: students } = usePaginatedUsers(
    ['student', universityId ?? 'university', 'student-table'],
    { role: 'STUDENT', universityId: Number(universityId) }
  )

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const university = {
    name: 'UiTM Shah Alam',
    location: 'Shah Alam, Selangor, Malaysia'
  }

  return (
    <div className='p-4 flex flex-col space-y-4'>
      <div className='flex space-x-4 items-center justify-center'>
        <img
          src='https://static.wixstatic.com/media/b2f731_d7732210aabb493295a23edb6cf59335~mv2.png/v1/fill/w_560,h_658,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/b2f731_d7732210aabb493295a23edb6cf59335~mv2.png'
          alt={`${university.name} logo`}
          className='h-12'
        />
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{university.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{university.location}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isLoaded && (
        <div className='flex items-center justify-center'>
          <GoogleMap
            mapContainerStyle={{ width: '600px', height: '400px' }}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={center}
              onClick={() => {
                const infowindow = new google.maps.InfoWindow({
                  content: 'Hello World'
                })
                infowindow.open({
                  anchor: new google.maps.Marker({ position: center, map }),
                  map,
                  shouldFocus: false
                })
              }}
            />
          </GoogleMap>
        </div>
      )}
      <div className='flex space-x-4'>
        <Card className='flex-1'>
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
              {advisors?.data?.map((advisor) => (
                <TableRow className='cursor-pointer' key={advisor.userId}>
                  <TableCell>{advisor.name}</TableCell>
                  <TableCell>{advisor.email}</TableCell>
                  <TableCell>{advisor.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className='flex-1'>
          <Table>
            <TableCaption>List of students taking courses in {university.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>University</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.data?.map((student) => (
                <TableRow className='cursor-pointer' key={student.userId}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
