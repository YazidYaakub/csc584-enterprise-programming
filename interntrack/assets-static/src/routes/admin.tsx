import { useState } from 'react'
import {
  ArchiveX,
  Building,
  Edit,
  TriangleAlert,
  UniversityIcon,
  UserPlus,
  UserRoundCheck
} from 'lucide-react'

import { RegisterCompany } from '@/components/register-company'
import { RegisterUniversity } from '@/components/register-university'
import { RegisterUser } from '@/components/register-user'
import { Button } from '@/components/ui/button'
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
import { useCompanyList } from '@/hooks/use-company'
import { useUniversityList } from '@/hooks/use-university'
import { usePaginatedUsers } from '@/hooks/use-user'
import { Company, University, User } from '@/schema/entity'
import { useAuthStore } from '@/store/auth'

// TODO: implement user approval - Taufik
// TODO: implement CRUD for user - Harith
// TODO: implement CRUD for university - Zaf
// TODO: implement CRUD for company - Zaf

export function Admin() {
  const { token } = useAuthStore()

  const { data: unapprovedUsers } = usePaginatedUsers(['users', 'unapproved'], { isApproved: 0 })
  const { data: approvedUsers } = usePaginatedUsers(['users', 'approved'], { isApproved: 1 })
  const { data: universities } = useUniversityList(['universities'])
  const { data: companies } = useCompanyList(['companies'])

  const [openRegisterUser, setOpenRegisterUser] = useState(false)
  const [openRegisterCompany, setOpenRegisterCompany] = useState(false)
  const [openRegisterUniversity, setOpenRegisterUniversity] = useState(false)
  const [targetUser, setTargetUser] = useState<User>()
  const [targetCompany, setTargetCompany] = useState<Company>()
  const [targetUniversity, setTargetUniversity] = useState<University>()
  const [mode, setMode] = useState<'approve' | 'update' | 'create'>('update')

  if (token?.role !== 'ADMIN') return <Unauthorized />

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">User Management</h1>
          <p className="text-sm italic text-muted-foreground">
            Manage user approval by assigning to their company's supervisor and university's advisor
          </p>
        </div>
        <Button
          onClick={() => {
            setMode('create')
            setOpenRegisterUser(true)
          }}
        >
          <UserPlus />
          Register User
        </Button>
      </div>
      {(unapprovedUsers?.data.length ?? 0) > 0 && (
        <div className="inline-flex w-max animate-pulse items-center space-x-2 rounded border border-red-500 p-2 shadow-lg">
          <div className="rounded-full bg-red-200 p-2">
            <TriangleAlert className="text-red-500" />
          </div>
          <div className="space-y-0">
            <h2 className="font-bold text-red-700">Action Required</h2>
            <p className="text-sm">
              {unapprovedUsers?.data.length} user{(unapprovedUsers?.data.length ?? 0) > 1 && 's'}{' '}
              need to be approved
            </p>
          </div>
        </div>
      )}
      <Table>
        <TableCaption>Unapproved Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Company</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {unapprovedUsers?.data.length === 0 && (
            <TableRow>
              <TableCell className="py-8 text-center" colSpan={4}>
                <div className="flex flex-col items-center space-y-4">
                  <ArchiveX />
                  <span>No user to be approved</span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {unapprovedUsers?.data.map(user => (
            <TableRow key={user.userId}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.university?.name}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell align="right">
                <Button size="icon" variant="ghost">
                  <UserRoundCheck />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>Approved Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Advisor</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvedUsers?.data.length === 0 && (
            <TableRow>
              <TableCell className="py-8 text-center" colSpan={4}>
                <div className="flex flex-col items-center space-y-4">
                  <ArchiveX />
                  <span>No users to update</span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {approvedUsers?.data.map(user => (
            <TableRow key={user.userId}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.university?.name}</TableCell>
              <TableCell>{user.university?.name}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell align="right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setTargetUser(user)
                    setMode('update')
                    setOpenRegisterUser(true)
                  }}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">University Management</h1>
          <p className="text-sm italic text-muted-foreground">
            Manage creating, updating university information and assigning advisor
          </p>
        </div>
        <Button
          onClick={() => {
            setMode('create')
            setOpenRegisterUniversity(true)
          }}
        >
          <UniversityIcon />
          Register University
        </Button>
      </div>
      <Table>
        <TableCaption>University List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Contact Number</TableHead>
            {/* TODO: add count of advisors registered for this university */}
            {/* <TableHead>Supervisor</TableHead> */}
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities?.length === 0 && (
            <TableRow>
              <TableCell className="py-8 text-center" colSpan={4}>
                <div className="flex flex-col items-center space-y-4">
                  <ArchiveX />
                  <span>No university to update</span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {universities?.map(university => (
            <TableRow key={university.universityId}>
              <TableCell>{university.name}</TableCell>
              <TableCell>{university.email ?? '-'}</TableCell>
              <TableCell>{university.website ?? '-'}</TableCell>
              <TableCell>{university.contactNumber ?? '-'}</TableCell>
              <TableCell align="right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setTargetUniversity(university)
                    setMode('update')
                    setOpenRegisterUniversity(true)
                  }}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Company Management</h1>
          <p className="text-sm italic text-muted-foreground">
            Manage creating, updating company information and assigning supervisor
          </p>
        </div>
        <Button
          onClick={() => {
            setMode('create')
            setOpenRegisterCompany(true)
          }}
        >
          <Building />
          Register Company
        </Button>
      </div>
      <Table>
        <TableCaption>Company List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Contact Number</TableHead>
            {/* TODO: add count of supervisors registered for this company */}
            {/* <TableHead>Supervisor</TableHead> */}
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length === 0 && (
            <TableRow>
              <TableCell className="py-8 text-center" colSpan={4}>
                <div className="flex flex-col items-center space-y-4">
                  <ArchiveX />
                  <span>No company to update</span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {companies?.map(company => (
            <TableRow key={company.companyId}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.code ?? '-'}</TableCell>
              <TableCell>{company.email ?? '-'}</TableCell>
              <TableCell>{company.website ?? '-'}</TableCell>
              <TableCell>{company.contactNumber ?? '-'}</TableCell>
              <TableCell align="right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setTargetCompany(company)
                    setMode('update')
                    setOpenRegisterCompany(true)
                  }}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RegisterUser
        user={targetUser}
        mode={mode}
        open={openRegisterUser}
        onOpenChange={setOpenRegisterUser}
      />
      <RegisterCompany
        company={targetCompany}
        mode={mode}
        open={openRegisterCompany}
        onOpenChange={setOpenRegisterCompany}
      />
      <RegisterUniversity
        university={targetUniversity}
        mode={mode}
        open={openRegisterUniversity}
        onOpenChange={setOpenRegisterUniversity}
      />
    </div>
  )
}
