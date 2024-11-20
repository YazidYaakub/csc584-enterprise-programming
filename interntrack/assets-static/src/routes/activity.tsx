import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { months } from '@/utils/months'
import { Briefcase, Edit, Plus, Trash } from 'lucide-react'
import { useState } from 'react'

export function Activity() {
  const activities = [
    {
      id: 1,
      title: 'Meeting with John Doe',
      date: '2021-08-01',
      time: '10:00 AM',
      description: 'Meeting with John Doe to discuss the project'
    },
    {
      id: 2,
      title: 'Meeting with John Doe',
      date: '2021-08-01',
      time: '10:00 AM',
      description: 'Meeting with John Doe to discuss the project'
    },
    {
      id: 3,
      title: 'Meeting with John Doe',
      date: '2021-08-01',
      time: '10:00 AM',
      description: 'Meeting with John Doe to discuss the project'
    },
    {
      id: 4,
      title: 'Meeting with John Doe',
      date: '2021-08-01',
      time: '10:00 AM',
      description: 'Meeting with John Doe to discuss the project'
    },
    {
      id: 5,
      title: 'Meeting with John Doe',
      date: '2021-08-01',
      time: '10:00 AM',
      description: 'Meeting with John Doe to discuss the project'
    }
  ]

  const currentMonth = new Date().getMonth() + 1

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString())

  return (
    <div className='h-screen p-4 items-center flex flex-col space-y-4'>
      <h1 className='font-bold text-2xl'>Activity</h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col space-y-2'>
          {activities.length > 0 && (
            <Button size='sm'>
              <Plus />
              <span>Activity Log</span>
            </Button>
          )}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Card className='p-2'>
            <div className='flex space-x-2 items-center'>
              <Briefcase className='size-4' />
              <div className='flex flex-col text-sm'>
                <span className='font-semibold'>Abdul Hakim</span>
                <span className='text-muted-foreground font-semibold'>Software Manager</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className='w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Activity</TableHead>
              <TableHead className='text-center'>Supervisor Approval</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <Button size='icon' variant='ghost'>
                    <Edit />
                  </Button>
                  <Button size='icon' variant='ghost'>
                    <Trash />
                  </Button>
                </TableCell>
                <TableCell>{activity.title}</TableCell>
                <TableCell className='text-center'>
                  <Checkbox checked />
                </TableCell>
              </TableRow>
            ))}
            {activities.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className='text-center'>
                  <div className='items-center justify-center flex flex-col space-y-4 p-4'>
                    <span className='text-muted-foreground font-semibold'>
                      No activity found. Add your activity log now!
                    </span>
                    <Button size='sm'>
                      <Plus />
                      <span>Activity Log</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
