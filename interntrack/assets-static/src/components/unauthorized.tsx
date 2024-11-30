import { Link } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'

export function Unauthorized() {
  const { token } = useAuthStore()

  let path = '/'

  if (token) {
    if (token.role === 'STUDENT') {
      path = '/activity-log'
    } else if (token.role === 'ADVISOR') {
      path = '/students'
    } else if (token.role === 'SUPERVISOR') {
      path = '/activity'
    }
  }

  return (
    <div className="p-4 space-y-4 h-full flex flex-col items-center justify-center">
      <TriangleAlert className="size-16 text-red-500" />
      <h1 className="text-2xl font-bold bg-red-100 px-2 rounded text-red-800">Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <Button variant="link" asChild>
        <Link to={path}>Go Home</Link>
      </Button>
    </div>
  )
}
