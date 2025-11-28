"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconBuilding,
  IconCalendar,
  IconCash,
  IconClipboard,
  IconDashboard,
  IconFile,
  IconFileText,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUserCog,
  IconUsers,
} from "@tabler/icons-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useMeQuery, UserRole } from "@/graphql/generated"
import { NavMain } from "./nav-main"
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import Image from "next/image"
import stockLinkImage from "../../../public/stocklink-removebg-preview.png"

const data = {
  navMain: [
   
  ],
  myWorkspace: [
   
  ],
  documents: [
    
  ],
  navSecondary: [
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useMeQuery()
  const userRole = userData?.me?.role

  // Filter menu items based on user role
  const filterByRole = <T extends { roles?: UserRole[] }>(items: T[]): T[] => {
    if (!userRole) return []
    return items.filter((item) => !item.roles || item.roles.includes(userRole))
  }

  const filteredNavMain = filterByRole(data.navMain)
  const filteredMyWorkspace = filterByRole(data.myWorkspace)
  const filteredDocuments = filterByRole(data.documents)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <Image
                  src={stockLinkImage}
                  alt="StockLink"
                  width={50}
                  height={50}
                />
                <span className="text-base font-semibold">
                  {userData?.me?.role || "Loading..."}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {filteredNavMain.length > 0 && <NavMain items={filteredNavMain} />}
        {filteredMyWorkspace.length > 0 && (
          <NavDocuments items={filteredMyWorkspace} title="My Workspace" />
        )}
        {filteredDocuments.length > 0 && (
          <NavDocuments items={filteredDocuments} title="Management" />
        )}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
