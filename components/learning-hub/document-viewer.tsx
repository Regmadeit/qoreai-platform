"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink, Download, FileText, FileSpreadsheet } from "lucide-react"
import type { SOPDocument } from "@/lib/sharepoint-connector"

interface DocumentViewerProps {
  document: SOPDocument | null
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!document) {
    return null
  }

  const handleOpenDocument = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate document opening
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, this would open the document in SharePoint
      alert("In production, this would open the document in SharePoint")
    } catch (err) {
      setError("This is a mock implementation. In production, this would open the actual document.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{document.name}</h2>
            <p className="text-muted-foreground">Last updated: {document.lastModified}</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mb-6">
          <p className="mb-4">{document.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-muted px-2 py-1 rounded-md">{document.category}</span>
            <span className="text-sm bg-muted px-2 py-1 rounded-md uppercase">{document.fileType}</span>
          </div>
        </div>

        <div className="flex justify-center items-center p-12 bg-muted rounded-lg mb-6">
          {document.fileType === "pdf" ? (
            <FileText className="h-24 w-24 text-qore-blue opacity-50" />
          ) : (
            <FileSpreadsheet className="h-24 w-24 text-green-600 opacity-50" />
          )}
        </div>

        {error && (
          <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded mb-4">{error}</div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={handleOpenDocument} className="bg-qore-blue hover:bg-blue-800" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Document (Mock)
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download (Mock)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
