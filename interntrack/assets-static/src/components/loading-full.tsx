import { Loader2 } from 'lucide-react'

type LoadingFullProps = {
  message?: string
}

export function LoadingFull({ message = 'Loading...' }: LoadingFullProps) {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-full">
      <Loader2 className="animate-spin text-primary" />
      <span className="font-semibold bg-accent px-2 rounded text-purple-800">{message}</span>
    </div>
  )
}
