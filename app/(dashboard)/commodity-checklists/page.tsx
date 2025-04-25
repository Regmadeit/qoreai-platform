import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CommodityChecklistsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Commodity Quality Checklists"
        description="Complete and submit quality checks for different commodity types"
        actions={
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        }
      />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Commodity Checklists</h2>
        <p className="text-muted-foreground">This page is currently under maintenance. Please check back later.</p>
      </div>
    </div>
  )
}
