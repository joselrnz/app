import { GET, HEAD } from '@/app/api/health/route'

describe('/api/health', () => {
  describe('GET', () => {
    it('returns healthy status', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('healthy')
      expect(data.service).toBe('devops-portfolio')
      expect(data.version).toBe('1.2.0')
    })

    it('includes required health check fields', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('service')
      expect(data).toHaveProperty('version')
      expect(data).toHaveProperty('timestamp')
      expect(data).toHaveProperty('uptime')
      expect(data).toHaveProperty('environment')
      expect(data).toHaveProperty('checks')
    })

    it('includes memory usage information', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data.checks).toHaveProperty('memory')
      expect(data.checks.memory).toHaveProperty('used')
      expect(data.checks.memory).toHaveProperty('total')
      expect(data.checks.memory).toHaveProperty('unit')
      expect(data.checks.memory.unit).toBe('MB')
    })

    it('includes analytics API configuration', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data.checks).toHaveProperty('analytics_api')
    })

    it('timestamp is valid ISO string', async () => {
      const response = await GET()
      const data = await response.json()

      const timestamp = new Date(data.timestamp)
      expect(timestamp).toBeInstanceOf(Date)
      expect(timestamp.getTime()).not.toBeNaN()
    })

    it('uptime is a positive number', async () => {
      const response = await GET()
      const data = await response.json()

      expect(typeof data.uptime).toBe('number')
      expect(data.uptime).toBeGreaterThanOrEqual(0)
    })
  })

  describe('HEAD', () => {
    it('returns 200 status', async () => {
      const response = await HEAD()
      expect(response.status).toBe(200)
    })

    it('returns empty body', async () => {
      const response = await HEAD()
      const text = await response.text()
      expect(text).toBe('')
    })
  })
})

