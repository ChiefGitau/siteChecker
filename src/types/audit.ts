  export interface AuditResult {
    id: string
    url: string
    createdAt: string
    scores: Scores
    metrics: Metrics
    checks: Checks
    issues: Issue[]
  }

  export interface Scores {
    performance: number
    seo: number
    accessibility: number
    security: number
    overall: number
  }

  export interface Metrics {
    responseTimeMs: number
    htmlSizeKb: number
    requestCount: number
    usesHttps: boolean
    hasGzip: boolean
  }

  export interface Checks {
    performance: Check[]
    seo: Check[]
    accessibility: Check[]
    security: Check[]
  }

  export interface Check {
    id: string
    pass: boolean
    weight?: number
    failedCount?: number
  }

  export interface Issue {
    id: string
    category: 'performance' | 'seo' | 'accessibility' | 'security'
    severity: 'low' | 'medium' | 'high'
    title: string
    description: string
    recommendation: string
    selector: string | null
  }

  export type ScoreCategory = 'performance' | 'seo' | 'accessibility' |
  'security'
  export type ScoreLevel = 'poor' | 'needs-improvement' | 'good'
