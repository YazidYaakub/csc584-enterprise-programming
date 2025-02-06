import { useForm } from 'react-hook-form'
import { DialogProps } from '@radix-ui/react-dialog'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useCreateStudentConsultant } from '@/hooks/use-student-consultant'
import { usePaginatedUsers } from '@/hooks/use-user'
import { User } from '@/schema/entity'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type RegisterUserProps = DialogProps & {
  mode: 'update' | 'create' | 'approve'
  user: User | undefined
}

export function RegisterUser(props: RegisterUserProps) {
  const { mode, user, ...rest } = props

  const form = useForm<{ advisorId: string; supervisorId: string }>()

  const assignStudent = useCreateStudentConsultant('Student assigned successfully', () => {
    form.reset()
  })

  const { data: supervisorList } = usePaginatedUsers(['supervisor-assign'], {
    role: 'SUPERVISOR'
  })

  const { data: advisorList } = usePaginatedUsers(['advisor-assign'], {
    role: 'ADVISOR'
  })

  function onSubmit(data: { advisorId: string; supervisorId: string }) {
    const formData = {
      ...data,
      studentId: user?.userId as string
    }

    assignStudent.mutate(formData)
  }

  return (
    <Dialog {...rest}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="assign-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="advisorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advisor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a supervisor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {supervisorList?.data?.map(supervisor => (
                        <SelectItem key={supervisor.userId} value={supervisor.userId}>
                          {supervisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supervisorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supervisor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an advisor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {advisorList?.data?.map(advisor => (
                        <SelectItem key={advisor.userId} value={advisor.userId}>
                          {advisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="assign-form">
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
