"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Sample data for pending approvals
const pendingApprovals = [
  {
    id: "1",
    type: "Washline Checklist",
    operator: "John Doe",
    date: "Apr 22, 2025",
    completedItems: 7,
    totalItems: 7,
    notes: "All systems functioning normally. Replaced filter #2.",
  },
  {
    id: "2",
    type: "Forklift Checklist",
    operator: "Jane Smith",
    date: "Apr 22, 2025",
    completedItems: 18,
    totalItems: 21,
    notes: "Horn not working properly. Hydraulic fluid level slightly low.",
    issues: ["Horn malfunction", "Low hydraulic fluid"],
  },
  {
    id: "3",
    type: "Baler Checklist",
    operator: "Mike Johnson",
    date: "Apr 21, 2025",
    completedItems: 6,
    totalItems: 7,
    notes: "Ejection system needs maintenance soon.",
    issues: ["Ejection system maintenance required"],
  },
  {
    id: "4",
    type: "Stadler Optical Sorter",
    operator: "Sarah Williams",
    date: "Apr 21, 2025",
    completedItems: 7,
    totalItems: 7,
    notes: "Cleaned all sensors. System operating at optimal levels.",
  },
]

export function ChecklistApprovals() {
  const [selectedChecklist, setSelectedChecklist] = useState<(typeof pendingApprovals)[0] | null>(null)
  const [approvals, setApprovals] = useState(pendingApprovals)

  const handleApprove = (id: string) => {
    toast({
      title: "Checklist approved",
      description: "The checklist has been approved and marked as complete.",
    })
    setApprovals(approvals.filter((approval) => approval.id !== id))
    setSelectedChecklist(null)
  }

  const handleReject = (id: string) => {
    toast({
      title: "Checklist rejected",
      description: "The checklist has been rejected and sent back to the operator.",
      variant: "destructive",
    })
    setApprovals(approvals.filter((approval) => approval.id !== id))
    setSelectedChecklist(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Checklists requiring supervisor approval</CardDescription>
        </CardHeader>
        <CardContent>
          {approvals.length > 0 ? (
            <div className="space-y-4">
              {approvals.map((approval) => (
                <div key={approval.id} className="rounded-md border p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{approval.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed by {approval.operator} on {approval.date}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge
                          variant="outline"
                          className={
                            approval.completedItems === approval.totalItems
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {approval.completedItems}/{approval.totalItems} Items Completed
                        </Badge>

                        {approval.issues && approval.issues.length > 0 && (
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            {approval.issues.length} Issue{approval.issues.length > 1 ? "s" : ""} Reported
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedChecklist(approval)}>
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(approval.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-muted-foreground">No checklists pending approval</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedChecklist && (
        <Dialog open={!!selectedChecklist} onOpenChange={() => setSelectedChecklist(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedChecklist.type} Details</DialogTitle>
              <DialogDescription>
                Completed by {selectedChecklist.operator} on {selectedChecklist.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Completion Status</h4>
                <p className="text-sm">
                  {selectedChecklist.completedItems} of {selectedChecklist.totalItems} items completed
                </p>
              </div>

              {selectedChecklist.issues && selectedChecklist.issues.length > 0 && (
                <div>
                  <h4 className="font-medium mb-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                    Issues Reported
                  </h4>
                  <ul className="list-disc pl-5 text-sm">
                    {selectedChecklist.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-1">Notes</h4>
                <p className="text-sm">{selectedChecklist.notes}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedChecklist(null)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={() => handleReject(selectedChecklist.id)}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedChecklist.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
