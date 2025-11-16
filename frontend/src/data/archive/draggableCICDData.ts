// CI/CD Pipeline data for the draggable pipeline visualization

export interface CICDStage {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped'
  duration?: string
  position: { x: number, y: number }
  type: 'source' | 'build' | 'test' | 'deploy' | 'monitor'
  dependsOn: string[]
  commands?: string[]
  artifacts?: string[]
  environment?: string
  order: number
}

export interface CICDPipelineData {
  id: string
  name: string
  description: string
  stages: CICDStage[]
  currentRun: number
  status: 'idle' | 'running' | 'completed' | 'failed'
  startTime?: string
  endTime?: string
  duration?: string
  environments: string[]
}

// Default positions for stages in a grid layout
const getDefaultPosition = (type: string, index: number): { x: number, y: number } => {
  const columnMap: Record<string, number> = {
    'source': 0,
    'build': 1,
    'test': 2,
    'deploy': 3,
    'monitor': 4
  }

  const column = columnMap[type] || 0
  return {
    x: 150 + column * 280,  // Increased spacing between columns to 280px
    y: 300 + index * 180    // Increased vertical spacing to 180px and start at 300px
  }
}

// Sample CI/CD pipeline data
export const draggableCICDData: CICDPipelineData = {
  id: 'pipeline-1',
  name: 'Enterprise Deployment Pipeline',
  description: 'GitHub Actions-style CI/CD pipeline for enterprise applications - 2025',
  currentRun: 1247,
  status: 'idle',
  environments: ['development', 'staging', 'production'],
  stages: [
    {
      id: 'checkout',
      name: 'Checkout Code',
      description: 'Checkout source code from repository',
      status: 'pending',
      type: 'source',
      dependsOn: [],
      position: getDefaultPosition('source', 0),
      commands: [
        'actions/checkout@v4',
        'git fetch --depth=1',
        'git checkout ${{ github.sha }}'
      ],
      artifacts: ['source-code'],
      order: 1
    },
    {
      id: 'setup-node',
      name: 'Setup Node.js',
      description: 'Setup Node.js environment and cache',
      status: 'pending',
      type: 'build',
      dependsOn: ['checkout'],
      position: getDefaultPosition('build', 0),
      commands: [
        'actions/setup-node@v4',
        'node-version: 20.x',
        'cache: npm'
      ],
      order: 2
    },
    {
      id: 'install-deps',
      name: 'Install Dependencies',
      description: 'Install and cache project dependencies',
      status: 'pending',
      type: 'build',
      dependsOn: ['setup-node'],
      position: getDefaultPosition('build', 1),
      commands: [
        'npm ci --prefer-offline',
        'npm audit --audit-level=high',
        'npm run postinstall'
      ],
      artifacts: ['node_modules', 'package-lock.json'],
      order: 3
    },
    {
      id: 'code-quality',
      name: 'Code Quality',
      description: 'Run linting and code formatting checks',
      status: 'pending',
      type: 'build',
      dependsOn: ['install-deps'],
      position: getDefaultPosition('build', 2),
      commands: [
        'npm run lint:check',
        'npm run format:check',
        'npm run type-check'
      ],
      order: 4
    },
    {
      id: 'unit-tests',
      name: 'Unit Tests',
      description: 'Run unit tests with coverage',
      status: 'pending',
      type: 'test',
      dependsOn: ['code-quality'],
      position: getDefaultPosition('test', 0),
      commands: [
        'npm run test:unit -- --coverage',
        'npm run test:coverage-report',
        'codecov/codecov-action@v3'
      ],
      artifacts: ['coverage-report.xml', 'test-results.xml'],
      order: 5
    },
    {
      id: 'integration-tests',
      name: 'Integration Tests',
      description: 'Run API and database integration tests',
      status: 'pending',
      type: 'test',
      dependsOn: ['unit-tests'],
      position: getDefaultPosition('test', 1),
      commands: [
        'docker-compose up -d postgres redis',
        'npm run test:integration',
        'docker-compose down'
      ],
      artifacts: ['integration-test-results.xml'],
      order: 6
    },
    {
      id: 'security-scan',
      name: 'Security Scan',
      description: 'Run security vulnerability scanning',
      status: 'pending',
      type: 'test',
      dependsOn: ['install-deps'],
      position: getDefaultPosition('test', 2),
      commands: [
        'npm audit --audit-level=moderate',
        'snyk test --severity-threshold=high',
        'trivy fs . --exit-code 1'
      ],
      artifacts: ['security-report.json'],
      order: 7
    },
    {
      id: 'build-artifacts',
      name: 'Build Application',
      description: 'Build and package application artifacts',
      status: 'pending',
      type: 'build',
      dependsOn: ['code-quality', 'unit-tests'],
      position: getDefaultPosition('build', 3),
      commands: [
        'npm run build:production',
        'docker build -t ${{ env.REGISTRY }}/app:${{ github.sha }} .',
        'docker push ${{ env.REGISTRY }}/app:${{ github.sha }}'
      ],
      artifacts: [
        'dist/',
        'docker-image',
        'build-manifest.json'
      ],
      order: 8
    },
    {
      id: 'deploy-dev',
      name: 'Deploy Development',
      description: 'Deploy to development environment with auto-rollback',
      status: 'pending',
      type: 'deploy',
      dependsOn: ['build-artifacts', 'integration-tests', 'security-scan'],
      position: getDefaultPosition('deploy', 0),
      commands: [
        'aws configure set region us-east-1',
        'terraform plan -var="env=development"',
        'terraform apply -auto-approve -var="env=development"',
        'kubectl set image deployment/app app=${{ env.REGISTRY }}/app:${{ github.sha }} -n development',
        'kubectl rollout status deployment/app -n development --timeout=300s'
      ],
      environment: 'development',
      artifacts: ['deployment-manifest-dev.yaml'],
      order: 9
    },
    {
      id: 'e2e-tests',
      name: 'E2E Tests',
      description: 'Run comprehensive end-to-end tests',
      status: 'pending',
      type: 'test',
      dependsOn: ['deploy-dev'],
      position: getDefaultPosition('test', 3),
      commands: [
        'npm run test:e2e:setup',
        'playwright test --config=e2e.config.ts',
        'npm run test:e2e:teardown'
      ],
      artifacts: ['e2e-test-results.html', 'screenshots/'],
      order: 10
    },
    {
      id: 'deploy-staging',
      name: 'Deploy Staging',
      description: 'Deploy to staging with blue-green deployment',
      status: 'pending',
      type: 'deploy',
      dependsOn: ['e2e-tests'],
      position: getDefaultPosition('deploy', 1),
      commands: [
        'terraform plan -var="env=staging"',
        'terraform apply -auto-approve -var="env=staging"',
        'kubectl apply -f k8s/staging/blue-green.yaml',
        'kubectl patch service app-service -p \'{"spec":{"selector":{"version":"blue"}}}\' -n staging',
        'kubectl rollout status deployment/app-blue -n staging --timeout=600s'
      ],
      environment: 'staging',
      artifacts: ['deployment-manifest-staging.yaml'],
      order: 11
    },
    {
      id: 'performance-tests',
      name: 'Performance Tests',
      description: 'Run load testing and performance benchmarks',
      status: 'pending',
      type: 'test',
      dependsOn: ['deploy-staging'],
      position: getDefaultPosition('test', 4),
      commands: [
        'k6 run --vus 100 --duration 5m load-tests/api-load.js',
        'artillery run --target https://staging.app.com performance-tests/stress.yml',
        'npm run test:lighthouse -- --url=https://staging.app.com'
      ],
      artifacts: ['performance-report.html', 'lighthouse-report.json'],
      order: 12
    },
    {
      id: 'deploy-prod',
      name: 'Deploy Production',
      description: 'Deploy to production with canary deployment',
      status: 'pending',
      type: 'deploy',
      dependsOn: ['performance-tests'],
      position: getDefaultPosition('deploy', 2),
      commands: [
        'terraform plan -var="env=production"',
        'terraform apply -auto-approve -var="env=production"',
        'kubectl apply -f k8s/production/canary.yaml',
        'kubectl patch service app-service -p \'{"spec":{"selector":{"version":"canary"}}}\' -n production',
        'kubectl rollout status deployment/app-canary -n production --timeout=900s',
        'npm run deploy:canary-validation',
        'kubectl patch service app-service -p \'{"spec":{"selector":{"version":"stable"}}}\' -n production'
      ],
      environment: 'production',
      artifacts: ['deployment-manifest-prod.yaml', 'canary-metrics.json'],
      order: 13
    },
    {
      id: 'post-deploy-validation',
      name: 'Post-Deploy Validation',
      description: 'Validate production deployment health',
      status: 'pending',
      type: 'monitor',
      dependsOn: ['deploy-prod'],
      position: getDefaultPosition('monitor', 0),
      commands: [
        'npm run health-check:production',
        'curl -f https://api.app.com/health',
        'npm run smoke-tests:production',
        'kubectl get pods -n production -l app=myapp'
      ],
      artifacts: ['health-check-report.json'],
      order: 14
    },
    {
      id: 'monitoring-setup',
      name: 'Monitoring Setup',
      description: 'Configure monitoring, alerts, and dashboards',
      status: 'pending',
      type: 'monitor',
      dependsOn: ['post-deploy-validation'],
      position: getDefaultPosition('monitor', 1),
      commands: [
        'helm upgrade --install prometheus prometheus/kube-prometheus-stack',
        'helm upgrade --install grafana grafana/grafana',
        'kubectl apply -f monitoring/alerts.yaml',
        'kubectl apply -f monitoring/dashboards.yaml'
      ],
      artifacts: ['monitoring-config.yaml', 'alert-rules.yaml'],
      order: 15
    }
  ]
}

