import { Pipeline } from '../types/pipeline'

// Icons for stages (SVG paths)
const ICONS = {
  CHECKOUT: 'M10 1a4.5 4.5 0 00-4.5 4.5V9H1l4 4 4-4H5V5.5a5 5 0 015-5 5 5 0 015 5V9h4l-4 4-4-4h4V5.5A4.5 4.5 0 0010 1z',
  SETUP: 'M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z',
  TEST: 'M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm0-11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3.5zm0 8a1 1 0 100-2 1 1 0 000 2z',
  BUILD: 'M7.25 6a.75.75 0 00-.75.75v6.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-.75-.75z',
  DEPLOY: 'M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z',
  ANALYZE: 'M8 16A8 8 0 108 0a8 8 0 000 16zm-3.5-4.11l-.07-.07a.75.75 0 01.07-1.05l1.35-1.35a2.5 2.5 0 003.54 0l1.35-1.35a.75.75 0 01.98-.07l.08.07a.75.75 0 01.07 1.05l-1.35 1.35a4 4 0 01-5.66 0l-1.35-1.35a.75.75 0 01-.07-.98z',
  SECURITY: 'M7.467.133a1.75 1.75 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.7 1.7 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68zm.61 1.429a.25.25 0 00-.153 0l-5.25 1.68a.25.25 0 00-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.2.2 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.25.25 0 00-.174-.237l-5.25-1.68zM8.75 4.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 011.5 0zm-.75 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z',
  NOTIFY: 'M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z',
}

// Default pipeline configurations
export const pipelineConfigurations: Pipeline[] = [
  // Standard CI/CD Pipeline
  {
    id: 'standard-cicd',
    name: 'Standard CI/CD',
    description: 'Standard build, test, and deploy pipeline',
    layout: 'linear',
    environments: ['dev', 'staging', 'production'],
    defaultEnvironment: 'dev',
    lastRunNumber: 1234,
    lastRunStatus: 'success',
    lastRunTime: '3m 45s',
    averageRunTime: '4m 12s',
    stages: [
      {
        id: 'checkout',
        name: 'Checkout',
        description: 'Clone repository and checkout code',
        status: 'pending',
        icon: ICONS.CHECKOUT
      },
      {
        id: 'setup',
        name: 'Setup',
        description: 'Set up build environment and dependencies',
        status: 'pending',
        icon: ICONS.SETUP
      },
      {
        id: 'test',
        name: 'Test',
        description: 'Run unit and integration tests',
        status: 'pending',
        icon: ICONS.TEST
      },
      {
        id: 'build',
        name: 'Build',
        description: 'Build application artifacts',
        status: 'pending',
        icon: ICONS.BUILD
      },
      {
        id: 'deploy',
        name: 'Deploy',
        description: 'Deploy to environment',
        status: 'pending',
        icon: ICONS.DEPLOY
      }
    ]
  },
  
  // Extended Pipeline with Security Scanning
  {
    id: 'security-pipeline',
    name: 'Security Pipeline',
    description: 'Extended pipeline with security scanning',
    layout: 'branched',
    environments: ['dev', 'staging', 'production'],
    defaultEnvironment: 'dev',
    lastRunNumber: 1233,
    lastRunStatus: 'failed',
    lastRunTime: '5m 12s',
    averageRunTime: '5m 45s',
    stages: [
      {
        id: 'checkout',
        name: 'Checkout',
        description: 'Clone repository and checkout code',
        status: 'pending',
        icon: ICONS.CHECKOUT
      },
      {
        id: 'setup',
        name: 'Setup',
        description: 'Set up build environment and dependencies',
        status: 'pending',
        icon: ICONS.SETUP,
        dependsOn: ['checkout']
      },
      {
        id: 'security-scan',
        name: 'Security Scan',
        description: 'Scan code for security vulnerabilities',
        status: 'pending',
        icon: ICONS.SECURITY,
        dependsOn: ['setup']
      },
      {
        id: 'test',
        name: 'Test',
        description: 'Run unit and integration tests',
        status: 'pending',
        icon: ICONS.TEST,
        dependsOn: ['setup']
      },
      {
        id: 'build',
        name: 'Build',
        description: 'Build application artifacts',
        status: 'pending',
        icon: ICONS.BUILD,
        dependsOn: ['test', 'security-scan']
      },
      {
        id: 'deploy',
        name: 'Deploy',
        description: 'Deploy to environment',
        status: 'pending',
        icon: ICONS.DEPLOY,
        dependsOn: ['build']
      },
      {
        id: 'notify',
        name: 'Notify',
        description: 'Send deployment notifications',
        status: 'pending',
        icon: ICONS.NOTIFY,
        dependsOn: ['deploy'],
        optional: true
      }
    ]
  },
  
  // Data Pipeline
  {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    description: 'ETL and data processing pipeline',
    layout: 'complex',
    environments: ['dev', 'staging', 'production'],
    defaultEnvironment: 'dev',
    lastRunNumber: 1230,
    lastRunStatus: 'success',
    lastRunTime: '12m 33s',
    averageRunTime: '15m 20s',
    stages: [
      {
        id: 'extract',
        name: 'Extract',
        description: 'Extract data from sources',
        status: 'pending',
        icon: ICONS.CHECKOUT
      },
      {
        id: 'transform',
        name: 'Transform',
        description: 'Transform and clean data',
        status: 'pending',
        icon: ICONS.BUILD,
        dependsOn: ['extract']
      },
      {
        id: 'validate',
        name: 'Validate',
        description: 'Validate data quality',
        status: 'pending',
        icon: ICONS.TEST,
        dependsOn: ['transform']
      },
      {
        id: 'load',
        name: 'Load',
        description: 'Load data to destination',
        status: 'pending',
        icon: ICONS.DEPLOY,
        dependsOn: ['validate']
      },
      {
        id: 'analyze',
        name: 'Analyze',
        description: 'Run data analysis',
        status: 'pending',
        icon: ICONS.ANALYZE,
        dependsOn: ['load'],
        optional: true
      }
    ]
  }
]
