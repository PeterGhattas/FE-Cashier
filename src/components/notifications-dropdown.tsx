"use client"

import * as React from "react"
import { IconBell, IconBellRinging, IconCheck, IconTrash } from "@tabler/icons-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  useGetMyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} from "@/graphql/generated"
import { cn } from "@/lib/utils"

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Fetch notifications - always fetch to show badge count
  const { data, loading } = useGetMyNotificationsQuery({
    // Poll every 30 seconds for new notifications
    pollInterval: 30000,
    // Always fetch so badge count is visible
    fetchPolicy: 'cache-and-network',
  })

  // Mutations
  const [markAsRead] = useMarkNotificationAsReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()

  const notifications = data?.getMyNotifications || []
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkAsRead = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await markAsRead({
        variables: { id },
        refetchQueries: ["GetMyNotifications"],
      })
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await deleteNotification({
        variables: { id },
        refetchQueries: ["GetMyNotifications"],
      })
    } catch (error) {
      console.error("Failed to delete notification:", error)
    }
  }

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // Mark as read if unread
    if (!notification.isRead) {
      markAsRead({
        variables: { id: notification._id },
        refetchQueries: ["GetMyNotifications"],
      })
    }

    // Handle notification action based on data
    if (notification.data) {
      try {
        const data = typeof notification.data === 'string'
          ? JSON.parse(notification.data)
          : notification.data

        // You can add custom navigation logic here based on notification type
        if (data.url) {
          window.location.href = data.url
        }
      } catch (error) {
        console.error("Failed to parse notification data:", error)
      }
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch {
      return timestamp
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative size-8"
          aria-label="Notifications"
        >
          {unreadCount > 0 ? (
            <>
              <IconBellRinging className="size-5" />
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            </>
          ) : (
            <IconBell className="size-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <IconBell className="mb-2 size-12 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-sm">No notifications</p>
              <p className="text-muted-foreground text-xs">
                You&apos;re all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={cn(
                    "group relative cursor-pointer px-4 py-3 transition-colors hover:bg-muted/50",
                    !notification.isRead && "bg-primary/5"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <div className="absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" />
                  )}

                  <div className="flex gap-3 pl-3">
                    {/* Notification icon/image */}
                    {notification.imageUrl && (
                      <div className="shrink-0">
                        <img
                          src={notification.imageUrl}
                          alt=""
                          className="size-10 rounded-full object-cover"
                        />
                      </div>
                    )}

                    {/* Notification content */}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm leading-tight">
                        {notification.title}
                      </p>
                      {notification.body && (
                        <p className="mt-1 text-muted-foreground text-xs leading-snug line-clamp-2">
                          {notification.body}
                        </p>
                      )}
                      <p className="mt-1 text-muted-foreground text-xs">
                        {formatTimestamp(notification.createdAt)}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {!notification.isRead && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-7"
                          onClick={(e) => handleMarkAsRead(notification._id, e)}
                          title="Mark as read"
                        >
                          <IconCheck className="size-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={(e) => handleDelete(notification._id, e)}
                        title="Delete"
                      >
                        <IconTrash className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                // You can navigate to a full notifications page here
                setIsOpen(false)
              }}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
