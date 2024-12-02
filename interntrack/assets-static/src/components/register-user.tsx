import { DialogProps } from '@radix-ui/react-dialog'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { User } from '@/schema/entity'

type RegisterUserProps = DialogProps & {
  mode: 'update' | 'create' | 'approve'
  user: User | undefined
}

export function RegisterUser(props: RegisterUserProps) {
  return (
    <Dialog {...props}>
      <DialogContent>reg user</DialogContent>
    </Dialog>
  )
}
