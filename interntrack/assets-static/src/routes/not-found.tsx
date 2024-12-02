import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-500">Page not found</p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}
