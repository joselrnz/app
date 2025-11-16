'use client'

/**
 * Progress Tracking Store
 * 
 * Manages user learning progress using localStorage
 * Tracks completed articles, time spent, and learning statistics
 */

export interface ArticleProgress {
  slug: string
  category: string
  completed: boolean
  completedAt?: string // ISO timestamp
  timeSpent?: number // in seconds
  lastAccessed?: string // ISO timestamp
}

export interface ModuleProgress {
  moduleId: string
  category: string
  articlesCompleted: number
  totalArticles: number
  percentComplete: number
  lastAccessed?: string
}

export interface CategoryProgress {
  category: string
  articlesCompleted: number
  totalArticles: number
  modulesCompleted: number
  totalModules: number
  percentComplete: number
  totalTimeSpent: number // in seconds
  lastAccessed?: string
}

export interface ProgressData {
  articles: Record<string, ArticleProgress> // key: "category/slug"
  categories: Record<string, CategoryProgress> // key: "category"
  modules: Record<string, ModuleProgress> // key: "category/moduleId"
  lastUpdated: string // ISO timestamp
}

const STORAGE_KEY = 'learning-progress'

/**
 * Get initial empty progress data
 */
function getInitialProgressData(): ProgressData {
  return {
    articles: {},
    categories: {},
    modules: {},
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Load progress data from localStorage
 */
export function loadProgress(): ProgressData {
  if (typeof window === 'undefined') {
    return getInitialProgressData()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return getInitialProgressData()
    }

    const data = JSON.parse(stored) as ProgressData
    return data
  } catch (error) {
    console.error('Failed to load progress data:', error)
    return getInitialProgressData()
  }
}

/**
 * Save progress data to localStorage
 */
export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    data.lastUpdated = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save progress data:', error)
  }
}

/**
 * Mark an article as completed
 */
export function markArticleComplete(
  category: string,
  slug: string,
  timeSpent: number = 0
): void {
  const data = loadProgress()
  const key = `${category}/${slug}`

  data.articles[key] = {
    slug,
    category,
    completed: true,
    completedAt: new Date().toISOString(),
    timeSpent,
    lastAccessed: new Date().toISOString()
  }

  saveProgress(data)
}

/**
 * Mark an article as incomplete
 */
export function markArticleIncomplete(category: string, slug: string): void {
  const data = loadProgress()
  const key = `${category}/${slug}`

  if (data.articles[key]) {
    data.articles[key].completed = false
    data.articles[key].completedAt = undefined
  }

  saveProgress(data)
}

/**
 * Update article last accessed time
 */
export function updateArticleAccess(category: string, slug: string): void {
  const data = loadProgress()
  const key = `${category}/${slug}`

  if (!data.articles[key]) {
    data.articles[key] = {
      slug,
      category,
      completed: false,
      lastAccessed: new Date().toISOString()
    }
  } else {
    data.articles[key].lastAccessed = new Date().toISOString()
  }

  saveProgress(data)
}

/**
 * Check if an article is completed
 */
export function isArticleCompleted(category: string, slug: string): boolean {
  const data = loadProgress()
  const key = `${category}/${slug}`
  return data.articles[key]?.completed || false
}

/**
 * Get progress for a specific article
 */
export function getArticleProgress(
  category: string,
  slug: string
): ArticleProgress | null {
  const data = loadProgress()
  const key = `${category}/${slug}`
  return data.articles[key] || null
}

/**
 * Calculate module progress
 */
export function calculateModuleProgress(
  category: string,
  moduleId: string,
  articleSlugs: string[]
): ModuleProgress {
  const data = loadProgress()
  
  const completedArticles = articleSlugs.filter(slug => 
    isArticleCompleted(category, slug)
  )

  const progress: ModuleProgress = {
    moduleId,
    category,
    articlesCompleted: completedArticles.length,
    totalArticles: articleSlugs.length,
    percentComplete: articleSlugs.length > 0 
      ? Math.round((completedArticles.length / articleSlugs.length) * 100)
      : 0
  }

  // Find most recent access time
  const accessTimes = articleSlugs
    .map(slug => data.articles[`${category}/${slug}`]?.lastAccessed)
    .filter(Boolean) as string[]

  if (accessTimes.length > 0) {
    progress.lastAccessed = accessTimes.sort().reverse()[0]
  }

  return progress
}

/**
 * Calculate category progress
 */
export function calculateCategoryProgress(
  category: string,
  allArticleSlugs: string[],
  moduleIds: string[]
): CategoryProgress {
  const data = loadProgress()
  
  const completedArticles = allArticleSlugs.filter(slug => 
    isArticleCompleted(category, slug)
  )

  // Calculate total time spent in this category
  const totalTimeSpent = Object.values(data.articles)
    .filter(article => article.category === category)
    .reduce((sum, article) => sum + (article.timeSpent || 0), 0)

  const progress: CategoryProgress = {
    category,
    articlesCompleted: completedArticles.length,
    totalArticles: allArticleSlugs.length,
    modulesCompleted: 0, // Will be calculated separately
    totalModules: moduleIds.length,
    percentComplete: allArticleSlugs.length > 0
      ? Math.round((completedArticles.length / allArticleSlugs.length) * 100)
      : 0,
    totalTimeSpent
  }

  // Find most recent access time
  const accessTimes = allArticleSlugs
    .map(slug => data.articles[`${category}/${slug}`]?.lastAccessed)
    .filter(Boolean) as string[]

  if (accessTimes.length > 0) {
    progress.lastAccessed = accessTimes.sort().reverse()[0]
  }

  return progress
}

/**
 * Get all completed articles for a category
 */
export function getCompletedArticles(category: string): ArticleProgress[] {
  const data = loadProgress()
  
  return Object.values(data.articles)
    .filter(article => article.category === category && article.completed)
}

/**
 * Get total progress across all categories
 */
export function getTotalProgress(): {
  totalArticles: number
  completedArticles: number
  percentComplete: number
  totalTimeSpent: number
} {
  const data = loadProgress()
  
  const allArticles = Object.values(data.articles)
  const completedArticles = allArticles.filter(article => article.completed)
  const totalTimeSpent = allArticles.reduce(
    (sum, article) => sum + (article.timeSpent || 0),
    0
  )

  return {
    totalArticles: allArticles.length,
    completedArticles: completedArticles.length,
    percentComplete: allArticles.length > 0
      ? Math.round((completedArticles.length / allArticles.length) * 100)
      : 0,
    totalTimeSpent
  }
}

/**
 * Clear all progress data
 */
export function clearAllProgress(): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Export progress data as JSON
 */
export function exportProgress(): string {
  const data = loadProgress()
  return JSON.stringify(data, null, 2)
}

/**
 * Import progress data from JSON
 */
export function importProgress(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as ProgressData
    saveProgress(data)
    return true
  } catch (error) {
    console.error('Failed to import progress data:', error)
    return false
  }
}

