declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    GROQ_API_KEY?: string
    // Add other environment variables here
  }
} 