import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { RegisterInput, RegisterSchema } from '@/schema/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

export function RegisterForm() {
  const universities = ['Stanford University', 'Harvard University', 'MIT', 'UiTM']
  const companies = ['Google', 'Facebook', 'Amazon', 'Microsoft']

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: 'STUDENT'
    }
  })

  function onSubmit(data: RegisterInput) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Role for using the system' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='ADVISOR'>Advisor</SelectItem>
                  <SelectItem value='SUPERVISOR'>Supervisor</SelectItem>
                  <SelectItem value='STUDENT'>Student</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The selected role will be approve by system admin to ensure you have the correct
                access. Make sure to choose the correct role.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {['STUDENT', 'ADVISOR', 'SUPERVISOR'].map((role) => {
          if (form.watch('role') === role) {
            const isStudent = role === 'STUDENT'
            const isAdvisor = role === 'ADVISOR'
            const isSupervisor = role === 'SUPERVISOR'

            return (
              <Fragment key={role}>
                {(isStudent || isAdvisor) && (
                  <FormField
                    control={form.control}
                    name='university'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Choose your institute' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {universities.map((university) => (
                              <SelectItem key={university} value={university}>
                                {university}
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
                    name='company'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Choose your work place' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
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

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='user@mail.com' {...field} />
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

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-center pt-8'>
          <Button type='submit'>Register</Button>
        </div>
      </form>
    </Form>
  )
}
