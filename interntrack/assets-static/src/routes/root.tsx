import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export function Root() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
