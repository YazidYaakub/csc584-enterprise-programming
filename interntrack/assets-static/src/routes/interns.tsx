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
import { useAuthStore } from '@/store/auth'
import { useParams } from 'react-router-dom'

export function Intern() {
  const { token } = useAuthStore()
  const { companyId } = useParams()

  const { data: interns } = usePaginatedUsers(['student', companyId ?? 'company', 'intern-table'], {
    role: 'STUDENT',
    companyId: token?.companyId
  })

  return (
    <div className='p-4 flex flex-col items-center space-y-4'>
      <h1 className='text-2xl font-bold'>Interns</h1>
      <Table>
        <TableCaption>List of Interns at Petronas Berhad</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>University</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interns?.data?.map((intern) => (
            <TableRow className='cursor-pointer' key={intern.userId}>
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
