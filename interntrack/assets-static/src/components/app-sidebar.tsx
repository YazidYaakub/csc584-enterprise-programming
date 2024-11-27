import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import {
  BookUser,
  Briefcase,
  ChevronUp,
  GraduationCap,
  PanelLeft,
  Scroll,
  Shield,
  User
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { useAuthStore } from '@/store/auth'

export function AppSidebar() {
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate()

  const { logout } = useAuthStore()

  const menus = [
    {
      label: 'Activity Log',
      icon: Scroll,
      link: '/activity'
    },
    {
      label: 'University',
      icon: GraduationCap,
      link: '/university/1'
    },
    {
      label: 'Company',
      icon: Briefcase,
      link: '/company/1'
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
    },
    {
      label: 'Admin',
      icon: Shield,
      link: '/admin'
    }
  ]

  function onLogout() {
    const loadingLogOut = toast.loading('Logging out...')
    setTimeout(() => {
      logout()
      navigate('/login')
      toast.dismiss(loadingLogOut)
      toast.success('Logged out successfully')
    }, 1000)
  }

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
            <SidebarMenuButton onClick={toggleSidebar}>
              <PanelLeft />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User /> Harith
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem asChild>
                  <Link to='/profile/1'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='focus:bg-red-100' onSelect={onLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
