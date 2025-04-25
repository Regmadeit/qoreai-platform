export interface LearningModule {
  id: string
  title: string
  description: string
  category: string
  duration: number // in minutes
  difficulty: "beginner" | "intermediate" | "advanced"
  format: "video" | "document" | "interactive" | "quiz"
  author: string
  publishedDate: string
  tags: string[]
  thumbnail?: string
  url: string
  completionRate?: number
  rating?: number
}

export interface SOPDocument {
  id: string
  name: string
  description: string
  category: string
  lastModified: string
  url: string
  fileType: string
  department?: string
  version?: string
  approvedBy?: string
  approvedDate?: string
}

export interface UserLearningProgress {
  userId: string
  moduleId: string
  startDate: string
  completionDate?: string
  progress: number // 0-100%
  quizScore?: number
  notes?: string
}

export interface AIAssistantMessage {
  role: "assistant" | "user"
  content: string
  timestamp?: string
}
