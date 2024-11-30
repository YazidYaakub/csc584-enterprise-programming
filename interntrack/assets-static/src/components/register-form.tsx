import { Fragment, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCreateUser } from '@/hooks/use-user'
import { RegisterInput, RegisterSchema } from '@/schema/register'

export function RegisterForm() {
  // TODO: Replace with actual data
  const universities = [
    {
      id: '1',
      name: 'Stanford University'
    },
    {
      id: '2',
      name: 'Harvard University'
    },
    {
      id: '3',
      name: 'MIT'
    },
    {
      id: '4',
      name: 'UiTM'
    }
  ]

  const companies = [
    {
      id: '1',
      name: 'Google'
    },
    {
      id: '2',
      name: 'Facebook'
    },
    {
      id: '3',
      name: 'Amazon'
    },
    {
      id: '4',
      name: 'Microsoft'
    }
  ]

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: 'STUDENT'
    }
  })

  const createUser = useCreateUser('Registration succesful', () => {
    form.reset()
  })

  useEffect(() => {
    form.setValue('companyId', '')
    form.setValue('universityId', '')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('role')])

  function onSubmit(data: RegisterInput) {
    console.log(data)
    createUser.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Role for using the system" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADVISOR">Advisor</SelectItem>
                  <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {['STUDENT', 'ADVISOR', 'SUPERVISOR'].map(role => {
          if (form.watch('role') === role) {
            const isStudent = role === 'STUDENT'
            const isAdvisor = role === 'ADVISOR'
            const isSupervisor = role === 'SUPERVISOR'

            return (
              <Fragment key={role}>
                {(isStudent || isAdvisor) && (
                  <FormField
                    control={form.control}
                    name="universityId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your institute" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {universities.map(university => (
                              <SelectItem key={university.id} value={university.id}>
                                {university.name} - {university.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
                {(isStudent || isSupervisor) && (
                  <FormField
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your work place" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map(company => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name} - {company.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </Fragment>
            )
          }
          return null
        })}
      </form>
    </Form>
  )
}
