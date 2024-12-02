import { DialogProps } from '@radix-ui/react-dialog'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { University } from '@/schema/entity'

type RegisterUniversityProps = DialogProps & {
  mode: 'update' | 'create' | 'approve'
  university: University | undefined
}

export function RegisterUniversity(props: RegisterUniversityProps) {
  return (
    <Dialog {...props}>
      <DialogContent>
        reg university {props.mode} {props.university?.name}
      </DialogContent>
    </Dialog>
  )
}
