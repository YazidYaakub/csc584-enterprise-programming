import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateUser } from '@/hooks/use-user'
import { UpdateUserInput, UpdateUserSchema } from '@/schema/edit-user'
import { User } from '@/schema/entity'
import { useAuthStore } from '@/store/auth'
import { Label } from './ui/label'

type UpdateUserFormProps = {
  user: User
}

export function UpdateUserForm(props: UpdateUserFormProps) {
  const { user } = props

  const { token } = useAuthStore()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [errorPassword, setErrorPassword] = useState<Error>()
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<Error>()

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      address: user.address ?? '',
      contactNumber: user.contactNumber ?? '',
      imageLink: user.imageLink ?? '',
      name: user.name,
      position: user.position ?? '',
      semester: user.semester ?? 0,
      subject: user.subject ?? ''
    }
  })

  const updateUser = useUpdateUser(Number(token?.userId), 'Profile updated successfully')

  function onSubmit(data: UpdateUserInput) {
    if (password) {
      if (password.length < 6) {
        alert(password?.length)
        setErrorPassword(Error('Password must be at least 6 characters'))
      }

      if (password !== confirmPassword) {
        setErrorConfirmPassword(Error('Password does not match'))
      }
    }

    const body = { ...data }

    if (password) body.password = password
    updateUser.mutate(body)
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    if (errorPassword) setErrorPassword(undefined)
    setPassword(e.target.value)
  }

  function handlePasswordConfirmChange(e: ChangeEvent<HTMLInputElement>) {
    if (errorConfirmPassword) setErrorConfirmPassword(undefined)
    setConfirmPassword(e.target.value)
  }

  return (
    <Form {...form}>
      <form id="update-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://my-image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tokyo, Japan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {token?.role === 'STUDENT' && (
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Current university semester" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {token?.role === 'SUPERVISOR' && (
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Position in company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {token?.role === 'ADVISOR' && (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Courses taught in university" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
          {errorPassword && (
            <p className="text-[0.8rem] font-medium text-destructive">{errorPassword?.message}</p>
          )}
        </div>
        <div className="">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={handlePasswordConfirmChange}
          />
          {errorConfirmPassword && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errorConfirmPassword?.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  )
}
