import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="h-screen w-full space-y-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-500">Page not found</p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}
