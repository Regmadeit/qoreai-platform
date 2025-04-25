"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { RoleBasedNavigation } from "@/components/layout/role-based-navigation"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background shadow-md rounded-full h-10 w-10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-qore-navy transition-transform duration-300 md:relative md:translate-x-0 shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:w-[280px] hover:w-[280px] focus-within:w-[280px]",
          "transition-all duration-300",
        )}
      >
        <div className="relative h-full">
          {/* Sidebar content */}
          <div className="flex h-16 items-center border-b border-white/10 px-6">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="relative h-8 w-8 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-qore-blue"></div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-qore-gold transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-white whitespace-nowrap">
                QoreAI
              </span>
            </Link>
          </div>

          {/* Navigation content */}
          <div className="flex-1 overflow-y-auto">
            <RoleBasedNavigation />
          </div>
        </div>
      </div>
    </>
  )
}
