import Link from 'next/link'
import TechNavigation from '@/components/tech/TechNavigation'
import { getAllMarkdownFiles } from '@/lib/markdown'
import '../../../styles/resend-animations.css'

export default async function AIPage() {
  // Automatically get all AI articles from markdown files
  const articles = getAllMarkdownFiles('ai')

  return (
    <div className="min-h-screen bg-black text-white">
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
              <a href="https://linkedin.com/in/joselrnz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="https://github.com/joselrnz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">Live GitHub</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <TechNavigation currentCategory="ai" />
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              AI &
              <br />
              Machine Learning
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              TensorFlow, PyTorch, computer vision, neural networks, and AI application development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <Link key={index} href={`/tech/ai/${article.slug}`} className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{article.metadata.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{article.metadata.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-3">{article.metadata.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.metadata.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-emerald-400 group-hover:translate-x-2 transition-transform">
                  <span>Read More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400">More AI and ML projects coming soon...</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Interested in AI collaboration?</h2>
          <p className="text-xl text-gray-300 mb-12">Let's discuss machine learning and AI projects.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:jose@joselrnz.com" className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90">
              <span className="relative z-10 font-medium">Get in Touch</span>
            </a>
            <Link href="/tech" className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5">
              <span className="relative z-10 font-medium">Back to Tech Hub</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">© 2024 Jose Lorenzo. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="https://linkedin.com/in/joselrnz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="https://github.com/joselrnz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
              <a href="mailto:jose@joselrnz.com" className="text-gray-400 hover:text-white transition-colors text-sm">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

