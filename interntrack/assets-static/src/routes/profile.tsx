import { CompanyCardContent } from '@/components/company-card-content'
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
import { config } from '@/lib/config'
import { EditUserInput, EditUserSchema } from '@/schema/edit-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Profile() {
  const { id } = useParams()

  const {
    data: user,
    error,
    isPending
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => fetch(`${config.apiUrl}/api/user/${id}`).then((res) => res.json())
  })

  const updateUser = useMutation({
    mutationFn: (data: EditUserInput) => {
      return axios.put(`${config.apiUrl}/api/user/${id}`, data)
    }
  })

  const form = useForm<EditUserInput>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (user) form.reset({ name: user.name })
  }, [user, form])

  function onSubmit(data: EditUserInput) {
    console.log(data)
    updateUser.mutate(data)
  }

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='flex flex-col items-center w-full space-y-4 p-4'>
      <div className='rounded-full bg-blue-500 size-32 flex items-center justify-center'>
        <span className='text-2xl font-bold text-white'>
          {user.name.split(' ').length > 1
            ? user.name.split(' ')[0][0] + user.name.split(' ')[1][0]
            : user.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='********' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card className='min-w-96'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <div className='flex w-full space-x-4 px-28 pt-12'>
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>University</CardTitle>
          </CardHeader>
          <CardContent>
            <UniversityCardContent universityId='1' />
          </CardContent>
        </Card>
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>Company</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyCardContent companyId='1' />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
