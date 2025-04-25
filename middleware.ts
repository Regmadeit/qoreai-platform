import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Define public paths that don't require authentication
const publicPaths = ["/login", "/forgot-password"]

// Define role-based path restrictions
const roleBasedPaths = {
  operator: ["/operator", "/operator/dashboard", "/operator/inspections", "/operator/maintenance-requests"],
  maintenance: ["/maintenance", "/maintenance/dashboard", "/maintenance/tasks", "/maintenance/reports"],
  admin: ["/admin", "/admin/dashboard", "/admin/users", "/admin/settings"],
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Allow public paths
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Get token from cookie
  const token = request.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify and decode token
    const decoded = verify(token, JWT_SECRET) as { role: string }
    const userRole = decoded.role

    // Check if user has access to the requested path
    const hasAccess = roleBasedPaths[userRole as keyof typeof roleBasedPaths]?.some(
      allowedPath => path.startsWith(allowedPath)
    )

    if (!hasAccess) {
      // Redirect to user's default dashboard based on role
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}
