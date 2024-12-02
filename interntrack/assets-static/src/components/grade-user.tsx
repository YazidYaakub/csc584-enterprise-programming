import { DialogProps } from '@radix-ui/react-dialog'

import { grades, months } from '@/lib/months'
import { User } from '@/schema/entity'
import { useActivityStore } from '@/store/activity'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
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
  const { user } = props

  const { selectedMonth } = useActivityStore()

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Grade {user.name} for {months[Number(selectedMonth) - 1]}
          </DialogTitle>
        </DialogHeader>
        <Select defaultValue="A">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {grades.map(grade => (
              <SelectItem key={grade.value} value={grade.value}>
                {grade.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          <Button>Submit Grade</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
