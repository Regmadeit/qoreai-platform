import EquipmentChecklistClient from "./client-page"

export default function EquipmentChecklistPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Equipment Checklists</h1>
        <p className="text-muted-foreground">Complete daily equipment safety inspections</p>
      </div>

      <EquipmentChecklistClient />
    </div>
  )
}
