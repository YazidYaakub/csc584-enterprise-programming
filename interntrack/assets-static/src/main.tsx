import { Activity } from '@/routes/activity'
import { Company } from '@/routes/company'
import { Intern } from '@/routes/interns'
import { Login } from '@/routes/login'
import { Profile } from '@/routes/profile'
import { Root } from '@/routes/root.tsx'
import { Student } from '@/routes/students'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
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
      { path: 'company/:id', element: <Company /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
