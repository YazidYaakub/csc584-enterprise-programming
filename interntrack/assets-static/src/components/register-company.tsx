import { DialogProps } from '@radix-ui/react-dialog'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Company } from '@/schema/entity'

type RegisterCompanyProps = DialogProps & {
  mode: 'update' | 'create' | 'approve'
  company: Company | undefined
}

export function RegisterCompany(props: RegisterCompanyProps) {
  return (
    <Dialog {...props}>
      <DialogContent>reg company</DialogContent>
    </Dialog>
  )
}
