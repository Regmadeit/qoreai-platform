"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: UserRole | UserRole[]
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Skip auth check if we're already on the login page
    if (pathname === "/login") {
      setIsChecking(false)
      return
    }

    // For demo purposes, we'll be more permissive
    // Just redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, router, pathname])

  // Show nothing while checking authentication
  if (isChecking) {
    return null
  }

  // For demo purposes, show content regardless of role
  return <>{children}</>
}
