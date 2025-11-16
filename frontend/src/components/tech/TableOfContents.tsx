'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3, h4')
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading) => {
      const level = parseInt(heading.tagName.substring(1))
      const text = heading.textContent || ''
      // Create a slug from the text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      return { id, text, level }
    })
    
    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    // Add IDs to actual heading elements in the DOM
    const headingElements = document.querySelectorAll('.markdown-content h2, .markdown-content h3, .markdown-content h4')
    headingElements.forEach((heading) => {
      const text = heading.textContent || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      heading.id = id
    })

    // Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1.0,
      }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block sticky top-24 w-64 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          On This Page
        </h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm transition-colors duration-200 hover:text-emerald-400 ${
                  activeId === heading.id
                    ? 'text-emerald-400 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full text-left text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <span>↑</span>
            <span>Back to top</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Link copied to clipboard!')
            }}
            className="w-full text-left text-sm text-gray-400 hover:text-emerald-400 transition-colors"
          >
            Copy link
          </button>
        </div>
      </div>
    </nav>
  )
}

