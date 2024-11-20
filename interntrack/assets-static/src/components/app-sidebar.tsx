import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { BookUser, Briefcase, ChevronUp, GraduationCap, Scroll, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function AppSidebar() {
  const menus = [
    {
      label: 'Activity Log',
      icon: Scroll,
      link: '/activity'
    },
    {
      label: 'University',
      icon: GraduationCap,
      link: '/university'
    },
    {
      label: 'Company',
      icon: Briefcase,
      link: '/company'
    },
    {
      label: 'Interns',
      icon: BookUser,
      link: '/interns'
    },
    {
      label: 'Students',
      icon: BookUser,
      link: '/students'
    }
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menus.map((menu) => (
              <SidebarMenuItem key={menu.label}>
                <SidebarMenuButton asChild>
                  <Link to={menu.link}>
                    <menu.icon />
                    <span>{menu.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User /> Harith
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem className='focus:bg-red-100'>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
