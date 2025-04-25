"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Download, Eye } from "lucide-react"
import { useSOPDocuments, type SOPDocument } from "@/lib/sharepoint-connector"
import { DocumentViewer } from "@/components/learning-hub/document-viewer"

export function SopDocuments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [selectedDocument, setSelectedDocument] = useState<SOPDocument | null>(null)
  const { documents, loading, error } = useSOPDocuments(category === "all" ? undefined : category)

  const filteredDocuments = documents?.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleOpenDocument = (document: SOPDocument) => {
    setSelectedDocument(document)
  }

  const handleCloseDocument = () => {
    setSelectedDocument(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Equipment">Equipment</SelectItem>
            <SelectItem value="Safety">Safety</SelectItem>
            <SelectItem value="Quality">Quality</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading documents...</div>
      ) : filteredDocuments && filteredDocuments.length > 0 ? (
        <div className="space-y-2">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <FileText className="h-5 w-5 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium">{document.name}</h3>
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDocument(document)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">No documents found.</div>
      )}

      {selectedDocument && <DocumentViewer document={selectedDocument} onClose={handleCloseDocument} />}
    </div>
  )
}
