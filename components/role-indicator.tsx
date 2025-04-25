"use client"

import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function RoleIndicator() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  // Hide on login page
  useEffect(() => {
    setIsVisible(!pathname.includes("/login"))
  }, [pathname])

  if (!user || !isVisible) return null

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case "operator":
        return "bg-blue-500 hover:bg-blue-600"
      case "maintenance":
        return "bg-green-500 hover:bg-green-600"
      case "supervisor":
        return "bg-amber-500 hover:bg-amber-600"
      case "manager":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge className={`${getRoleBadgeColor()} capitalize px-3 py-1.5 text-sm shadow-lg`}>{user.role} Mode</Badge>
    </div>
  )
}
