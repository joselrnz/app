'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Mock analytics for Docker build (when SDK is not available)
class MockAnalytics {
  pageView(properties?: any) {
    console.log('Mock Analytics - Page View:', properties)
  }
  buttonClick(properties: any) {
    console.log('Mock Analytics - Button Click:', properties)
  }
  chartInteraction(properties: any) {
    console.log('Mock Analytics - Chart Interaction:', properties)
  }
  customEvent(properties: any) {
    console.log('Mock Analytics - Custom Event:', properties)
  }
  destroy() {
    console.log('Mock Analytics - Destroyed')
  }
}

// Use mock analytics for development
const PortfolioAnalytics = MockAnalytics

interface AnalyticsContextType {
  analytics: InstanceType<typeof PortfolioAnalytics> | null
  pageView: (properties?: any) => void
  buttonClick: (properties: any) => void
  chartInteraction: (properties: any) => void
  customEvent: (properties: any) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

interface AnalyticsProviderProps {
  children: React.ReactNode
  portfolio: string
}

export function AnalyticsProvider({ children, portfolio }: AnalyticsProviderProps) {
  const [analytics, setAnalytics] = useState<InstanceType<typeof PortfolioAnalytics> | null>(null)

  useEffect(() => {
    // Initialize analytics
    const analyticsInstance = new PortfolioAnalytics()

    setAnalytics(analyticsInstance)

    // Cleanup on unmount
    return () => {
      analyticsInstance.destroy()
    }
  }, [portfolio])

  const pageView = (properties?: any) => {
    analytics?.pageView(properties)
  }

  const buttonClick = (properties: any) => {
    analytics?.buttonClick(properties)
  }

  const chartInteraction = (properties: any) => {
    analytics?.chartInteraction(properties)
  }

  const customEvent = (properties: any) => {
    analytics?.customEvent(properties)
  }

  const value = {
    analytics,
    pageView,
    buttonClick,
    chartInteraction,
    customEvent,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  return context
}
