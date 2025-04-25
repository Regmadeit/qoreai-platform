import MaintenanceWorkOrdersClient from "./client-page"

export default function MaintenanceWorkOrdersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Work Orders</h1>
        <p className="text-muted-foreground">Manage and track maintenance tasks</p>
      </div>

      <MaintenanceWorkOrdersClient />
    </div>
  )
}
