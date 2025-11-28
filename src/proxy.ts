import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Define route access control
const ROUTE_PERMISSIONS = {
  // Admin-only routes
  "/admin": ["admin"],
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"]

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ["/login", "/register"]

interface AuthPayload {
  sub: string
  username: string
  email: string
  role: "ADMIN"
  iat?: number
  exp?: number
}

/**
 * Verify JWT token from cookies
 */
async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your-secret-key-change-in-production"
    )

    const { payload } = await jwtVerify(token, secret)

    // Type guard to ensure payload has required fields
    if (
      typeof payload.sub === "string" &&
      typeof payload.username === "string" &&
      typeof payload.email === "string" &&
      typeof payload.role === "string"
    ) {
      return payload as unknown as AuthPayload
    }

    return null
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

/**
 * Check if user has required role for the route
 */
function hasRequiredRole(
  userRole: string,
  requiredRoles: string[] | undefined
): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true // No specific role required
  }
  return requiredRoles.includes(userRole)
}

/**
 * Get the required roles for a given path
 */
function getRequiredRoles(pathname: string): string[] | undefined {
  // Check exact match first
  if (pathname in ROUTE_PERMISSIONS) {
    return ROUTE_PERMISSIONS[pathname as keyof typeof ROUTE_PERMISSIONS]
  }

  // Check if path starts with any protected route
  for (const [route, roles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route)) {
      return roles
    }
  }

  return undefined
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log("🔥 PROXY RUNNING FOR:", pathname)

  // Get access token from cookies
  const token = request.cookies.get("accessToken")?.value
  console.log("🔥 Token exists:", !!token)

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Check if it's an auth route (login/register)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // If user is authenticated and tries to access auth routes, redirect to dashboard
  if (token && isAuthRoute) {
    const payload = await verifyToken(token)
    if (payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify the token
  const payload = await verifyToken(token)

  // If token is invalid, redirect to login
  if (!payload) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("accessToken")
    response.cookies.delete("user")
    return response
  }

  // Check role-based access control
  const requiredRoles = getRequiredRoles(pathname)

  if (!hasRequiredRole(payload.role, requiredRoles)) {
    // User doesn't have required role, redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // Add user info to request headers for use in pages
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", payload.sub)
  requestHeaders.set("x-user-role", payload.role)
  requestHeaders.set("x-user-username", payload.username)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which routes use this proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}