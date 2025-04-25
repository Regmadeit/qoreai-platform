"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Wrench, ClipboardList, Truck, CheckSquare, BookOpen, ListChecks, Calendar } from "lucide-react"

const quickNavItems = [
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

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center px-4 py-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          {quickNavItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex items-center gap-1 cursor-pointer",
                  pathname === item.href ? "bg-qore-blue text-white" : "",
                )}
                asChild
              >
                <div>
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
