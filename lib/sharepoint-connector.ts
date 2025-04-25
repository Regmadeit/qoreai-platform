"use client"

import { useState, useEffect } from "react"

// Mock data for SharePoint documents
const mockDocuments = [
  {
    id: "doc1",
    name: "Optical Sorter Operation SOP",
    description: "Standard operating procedures for Stadler optical sorter equipment",
    category: "Equipment",
    lastModified: "2025-03-15",
    url: "#",
    fileType: "pdf",
  },
  {
    id: "doc2",
    name: "Baler Safety Procedures",
    description: "Safety guidelines for operating the baler equipment",
    category: "Safety",
    lastModified: "2025-02-28",
    url: "#",
    fileType: "pdf",
  },
  {
    id: "doc3",
    name: "Quality Control Checklist",
    description: "Daily quality control procedures for polymer processing",
    category: "Quality",
    lastModified: "2025-04-01",
    url: "#",
    fileType: "excel",
  },
  {
    id: "doc4",
    name: "Maintenance Schedule Template",
    description: "Template for scheduling regular equipment maintenance",
    category: "Maintenance",
    lastModified: "2025-03-10",
    url: "#",
    fileType: "excel",
  },
  {
    id: "doc5",
    name: "Emergency Response Plan",
    description: "Procedures for handling emergencies at the Polymer Center",
    category: "Safety",
    lastModified: "2025-01-15",
    url: "#",
    fileType: "pdf",
  },
  {
    id: "doc6",
    name: "Conveyor Belt Maintenance Guide",
    description: "Detailed maintenance procedures for conveyor systems",
    category: "Maintenance",
    lastModified: "2025-03-22",
    url: "#",
    fileType: "pdf",
  },
  {
    id: "doc7",
    name: "Polymer Sorting Guidelines",
    description: "Guidelines for sorting different polymer types",
    category: "Operations",
    lastModified: "2025-02-10",
    url: "#",
    fileType: "pdf",
  },
  {
    id: "doc8",
    name: "Equipment Troubleshooting Guide",
    description: "Troubleshooting procedures for common equipment issues",
    category: "Equipment",
    lastModified: "2025-03-05",
    url: "#",
    fileType: "pdf",
  },
]

export interface SOPDocument {
  id: string
  name: string
  description: string
  category: string
  lastModified: string
  url: string
  fileType: string
}

// Mock authentication function - always returns success
export async function loginToSharePoint() {
  console.log("Mock SharePoint login - bypassing authentication")
  return { account: { name: "Test User" } }
}

// Mock function to get access token - always returns a dummy token
export async function getAccessToken() {
  return "mock-access-token"
}

// Return mock documents, optionally filtered by category
export async function fetchSOPDocuments(category?: string): Promise<SOPDocument[]> {
  console.log("Using mock SharePoint documents")

  if (category) {
    return mockDocuments.filter((doc) => doc.category.toLowerCase() === category.toLowerCase())
  }

  return mockDocuments
}

export function useSOPDocuments(category?: string) {
  const [documents, setDocuments] = useState<SOPDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDocuments() {
      try {
        setLoading(true)
        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 800))
        const docs = await fetchSOPDocuments(category)
        setDocuments(docs)
        setError(null)
      } catch (err) {
        setError("Failed to load documents")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadDocuments()
  }, [category])

  return { documents, loading, error }
}
