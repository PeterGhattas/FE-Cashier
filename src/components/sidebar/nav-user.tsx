"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useApolloClient } from "@apollo/client"
import Cookies from "js-cookie"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  useMeQuery,
  useLogoutMutation,
  useSetOfflineMutation,
} from "@/graphql/generated"

export function NavUser() {
  const router = useRouter()
  const apolloClient = useApolloClient()
  const { isMobile } = useSidebar()
  const { data, loading, error } = useMeQuery()
  const [logout, { loading: logoutLoading }] = useLogoutMutation()
  const [setOffline] = useSetOfflineMutation()

  const handleLogout = async () => {
    try {
      // Set user status to offline before logout
      try {
        await setOffline()
        console.log("User status set to offline")
      } catch (error) {
        console.error("Failed to set offline status:", error)
        // Continue with logout even if status update fails
      }

      // Get FCM device token from localStorage
      const fcmToken = localStorage.getItem("fcmToken")

      // Call the logout mutation with device token
      // Backend will handle token removal automatically
      await logout({
        variables: {
          logoutInput: fcmToken ? { deviceToken: fcmToken } : undefined,
        },
      })

      // Clear local FCM token
      if (fcmToken) {
        localStorage.removeItem("fcmToken")
        console.log("Device token removed from localStorage")
      }

      // Clear the access token cookie
      Cookies.remove("accessToken")

      // Clear Apollo cache to remove all cached data
      await apolloClient.clearStore()

      // Redirect to login page
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)

      // Even if the backend logout fails, clear local state
      Cookies.remove("accessToken")
      localStorage.removeItem("fcmToken")
      await apolloClient.clearStore()
      router.push("/login")
      router.refresh()
    }
  }

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">...</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (error || !data?.me) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">?</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Error loading user</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const user = {
    name: data.me.username,
    email: data.me.email,
    avatar: data.me.avatar || "",
    fullName: data.me.fullName || data.me.username,
  }

  // Get initials from full name (e.g., "John Doe" -> "JD")
  const getInitials = (name: string): string => {
    const names = name.trim().split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const initials = getInitials(user.fullName)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/hr-profile')}>
                <IconUserCircle />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={logoutLoading}>
              <IconLogout />
              {logoutLoading ? "Logging out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
