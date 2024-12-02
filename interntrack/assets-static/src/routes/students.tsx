import { useNavigate, useParams } from 'react-router-dom'
import { Info } from 'lucide-react'

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
  const navigate = useNavigate()
  const { data: students } = usePaginatedUsers(['student', universityId!, 'student-table'], {
    role: 'STUDENT',
    universityId: token?.universityId
  })

  if (token?.role !== 'ADVISOR') return <Unauthorized />

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <div className="flex w-full items-center space-x-2">
        <Info className="size-4 text-blue-500" />
        <p className="text-left text-muted-foreground">
          Click on student's name to view and approve their log.
        </p>
      </div>
      <Table>
        <TableCaption>List of Students under {token.name}</TableCaption>
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
              onClick={() => navigate(`/activity/${student.userId}`)}
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.company?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
