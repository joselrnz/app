'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProgress } from '@/components/ProgressProvider'

interface ProgressTrackerProps {
  category: string
  slug: string
  estimatedTime?: string
}

/**
 * ProgressTracker Component
 * 
 * Displays article completion status and allows users to mark articles as complete/incomplete
 */
export default function ProgressTracker({ category, slug, estimatedTime }: ProgressTrackerProps) {
  const { isArticleCompleted, markArticleComplete, markArticleIncomplete, updateArticleAccess } = useProgress()
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Update completion status on mount and when dependencies change
  useEffect(() => {
    setIsCompleted(isArticleCompleted(category, slug))
    
    // Track article access
    updateArticleAccess(category, slug)
  }, [category, slug, isArticleCompleted, updateArticleAccess])

  const handleToggleComplete = async () => {
    setIsLoading(true)
    
    try {
      if (isCompleted) {
        markArticleIncomplete(category, slug)
        setIsCompleted(false)
      } else {
        // Parse estimated time to seconds (e.g., "20 min" -> 1200)
        let timeSpent = 0
        if (estimatedTime) {
          const match = estimatedTime.match(/(\d+)\s*min/)
          if (match) {
            timeSpent = parseInt(match[1]) * 60
          }
        }
        
        markArticleComplete(category, slug, timeSpent)
        setIsCompleted(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">
          {isCompleted ? 'Article Completed!' : 'Mark as Complete'}
        </h3>
        <p className="text-sm text-white/60">
          {isCompleted 
            ? 'Great job! You\'ve completed this article.' 
            : 'Click the button when you finish reading this article.'}
        </p>
      </div>
      
      <Button
        onClick={handleToggleComplete}
        disabled={isLoading}
        variant={isCompleted ? 'outline' : 'default'}
        className={`min-w-[180px] ${
          isCompleted 
            ? 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10' 
            : ''
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Completed
          </>
        ) : (
          <>
            <Circle className="w-5 h-5 mr-2" />
            Mark Complete
          </>
        )}
      </Button>
    </div>
  )
}

