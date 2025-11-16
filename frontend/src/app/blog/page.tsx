'use client'

import { useState } from 'react'
import '../../styles/resend-animations.css'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-semibold">Jose Lorenzo</a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</a>
                <a href="/blog" className="text-white font-semibold">Blog</a>
                <a href="/tech" className="text-gray-300 hover:text-white transition-colors">Tech</a>
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              Blog &
              <br />
              Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Thoughts on cloud infrastructure, DevOps best practices, and technology trends.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Building Scalable Kubernetes Clusters',
                excerpt: 'Best practices for designing and managing production-ready Kubernetes clusters at scale.',
                date: 'Oct 15, 2024',
                readTime: '8 min read',
                category: 'Kubernetes'
              },
              {
                title: 'Multi-Cloud Strategy Guide',
                excerpt: 'How to effectively manage infrastructure across AWS, Azure, and GCP without the complexity.',
                date: 'Oct 10, 2024',
                readTime: '12 min read',
                category: 'Cloud Architecture'
              },
              {
                title: 'CI/CD Pipeline Optimization',
                excerpt: 'Techniques to reduce deployment time and improve reliability in your CI/CD workflows.',
                date: 'Oct 5, 2024',
                readTime: '10 min read',
                category: 'DevOps'
              },
              {
                title: 'Infrastructure as Code Best Practices',
                excerpt: 'Lessons learned from managing infrastructure with Terraform across multiple environments.',
                date: 'Sep 28, 2024',
                readTime: '15 min read',
                category: 'IaC'
              },
              {
                title: 'Monitoring & Observability Stack',
                excerpt: 'Setting up comprehensive monitoring with Prometheus, Grafana, and custom dashboards.',
                date: 'Sep 20, 2024',
                readTime: '11 min read',
                category: 'Monitoring'
              },
              {
                title: 'Container Security Essentials',
                excerpt: 'Security best practices for containerized applications and Kubernetes deployments.',
                date: 'Sep 15, 2024',
                readTime: '9 min read',
                category: 'Security'
              }
            ].map((post, index) => (
              <div
                key={index}
                className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-24 max-w-2xl mx-auto">
            <div className="button-border-light p-12 rounded-2xl border border-white/10 bg-white/5 text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Newsletter</h2>
              <p className="text-gray-300 mb-8">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button
                  type="submit"
                  className="button-border-light px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have a topic suggestion?</h2>
          <p className="text-xl text-gray-300 mb-12">
            I'd love to hear what you'd like to read about.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:jose@joselrnz.com"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">Send Suggestion</span>
            </a>

            <a
              href="/"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              <span className="relative z-10 font-medium">Back to Home</span>
            </a>
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

