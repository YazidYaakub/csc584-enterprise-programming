import { TableCell, TableRow } from './ui/table'

type ActivityCommentProps = {
  activityId: string
}

export function ActivityComment({ activityId }: ActivityCommentProps) {
  return (
    <TableRow>
      <TableCell colSpan={5}>hello {activityId}</TableCell>
    </TableRow>
  )
}
