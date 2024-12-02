import { Loader2 } from 'lucide-react'

type LoadingFullProps = {
  message?: string
}

export function LoadingFull({ message = 'Loading...' }: LoadingFullProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-primary" />
      <span className="rounded bg-accent px-2 font-semibold text-purple-800">{message}</span>
    </div>
  )
}
