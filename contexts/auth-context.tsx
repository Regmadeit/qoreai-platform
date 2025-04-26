"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, UserRole } from "@/types"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  demoLogin: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const USER_STORAGE_KEY = "qoreai-user"
const TOKEN_STORAGE_KEY = "qoreai-token"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Check if we're on the login page
        const isLoginPage = pathname === "/login"

        // Try to get user from storage
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          
          // If we're on login page and have a user, redirect to their dashboard
          if (isLoginPage) {
            const dashboardPath = getDashboardPathForRole(parsedUser.role)
            window.location.href = dashboardPath
          }
        } else if (!isLoginPage) {
          // If no user and not on login page, redirect to login
          window.location.href = "/login"
        }
      }
    } catch (error) {
      console.error("Failed to restore session:", error)
      // On error, clear storage and redirect to login
      localStorage.removeItem(USER_STORAGE_KEY)
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      if (pathname !== "/login") {
        window.location.href = "/login"
      }
    } finally {
      setIsLoading(false)
    }
  }, [pathname])

  // Get the appropriate dashboard path for a role
  const getDashboardPathForRole = (role: UserRole): string => {
    switch (role) {
      case "operator":
        return "/operator/dashboard"
      case "maintenance":
        return "/maintenance/dashboard"
      case "supervisor":
        return "/supervisor/dashboard"
      case "manager":
        return "/dashboard"
      default:
        return "/dashboard"
    }
  }

  const clearError = () => setError(null)

  // Regular login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isDemo: false }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      setUser(data.user)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user))
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
      window.location.href = data.redirectTo
    } catch (error) {
      console.error("Login failed:", error)
      setError(error instanceof Error ? error.message : "Login failed")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // One-click demo login
  const demoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDemo: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Demo login failed")
      }

      setUser(data.user)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user))
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
      window.location.href = data.redirectTo
    } catch (error) {
      console.error("Demo login failed:", error)
      setError(error instanceof Error ? error.message : "Demo login failed")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.location.href = "/login"
  }

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        demoLogin,
        logout,
        isAuthenticated: !!user,
        hasRole,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
