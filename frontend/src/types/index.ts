// DevOps Portfolio Types

export interface ServerMetric {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'critical'
  cpu: number
  memory: number
  disk: number
  uptime: string
  location: string
  lastUpdated?: string
  networkIO?: string
  activeConnections?: number
}

export interface PipelineStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration: string
  icon: any
  description: string
  logs?: string[]
  startTime?: string
  endTime?: string
}

export interface Pipeline {
  id: string
  name: string
  branch: string
  commit: string
  author: string
  status: 'running' | 'success' | 'failed'
  startTime: string
  duration: string
  steps: PipelineStep[]
  environment?: string
  version?: string
}

export interface Tool {
  name: string
  category: string
  description: string
  proficiency: number
  icon: string
  color: string
  experience: string
  certifications?: string[]
  projects?: string[]
}

export interface Alert {
  id: number
  severity: 'info' | 'warning' | 'critical'
  message: string
  time: string
  resolved: boolean
  source?: string
  details?: string
}

export interface MetricData {
  id: string
  name: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  color: string
  bgColor: string
  borderColor: string
  unit?: string
  threshold?: {
    warning: number
    critical: number
  }
}

export interface TimeSeriesData {
  labels: string[]
  data: number[]
  metadata?: {
    min: number
    max: number
    avg: number
    unit: string
  }
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'area' | 'pie'
  title: string
  data: TimeSeriesData
  options?: any
  colors?: string[]
}

export interface ContactForm {
  name: string
  email: string
  company: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  platform: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
  icon: string
  credentialId?: string
  verificationUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'planned'
  startDate: string
  endDate?: string
  highlights: string[]
  metrics?: {
    uptime?: string
    performance?: string
    cost_savings?: string
    deployment_frequency?: string
  }
}

export interface InfrastructureComponent {
  id: string
  name: string
  type: 'server' | 'database' | 'cache' | 'load_balancer' | 'storage'
  status: 'healthy' | 'warning' | 'critical' | 'maintenance'
  metrics: {
    cpu?: number
    memory?: number
    disk?: number
    network?: number
    connections?: number
  }
  location: string
  provider: string
  cost?: number
}

export interface DeploymentEnvironment {
  name: string
  status: 'active' | 'inactive' | 'deploying'
  version: string
  lastDeployment: string
  health: {
    uptime: string
    responseTime: number
    errorRate: number
  }
  infrastructure: InfrastructureComponent[]
}

// Analytics Types
export interface AnalyticsEvent {
  event_type: string
  properties: Record<string, any>
  context: string
  timestamp?: Date
}

export interface ButtonClickEvent extends AnalyticsEvent {
  event_type: 'button_click'
  properties: {
    button_name: string
    [key: string]: any
  }
}

export interface ChartInteractionEvent extends AnalyticsEvent {
  event_type: 'chart_interaction'
  properties: {
    chart_type: string
    metric_type?: string
    [key: string]: any
  }
}

export interface PageViewEvent extends AnalyticsEvent {
  event_type: 'page_view'
  properties: {
    page_title?: string
    [key: string]: any
  }
}

// Navigation Types
export interface NavItem {
  name: string
  href: string
  icon?: any
  external?: boolean
}

// Theme Types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  muted: string
}

export interface DevOpsTheme {
  name: string
  colors: ThemeColors
  gradients: {
    primary: string
    secondary: string
    accent: string
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface MetricsApiResponse extends ApiResponse<{
  servers: ServerMetric[]
  alerts: Alert[]
  metrics: MetricData[]
  timeSeries: Record<string, TimeSeriesData>
}> {}

export interface PipelineApiResponse extends ApiResponse<{
  pipelines: Pipeline[]
  activeDeployments: number
  successRate: number
}> {}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea' | 'select'
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface FormState {
  values: Record<string, string>
  errors: Record<string, string>
  isSubmitting: boolean
  isValid: boolean
}

// Utility Types
export type Status = 'healthy' | 'warning' | 'critical' | 'unknown'
export type Trend = 'up' | 'down' | 'stable'
export type TimeRange = '15m' | '1h' | '6h' | '24h' | '7d' | '30d'
export type Environment = 'development' | 'staging' | 'production'
export type DeploymentStatus = 'pending' | 'running' | 'success' | 'failed' | 'cancelled'
