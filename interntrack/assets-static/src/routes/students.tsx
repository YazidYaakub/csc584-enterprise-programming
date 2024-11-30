import { useParams } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Unauthorized } from '@/components/unauthorized'
import { usePaginatedUsers } from '@/hooks/use-user'
import { useAuthStore } from '@/store/auth'

export function Student() {
  const { token } = useAuthStore()
  const { universityId } = useParams()
  const { data: students } = usePaginatedUsers(
    ['student', universityId ?? 'university', 'student-table'],
    {
      role: 'STUDENT',
      universityId: token?.universityId
    }
  )

  if (token?.role !== 'ADVISOR') {
    return <Unauthorized />
  }

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Students</h1>
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
          {students?.data?.map(student => (
            <TableRow className="cursor-pointer" key={student.userId}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.university?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
