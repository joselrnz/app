'use client'

import Link from 'next/link'
import Image from 'next/image'
import '../../styles/resend-animations.css'

export default function TechHubPage() {
  const categories = [
    {
      title: 'Circuits & Electronics',
      icon: '⚡',
      isImage: false,
      description: 'Arduino, ESP32, Raspberry Pi projects, PCB design, and embedded systems.',
      href: '/tech/circuits',
      topics: ['Arduino', 'ESP32', 'Raspberry Pi', 'PCB Design', 'Sensors', 'IoT Devices'],
      color: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      title: 'Kubernetes & CKA',
      icon: '/images/logos/kubernetes.svg',
      isImage: true,
      description: 'Kubernetes administration, CKA exam prep, container orchestration, and cloud-native technologies.',
      href: '/tech/kubernetes',
      topics: ['Kubernetes', 'CKA Exam', 'Container Orchestration', 'kubectl', 'Helm', 'Cloud Native'],
      color: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      title: 'Linux & IoT',
      icon: '🐧',
      isImage: false,
      description: 'Linux system administration, IoT platforms, embedded Linux, and automation.',
      href: '/tech/linux',
      topics: ['Linux Admin', 'IoT Platforms', 'Embedded Linux', 'Shell Scripting', 'Systemd', 'Networking'],
      color: 'from-cyan-500/20 to-teal-500/20'
    },
    {
      title: 'AI & Machine Learning',
      icon: '🤖',
      isImage: false,
      description: 'TensorFlow, PyTorch, computer vision, neural networks, and AI applications.',
      href: '/tech/ai',
      topics: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Neural Networks', 'NLP', 'Model Training'],
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'Technical Notes',
      icon: '📝',
      isImage: false,
      description: 'Quick tips, troubleshooting guides, code snippets, and technical references.',
      href: '/tech/notes',
      topics: ['Quick Tips', 'Troubleshooting', 'Code Snippets', 'Best Practices', 'Resources', 'Cheat Sheets'],
      color: 'from-green-500/20 to-emerald-500/20'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-semibold">Jose Lorenzo</Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                <Link href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</Link>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
                <Link href="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</Link>
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
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              Technical
              <br />
              Knowledge Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Explore circuits, electronics, Linux, IoT, AI, and technical notes from hands-on projects and experiments.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="mb-4 h-20 flex items-center">
                    {category.isImage ? (
                      <Image
                        src={category.icon}
                        alt={category.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain"
                      />
                    ) : (
                      <span className="text-5xl">{category.icon}</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-emerald-400 group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Circuit Projects', value: '12+' },
              { label: 'Kubernetes Guides', value: '8+' },
              { label: 'Linux Guides', value: '8+' },
              { label: 'AI Experiments', value: '6+' },
              { label: 'Technical Notes', value: '20+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start exploring</h2>
          <p className="text-xl text-gray-300 mb-12">
            Dive into technical content, projects, and learning resources.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tech/circuits"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">View Circuits</span>
            </Link>

            <Link
              href="/"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              <span className="relative z-10 font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">
              © 2025 Jose Lorenzo. All rights reserved.
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
                href="mailto:joselorenzo.rodriguez@outlook.com"
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

