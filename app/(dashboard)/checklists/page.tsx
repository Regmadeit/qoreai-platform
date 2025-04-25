import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChecklistCategory } from "@/components/checklists/checklist-category"
import { ChecklistApprovals } from "@/components/checklists/checklist-approvals"
import { ChecklistHistory } from "@/components/checklists/checklist-history"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Forklift Checklist Items from Flask app
const forkliftChecklistItems = [
  "Steps/handrails functional & in place",
  "Ensure all caps are secure and locked",
  "Inspect hoses, fittings, cylinders for wear and leaks",
  "Inspect for any equipment damage",
  "Check horn",
  "Inspect fire extinguisher (Green light on)",
  "Check mirrors",
  "Check all exterior lights",
  "Check battery disconnect is OFF",
  "Check engine/crankcase oil level",
  "Check hydraulic oil level",
  "Check coolant level (when engine is cold)",
  "Check air filter (replace/clean as needed)",
  "Check back-up alarm camera",
  "Perform field brake test (before starting work)",
  "Strobe light working",
  "Check tires & wheels",
  "Test 2-way radio for proper functioning",
  "Check pivot shaft oil site gauge",
  "Seat and belt in good condition",
  "Clean windows and cab",
  "MAIN DISCONNECT MUST BE TURNED OFF AT END OF SHIFT OR WHEN MACHINE IS NOT IN SERVICE.",
  "Describe any necessary repairs or problems for the technician to address.",
]

// Washline Checklist Items from Flask app
const washlineChecklistItems = [
  "Inspect all filters and clean if needed",
  "Verify water levels and temperature",
  "Ensure conveyor belts are properly aligned",
  "Check all valves for proper function",
  "Inspect spray nozzles for clogs",
  "Verify the chemical feed system is operational",
  "Document any issues or maintenance needs",
]

// Baler Checklist Items from Flask app
const balerChecklistItems = [
  "Inspect hydraulic fluid levels",
  "Check for debris in the baler chamber",
  "Test the ejection system",
  "Inspect belts and pulleys for wear",
  "Ensure all safety guards are in place",
  "Check sensors for proper operation",
  "Document any issues or maintenance needs",
]

// Crosswrap Checklist Items from Flask app
const crosswrapChecklistItems = [
  "Inspect wrapper alignment",
  "Check for loose straps",
  "Ensure wrapping material is loaded",
  "Inspect safety guards and emergency stops",
  "Clean rollers and sensors",
  "Verify operational readiness",
  "Document any issues or maintenance needs",
]

// Organize checklists by category
const heavyEquipmentChecklists = [
  {
    id: "forklift-1",
    title: "Forklift Daily Inspection",
    description: "Required daily inspection for forklifts",
    items: forkliftChecklistItems,
  },
]

// Vehicle Checklists
const vehicleChecklists = [
  {
    id: "crosswrap-1",
    title: "Crosswrap Inspection",
    description: "Pre-operation safety check for crosswrap equipment",
    items: crosswrapChecklistItems,
  },
]

// Manufacturing Equipment Checklists
const manufacturingChecklists = [
  {
    id: "washline-1",
    title: "Washline Inspection",
    description: "Safety check for washline equipment",
    items: washlineChecklistItems,
  },
  {
    id: "baler-1",
    title: "Baler Daily Inspection",
    description: "Required daily check for all balers",
    items: balerChecklistItems,
  },
]

export default function ChecklistsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Equipment Checklists"
        description="Complete and submit equipment safety inspections"
        actions={
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="heavy-equipment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="heavy-equipment">Heavy Equipment</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles & Equipment</TabsTrigger>
          <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="heavy-equipment">
          <ChecklistCategory
            title="Heavy Equipment Inspections"
            description="Safety checklists for forklifts and heavy machinery"
            checklists={heavyEquipmentChecklists}
          />
        </TabsContent>

        <TabsContent value="vehicles">
          <ChecklistCategory
            title="Vehicle & Equipment Inspections"
            description="Safety checklists for crosswrap equipment"
            checklists={vehicleChecklists}
          />
        </TabsContent>

        <TabsContent value="manufacturing">
          <ChecklistCategory
            title="Manufacturing Equipment"
            description="Safety checklists for washline and baler equipment"
            checklists={manufacturingChecklists}
          />
        </TabsContent>

        <TabsContent value="approvals">
          <ChecklistApprovals />
        </TabsContent>

        <TabsContent value="history">
          <ChecklistHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
