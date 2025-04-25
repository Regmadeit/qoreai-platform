"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Calendar, Filter } from "lucide-react"

// Sample data for checklist history
const checklistHistory = [
  {
    id: "101",
    type: "Washline Checklist",
    operator: "John Doe",
    date: "Apr 20, 2025",
    status: "Approved",
    approvedBy: "Michael Manager",
    completedItems: 7,
    totalItems: 7,
    notes: "All systems functioning normally.",
  },
  {
    id: "102",
    type: "Forklift Checklist",
    operator: "Jane Smith",
    date: "Apr 19, 2025",
    status: "Approved",
    approvedBy: "Michael Manager",
    completedItems: 21,
    totalItems: 21,
    notes: "No issues found.",
  },
  {
    id: "103",
    type: "Baler Checklist",
    operator: "Mike Johnson",
    date: "Apr 18, 2025",
    status: "Rejected",
    rejectedBy: "Sarah Supervisor",
    completedItems: 5,
    totalItems: 7,
    notes: "Ejection system not properly tested.",
    rejectionReason: "Incomplete inspection of critical components",
  },
  {
    id: "104",
    type: "Crosswrap Checklist",
    operator: "Sarah Williams",
    date: "Apr 17, 2025",
    status: "Approved",
    approvedBy: "Michael Manager",
    completedItems: 7,
    totalItems: 7,
    notes: "Replaced wrapping material.",
  },
  {
    id: "105",
    type: "Stadler Optical Sorter",
    operator: "John Doe",
    date: "Apr 16, 2025",
    status: "Approved",
    approvedBy: "Sarah Supervisor",
    completedItems: 7,
    totalItems: 7,
    notes: "Calibrated sensors.",
  },
]

export function ChecklistHistory() {
  const [selectedChecklist, setSelectedChecklist] = useState<(typeof checklistHistory)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredChecklists = checklistHistory.filter((checklist) => {
    const matchesSearch =
      checklist.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.operator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || checklist.type === filterType
    const matchesStatus = filterStatus === "all" || checklist.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Checklist History</CardTitle>
          <CardDescription>View previously completed checklists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by type or operator..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Washline Checklist">Washline</SelectItem>
                      <SelectItem value="Forklift Checklist">Forklift</SelectItem>
                      <SelectItem value="Baler Checklist">Baler</SelectItem>
                      <SelectItem value="Crosswrap Checklist">Crosswrap</SelectItem>
                      <SelectItem value="Stadler Optical Sorter">Stadler Optical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[180px]">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredChecklists.length > 0 ? (
              <div className="space-y-4 mt-4">
                {filteredChecklists.map((checklist) => (
                  <div key={checklist.id} className="rounded-md border p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{checklist.type}</h3>
                          <Badge
                            variant={checklist.status === "Approved" ? "default" : "destructive"}
                            className={checklist.status === "Approved" ? "bg-green-600" : ""}
                          >
                            {checklist.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Completed by {checklist.operator} on {checklist.date}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {checklist.status === "Approved"
                            ? `Approved by ${checklist.approvedBy}`
                            : `Rejected by ${checklist.rejectedBy}`}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setSelectedChecklist(checklist)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Filter className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No matching checklists</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
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
                <h4 className="font-medium mb-1">Status</h4>
                <div className="flex items-center">
                  {selectedChecklist.status === "Approved" ? (
                    <Badge className="bg-green-600">Approved by {selectedChecklist.approvedBy}</Badge>
                  ) : (
                    <Badge variant="destructive">Rejected by {selectedChecklist.rejectedBy}</Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Completion</h4>
                <p className="text-sm">
                  {selectedChecklist.completedItems} of {selectedChecklist.totalItems} items completed
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Notes</h4>
                <p className="text-sm">{selectedChecklist.notes}</p>
              </div>

              {selectedChecklist.rejectionReason && (
                <div>
                  <h4 className="font-medium mb-1 text-red-500">Rejection Reason</h4>
                  <p className="text-sm">{selectedChecklist.rejectionReason}</p>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setSelectedChecklist(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
