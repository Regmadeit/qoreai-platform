import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen } from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Equipment Safety Fundamentals",
    type: "course",
    progress: 75,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Hydraulic System Maintenance",
    type: "video",
    progress: 50,
    icon: Video,
  },
  {
    id: 3,
    title: "Standard Operating Procedures",
    type: "document",
    progress: 100,
    icon: FileText,
  },
  {
    id: 4,
    title: "Troubleshooting Electrical Systems",
    type: "course",
    progress: 25,
    icon: BookOpen,
  },
]

export function LearningModules() {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="flex items-start space-x-4 rounded-md border p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <module.icon className="h-5 w-5 text-qore-gold" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{module.title}</p>
              <span className="text-xs text-muted-foreground">{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground capitalize">{module.type}</span>
              <Button variant="ghost" size="sm">
                {module.progress === 100 ? "Review" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
