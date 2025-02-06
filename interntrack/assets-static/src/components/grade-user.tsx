import { useForm } from 'react-hook-form'
import { DialogProps } from '@radix-ui/react-dialog'

import { useCreateGrade } from '@/hooks/use-grade'
import { convertToShortform, grades, months } from '@/lib/months'
import { User } from '@/schema/entity'
import { useActivityStore } from '@/store/activity'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'

type GradeUserProps = DialogProps & {
  user: User
}

export function GradeUser(props: GradeUserProps) {
  const { user, ...rest } = props

  const { selectedMonth } = useActivityStore()

  const form = useForm({
    defaultValues: {
      grade: 'A'
    }
  })

  const gradeStudent = useCreateGrade('Grade submitted successfully', () => form.reset())

  function onSubmit(data: { grade: string }) {
    console.log(data)
    gradeStudent.mutate({
      studentId: user.userId,
      grade: data.grade,
      month: convertToShortform(months[Number(selectedMonth) - 1])
    })
  }

  return (
    <Dialog {...rest}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Grade {user.name} for {months[Number(selectedMonth) - 1]}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="grade-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grades.map(grade => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
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
        <Table>
          <TableCaption>Grading guide</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>Criteria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
              <TableCell>
                Excellent. Student did impactful job and proved their critical thinking skills
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>B</TableCell>
              <TableCell>
                Good. Student did standard work without causing trouble to company and proved their
                independence
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>C</TableCell>
              <TableCell>
                Fair. Student able to do task with some help from seniors and supervisors
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>D</TableCell>
              <TableCell>
                Needs Improvement. Student keep making mistake that requires constant help from
                seniors and supervisors
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>E</TableCell>
              <TableCell>
                Poor. Student cannot keep up with company's load and causes many issue to the
                company
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>F</TableCell>
              <TableCell>
                Fail. Student did not log any activity and does not learn anything from this month
                internship
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogFooter>
          <Button type="submit" form="grade-form">
            Submit Grade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
