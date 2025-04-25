"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TabItem {
  label: string
  href: string
}

interface TabNavigationProps {
  tabs: TabItem[]
  className?: string
}

export function TabNavigation({ tabs, className }: TabNavigationProps) {
  const pathname = usePathname()

  return (
    <div className={cn("border-b", className)}>
      <nav className="flex space-x-4 overflow-x-auto px-4 py-2 hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
                "cursor-pointer hover:text-foreground",
                isActive ? "border-b-2 border-qore-blue text-foreground" : "text-muted-foreground",
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
