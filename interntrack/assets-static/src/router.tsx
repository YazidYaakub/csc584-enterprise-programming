import { About } from '@/routes/about'
import { ActivityRoute } from '@/routes/activity'
import { Admin } from '@/routes/admin'
import { Auth } from '@/routes/auth'
import { Company } from '@/routes/company'
import { Intern } from '@/routes/interns'
import { NotFound } from '@/routes/not-found'
import { Profile } from '@/routes/profile'
import { Root } from '@/routes/root.tsx'
import { Student } from '@/routes/students'
import { University } from '@/routes/university'
import { useAuthStore } from '@/store/auth'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? element : <Navigate to='/auth' />
}

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <ProtectedRoute element={<Root />} />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <About /> },
      { path: 'activity/:userId', element: <ActivityRoute /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'students', element: <Student /> },
      { path: 'interns', element: <Intern /> },
      {
        path: 'company',
        element: <Company />,
        children: [
          { index: true, element: <Company /> },
          { path: ':companyId', element: <Company /> }
        ]
      },
      {
        path: 'university',
        element: <University />,
        children: [
          { index: true, element: <University /> },
          { path: ':universityId', element: <University /> }
        ]
      },
      { path: 'admin', element: <Admin /> }
    ]
  }
])
