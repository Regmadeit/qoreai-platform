import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bot, Video, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const aiModules = [
  {
    id: "predictive-maintenance",
    title: "AI-Powered Predictive Maintenance",
    description: "Learn how AI analyzes equipment data to predict failures before they occur",
    progress: 0,
    type: "course",
    icon: Bot,
    level: "Intermediate",
    duration: "45 min",
    tags: ["AI", "Maintenance", "Data Analysis"],
  },
  {
    id: "optical-sorting",
    title: "Optimizing Optical Sorter Performance",
    description: "AI techniques to improve sorting accuracy and efficiency",
    progress: 0,
    type: "video",
    icon: Video,
    level: "Advanced",
    duration: "30 min",
    tags: ["AI", "Optical Sorting", "Efficiency"],
  },
  {
    id: "quality-control",
    title: "AI Quality Control Systems",
    description: "Using computer vision and machine learning for quality assurance",
    progress: 0,
    type: "course",
    icon: Bot,
    level: "Beginner",
    duration: "60 min",
    tags: ["AI", "Quality Control", "Computer Vision"],
  },
  {
    id: "energy-optimization",
    title: "Energy Usage Optimization",
    description: "AI strategies to reduce energy consumption in manufacturing",
    progress: 0,
    type: "document",
    icon: FileText,
    level: "Intermediate",
    duration: "20 min",
    tags: ["AI", "Energy", "Sustainability"],
  },
  {
    id: "production-scheduling",
    title: "AI-Driven Production Scheduling",
    description: "Optimizing production schedules with machine learning algorithms",
    progress: 0,
    type: "course",
    icon: Bot,
    level: "Advanced",
    duration: "50 min",
    tags: ["AI", "Production", "Scheduling"],
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection in Manufacturing",
    description: "Using AI to identify unusual patterns and potential issues",
    progress: 0,
    type: "video",
    icon: Video,
    level: "Intermediate",
    duration: "35 min",
    tags: ["AI", "Anomaly Detection", "Monitoring"],
  },
]

export default function AiModulesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Learning Modules"
        description="Enhance your skills with AI-powered manufacturing knowledge"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {aiModules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-qore-blue/10">
                  <module.icon className="h-5 w-5 text-qore-blue" />
                </div>
                <Badge variant="outline" className="capitalize">
                  {module.type}
                </Badge>
              </div>
              <CardTitle className="mt-4">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {module.level}
                </Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {module.duration}
                </Badge>
                {module.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/learning-hub/ai-modules/${module.id}`} className="w-full">
                <Button className="w-full">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
