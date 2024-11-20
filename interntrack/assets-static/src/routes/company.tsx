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
import { center } from '@/lib/google-map'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

export function Company() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API ?? ''
  })

  const supervisors = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@mail',
      position: 'Software Engineer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@mail',
      position: 'Hardware Engineer'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@mail',
      position: 'Product Manager'
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@mail',
      position: 'Marketing Manager'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie@mail',
      position: 'Business Development Manager'
    },
    {
      id: 6,
      name: 'Diana Evans',
      email: 'diana@mail',
      position: 'Human Resources Manager'
    },
    {
      id: 7,
      name: 'Ethan Harris',
      email: 'ethan@mail',
      position: 'Finance Manager'
    }
  ]

  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@mail',
      university: 'University of California, Los Angeles',
      course: 'Computer Science (BSc)'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@mail',
      university: 'Massachusetts Institute of Technology',
      course: 'Electrical Engineering (BSc)'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@mail',
      university: 'Stanford University',
      course: 'Mechanical Engineering (BSc)'
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@mail',
      university: 'Harvard University',
      course: 'Business Administration (BBA)'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie@mail',
      university: 'University of Oxford',
      course: 'Physics (BSc)'
    },
    {
      id: 6,
      name: 'Diana Evans',
      email: 'diana@mail',
      university: 'University of Cambridge',
      course: 'Mathematics (BSc)'
    },
    {
      id: 7,
      name: 'Ethan Harris',
      email: 'ethan@mail',
      university: 'California Institute of Technology',
      course: 'Chemical Engineering (BSc)'
    }
  ]

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const company = {
    name: 'Google',
    location: 'Mountain View, CA',
    natureBusiness: 'Technology'
  }

  return (
    <div className='p-4 flex flex-col space-y-4'>
      <div className='flex space-x-4 items-center justify-center'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png'
          alt={`${company.name} logo`}
          className='h-8'
        />
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{company.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Industry</TableCell>
            <TableCell>{company.natureBusiness}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{company.location}</TableCell>
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
            {/* <Marker position={center} /> */}
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
            <TableCaption>List of supervisors registered in {company.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisors.map((supervisor) => (
                <TableRow className='cursor-pointer' key={supervisor.id}>
                  <TableCell>{supervisor.name}</TableCell>
                  <TableCell>{supervisor.email}</TableCell>
                  <TableCell>{supervisor.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className='flex-1'>
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
              {students.map((student) => (
                <TableRow className='cursor-pointer' key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.university}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
