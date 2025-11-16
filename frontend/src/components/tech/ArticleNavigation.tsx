'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProgress } from '@/components/ProgressProvider'

interface NavigationArticle {
  slug: string
  title: string
  description?: string
  module?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
  estimatedTime?: string
}

interface ArticleNavigationProps {
  category: string
  previous?: NavigationArticle
  next?: NavigationArticle
}

export default function ArticleNavigation({ category, previous, next }: ArticleNavigationProps) {
  const { isArticleCompleted } = useProgress()

  if (!previous && !next) {
    return null
  }

  return (
    <nav className="border-t border-white/10 pt-12 mt-16">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">Continue Learning</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Article */}
        {previous ? (
          <Link
            href={`/tech/${category}/${previous.slug}`}
            className="group"
          >
            <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <ArrowLeft className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Previous</p>
                      {isArticleCompleted(category, previous.slug) && (
                        <Badge variant="default" className="bg-emerald-500 text-white text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {previous.title}
                    </h3>
                    {previous.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {previous.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {previous.estimatedTime && (
                        <span className="text-xs text-gray-500">
                          {previous.estimatedTime}
                        </span>
                      )}
                      {previous.difficulty && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className={`text-xs capitalize ${
                            previous.difficulty === 'beginner' ? 'text-green-400' :
                            previous.difficulty === 'intermediate' ? 'text-blue-400' :
                            previous.difficulty === 'advanced' ? 'text-purple-400' :
                            'text-gray-400'
                          }`}>
                            {previous.difficulty}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Next Article */}
        {next && (
          <Link
            href={`/tech/${category}/${next.slug}`}
            className="group"
          >
            <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Next</p>
                      {isArticleCompleted(category, next.slug) && (
                        <Badge variant="default" className="bg-emerald-500 text-white text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {next.title}
                    </h3>
                    {next.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {next.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {next.estimatedTime && (
                        <span className="text-xs text-gray-500">
                          {next.estimatedTime}
                        </span>
                      )}
                      {next.difficulty && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className={`text-xs capitalize ${
                            next.difficulty === 'beginner' ? 'text-green-400' :
                            next.difficulty === 'intermediate' ? 'text-blue-400' :
                            next.difficulty === 'advanced' ? 'text-purple-400' :
                            'text-gray-400'
                          }`}>
                            {next.difficulty}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <ArrowRight className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      {/* Back to All Articles */}
      <div className="mt-8 text-center">
        <Link href={`/tech/${category}`}>
          <Button 
            variant="outline" 
            className="border-white/20 hover:border-emerald-400/50 hover:bg-white/5 text-gray-300 hover:text-emerald-400"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View All {category.charAt(0).toUpperCase() + category.slice(1)} Articles
          </Button>
        </Link>
      </div>
    </nav>
  )
}

