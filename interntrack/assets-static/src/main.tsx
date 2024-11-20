import { Activity } from '@/routes/activity'
import { Admin } from '@/routes/admin'
import { Auth } from '@/routes/auth'
import { Company } from '@/routes/company'
import { Intern } from '@/routes/interns'
import { Profile } from '@/routes/profile'
import { Root } from '@/routes/root.tsx'
import { Student } from '@/routes/students'
import { University } from '@/routes/university'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import './index.css'

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Not Found</div>,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'students', element: <Student /> },
      { path: 'interns', element: <Intern /> },
      { path: 'activity', element: <Activity /> },
      { path: 'company/:id', element: <Company /> },
      { path: 'university/:id', element: <University /> },
      { path: 'admin', element: <Admin /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors />
  </StrictMode>
)
