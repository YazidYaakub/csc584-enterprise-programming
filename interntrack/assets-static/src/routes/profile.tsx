import { CompanyCardContent } from '@/components/company-card-content'
import { LoadingFull } from '@/components/loading-full'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { UniversityCardContent } from '@/components/university-card-content'
import { useUpdateUser, useUser } from '@/hooks/use-user'
import { EditUserInput, EditUserSchema } from '@/schema/edit-user'
import { useAuthStore } from '@/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

export function Profile() {
  const { userId } = useParams()
  const { token } = useAuthStore()

  const { data: user, error, isPending } = useUser(userId)
  const updateUser = useUpdateUser(Number(userId), 'Profile updated successfully')

  const form = useForm<EditUserInput>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (user) form.reset({ name: user.name })
  }, [user, form])

  function onSubmit(data: EditUserInput) {
    updateUser.mutate(data)
  }

  const nonDisplay = [
    'userId',
    'imageLink',
    'role',
    'universityId',
    'companyId',
    'university',
    'company',
    user?.role !== 'SUPERVISOR' && 'position',
    user?.role !== 'ADVISOR' && 'subject',
    user?.role !== 'STUDENT' && 'semester'
  ]

  if (isPending) return <LoadingFull message='Loading profile...' />
  if (error) return <LoadingFull message={error.message} />

  return (
    <div className='flex flex-col items-center w-full space-y-4 p-4'>
      {user.imageLink ? (
        <img
          src={user.imageLink}
          alt={`${user.name} photo`}
          className='rounded-full bg-secondary size-32 flex items-center justify-center object-cover'
        />
      ) : (
        <div className='rounded-full bg-secondary size-32 flex items-center justify-center'>
          <span className='text-2xl font-bold text-white'>
            {user.name.split(' ').length > 1
              ? user.name.split(' ')[0][0] + user.name.split(' ')[1][0]
              : user.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      {token?.userId.toString() === userId && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Edit />
              <span>Edit</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form id='update-profile-form' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='John Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button type='submit' form='update-profile-form'>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Card className='min-w-96 p-4'>
        <Table>
          <TableBody>
            {(Object.keys(user) as (keyof typeof user)[])
              .filter((key) => !nonDisplay.includes(key))
              .map((key) => {
                let value
                if (typeof user[key] === 'object') {
                  value = '-'
                } else if (typeof user[key] === 'number') {
                  value = user[key] ?? '-'
                } else {
                  const date = new Date(user[key])
                  value = isNaN(date.getTime())
                    ? user[key] ?? '-'
                    : new Intl.DateTimeFormat('en-MY').format(date)
                }

                return (
                  <TableRow key={key}>
                    <TableCell>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Card>
      <div className='flex w-full space-x-4 px-28 pt-12'>
        {user.universityId && (
          <Link to={`/university/${user.universityId}`} className='flex-1 cursor-pointer'>
            <Card>
              <CardHeader>
                <CardTitle>University</CardTitle>
              </CardHeader>
              <CardContent>
                <UniversityCardContent universityId={user.universityId} />
              </CardContent>
            </Card>
          </Link>
        )}
        {user.companyId && (
          <Link to={`/company/${user.companyId}`} className='flex-1 cursor-pointer'>
            <Card>
              <CardHeader>
                <CardTitle>Company</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyCardContent companyId='1' />
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
      {/* TODO: go to advisor profile, supervisor profile */}
    </div>
  )
}
