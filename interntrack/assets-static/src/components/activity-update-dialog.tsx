import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { RichEditor } from '@/components/rich-editor'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateActivity } from '@/hooks/use-activity'
import { Activity, UpdateActivitySchema } from '@/schema/activity'
import { useActivityStore } from '@/store/activity'

type ActivityUpdateDialogProps = {
  activity: Activity
  onCloseUpdateActivity: () => void
  mode: 'view' | 'edit'
}

export function ActivityUpdateDialog(props: ActivityUpdateDialogProps) {
  const { activity, onCloseUpdateActivity, mode } = props

  const { setOpenUpdateActivity } = useActivityStore()

  const [content, setContent] = useState(activity.activityDescription)
  const [title, setTitle] = useState(activity.activityTitle)

  const updateActivity = useUpdateActivity('Activity successfully update', () =>
    setOpenUpdateActivity({ open: false, activity: undefined, mode: 'view' })
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
    <DialogContent className="max-w-[900px] w-[900px]">
      <DialogHeader>
        <DialogTitle>
          {mode === 'edit' ? 'Update activity log entry' : activity.activityTitle}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {mode === 'edit' && <Input value={title} onChange={e => setTitle(e.target.value)} />}
        <RichEditor mode={mode} content={content} onUpdate={setContent} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCloseUpdateActivity}>
          Cancel
        </Button>
        <Button onClick={onUpdateActivity} disabled={updateActivity.isPending}>
          {updateActivity.isPending && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
