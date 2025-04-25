import { PageHeader } from "@/components/page-header"
import { OperatorWorkOrderForm } from "./client-form"

export default function SubmitWorkOrderPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Submit Work Order" description="Report equipment issues or maintenance needs" />
      <OperatorWorkOrderForm />
    </div>
  )
}
