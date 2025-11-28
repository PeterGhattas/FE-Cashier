"use client"

import * as React from "react"
import {
  useSetOnlineMutation,
  useSetOfflineMutation,
} from "@/graphql/generated"

/**
 * Hook to manage user presence status (online/offline)
 * Automatically sets user online when hook is mounted
 * Sets user offline when page visibility changes or window closes
 */
export function usePresenceStatus() {
  const [setOnline] = useSetOnlineMutation()
  const [setOffline] = useSetOfflineMutation()
  const [isOnline, setIsOnline] = React.useState(true)

  React.useEffect(() => {
    // Set user online when component mounts
    const setUserOnline = async () => {
      try {
        await setOnline()
        setIsOnline(true)
        console.log("User presence set to online")
      } catch (error) {
        console.error("Failed to set online status:", error)
      }
    }

    setUserOnline()

    // Handle visibility change (tab hidden/shown)
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // Tab hidden - set offline after delay
        setTimeout(async () => {
          if (document.hidden) {
            try {
              await setOffline()
              setIsOnline(false)
              console.log("User presence set to offline (tab hidden)")
            } catch (error) {
              console.error("Failed to set offline status:", error)
            }
          }
        }, 5000) // 5 second delay before setting offline
      } else {
        // Tab shown - set online
        try {
          await setOnline()
          setIsOnline(true)
          console.log("User presence set to online (tab shown)")
        } catch (error) {
          console.error("Failed to set online status:", error)
        }
      }
    }

    // Handle window beforeunload (closing tab/browser)
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable delivery when page is unloading
      navigator.sendBeacon(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql",
        JSON.stringify({
          query: "mutation { setOffline { status } }",
        })
      )
    }

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [setOnline, setOffline])

  return { isOnline }
}