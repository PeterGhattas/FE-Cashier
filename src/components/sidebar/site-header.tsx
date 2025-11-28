"use client"

import * as React from "react"
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ChatIcon } from "@/components/chat-icon";
import { Button } from "@/components/ui/button";
import {
  useGetUnreadMessageCountQuery,
  useUnreadMessageCountChangedSubscription,
  useMeQuery,
} from "@/graphql/generated";

export function SiteHeader() {
  const [unreadCount, setUnreadCount] = React.useState(0)

  // Get current user ID
  const { data: meData } = useMeQuery()
  const currentUserId = meData?.me?._id || ""

  // Fetch initial unread count
  const { data } = useGetUnreadMessageCountQuery({
    fetchPolicy: 'cache-and-network',
  });

  // Initialize unread count from query
  React.useEffect(() => {
    if (data?.getUnreadMessageCount !== undefined) {
      setUnreadCount(data.getUnreadMessageCount)
    }
  }, [data])

  // Subscribe to real-time unread count changes
  useUnreadMessageCountChangedSubscription({
    variables: { id: currentUserId },
    skip: !currentUserId,
    onData: ({ data: subscriptionData }) => {
      if (subscriptionData.data?.unreadMessageCountChanged) {
        setUnreadCount(subscriptionData.data.unreadMessageCountChanged.count)
      }
    },
  });
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbNav />
        <div className="ml-auto flex items-center gap-2">
          <NotificationsDropdown />
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            aria-label="Chat"
            asChild
          >
            <Link href="/messages">
              <ChatIcon size={20} showBadge badgeCount={unreadCount} />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
