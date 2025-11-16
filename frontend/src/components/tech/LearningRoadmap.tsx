'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, Clock, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProgress } from '@/components/ProgressProvider'
import type { FolderStructure } from '@/lib/markdown'

interface LearningRoadmapProps {
  category: string
  folderStructure: FolderStructure[]
}

/**
 * LearningRoadmap Component
 * 
 * Visual representation of the learning path with progress tracking
 * Shows modules, articles, and completion status
 */
export default function LearningRoadmap({ category, folderStructure }: LearningRoadmapProps) {
  const { isArticleCompleted, getCategoryProgress } = useProgress()
  const [categoryProgress, setCategoryProgress] = useState<any>(null)

  useEffect(() => {
    // Calculate category progress
    const allSlugs: string[] = []
    const moduleIds: string[] = []

    folderStructure.forEach(folder => {
      if (folder.type === 'folder' && folder.children) {
        moduleIds.push(folder.name)
        folder.children.forEach(child => {
          if (child.type === 'file' && child.metadata) {
            // Extract slug from path (remove category and .md extension)
            const slug = child.path
              .replace(`${category}/`, '')
              .replace('.md', '')
            allSlugs.push(slug)
          }
        })
      }
    })

    const progress = getCategoryProgress(category, allSlugs, moduleIds)
    setCategoryProgress(progress)
  }, [category, folderStructure, getCategoryProgress])

  // Format time in seconds to human-readable format
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className="space-y-8">
      {/* Category Progress Overview */}
      {categoryProgress && (
        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  Your Progress
                </CardTitle>
                <CardDescription className="text-white/60 mt-1">
                  Track your learning journey in {category}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-emerald-400">
                  {categoryProgress.percentComplete}%
                </div>
                <div className="text-sm text-white/60">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${categoryProgress.percentComplete}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {categoryProgress.articlesCompleted}/{categoryProgress.totalArticles}
                  </div>
                  <div className="text-sm text-white/60">Articles Completed</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <Clock className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {formatTime(categoryProgress.totalTimeSpent)}
                  </div>
                  <div className="text-sm text-white/60">Time Invested</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <Award className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {categoryProgress.modulesCompleted}/{categoryProgress.totalModules}
                  </div>
                  <div className="text-sm text-white/60">Modules Completed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module Roadmap */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-400" />
          Learning Path
        </h2>

        {folderStructure.map((folder, folderIndex) => {
          if (folder.type !== 'folder' || !folder.children) return null

          // Calculate module progress
          const moduleArticles = folder.children.filter(child => child.type === 'file')
          const completedCount = moduleArticles.filter(article => {
            if (!article.metadata) return false
            const slug = article.path.replace(`${category}/`, '').replace('.md', '')
            return isArticleCompleted(category, slug)
          }).length

          const moduleProgress = moduleArticles.length > 0
            ? Math.round((completedCount / moduleArticles.length) * 100)
            : 0

          const isModuleComplete = moduleProgress === 100

          return (
            <Card
              key={folder.path}
              className={`border-white/10 ${
                isModuleComplete ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-black'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      {isModuleComplete ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-white/40" />
                      )}
                      {folder.metadata?.title || folder.name}
                    </CardTitle>
                    {folder.metadata?.description && (
                      <CardDescription className="mt-2 text-white/60">
                        {folder.metadata.description}
                      </CardDescription>
                    )}
                  </div>
                  <Badge
                    variant={isModuleComplete ? 'default' : 'outline'}
                    className={
                      isModuleComplete
                        ? 'bg-emerald-500 text-white'
                        : 'border-white/20 text-white/60'
                    }
                  >
                    {completedCount}/{moduleArticles.length} Complete
                  </Badge>
                </div>

                {/* Module Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {moduleArticles.map((article, articleIndex) => {
                    if (!article.metadata) return null

                    const slug = article.path.replace(`${category}/`, '').replace('.md', '')
                    const isCompleted = isArticleCompleted(category, slug)

                    return (
                      <Link
                        key={article.path}
                        href={`/tech/${category}/${slug}`}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isCompleted
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-white/40 flex-shrink-0" />
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium truncate">
                            {articleIndex + 1}. {article.metadata.title}
                          </div>
                          {article.metadata.estimatedTime && (
                            <div className="text-sm text-white/60 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {article.metadata.estimatedTime}
                            </div>
                          )}
                        </div>

                        {article.metadata.difficulty && (
                          <Badge
                            variant={
                              article.metadata.difficulty === 'beginner'
                                ? 'beginner'
                                : article.metadata.difficulty === 'intermediate'
                                ? 'intermediate'
                                : article.metadata.difficulty === 'advanced'
                                ? 'advanced'
                                : 'outline'
                            }
                            className="flex-shrink-0"
                          >
                            {article.metadata.difficulty}
                          </Badge>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

