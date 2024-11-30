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
import { useCompany } from '@/hooks/use-company'
import { usePaginatedUsers } from '@/hooks/use-user'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Briefcase } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function Company() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API ?? ''
  })

  const { data: supervisors } = usePaginatedUsers(
    ['supervisor', companyId ?? 'company', 'company-supervisor-table'],
    {
      companyId: Number(companyId),
      role: 'SUPERVISOR'
    }
  )
  const { data: students } = usePaginatedUsers(
    ['student', companyId ?? 'company', 'company-student-table'],
    { companyId: Number(companyId), role: 'STUDENT' }
  )
  const { data: company, isPending, error } = useCompany(['company'], Number(companyId))

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: company?.latitude ?? 0,
        lng: company?.longitude ?? 0
      })
      map.fitBounds(bounds)

      setMap(map)
    },
    [company?.latitude, company?.longitude]
  )

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const nonDisplay = ['companyId', 'latitude', 'longitude', 'logoLink']

  if (isPending) return <LoadingFull message='Loading company...' />
  if (error) return <ErrorFull message={error.message} />

  return (
    <div className='p-4 flex flex-col space-y-4'>
      <div className='flex space-x-4 items-center justify-center'>
        {company.logoLink ? (
          <img src={company.logoLink} alt={`${company.name} logo`} className='h-8' />
        ) : (
          <Briefcase className='size-8 text-primary' />
        )}
      </div>
      <Table>
        <TableBody>
          {(Object.keys(company) as (keyof typeof company)[])
            .filter((key) => !nonDisplay.includes(key))
            .map((key) => (
              <TableRow key={key}>
                <TableCell>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </TableCell>
                <TableCell>{company[key] ?? '-'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isLoaded && company.latitude && company.longitude && (
        <div className='flex items-center justify-center'>
          <GoogleMap
            mapContainerStyle={{ width: '600px', height: '400px' }}
            center={{ lat: company.latitude, lng: company.longitude }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={{ lat: company.latitude, lng: company.longitude }}
              onClick={() => {
                const infowindow = new google.maps.InfoWindow({
                  content: 'Hello World'
                })
                infowindow.open({
                  anchor: new google.maps.Marker({
                    position: { lat: company.latitude ?? 0, lng: company.longitude ?? 0 },
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
      <div className='flex space-x-4'>
        <Card className='flex-1 p-4'>
          <Table>
            <TableCaption>List of supervisors registered in {company.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisors?.data?.map((supervisor) => (
                <TableRow
                  className='cursor-pointer'
                  key={supervisor.userId}
                  onClick={() => navigate(`/profile/${supervisor.userId}`)}
                >
                  <TableCell>{supervisor.name}</TableCell>
                  <TableCell>{supervisor.email}</TableCell>
                  <TableCell>{supervisor.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className='flex-1 p-4'>
          <Table>
            <TableCaption>List of students doing internship in {company.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>University</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.data.map((student) => (
                <TableRow
                  className='cursor-pointer'
                  key={student.userId}
                  onClick={() => navigate(`/profile/${student.userId}`)}
                >
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
