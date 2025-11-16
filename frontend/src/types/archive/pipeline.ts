// Pipeline and stage type definitions

export type JobStatus = 'success' | 'running' | 'pending' | 'failed' | 'skipped' | 'cancelled'

export interface Job {
  id: string
  name: string
  description?: string
  status: JobStatus
  duration?: string
  icon?: string
  dependsOn?: string[] // IDs of jobs that must complete before this one
  optional?: boolean // Whether this job can be skipped
  logs?: string[] // Log entries for this job
  startTime?: Date
  endTime?: Date
  retryCount?: number
  errorMessage?: string
  type: 'build' | 'test' | 'deploy' // The section this job belongs to
}

// Legacy types for backward compatibility
export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped' | 'cancelled'

export interface Stage {
  id: string
  name: string
  description: string
  status: StageStatus
  duration?: string
  icon: string
  dependsOn?: string[] // IDs of stages that must complete before this one
  optional?: boolean // Whether this stage can be skipped
  logs?: string[] // Log entries for this stage
  startTime?: Date
  endTime?: Date
  retryCount?: number
  errorMessage?: string
}

export interface Pipeline {
  id: string
  name: string
  description: string
  stages: Stage[]
  layout: 'linear' | 'branched' | 'complex' // Different layout types
  environments: string[]
  defaultEnvironment: string
  lastRunNumber?: number
  lastRunStatus?: 'success' | 'failed' | 'in_progress' | 'cancelled'
  lastRunTime?: string
  averageRunTime?: string
}

export interface PipelineRun {
  id: string
  pipelineId: string
  runNumber: number
  environment: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled'
  startTime: Date
  endTime?: Date
  stages: Stage[]
  totalDuration?: string
  triggeredBy?: string
  commitId?: string
}

// New CI/CD Pipeline DAG types
export interface CICDPipeline {
  id: string
  name: string
  jobs: Job[]
  runNumber: number
  status: 'success' | 'running' | 'failed' | 'cancelled'
  startTime?: Date
  endTime?: Date
  duration?: string
}
