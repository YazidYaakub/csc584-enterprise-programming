import { useAuthStore } from '@/store/auth'
import { TriangleAlert } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export function Unauthorized() {
  const { user } = useAuthStore()

  let path = '/'

  if (user) {
    if (user.role === 'STUDENT') {
      path = '/activity-log'
    } else if (user.role === 'ADVISOR') {
      path = '/students'
    } else if (user.role === 'SUPERVISOR') {
      path = '/activity'
    }
  }

  return (
    <div className='p-4 space-y-4 h-full flex flex-col items-center justify-center'>
      <TriangleAlert className='size-16 text-red-500' />
      <h1 className='text-2xl font-bold bg-red-100 px-2 rounded text-red-800'>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <Button variant='link' asChild>
        <Link to={path}>Go Home</Link>
      </Button>
    </div>
  )
}
