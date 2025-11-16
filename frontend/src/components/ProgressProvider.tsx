'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  loadProgress,
  saveProgress,
  markArticleComplete as storeMarkComplete,
  markArticleIncomplete as storeMarkIncomplete,
  updateArticleAccess as storeUpdateAccess,
  isArticleCompleted as storeIsCompleted,
  getArticleProgress as storeGetArticleProgress,
  calculateModuleProgress,
  calculateCategoryProgress,
  getCompletedArticles,
  getTotalProgress,
  clearAllProgress,
  type ProgressData,
  type ArticleProgress,
  type ModuleProgress,
  type CategoryProgress
} from '@/lib/progress-store'

interface ProgressContextValue {
  // State
  progressData: ProgressData
  
  // Article actions
  markArticleComplete: (category: string, slug: string, timeSpent?: number) => void
  markArticleIncomplete: (category: string, slug: string) => void
  updateArticleAccess: (category: string, slug: string) => void
  isArticleCompleted: (category: string, slug: string) => boolean
  getArticleProgress: (category: string, slug: string) => ArticleProgress | null
  
  // Module/Category calculations
  getModuleProgress: (category: string, moduleId: string, articleSlugs: string[]) => ModuleProgress
  getCategoryProgress: (category: string, allArticleSlugs: string[], moduleIds: string[]) => CategoryProgress
  getCompletedArticlesForCategory: (category: string) => ArticleProgress[]
  
  // Global stats
  getTotalStats: () => {
    totalArticles: number
    completedArticles: number
    percentComplete: number
    totalTimeSpent: number
  }
  
  // Utility
  clearProgress: () => void
  refreshProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progressData, setProgressData] = useState<ProgressData>(() => loadProgress())

  // Refresh progress data from localStorage
  const refreshProgress = useCallback(() => {
    setProgressData(loadProgress())
  }, [])

  // Mark article as complete
  const markArticleComplete = useCallback((category: string, slug: string, timeSpent: number = 0) => {
    storeMarkComplete(category, slug, timeSpent)
    refreshProgress()
  }, [refreshProgress])

  // Mark article as incomplete
  const markArticleIncomplete = useCallback((category: string, slug: string) => {
    storeMarkIncomplete(category, slug)
    refreshProgress()
  }, [refreshProgress])

  // Update article access time
  const updateArticleAccess = useCallback((category: string, slug: string) => {
    storeUpdateAccess(category, slug)
    refreshProgress()
  }, [refreshProgress])

  // Check if article is completed
  const isArticleCompleted = useCallback((category: string, slug: string) => {
    return storeIsCompleted(category, slug)
  }, [])

  // Get article progress
  const getArticleProgress = useCallback((category: string, slug: string) => {
    return storeGetArticleProgress(category, slug)
  }, [])

  // Get module progress
  const getModuleProgress = useCallback((
    category: string,
    moduleId: string,
    articleSlugs: string[]
  ) => {
    return calculateModuleProgress(category, moduleId, articleSlugs)
  }, [])

  // Get category progress
  const getCategoryProgress = useCallback((
    category: string,
    allArticleSlugs: string[],
    moduleIds: string[]
  ) => {
    return calculateCategoryProgress(category, allArticleSlugs, moduleIds)
  }, [])

  // Get completed articles for category
  const getCompletedArticlesForCategory = useCallback((category: string) => {
    return getCompletedArticles(category)
  }, [])

  // Get total stats
  const getTotalStats = useCallback(() => {
    return getTotalProgress()
  }, [])

  // Clear all progress
  const clearProgress = useCallback(() => {
    clearAllProgress()
    refreshProgress()
  }, [refreshProgress])

  // Listen for storage events (sync across tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'learning-progress') {
        refreshProgress()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [refreshProgress])

  const value: ProgressContextValue = {
    progressData,
    markArticleComplete,
    markArticleIncomplete,
    updateArticleAccess,
    isArticleCompleted,
    getArticleProgress,
    getModuleProgress,
    getCategoryProgress,
    getCompletedArticlesForCategory,
    getTotalStats,
    clearProgress,
    refreshProgress
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

/**
 * Hook to use progress context
 */
export function useProgress() {
  const context = useContext(ProgressContext)
  
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  
  return context
}

