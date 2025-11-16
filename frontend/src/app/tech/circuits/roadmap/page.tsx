import Link from 'next/link'
import { getFolderStructure } from '@/lib/markdown'
import TechNavigation from '@/components/tech/TechNavigation'
import LearningRoadmap from '@/components/tech/LearningRoadmap'
import '../../../../styles/resend-animations.css'

export default function CircuitsRoadmapPage() {
  const folderStructure = getFolderStructure('circuits')

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
        <TechNavigation currentCategory="circuits" />
      </div>

      {/* Roadmap Content */}
      <main className="relative bg-gradient-to-b from-black via-gray-950 to-black pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/tech/circuits"
                className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Circuits
              </Link>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Circuits Learning Roadmap
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Track your progress through the circuits learning path. Complete articles, earn badges, and master circuit analysis.
            </p>
          </header>

          {/* Learning Roadmap Component */}
          <LearningRoadmap 
            category="circuits" 
            folderStructure={folderStructure} 
          />
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Begin your journey through the circuits learning path and track your progress.
          </p>
          <Link
            href="/tech/circuits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold"
          >
            View All Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

