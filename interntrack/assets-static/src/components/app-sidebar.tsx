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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { usePaginatedUsers, useUser } from '@/hooks/use-user'
import { useAuthStore } from '@/store/auth'
import { useTheme } from './theme-provider'

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  const { setTheme, theme } = useTheme()
  const navigate = useNavigate()
  const { logout, token, getToken } = useAuthStore()

  const { data: user } = useUser(['user', token?.userId], token?.userId)
  const { data: unapprovedUsers } = usePaginatedUsers(['users', 'unapproved'], {
    isApproved: 0,
    size: 100
  })

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
    if (!token) {
      const success = getToken()
      if (!success) {
        onLogout()
        return
      }
    }

    if (token) {
      const currentTime = Date.now()
      const expirationTime = token.exp * 1000
      const timeUntilExpiration = expirationTime - currentTime

      const timeout = setTimeout(() => {
        onLogout()
      }, timeUntilExpiration)

      return () => clearTimeout(timeout)
    }
  }, [token, getToken, onLogout])

  const menus: {
    label: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    link: string
  }[] = []

  if (user?.role === 'ADMIN') {
    menus.push({
      label: 'Admin',
      icon: Shield,
      link: 'admin'
    })
  }

  if (user?.role === 'STUDENT') {
    menus.push(
      {
        label: 'Activity Log',
        icon: Scroll,
        link: `activity/${user?.userId}`
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${user?.universityId}`
      },
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${user?.companyId}`
      }
    )
  }

  if (user?.role === 'ADVISOR') {
    menus.push(
      {
        label: 'Students',
        icon: BookUser,
        link: 'students'
      },
      {
        label: 'University',
        icon: GraduationCap,
        link: `university/${user?.universityId}`
      }
    )
  }

  if (user?.role === 'SUPERVISOR') {
    menus.push(
      {
        label: 'Company',
        icon: Briefcase,
        link: `company/${user?.companyId}`
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
                className="dark:rounded dark:bg-white dark:p-1 [[data-state=expanded]_&]:h-8"
              />
              <span className="text-lg font-medium">Interntrack System</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menus.map(menu => (
              <SidebarMenuItem key={menu.label}>
                <SidebarMenuButton asChild>
                  <Link to={menu.link}>
                    <menu.icon className="text-primary" />
                    <span>{menu.label}</span>
                    {menu.label === 'Admin' && !open && (
                      <div className="absolute right-0 top-0 mr-[-2px] mt-[-2px] size-1 animate-ping rounded-full bg-red-500" />
                    )}
                  </Link>
                </SidebarMenuButton>
                {menu.label === 'Admin' && (
                  <SidebarMenuBadge>
                    {(unapprovedUsers?.data.length ?? 0) > 0 && (
                      <>
                        {unapprovedUsers?.data.length}
                        <div className="absolute right-0 top-0 mr-[-2px] mt-[-2px] size-1 animate-ping rounded-full bg-red-500" />
                      </>
                    )}
                  </SidebarMenuBadge>
                )}
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
                  <User className="text-primary" />
                  {user?.name}
                  <ChevronUp className="ml-auto text-primary" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link to={`profile/${user?.userId}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-red-100 focus:text-red-500"
                  onSelect={onLogout}
                >
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
