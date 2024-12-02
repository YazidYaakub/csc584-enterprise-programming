import { useState } from 'react'
import { FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {
  ArchiveX,
  Edit,
  Eye,
  FilePen,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Trash
} from 'lucide-react'
import { toast } from 'sonner'

import { ActivityComment } from '@/components/activity-comment'
import { ActivityUpdateDialog } from '@/components/activity-update-dialog'
import { ErrorFull } from '@/components/error-full'
import { GradeUser } from '@/components/grade-user'
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
import { useUser } from '@/hooks/use-user'
import { supervisor } from '@/lib/dummy-data'
import { months } from '@/lib/months'
import { Activity, UpdateActivitySchema } from '@/schema/activity'
import { useActivityStore } from '@/store/activity'
import { useAuthStore } from '@/store/auth'

// TODO: check if user is advisor then can approve the activity month

export function ActivityRoute() {
  const { openUpdateActivity, selectedMonth, setOpenUpdateActivity, setSelectedMonth } =
    useActivityStore()
  const { token } = useAuthStore()
  const { userId } = useParams()

  const [openActivityLog, setOpenActivityLog] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const [activityContent, setActivityContent] = useState<string>()
  const [activityTitle, setActivityTitle] = useState<string>()
  const [deleteActivityTarget, setDeleteActivityTarget] = useState<Activity>()
  const [openGrading, setOpenGrading] = useState(false)

  const { data: user } = useUser(['user', 'student', userId], userId)
  const {
    data: activities,
    error,
    isPending
  } = usePaginatedActivity(['activity', selectedMonth], userId!)
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
    if (!user || !token) return

    if (!(user.userId !== token.userId)) {
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

  function onOpenActivity(activity: Activity, mode: 'view' | 'edit') {
    setOpenUpdateActivity({ open: true, activity, mode })
  }

  function onCloseUpdateActivity() {
    setOpenUpdateActivity({ open: false, activity: undefined, mode: 'view' })
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
  if (isPending) return <LoadingFull message="Loading activities..." />

  return (
    <div className="flex h-screen flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">{user?.name} Activity</h1>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col space-y-2">
          {activities.data.length > 0 && token?.userId.toString() === userId && (
            <Button size="sm" onClick={onOpenActivityLog}>
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
        <Card className="flex flex-col items-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="dark:text-white">
                  <FaUserTie />
                  <span className="flex items-center space-x-1">
                    <span className="text-sm font-semibold">Abdul Hakim</span>
                    <span>-</span>
                    <span className="text-xs">Recogine Technology</span>
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supervisor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="dark:text-white">
                  <FaUserGraduate />
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-semibold">Abdul Hakim</span>
                    <span>-</span>
                    <span className="text-xs">UiTM Shah Alam</span>
                  </div>{' '}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Advisor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Activity Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Approval Status</TableHead>
              {token?.role === 'SUPERVISOR' && (
                <TableHead className="text-center">Supervisor Approval</TableHead>
              )}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.data.map(activity => (
              <Collapsible key={activity.activityId} asChild>
                <>
                  <TableRow className="cursor-pointer">
                    <TableCell>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MessageCircle />
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell>{activity.activityTitle}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat('en-MY').format(new Date(activity.activityDate))}
                    </TableCell>
                    <TableCell>
                      {activity.isApproved === 1 ? (
                        <span className="rounded bg-green-100 px-2 font-semibold text-green-500">
                          {activity.approvedAt
                            ? new Intl.DateTimeFormat('en-MY').format(new Date(activity.approvedAt))
                            : 'N/A'}
                        </span>
                      ) : (
                        <span className="rounded bg-orange-100 px-2 font-semibold text-orange-500">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    {token?.role === 'SUPERVISOR' && (
                      <TableCell className="text-center">
                        <Checkbox
                          checked={activity.isApproved === 1}
                          onCheckedChange={() => onApproveActivity(activity)}
                        />
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={e => e.stopPropagation()}
                            onSelect={() => onOpenActivity(activity, 'view')}
                            className="focus:bg-blue-50 focus:text-blue-500"
                          >
                            <Eye /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={e => e.stopPropagation()}
                            onSelect={() => onOpenActivity(activity, 'edit')}
                            className="focus:bg-yellow-50 focus:text-yellow-500"
                          >
                            <Edit /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={e => e.stopPropagation()}
                            onSelect={() => onConfirmationDelete(activity)}
                            className="focus:bg-red-100 focus:text-red-500"
                          >
                            <Trash /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <ActivityComment activityId={activity.activityId} />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
            {activities.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="flex flex-col items-center justify-center space-y-4 p-4 py-28">
                    <ArchiveX />
                    <span className="font-semibold text-muted-foreground">No activity found</span>
                    {token?.userId.toString() === userId && (
                      <Button size="sm" onClick={onOpenActivityLog}>
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
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Link</TableHead>
            <TableHead className="font-medium">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities
            ? activities.data.map(link => (
                <Collapsible key={link.activityDate} asChild>
                  <>
                    <TableRow>
                      <TableCell>{link.activityTitle}</TableCell>
                      <TableCell>{link.activityTitle}</TableCell>
                      <TableCell>
                        {link.activityTitle}
                        <CollapsibleTrigger asChild>
                          <Eye />
                        </CollapsibleTrigger>
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow key={link.activityTitle}>
                        <TableCell>{link.activityTitle}</TableCell>
                        <TableCell>{link.activityTitle}</TableCell>
                        <TableCell>
                          <Eye />
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            : null}
        </TableBody>
      </Table> */}
      {/* TODO: only shows if this month is not graded yet and only if its the student consultant */}
      {token?.role === 'ADVISOR' && (
        <div className="flex w-full flex-1 items-end justify-end">
          <div className="bottom-4 right-4">
            <Button onClick={() => setOpenGrading(true)}>
              <FilePen /> Grade {user?.name}
            </Button>
          </div>
        </div>
      )}
      {user && <GradeUser open={openGrading} onOpenChange={setOpenGrading} user={user} />}
      <Dialog open={openActivityLog} onOpenChange={setOpenActivityLog}>
        <DialogContent className="w-[900px] max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Create activity log entry</DialogTitle>
            <DialogDescription>
              Write your activity that you have done for your supervisor and advisor to evaluate
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <Label>
              Title<sup className="text-red-500">*</sup>
            </Label>
            <Input onChange={e => setActivityTitle(e.target.value)} />
          </div>
          <RichEditor mode="edit" content={activityContent} onUpdate={onActivityContentUpdate} />
          <DialogFooter>
            <Button variant="outline" onClick={onCloseActivityDialog}>
              Cancel
            </Button>
            <Button onClick={onCreateActivity}>
              {createActivity.isPending && <Loader2 className="animate-spin" />}
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
            mode={openUpdateActivity.mode}
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
              <span className="rounded bg-red-200 px-1 font-semibold">
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
