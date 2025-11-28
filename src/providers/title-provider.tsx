"use client"

import { useEffect } from "react"
import { useGetMyNotificationsQuery } from "@/graphql/generated"

export function useTitle(title: string) {
  // Fetch notifications to get unread count for title
  const { data } = useGetMyNotificationsQuery({
    pollInterval: 30000,
    fetchPolicy: 'cache-and-network',
  })

  const notifications = data?.getMyNotifications || []
  const unreadCount = notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    let fullTitle = ""

    if (unreadCount > 0) {
      fullTitle = `(${unreadCount}) `
    }

    if (title) {
      fullTitle += `${title} | ERP System`
    } else {
      fullTitle += "ERP System"
    }

    document.title = fullTitle
  }, [title, unreadCount])
}