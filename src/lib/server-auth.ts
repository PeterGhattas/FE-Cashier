import { headers } from "next/headers"
import type { UserRole } from "@/graphql/generated"

/**
 * Server-side utility to get user info from middleware headers
 * Only works in Server Components and Server Actions
 */
export interface ServerUser {
  id: string
  username: string
  role: UserRole
}

/**
 * Get current user from request headers (set by middleware)
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<ServerUser | null> {
  const headersList = await headers()
  const userId = headersList.get("x-user-id")
  const username = headersList.get("x-user-username")
  const role = headersList.get("x-user-role")

  if (!userId || !username || !role) {
    return null
  }

  return {
    id: userId,
    username,
    role: role as UserRole,
  }
}

/**
 * Get current user or throw error if not authenticated
 * Use this when the route should always be protected
 */
export async function requireAuth(): Promise<ServerUser> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

/**
 * Check if current user has required role
 */
export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  return roles.includes(user.role)
}

/**
 * Require specific role or throw error
 */
export async function requireRole(requiredRole: UserRole | UserRole[]): Promise<ServerUser> {
  const user = await requireAuth()
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

  if (!roles.includes(user.role)) {
    throw new Error(`Access denied. Required role: ${roles.join(" or ")}`)
  }

  return user
}