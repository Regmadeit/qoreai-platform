import { PageHeader } from "@/components/page-header"
import { AIPredictionDashboard } from "@/components/predictive-maintenance/ai-prediction-dashboard"

export default function SupervisorPredictivePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Predictive Maintenance"
        description="Machine learning predictions for equipment maintenance"
      />

      <AIPredictionDashboard />
    </div>
  )
}
