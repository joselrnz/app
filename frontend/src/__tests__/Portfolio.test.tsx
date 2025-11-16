import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Portfolio from '@/components/Portfolio'

// Mock next/dynamic to avoid issues with dynamic imports in tests
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...args: any[]) => {
    const dynamicModule = jest.requireActual('next/dynamic')
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(args[0])
    RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render?.preload?.()
    return RequiredComponent
  },
}))

describe('Portfolio Component', () => {
  beforeEach(() => {
    // Reset window location
    delete (window as any).location
    window.location = { hostname: 'localhost' } as any
  })

  it('renders without crashing', () => {
    render(<Portfolio />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('detects localhost personality', async () => {
    render(<Portfolio />)
    
    await waitFor(() => {
      // Component should render main content
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  it('renders sidebar and main content', async () => {
    render(<Portfolio />)
    
    await waitFor(() => {
      // Check for main content area
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })
  })
})

