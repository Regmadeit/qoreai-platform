"use client"

import { Search, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, logout } = useAuth()

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkIfMobile()
      window.addEventListener("resize", checkIfMobile)

      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  // Get page title based on pathname
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length === 0) return "Dashboard"

    // Handle special cases
    if (path[0] === "operator" && path.length > 1) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1).replace(/-/g, " ")
    }
    if (path[0] === "maintenance" && path.length > 1) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1).replace(/-/g, " ")
    }
    if (path[0] === "supervisor" && path.length > 1) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1).replace(/-/g, " ")
    }

    // Default case
    return path[0].charAt(0).toUpperCase() + path[0].slice(1).replace(/-/g, " ")
  }

  // Get role badge color
  const getRoleBadgeColor = () => {
    if (!user) return "bg-gray-500"

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

  const handleChangeRole = () => {
    router.push("/login")
  }

  return (
    <div className="flex h-14 items-center border-b px-4 sticky top-0 bg-background z-20">
      {/* Page title for mobile */}
      <div className="flex-1 text-center md:text-left font-medium truncate">{getPageTitle()}</div>

      <div className="flex items-center gap-2">
        {/* Role badge */}
        {user && <Badge className={`${getRoleBadgeColor()} capitalize hidden md:flex`}>{user.role}</Badge>}

        {/* Search button for mobile */}
        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Search for desktop */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-64 rounded-lg bg-background pl-8" />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationCenter />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
              {user && (
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                  {user.role.charAt(0).toUpperCase()}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user ? user.name : "Guest"}
              {user && <Badge className={`${getRoleBadgeColor()} ml-2 capitalize`}>{user.role}</Badge>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleChangeRole}>
              <User className="mr-2 h-4 w-4" />
              <span>Change Role</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="absolute top-14 left-0 right-0 p-2 bg-background border-b z-30">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
