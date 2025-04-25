import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LearningModules } from "@/components/learning-hub/learning-modules"
import { AiAssistant } from "@/components/learning-hub/ai-assistant"
import { SopDocuments } from "@/components/learning-hub/sop-documents"
import { Button } from "@/components/ui/button"
import { Bot, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LearningHubPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Learning Hub" description="Access training materials, documentation, and AI assistance" />

      <Card className="bg-gradient-to-r from-qore-blue to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">AI Learning Modules</CardTitle>
          <CardDescription className="text-blue-100">
            Enhance your skills with AI-powered manufacturing knowledge
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm md:text-base">
                Our AI modules provide interactive learning experiences tailored to your role and skill level.
              </p>
              <p className="text-sm text-blue-100 mt-1">6 modules available • Updated weekly</p>
            </div>
          </div>
          <Link href="/learning-hub/ai-modules">
            <Button variant="secondary" className="whitespace-nowrap">
              Explore Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="documents">SOP Documents</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>Complete these training modules to improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <LearningModules />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Standard Operating Procedures</CardTitle>
              <CardDescription>Access equipment manuals and standard operating procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <SopDocuments />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with equipment troubleshooting and maintenance questions</CardDescription>
            </CardHeader>
            <CardContent>
              <AiAssistant />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
