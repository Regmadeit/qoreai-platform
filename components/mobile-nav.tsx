"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  BarChart3,
  Wrench,
  ClipboardList,
  Truck,
  CheckSquare,
  BookOpen,
  User,
  ListChecks,
  Calendar,
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    label: "Maintenance",
    icon: Wrench,
    href: "/predictive-maintenance",
  },
  {
    label: "Work Orders",
    icon: ClipboardList,
    href: "/work-orders",
  },
  {
    label: "Logistics",
    icon: Truck,
    href: "/logistics",
  },
  {
    label: "Checklists",
    icon: CheckSquare,
    href: "/checklists",
  },
  {
    label: "Learning",
    icon: BookOpen,
    href: "/learning-hub",
  },
  {
    label: "Equipment Details",
    icon: ListChecks,
    href: "/equipment-details",
  },
  {
    label: "Scheduling",
    icon: Calendar,
    href: "/scheduling",
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const { logout, returnToRoleSelection } = useAuth()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-4 mx-auto">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 dark:hover:bg-gray-800",
              pathname === item.href ? "text-qore-blue" : "text-gray-500 dark:text-gray-400",
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={returnToRoleSelection}
          className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Change Role</span>
        </button>
      </div>
    </div>
  )
}
