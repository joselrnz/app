'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle } from 'lucide-react'
import { FolderStructure, ModuleMetadata } from '@/lib/markdown'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { useProgress } from '@/components/ProgressProvider'

interface SidebarNavigationProps {
  category: string
  currentSlug?: string
  folderStructure: FolderStructure[]
}

export default function SidebarNavigation({
  category,
  currentSlug,
  folderStructure
}: SidebarNavigationProps) {
  // Track which folders are expanded (default: all expanded)
  const [expandedFolders] = useState<Set<string>>(
    new Set(folderStructure.map(folder => folder.path))
  )
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Progress tracking
  const { isArticleCompleted } = useProgress()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [currentSlug])

  // Get module metadata safely
  const getModuleMetadata = (metadata: any): ModuleMetadata | null => {
    if (!metadata) return null
    if ('title' in metadata && 'order' in metadata) {
      return metadata as ModuleMetadata
    }
    return null
  }

  // Extract filename from slug for comparison
  const getCurrentFilename = () => {
    if (!currentSlug) return ''
    return currentSlug.includes('/') 
      ? currentSlug.split('/').pop() || ''
      : currentSlug
  }

  const currentFilename = getCurrentFilename()

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
        aria-label="Toggle navigation"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav 
        className={`
          fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] w-80 
          bg-black/50 backdrop-blur-md border-r border-white/10
          overflow-y-auto z-40 transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <Link
              href={`/tech/${category}`}
              className="text-lg font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              <span className="capitalize">{category}</span>
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Learning Modules
            </p>
          </div>

          {/* Folder Tree with Accordion */}
          <TooltipProvider>
            <Accordion
              type="multiple"
              defaultValue={Array.from(expandedFolders)}
              className="space-y-1"
            >
              {folderStructure.map((folder) => {
                const moduleMetadata = getModuleMetadata(folder.metadata)

                // Calculate module progress
                const moduleArticles = folder.children?.filter(child => child.type === 'file') || []
                const articleSlugs = moduleArticles.map(article => {
                  const filename = article.path.includes('/')
                    ? article.path.split('/').pop() || ''
                    : article.path
                  return filename
                })

                const completedCount = articleSlugs.filter(slug =>
                  isArticleCompleted(category, slug)
                ).length

                const moduleProgress = moduleArticles.length > 0
                  ? Math.round((completedCount / moduleArticles.length) * 100)
                  : 0

                return (
                  <AccordionItem key={folder.path} value={folder.path} className="border-none">
                    <AccordionTrigger className="w-full flex flex-col items-start gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group hover:no-underline">
                      <div className="flex items-center gap-2 w-full">
                        {/* Module Title */}
                        <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors flex-1">
                          {moduleMetadata?.title || folder.name}
                        </span>

                        {/* Progress Badge */}
                        {folder.children && (
                          <Badge
                            variant={moduleProgress === 100 ? 'default' : 'secondary'}
                            className={`text-xs ${moduleProgress === 100 ? 'bg-emerald-500' : ''}`}
                          >
                            {completedCount}/{folder.children.length}
                          </Badge>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {moduleArticles.length > 0 && (
                        <div className="w-full">
                          <Progress value={moduleProgress} className="h-1.5" />
                        </div>
                      )}
                    </AccordionTrigger>

                    <AccordionContent className="ml-6 space-y-0.5 border-l border-white/10 pl-3 pb-2">
                      {folder.children?.map((file) => {
                        // Extract filename from file path for comparison
                        const filename = file.path.includes('/')
                          ? file.path.split('/').pop() || ''
                          : file.path

                        const isActive = filename === currentFilename
                        const fileMetadata = file.metadata && 'estimatedTime' in file.metadata ? file.metadata : null

                        // Check if article is completed
                        const isCompleted = isArticleCompleted(category, filename)

                        return (
                          <Link
                            key={file.path}
                            href={`/tech/${category}/${filename}`}
                            className={`
                              block px-3 py-2 rounded-lg text-sm transition-all duration-200
                              ${isActive
                                ? 'bg-emerald-500/20 text-emerald-400 font-medium border-l-2 border-emerald-400'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }
                            `}
                          >
                            <div className="flex items-start gap-2">
                              {/* Completion Checkmark */}
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                              )}

                              {/* Order Number */}
                              {file.order && (
                                <span className={`text-xs mt-0.5 ${isActive ? 'text-emerald-400' : 'text-gray-600'}`}>
                                  {file.order}.
                                </span>
                              )}

                              {/* Article Title */}
                              <span className="flex-1 line-clamp-2">
                                {file.name}
                              </span>
                            </div>

                            {/* Metadata with Tooltips */}
                            {fileMetadata && (
                              <div className="flex items-center gap-2 mt-1">
                                {/* Time Estimate with Tooltip */}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="secondary" className="text-xs cursor-help">
                                      {fileMetadata.estimatedTime}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Estimated reading time</p>
                                  </TooltipContent>
                                </Tooltip>

                                {/* Difficulty Badge with Tooltip */}
                                {fileMetadata.difficulty && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant={fileMetadata.difficulty as any}
                                        className="text-xs cursor-help capitalize"
                                      >
                                        {fileMetadata.difficulty}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Difficulty level: {fileMetadata.difficulty}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </TooltipProvider>

          {/* Module Info (if viewing an article) */}
          {currentSlug && folderStructure.length > 0 && (
            <div className="mt-8 p-4 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Learning Path
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>
                  {folderStructure.length} modules
                </div>
                <div>
                  {folderStructure.reduce((acc, folder) =>
                    acc + (folder.children?.length || 0), 0
                  )} articles
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href={`/tech/${category}/roadmap`}
                className="w-full text-left text-sm text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                View Learning Roadmap
              </Link>
              <Link
                href={`/tech/${category}`}
                className="w-full text-left text-sm text-gray-400 hover:text-emerald-400 transition-colors block"
              >
                View all articles
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

