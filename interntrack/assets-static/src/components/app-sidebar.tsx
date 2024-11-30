import { ForwardRefExoticComponent, RefAttributes, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookUser,
  Briefcase,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  GraduationCap,
  LucideProps,
  Moon,
  Scroll,
  Shield,
  Sun,
  User
} from 'lucide-react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/auth'
import { useTheme } from './theme-provider'

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  const { setTheme, theme } = useTheme()
  const navigate = useNavigate()

  const { logout, token, getToken } = useAuthStore()

  const onLogout = useCallback(() => {
    const loadingLogOut = toast.loading('Logging out...')
    setTimeout(() => {
      logout()
      navigate('/auth')
      toast.dismiss(loadingLogOut)
      toast.success('Logged out successfully')
    }, 1000)
  }, [logout, navigate])

  useEffect(() => {
    if (token) return

    if (!getToken()) {
      onLogout()
      return
    }
  }, [token, getToken, onLogout])

  const menus: {
    label: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    link: string
  }[] = []

  if (token?.role === 'ADMIN') {
    menus.push({
      label: 'Admin',
      icon: Shield,
      link: 'admin'
    })
  }

  if (token?.role === 'STUDENT') {
    menus.push(
      {
        label: 'Activity Log',
        icon: Scroll,
        link: `activity/${token?.userId}`
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${token?.universityId}`
      },
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${token?.companyId}`
      }
    )
  }

  if (token?.role === 'ADVISOR') {
    menus.push(
      {
        label: 'Students',
        icon: BookUser,
        link: 'students'
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${token?.universityId}`
      }
    )
  }

  if (token?.role === 'SUPERVISOR') {
    menus.push(
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${token?.companyId}`
      },
      {
        label: 'Interns',
        icon: BookUser,
        link: 'interns'
      }
    )
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate('')}>
              <img
                src="/edutech-solutions.png"
                alt="edutech-logo"
                className="[[data-state=expanded]_&]:h-8 dark:bg-white dark:rounded"
              />
              <span className="font-medium text-lg">Interntrack System</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem></SidebarMenuItem>
            {menus.map(menu => (
              <SidebarMenuItem key={menu.label}>
                <SidebarMenuButton asChild>
                  <Link to={menu.link}>
                    <menu.icon className="text-primary" />
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
            <SidebarMenuButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'light' ? (
                <>
                  <Moon className="text-primary" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="text-primary" />
                  Light Mode
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              {open ? (
                <>
                  <ChevronsLeft className="text-primary" />
                  Collapse
                </>
              ) : (
                <ChevronsRight className="text-primary" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className="text-primary" /> {token?.name}
                  <ChevronUp className="ml-auto text-primary" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link to={`profile/${token?.userId}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-red-100" onSelect={onLogout}>
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
