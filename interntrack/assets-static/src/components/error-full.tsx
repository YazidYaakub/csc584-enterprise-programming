import { CircleAlert } from 'lucide-react'

type ErrorFullProps = {
  message?: string
}

export function ErrorFull({ message = 'Error' }: ErrorFullProps) {
  return (
    <div className='flex flex-col space-y-4 justify-center items-center h-full'>
      <CircleAlert className='text-red-500 size-16' />
      <span className='font-semibold bg-red-100 px-2 rounded text-red-800'>{message}</span>
    </div>
  )
}
