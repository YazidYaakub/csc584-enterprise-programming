import { CircleAlert } from 'lucide-react'

type ErrorFullProps = {
  message?: string
}

export function ErrorFull({ message = 'Error' }: ErrorFullProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <CircleAlert className="size-16 text-red-500" />
      <span className="rounded bg-red-100 px-2 font-semibold text-red-800">{message}</span>
    </div>
  )
}
