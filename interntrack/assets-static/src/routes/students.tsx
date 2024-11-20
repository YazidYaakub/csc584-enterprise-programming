import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export function Student() {
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
    },
    {
      id: 8,
      name: 'Fiona Green',
      email: 'fiona@mail',
      university: 'Princeton University',
      course: 'Biology (BSc)'
    },
    {
      id: 9,
      name: 'George Hill',
      email: 'george@mail',
      university: 'Yale University',
      course: 'Economics (BSc)'
    },
    {
      id: 10,
      name: 'Hannah King',
      email: 'hannah@mail',
      university: 'Columbia University',
      course: 'Political Science (BSc)'
    },
    {
      id: 11,
      name: 'Ian Lee',
      email: 'ian@mail',
      university: 'University of Chicago',
      course: 'Sociology (BSc)'
    }
  ]

  return (
    <div className='p-4 flex flex-col items-center space-y-4'>
      <h1 className='text-2xl font-bold'>Students</h1>
      <Table>
        <TableCaption>List of Students at University Technology MARA Shah Alam</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
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
    </div>
  )
}
