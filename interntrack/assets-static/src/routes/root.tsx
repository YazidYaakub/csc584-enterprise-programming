import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export function Root() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='size-full'>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
