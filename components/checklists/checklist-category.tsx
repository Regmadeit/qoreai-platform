"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardCheck } from "lucide-react"
import { ChecklistForm } from "@/components/checklists/checklist-form"

interface Checklist {
  id: string
  title: string
  description: string
  items: string[]
}

interface ChecklistCategoryProps {
  title: string
  description: string
  checklists: Checklist[]
}

export function ChecklistCategory({ title, description, checklists }: ChecklistCategoryProps) {
  const [activeChecklist, setActiveChecklist] = useState<Checklist | null>(null)

  return (
    <div className="space-y-6">
      {!activeChecklist ? (
        <>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {checklists.map((checklist) => (
              <Card key={checklist.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{checklist.title}</CardTitle>
                  <CardDescription>{checklist.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-qore-blue hover:bg-blue-800"
                    onClick={() => setActiveChecklist(checklist)}
                  >
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Start Checklist
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{activeChecklist.title}</CardTitle>
              <CardDescription>{activeChecklist.description}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setActiveChecklist(null)}>
              Back to List
            </Button>
          </CardHeader>
          <CardContent>
            <ChecklistForm
              id={activeChecklist.id}
              title={activeChecklist.title}
              description={activeChecklist.description}
              items={activeChecklist.items}
              onComplete={() => setActiveChecklist(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
