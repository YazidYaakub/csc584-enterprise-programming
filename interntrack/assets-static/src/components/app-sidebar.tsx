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
import { useAuthStore } from '@/store/auth'
import {
  BookUser,
  Briefcase,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  GraduationCap,
  LucideProps,
  Scroll,
  Shield,
  User
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  const navigate = useNavigate()

  const { logout, user } = useAuthStore()

  if (!user) {
    onLogout()
    return null
  }

  const menus: {
    label: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    link: string
  }[] = []

  if (user.role === 'ADMIN') {
    menus.push({
      label: 'Admin',
      icon: Shield,
      link: 'admin'
    })
  }

  if (user.role === 'STUDENT') {
    menus.push(
      {
        label: 'Activity Log',
        icon: Scroll,
        link: `activity/${user.userId}`
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${user.universityId}`
      },
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${user.companyId}`
      }
    )
  }

  if (user.role === 'ADVISOR') {
    menus.push(
      {
        label: 'Students',
        icon: BookUser,
        link: 'students'
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${user.universityId}`
      }
    )
  }

  if (user.role === 'SUPERVISOR') {
    menus.push(
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${user.companyId}`
      },
      {
        label: 'Interns',
        icon: BookUser,
        link: 'interns'
      }
    )
  }

  function onLogout() {
    console.error('Logging out...')

    const loadingLogOut = toast.loading('Logging out...')
    setTimeout(() => {
      logout()
      navigate('/auth')
      toast.dismiss(loadingLogOut)
      toast.success('Logged out successfully')
    }, 1000)
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to=''>
                  <img src='/edutech-solutions.svg' alt='edutech-logo' className='size-6' />
                  <span className='font-medium text-lg'>Interntrack System</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {menus.map((menu) => (
              <SidebarMenuItem key={menu.label}>
                <SidebarMenuButton asChild>
                  <Link to={menu.link}>
                    <menu.icon className='text-primary' />
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
              {open ? (
                <>
                  <ChevronsLeft className='text-primary' />
                  Collapse
                </>
              ) : (
                <ChevronsRight className='text-primary' />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className='text-primary' /> {user.name}
                  <ChevronUp className='ml-auto text-primary' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem asChild>
                  <Link to={`profile/${user.userId}`}>Profile</Link>
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
