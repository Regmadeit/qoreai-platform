"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, FileSpreadsheet, FileImage, Search, ExternalLink, Download } from "lucide-react"
import type { EquipmentDocument } from "@/types/equipment"

interface DocumentationListProps {
  equipmentId: string
}

// Mock documentation data
const documentationData: Record<string, EquipmentDocument[]> = {
  "EQ-001": [
    {
      id: "DOC-001",
      equipmentId: "EQ-001",
      name: "Stadler UniSort PR 1600 User Manual",
      type: "manual",
      fileType: "pdf",
      date: "Jan 15, 2023",
      size: "4.2 MB",
      url: "#",
    },
    {
      id: "DOC-002",
      equipmentId: "EQ-001",
      name: "Optical Sorter Technical Specifications",
      type: "specification",
      fileType: "pdf",
      date: "Jan 15, 2023",
      size: "1.8 MB",
      url: "#",
    },
    {
      id: "DOC-003",
      equipmentId: "EQ-001",
      name: "Maintenance Schedule Template",
      type: "report",
      fileType: "excel",
      date: "Feb 10, 2023",
      size: "245 KB",
      url: "#",
    },
    {
      id: "DOC-004",
      equipmentId: "EQ-001",
      name: "Installation Diagram",
      type: "drawing",
      fileType: "image",
      date: "Jan 10, 2023",
      size: "3.5 MB",
      url: "#",
    },
    {
      id: "DOC-005",
      equipmentId: "EQ-001",
      name: "Safety Certification",
      type: "certificate",
      fileType: "pdf",
      date: "Jan 20, 2023",
      size: "1.2 MB",
      url: "#",
    },
  ],
  "EQ-002": [
    {
      id: "DOC-006",
      equipmentId: "EQ-002",
      name: "Stadler STT 5000 User Manual",
      type: "manual",
      fileType: "pdf",
      date: "Feb 10, 2023",
      size: "5.1 MB",
      url: "#",
    },
    {
      id: "DOC-007",
      equipmentId: "EQ-002",
      name: "Ballistic Separator Technical Specifications",
      type: "specification",
      fileType: "pdf",
      date: "Feb 10, 2023",
      size: "2.3 MB",
      url: "#",
    },
    {
      id: "DOC-008",
      equipmentId: "EQ-002",
      name: "Paddle Replacement Guide",
      type: "manual",
      fileType: "pdf",
      date: "Mar 15, 2023",
      size: "1.7 MB",
      url: "#",
    },
  ],
  "EQ-003": [
    {
      id: "DOC-009",
      equipmentId: "EQ-003",
      name: "Krones MetaPure W-PET 2000 User Manual",
      type: "manual",
      fileType: "pdf",
      date: "Mar 5, 2023",
      size: "6.3 MB",
      url: "#",
    },
    {
      id: "DOC-010",
      equipmentId: "EQ-003",
      name: "Washline System Specifications",
      type: "specification",
      fileType: "pdf",
      date: "Mar 5, 2023",
      size: "2.8 MB",
      url: "#",
    },
    {
      id: "DOC-011",
      equipmentId: "EQ-003",
      name: "Water Quality Test Report Template",
      type: "report",
      fileType: "excel",
      date: "Apr 10, 2023",
      size: "320 KB",
      url: "#",
    },
  ],
}

export function DocumentationList({ equipmentId }: DocumentationListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const documents = documentationData[equipmentId] || []

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "excel":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case "image":
        return <FileImage className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "manual":
        return "User Manual"
      case "specification":
        return "Specifications"
      case "drawing":
        return "Drawing"
      case "certificate":
        return "Certificate"
      case "report":
        return "Report"
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search documentation..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No documentation found.</div>
      ) : (
        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="mr-4">{getFileIcon(doc.fileType)}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{doc.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <span>{getTypeLabel(doc.type)}</span>
                      <span>Updated {doc.date}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
