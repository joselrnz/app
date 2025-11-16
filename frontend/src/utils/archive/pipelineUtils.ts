import { Stage, StageStatus, Pipeline, PipelineRun } from '../types/pipeline'

// Format duration in seconds to a readable string
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

// Get color for stage status
export const getStatusColor = (status: StageStatus): string => {
  switch (status) {
    case 'completed': return 'green-400'
    case 'in_progress': return 'yellow-400'
    case 'failed': return 'red-400'
    case 'skipped': return 'blue-400'
    case 'cancelled': return 'purple-400'
    case 'pending': return 'gray-400'
    default: return 'gray-400'
  }
}

// Get icon for stage status
export const getStatusIcon = (status: StageStatus): string => {
  switch (status) {
    case 'completed': return 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z'
    case 'in_progress': return 'M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z'
    case 'failed': return 'M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z'
    case 'skipped': return 'M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75z'
    case 'cancelled': return 'M3.25 10.75a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z'
    case 'pending': return 'M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z'
    default: return 'M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z'
  }
}

// Check if a stage can be started based on dependencies
export const canStartStage = (stage: Stage, allStages: Stage[]): boolean => {
  // If no dependencies, can always start
  if (!stage.dependsOn || stage.dependsOn.length === 0) {
    return true
  }
  
  // Check if all dependencies are completed
  return stage.dependsOn.every(depId => {
    const depStage = allStages.find(s => s.id === depId)
    return depStage && depStage.status === 'completed'
  })
}

// Get next stages that can be started
export const getNextStages = (stages: Stage[]): Stage[] => {
  return stages.filter(stage => 
    stage.status === 'pending' && canStartStage(stage, stages)
  )
}

// Create a new pipeline run from a pipeline configuration
export const createPipelineRun = (pipeline: Pipeline, environment: string): PipelineRun => {
  const runNumber = (pipeline.lastRunNumber || 0) + 1
  
  return {
    id: `run-${pipeline.id}-${runNumber}`,
    pipelineId: pipeline.id,
    runNumber,
    environment,
    status: 'pending',
    startTime: new Date(),
    stages: pipeline.stages.map(stage => ({
      ...stage,
      status: 'pending',
      startTime: undefined,
      endTime: undefined,
      duration: undefined,
      retryCount: 0
    }))
  }
}

// Generate random duration for demo purposes
export const getRandomDuration = (min: number, max: number): string => {
  const seconds = Math.floor(Math.random() * (max - min + 1)) + min
  return formatDuration(seconds)
}

// Calculate total pipeline duration
export const calculateTotalDuration = (stages: Stage[]): string => {
  let totalSeconds = 0
  
  stages.forEach(stage => {
    if (stage.duration) {
      const durationParts = stage.duration.split(' ')
      const minutes = parseInt(durationParts[0].replace('m', ''), 10) || 0
      const seconds = parseInt(durationParts[1].replace('s', ''), 10) || 0
      totalSeconds += (minutes * 60) + seconds
    }
  })
  
  return formatDuration(totalSeconds)
}
