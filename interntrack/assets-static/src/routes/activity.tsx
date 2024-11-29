import { ActivityUpdateDialog } from '@/components/activity-update-dialog'
import { ErrorFull } from '@/components/error-full'
import { LoadingFull } from '@/components/loading-full'
import { RichEditor } from '@/components/rich-editor'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  useCreateActivity,
  useDeleteActivity,
  usePaginatedActivity,
  useUpdateActivity
} from '@/hooks/use-activity'
import { supervisor } from '@/lib/dummy-data'
import { months } from '@/lib/months'
import { Activity, UpdateActivitySchema } from '@/schema/activity'
import { useActivityStore } from '@/store/activity'
import { useAuthStore } from '@/store/auth'
import {
  Briefcase,
  Edit,
  Eye,
  GraduationCap,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash
} from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

// TODO: check if user is supervisor then can check the checkbox
// TODO: check if user is advisor then can approve the activity month

export function ActivityRoute() {
  const { openUpdateActivity, selectedMonth, setOpenUpdateActivity, setSelectedMonth } =
    useActivityStore()
  const { user } = useAuthStore()
  const { userId } = useParams()

  const [openActivityLog, setOpenActivityLog] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const [activityContent, setActivityContent] = useState<string>()
  const [activityTitle, setActivityTitle] = useState<string>()
  const [deleteActivityTarget, setDeleteActivityTarget] = useState<Activity>()

  const { data: activities, error, isPending } = usePaginatedActivity()
  const updateActivity = useUpdateActivity('Activity successfully approved')
  const deleteActivity = useDeleteActivity('Activity log successfully deleted')
  const createActivity = useCreateActivity('Activity log successfully created', () =>
    setOpenActivityLog(false)
  )

  function onOpenActivityLog() {
    setOpenActivityLog(true)
  }

  function onCloseActivityDialog() {
    setOpenActivityLog(false)
  }

  function onActivityContentUpdate(content: string) {
    setActivityContent(content)
  }

  function onCreateActivity() {
    if (!user) {
      toast.error('Not authorized to create activity log')
      return
    }

    if (!activityTitle || activityTitle.trim() === '') {
      toast.error('Activity title is required')
      return
    }

    if (!activityContent || activityContent.trim() === '') {
      toast.error('Activity content is required')
      return
    }

    createActivity.mutate({
      activityTitle: activityTitle,
      activityDescription: activityContent,
      studentId: user.userId,
      approvedById: supervisor.id
    })
  }

  function onOpenUpdateActivity(activity: Activity) {
    setOpenUpdateActivity({ open: true, activity })
  }

  function onCloseUpdateActivity() {
    setOpenUpdateActivity({ open: false, activity: undefined })
  }

  function onApproveActivity(activity: Activity) {
    const { success, data, error } = UpdateActivitySchema.safeParse({
      ...activity,
      isApproved: activity.isApproved === 1 ? 0 : 1,
      approvedAt: activity.isApproved === 1 ? null : new Date().toISOString(),
      approvedById: supervisor.id
    })

    if (!success) {
      toast.error(error.message)
      return
    }

    updateActivity.mutate(data)
  }

  function onConfirmationDelete(activity: Activity) {
    setDeleteActivityTarget(activity)
    setOpenDeleteConfirmation(true)
  }

  function onCloseConfirmation(confirmed: boolean) {
    if (!deleteActivityTarget) return

    if (confirmed) deleteActivity.mutate(deleteActivityTarget?.activityId)

    setDeleteActivityTarget(undefined)
    setOpenDeleteConfirmation(false)
  }

  if (error) return <ErrorFull message={error?.message} />
  if (isPending) return <LoadingFull message='Loading activities...' />

  return (
    <div className='h-screen p-4 items-center flex flex-col space-y-4'>
      <h1 className='font-bold text-2xl'>{user?.name} Activity</h1>
      <div className='w-full flex justify-between items-center'>
        <div className='flex flex-col space-y-2'>
          {activities.data.length > 0 && user?.userId.toString() === userId && (
            <Button size='sm' onClick={onOpenActivityLog}>
              <Plus /> Activity Log
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
          <Card className='p-2 space-y-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='flex space-x-2 items-center cursor-pointer'>
                    <Briefcase className='size-4' />
                    <div className='flex flex-col text-sm'>
                      <span className='font-semibold'>Abdul Hakim</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Supervisor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='flex space-x-2 items-center cursor-pointer'>
                    <GraduationCap className='size-4' />
                    <div className='flex flex-col text-sm'>
                      <span className='font-semibold'>Abdul Hakim</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Advisor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Card>
        </div>
      </div>
      <div className='w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Approval Status</TableHead>
              {user?.role === 'SUPERVISOR' && (
                <TableHead className='text-center'>Supervisor Approval</TableHead>
              )}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.data.map((activity) => (
              <TableRow key={activity.activityId}>
                <TableCell>{activity.activityTitle}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-MY').format(new Date(activity.activityDate))}
                </TableCell>
                <TableCell>
                  {activity.isApproved === 1 ? (
                    <span className='text-green-500 bg-green-100 px-2 rounded font-semibold'>
                      {activity.approvedAt
                        ? new Intl.DateTimeFormat('en-MY').format(new Date(activity.approvedAt))
                        : 'N/A'}
                    </span>
                  ) : (
                    <span className='text-orange-500 bg-orange-100 px-2 rounded font-semibold'>
                      Pending
                    </span>
                  )}
                </TableCell>
                {user?.role === 'SUPERVISOR' && (
                  <TableCell className='text-center'>
                    <Checkbox
                      disabled={user?.role !== 'SUPERVISOR'}
                      checked={activity.isApproved === 1}
                      onCheckedChange={() => onApproveActivity(activity)}
                    />
                  </TableCell>
                )}
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem className='focus:text-blue-500 focus:bg-blue-100'>
                        <Eye /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => onOpenUpdateActivity(activity)}
                        className='focus:bg-yellow-50 focus:text-yellow-500'
                      >
                        <Edit /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => onConfirmationDelete(activity)}
                        className='focus:text-red-500 focus:bg-red-100'
                      >
                        <Trash /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {activities.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <div className='items-center justify-center flex flex-col space-y-4 p-4 pt-60'>
                    <span className='text-muted-foreground font-semibold'>
                      No activity found. Add your activity log now!
                    </span>
                    {user?.userId.toString() === userId && (
                      <Button size='sm'>
                        <Plus />
                        <span>Activity Log</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openActivityLog} onOpenChange={setOpenActivityLog}>
        <DialogContent className='max-w-[900px] w-[900px]'>
          <DialogHeader>
            <DialogTitle>Create activity log entry</DialogTitle>
            <DialogDescription>
              Write your activity that you have done for your supervisor and advisor to evaluate
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col space-y-3'>
            <Label>
              Title<sup className='text-red-500'>*</sup>
            </Label>
            <Input onChange={(e) => setActivityTitle(e.target.value)} />
          </div>
          <RichEditor content={activityContent} onUpdate={onActivityContentUpdate} />
          <DialogFooter>
            <Button variant='outline' onClick={onCloseActivityDialog}>
              Cancel
            </Button>
            <Button onClick={onCreateActivity}>
              {createActivity.isPending && <Loader2 className='animate-spin' />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openUpdateActivity.open} onOpenChange={onCloseUpdateActivity}>
        {openUpdateActivity.activity && (
          <ActivityUpdateDialog
            activity={openUpdateActivity.activity}
            onCloseUpdateActivity={onCloseUpdateActivity}
          />
        )}
      </Dialog>
      <AlertDialog
        open={openDeleteConfirmation && deleteActivityTarget !== undefined}
        onOpenChange={() => onCloseConfirmation(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this{' '}
              <span className='font-semibold bg-red-200 px-1 rounded'>
                {deleteActivityTarget?.activityTitle}
              </span>{' '}
              activity?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the activity log entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onCloseConfirmation(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onCloseConfirmation(true)}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
