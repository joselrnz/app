import { CICDPipeline, Job, JobStatus } from '../types/pipeline'

// Sample CI/CD pipeline data that matches the example
export const cicdPipelineData: CICDPipeline = {
  id: 'main-pipeline',
  name: 'Main CI/CD Pipeline',
  runNumber: 1234,
  status: 'running',
  jobs: [
    // Build section
    {
      id: 'build-job',
      name: 'build-job',
      status: 'success',
      type: 'build',
      duration: '2m 15s'
    },

    // Test section
    {
      id: 'test-job1',
      name: 'test-job1',
      status: 'running',
      type: 'test',
      dependsOn: ['build-job']
    },
    {
      id: 'test-job2',
      name: 'test-job2',
      status: 'pending',
      type: 'test',
      dependsOn: ['build-job']
    },

    // Deploy section
    {
      id: 'deploy-prod',
      name: 'deploy-prod',
      status: 'pending',
      type: 'deploy',
      dependsOn: ['test-job1', 'test-job2']
    }
  ],
  startTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  duration: '5m 0s'
}

// Status icon paths for different job statuses
export const STATUS_ICONS = {
  SUCCESS: {
    circle: 'M8 0a8 8 0 100 16A8 8 0 008 0z',
    check: 'M5.5 8.5l2 2 4-4'
  },
  RUNNING: {
    circle: 'M8 1a7 7 0 100 14A7 7 0 008 1z',
    spinner: 'M8 1C4.13401 1 1 4.13401 1 8'
  },
  FAILED: {
    circle: 'M8 0a8 8 0 100 16A8 8 0 008 0z',
    x: 'M5 5l6 6M11 5l-6 6'
  },
  PENDING: {
    circle: 'M8 1a7 7 0 100 14A7 7 0 008 1z'
  }
}

// Helper function to get job status text
export const getJobStatusText = (status: JobStatus): string => {
  switch (status) {
    case 'success': return 'Completed'
    case 'running': return 'In progress'
    case 'failed': return 'Failed'
    case 'skipped': return 'Skipped'
    case 'cancelled': return 'Cancelled'
    case 'pending': return 'Pending'
    default: return 'Unknown'
  }
}
