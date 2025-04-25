import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

export function DashboardHeader() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard"
        description="Welcome back, John. Here's an overview of your operations."
        actions={<Button className="bg-qore-blue hover:bg-blue-800 w-full sm:w-auto">Generate Report</Button>}
      />

      <Card className="bg-qore-blue/10 border-qore-blue/20">
        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-qore-blue/20 flex items-center justify-center mr-4 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-qore-gold"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">AI Recommendation</p>
              <p className="text-xs text-muted-foreground">
                Schedule maintenance for Pump #12 - Predicted failure in 7 days
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-qore-blue/30 text-qore-blue hover:bg-qore-blue/10 w-full sm:w-auto"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
