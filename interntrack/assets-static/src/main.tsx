import { ActivityRoute } from '@/routes/activity'
import { Admin } from '@/routes/admin'
import { Auth } from '@/routes/auth'
import { Company } from '@/routes/company'
import { Intern } from '@/routes/interns'
import { Profile } from '@/routes/profile'
import { Root } from '@/routes/root.tsx'
import { Student } from '@/routes/students'
import { University } from '@/routes/university'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'

import './index.css'
import { useAuthStore } from './store/auth'

// const isAuthenticated = !!localStorage.getItem('interntrack-token')

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? element : <Navigate to='/auth' />
}

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <ProtectedRoute element={<Root />} />,
    errorElement: <div>Not Found</div>,
    children: [
      { index: true, element: <ActivityRoute /> },
      { path: 'activity', element: <ActivityRoute /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'students', element: <Student /> },
      { path: 'interns', element: <Intern /> },
      { path: 'company/:id', element: <Company /> },
      { path: 'university/:id', element: <University /> },
      { path: 'admin', element: <Admin /> }
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  </StrictMode>
)
