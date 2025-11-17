import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMarkdownBySlug, getAllSlugs, getRelatedArticles, getFolderStructure, getAdjacentArticles } from '@/lib/markdown'
import TechNavigation from '@/components/tech/TechNavigation'
import MarkdownRenderer from '@/components/tech/MarkdownRenderer'
import TableOfContents from '@/components/tech/TableOfContents'
import SidebarNavigation from '@/components/tech/SidebarNavigation'
import ArticleNavigation from '@/components/tech/ArticleNavigation'
import ProgressTracker from '@/components/tech/ProgressTracker'
import '../../../../styles/resend-animations.css'
import '../../../../styles/prism-vscode-dark.css'
import 'katex/dist/katex.min.css'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('kubernetes')
  return slugs.map((slug) => ({ slug }))
}

export default async function KubernetesArticlePage({ params }: PageProps) {
  const article = await getMarkdownBySlug('kubernetes', params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles('kubernetes', params.slug, 3)
  const folderStructure = getFolderStructure('kubernetes')
  const { previous, next } = await getAdjacentArticles('kubernetes', params.slug)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-semibold">Jose Lorenzo</Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</Link>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
                <Link href="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
                <Link href="/tech" className="text-white font-semibold">Tech</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/joselrnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/joselrnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Live GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Tech Sub-Navigation */}
      <div className="pt-16">
        <TechNavigation currentCategory="kubernetes" />
      </div>

      {/* Article Content with Sidebar */}
      <article className="relative bg-gradient-to-b from-black via-gray-950 to-black pt-32 pb-24">
        <div className="flex max-w-[1920px] mx-auto">
          {/* Sidebar Navigation */}
          <SidebarNavigation
            category="kubernetes"
            currentSlug={params.slug}
            folderStructure={folderStructure}
          />

          {/* Main Content Area */}
          <div className="flex-1 px-6 lg:pl-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/tech" className="hover:text-white transition-colors">Tech</Link>
              <span>→</span>
              <Link href="/tech/kubernetes" className="hover:text-white transition-colors">Kubernetes</Link>
              <span>→</span>
              <span className="text-white">{article.metadata.title}</span>
            </div>

          {/* Article Header */}
          <header className="mb-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.metadata.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <time dateTime={article.metadata.date}>{article.metadata.date}</time>
              <span>•</span>
              <span>{article.metadata.category}</span>
              {article.metadata.author && (
                <>
                  <span>•</span>
                  <span>By {article.metadata.author}</span>
                </>
              )}
            </div>

            <p className="text-xl text-gray-300 mb-6">{article.metadata.description}</p>

            <div className="flex flex-wrap gap-2">
              {article.metadata.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="flex gap-12 items-start">
            {/* Table of Contents - Sticky on the left */}
            <TableOfContents content={article.content} />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Article Body */}
              <div className="border-t border-white/10 pt-12">
                <MarkdownRenderer content={article.content} />
              </div>

              {/* Progress Tracker */}
              <div className="mt-12">
                <ProgressTracker
                  category="kubernetes"
                  slug={params.slug}
                  estimatedTime={article.metadata.estimatedTime}
                />
              </div>

              {/* Share Section */}
              <div className="border-t border-white/10 mt-16 pt-8">
                <p className="text-gray-400 mb-4">Share this article:</p>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.metadata.title)}&url=${encodeURIComponent(`https://joselrnz.com/tech/kubernetes/${params.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://joselrnz.com/tech/kubernetes/${params.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Previous/Next Navigation */}
              <ArticleNavigation
                category="kubernetes"
                previous={previous ? {
                  slug: previous.slug,
                  title: previous.metadata.title,
                  description: previous.metadata.description,
                  module: previous.metadata.module,
                  difficulty: previous.metadata.difficulty,
                  estimatedTime: previous.metadata.estimatedTime
                } : undefined}
                next={next ? {
                  slug: next.slug,
                  title: next.metadata.title,
                  description: next.metadata.description,
                  module: next.metadata.module,
                  difficulty: next.metadata.difficulty,
                  estimatedTime: next.metadata.estimatedTime
                } : undefined}
              />
            </div>
          </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related, index) => {
                // Extract just the filename from the slug (remove folder path for SEO-friendly URLs)
                const filename = related.slug.includes('/')
                  ? related.slug.split('/').pop()
                  : related.slug

                return (
                  <Link
                    key={index}
                    href={`/tech/kubernetes/${filename}`}
                    className="button-border-light group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                    {related.metadata.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {related.metadata.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Continue learning</h2>
          <p className="text-xl text-gray-300 mb-12">
            Explore more Kubernetes topics and CKA preparation materials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tech/kubernetes"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">All Kubernetes Articles</span>
            </Link>

            <Link
              href="/tech"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              <span className="relative z-10 font-medium">Tech Hub</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">
              © 2024 Jose Lorenzo. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/joselrnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/joselrnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="mailto:jose@joselrnz.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

