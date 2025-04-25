import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navigation() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Button
        onClick={() => router.push("/demo-selection")}
        variant="ghost"
        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
      >
        ← Back to Demo Selection
      </Button>
    </div>
  )
} 