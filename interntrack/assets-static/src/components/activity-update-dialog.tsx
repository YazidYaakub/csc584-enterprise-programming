import { RichEditor } from '@/components/rich-editor'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateActivity } from '@/hooks/use-activity'
import { Activity, UpdateActivitySchema } from '@/schema/activity'
import { useActivityStore } from '@/store/activity'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type ActivityUpdateDialogProps = {
  activity: Activity
  onCloseUpdateActivity: () => void
}

export function ActivityUpdateDialog(props: ActivityUpdateDialogProps) {
  const { activity, onCloseUpdateActivity } = props

  const { setOpenUpdateActivity } = useActivityStore()

  const [content, setContent] = useState(activity.activityDescription)
  const [title, setTitle] = useState(activity.activityTitle)

  const updateActivity = useUpdateActivity('Activity successfully update', () =>
    setOpenUpdateActivity({ open: false, activity: undefined })
  )

  function onUpdateActivity() {
    const { success, data, error } = UpdateActivitySchema.safeParse({
      ...activity,
      activityTitle: title,
      activityDescription: content
    })

    if (!success) {
      toast.error(error.message)
      return
    }

    updateActivity.mutate(data)
  }

  return (
    <DialogContent className='max-w-[900px] w-[900px]'>
      <DialogHeader>
        <DialogTitle>Update activity log entry</DialogTitle>
      </DialogHeader>
      <div className='space-y-4'>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <RichEditor content={content} onUpdate={setContent} />
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCloseUpdateActivity}>
          Cancel
        </Button>
        <Button onClick={onUpdateActivity} disabled={updateActivity.isPending}>
          {updateActivity.isPending && <Loader2 className='animate-spin' />}
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
