import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { Footer } from "@/components/footer"
import { QoreAiButton } from "@/components/ai/qoreai-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="group">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <QoreAiButton />
      </div>
    </div>
  )
}
