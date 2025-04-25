"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, UserRole } from "@/types"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => void
  demoLogin: (role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const USER_STORAGE_KEY = "qoreai-user"
const DEMO_MODE_KEY = "qoreai-demo-mode"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Enable demo mode by default
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_MODE_KEY, "true")
      sessionStorage.setItem(DEMO_MODE_KEY, "true")
    }
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Check if we're on the login page
        const isLoginPage = pathname === "/login"

        // If we're on the login page, don't auto-restore the user
        if (isLoginPage) {
          return
        }

        // Try to get user from storage
        const storedUser = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY)

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // Create a default demo user if none exists
          const defaultUser: User = {
            id: `default-demo-${Math.floor(Math.random() * 1000)}`,
            name: "Demo User",
            email: "demo@example.com",
            role: "operator",
            department: "Operations",
            avatar: `/placeholder.svg?height=40&width=40&query=avatar+operator`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            status: "active",
          }

          setUser(defaultUser)

          // Store the default user
          try {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser))
            sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser))
          } catch (e) {
            console.error("Failed to store default user", e)
          }
        }
      }
    } catch (error) {
      console.error("Failed to restore session:", error)
    }
  }, [pathname])

  // Save user to storage when it changes
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      } catch (error) {
        console.error("Failed to save session:", error)
      }
    }
  }, [user])

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

  // Simplified login - accepts any credentials
  const login = (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Determine role based on email prefix
      let role: UserRole = "operator" // Default role

      if (email.includes("operator")) {
        role = "operator"
      } else if (email.includes("maintenance")) {
        role = "maintenance"
      } else if (email.includes("supervisor")) {
        role = "supervisor"
      } else if (email.includes("manager")) {
        role = "manager"
      }

      const user: User = {
        id: `user-${Math.floor(Math.random() * 1000)}`,
        name: email
          .split("@")[0]
          .replace(/[.]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email: email,
        role: role,
        department: role === "maintenance" ? "Maintenance" : "Operations",
        avatar: `/placeholder.svg?height=40&width=40&query=avatar+${role}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
      }

      setUser(user)

      // Enable demo mode
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_MODE_KEY, "true")
        sessionStorage.setItem(DEMO_MODE_KEY, "true")
      }

      // Navigate to the appropriate dashboard based on role
      const dashboardPath = getDashboardPathForRole(role)
      router.push(dashboardPath)
    } finally {
      setIsLoading(false)
    }
  }

  // One-click demo login with specified role
  const demoLogin = (role: UserRole = "operator") => {
    setIsLoading(true)

    try {
      const demoUsers = {
        operator: {
          name: "Demo Operator",
          email: "operator@example.com",
        },
        maintenance: {
          name: "Demo Maintenance",
          email: "maintenance@example.com",
        },
        supervisor: {
          name: "Demo Supervisor",
          email: "supervisor@example.com",
        },
        manager: {
          name: "Demo Manager",
          email: "manager@example.com",
        },
      }

      const demoUser = demoUsers[role]

      const user: User = {
        id: `demo-${role}-${Math.floor(Math.random() * 1000)}`,
        name: demoUser.name,
        email: demoUser.email,
        role: role,
        department: role === "maintenance" ? "Maintenance" : "Operations",
        avatar: `/placeholder.svg?height=40&width=40&query=avatar+${role}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
      }

      setUser(user)

      // Enable demo mode
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_MODE_KEY, "true")
        sessionStorage.setItem(DEMO_MODE_KEY, "true")
      }

      // Store in both localStorage and sessionStorage for redundancy
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      }

      // Navigate to the appropriate dashboard based on role
      const dashboardPath = getDashboardPathForRole(role)
      router.push(dashboardPath)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY)
      sessionStorage.removeItem(USER_STORAGE_KEY)
      // Keep demo mode enabled
    }
    router.push("/login")
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
        login,
        demoLogin,
        logout,
        isAuthenticated: !!user,
        hasRole,
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
