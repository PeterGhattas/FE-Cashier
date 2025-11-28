import Cookies from "js-cookie"
import type { UserType } from "@/graphql/generated"

/**
 * Get the access token from cookies
 */
export function getAccessToken(): string | undefined {
  return Cookies.get("accessToken")
}

/**
 * Get the user data from cookies
 */
export function getUser(): UserType | null {
  const userStr = Cookies.get("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as UserType
  } catch (error) {
    console.error("Failed to parse user data from cookie:", error)
    return null
  }
}

/**
 * Remove authentication cookies (logout)
 */
export function removeAuthCookies(): void {
  Cookies.remove("accessToken", { path: "/" })
  Cookies.remove("user", { path: "/" })
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken()
}
