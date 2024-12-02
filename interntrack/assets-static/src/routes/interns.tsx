import { useNavigate, useParams } from 'react-router-dom'

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

export function Intern() {
  const { token } = useAuthStore()
  const { companyId } = useParams()
  const navigate = useNavigate()

  const { data: interns } = usePaginatedUsers(['student', companyId!, 'intern-table'], {
    role: 'STUDENT',
    companyId: token?.companyId
  })

  if (token?.role !== 'SUPERVISOR') return <Unauthorized />

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Interns</h1>
      <Table>
        <TableCaption>List of Interns under {token?.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>University</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interns?.data?.map(intern => (
            <TableRow
              className="cursor-pointer"
              key={intern.userId}
              onClick={() => navigate(`/activity/${intern.userId}`)}
            >
              <TableCell>{intern.name}</TableCell>
              <TableCell>{intern.email}</TableCell>
              <TableCell>{intern.university?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
