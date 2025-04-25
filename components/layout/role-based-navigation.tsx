"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Settings,
  Wrench,
  ClipboardList,
  Truck,
  BookOpen,
  Users,
  Gauge,
  HardHat,
  Clipboard,
  FileText,
  AlertTriangle,
  BarChart,
  ChevronDown,
  Home,
  Calendar,
  Clock,
  CheckSquare,
  Cog,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define navigation items for each role with industry-standard terminology
const navigationConfig = {
  operator: [
    {
      label: "Operations Dashboard",
      icon: Home,
      href: "/operator/dashboard",
      description: "Real-time equipment and task overview"
    },
    {
      label: "Equipment Inspection",
      icon: CheckSquare,
      href: "/operator/inspections",
      description: "Daily equipment checks and safety inspections"
    },
    {
      label: "Maintenance Requests",
      icon: Wrench,
      href: "/operator/maintenance-requests",
      description: "Submit and track maintenance work orders"
    },
    {
      label: "Production Schedule",
      icon: Calendar,
      href: "/operator/schedule",
      description: "View production timeline and assignments"
    },
    {
      label: "Material Handling",
      icon: Truck,
      href: "/operator/logistics",
      description: "Logistics and material movement tracking"
    },
    {
      label: "Training & SOPs",
      icon: BookOpen,
      href: "/operator/training",
      description: "Access training materials and procedures"
    }
  ],
  maintenance: [
    {
      label: "Maintenance Dashboard",
      icon: Home,
      href: "/maintenance/dashboard",
      description: "Overview of maintenance activities"
    },
    {
      label: "Work Orders",
      icon: ClipboardList,
      href: "/maintenance/work-orders",
      description: "Active and scheduled maintenance tasks"
    },
    {
      label: "Asset Management",
      icon: Gauge,
      href: "/maintenance/assets",
      description: "Equipment status and maintenance history"
    },
    {
      label: "Preventive Maintenance",
      icon: Clock,
      href: "/maintenance/preventive",
      description: "Scheduled maintenance activities"
    },
    {
      label: "Parts Inventory",
      icon: Cog,
      href: "/maintenance/inventory",
      description: "Spare parts and supplies tracking"
    },
    {
      label: "Documentation",
      icon: FileText,
      href: "/maintenance/docs",
      description: "Technical manuals and procedures"
    }
  ],
  supervisor: [
    {
      label: "Supervisor Dashboard",
      icon: Home,
      href: "/supervisor/dashboard",
      description: "Department performance overview"
    },
    {
      label: "Team Management",
      icon: Users,
      href: "/supervisor/team",
      description: "Staff scheduling and assignments"
    },
    {
      label: "Production Planning",
      icon: Calendar,
      href: "/supervisor/planning",
      description: "Production schedules and resource allocation"
    },
    {
      label: "Maintenance Overview",
      icon: Wrench,
      href: "/supervisor/maintenance",
      description: "Equipment status and maintenance scheduling"
    },
    {
      label: "Quality Control",
      icon: CheckSquare,
      href: "/supervisor/quality",
      description: "Quality metrics and inspections"
    },
    {
      label: "Incident Reports",
      icon: AlertTriangle,
      href: "/supervisor/incidents",
      description: "Safety and incident management"
    },
    {
      label: "Performance Metrics",
      icon: BarChart,
      href: "/supervisor/metrics",
      description: "KPIs and productivity analysis"
    }
  ],
  manager: [
    {
      label: "Executive Dashboard",
      icon: Home,
      href: "/manager/dashboard",
      description: "Facility-wide performance overview"
    },
    {
      label: "Asset Performance",
      icon: Gauge,
      href: "/manager/asset-performance",
      description: "Equipment efficiency and reliability metrics"
    },
    {
      label: "Operations Analytics",
      icon: BarChart,
      href: "/manager/analytics",
      description: "Production and performance analysis"
    },
    {
      label: "Resource Planning",
      icon: Users,
      href: "/manager/resources",
      description: "Workforce and resource management"
    },
    {
      label: "Maintenance Strategy",
      icon: Wrench,
      href: "/manager/maintenance-strategy",
      description: "Maintenance program optimization"
    },
    {
      label: "Compliance & Safety",
      icon: AlertTriangle,
      href: "/manager/compliance",
      description: "Regulatory compliance and safety metrics"
    },
    {
      label: "Financial Performance",
      icon: BarChart3,
      href: "/manager/financials",
      description: "Cost analysis and budget tracking"
    }
  ]
}

type UserRole = "operator" | "maintenance" | "supervisor" | "manager"

interface RoleBasedNavigationProps {
  className?: string
}

export function RoleBasedNavigation({ className }: RoleBasedNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [role, setRole] = useState<UserRole>("operator")
  const [isExpanded, setIsExpanded] = useState(true)

  // Check for stored role on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole | null
    if (storedRole) {
      setRole(storedRole)
      // Redirect to role-specific dashboard if on incorrect path
      const currentPath = pathname.split("/")[1]
      if (currentPath !== storedRole && currentPath !== "settings") {
        router.push(`/${storedRole}/dashboard`)
      }
    }
  }, [pathname])

  // Handle role change
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
    localStorage.setItem("userRole", newRole)
    router.push(`/${newRole}/dashboard`)
  }

  // Get navigation items for the current role
  const navigationItems = navigationConfig[role]

  return (
    <nav className={cn("flex flex-col h-full space-y-1 p-2", className)}>
      {/* Role selector */}
      <div className="mb-4 px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-background/10 hover:bg-background/20"
            >
              <div className="flex items-center gap-2">
                {role === "operator" && <HardHat className="h-4 w-4" />}
                {role === "maintenance" && <Wrench className="h-4 w-4" />}
                {role === "supervisor" && <Users className="h-4 w-4" />}
                {role === "manager" && <BarChart3 className="h-4 w-4" />}
                <span>{role.charAt(0).toUpperCase() + role.slice(1)} View</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem onClick={() => handleRoleChange("operator")}>
              <HardHat className="h-4 w-4 mr-2" />
              Operator View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("maintenance")}>
              <Wrench className="h-4 w-4 mr-2" />
              Maintenance View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("supervisor")}>
              <Users className="h-4 w-4 mr-2" />
              Supervisor View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("manager")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Manager View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation items */}
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "transparent",
                  "cursor-pointer"
                )}
                title={item.description}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </span>
            </Link>
          )
        })}
      </div>

      {/* Settings - available to all roles */}
      <div className="mt-auto pt-4">
        <Link href="/settings">
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/settings" ? "bg-accent text-accent-foreground" : "transparent",
              "cursor-pointer"
            )}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </span>
        </Link>
      </div>
    </nav>
  )
}
