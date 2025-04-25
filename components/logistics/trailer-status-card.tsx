import { Card, CardContent } from "@/components/ui/card"

interface TrailerStatusCardProps {
  status: string
  count: number
  color: string
}

export function TrailerStatusCard({ status, count, color }: TrailerStatusCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{status}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className={`w-3 h-12 rounded-full ${color}`}></div>
      </CardContent>
    </Card>
  )
}