// Stage type colors
export const stageTypeColors: Record<string, { bg: string, border: string, text: string, glow: string, shadowColor: string }> = {
  source: {
    bg: '#0f1225',
    border: '#ff5efc',
    text: '#ffffff',
    glow: '0 0 10px #ff5efc, 0 0 20px #ff5efc, 0 0 30px #ff5efc',
    shadowColor: 'rgba(255, 94, 252, 0.8)'
  },
  build: {
    bg: '#0f1225',
    border: '#00ff9d',
    text: '#ffffff',
    glow: '0 0 10px #00ff9d, 0 0 20px #00ff9d, 0 0 30px #00ff9d',
    shadowColor: 'rgba(0, 255, 157, 0.8)'
  },
  test: {
    bg: '#0f1225',
    border: '#ffcc00',
    text: '#ffffff',
    glow: '0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00',
    shadowColor: 'rgba(255, 204, 0, 0.8)'
  },
  deploy: {
    bg: '#0f1225',
    border: '#00ccff',
    text: '#ffffff',
    glow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff',
    shadowColor: 'rgba(0, 204, 255, 0.8)'
  },
  monitor: {
    bg: '#0f1225',
    border: '#a64dff',
    text: '#ffffff',
    glow: '0 0 10px #a64dff, 0 0 20px #a64dff, 0 0 30px #a64dff',
    shadowColor: 'rgba(166, 77, 255, 0.8)'
  }
}

// Status colors
export const statusColors: Record<string, { color: string, bg: string }> = {
  pending: { color: '#9ca3af', bg: '#374151' },
  running: { color: '#fcd34d', bg: '#78350f' },
  success: { color: '#6ee7b7', bg: '#064e3b' },
  failed: { color: '#f87171', bg: '#7f1d1d' },
  skipped: { color: '#a5b4fc', bg: '#3730a3' }
}
