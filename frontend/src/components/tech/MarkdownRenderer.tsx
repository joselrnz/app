'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import '../../styles/markdown.css'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    // Sanitize HTML content to prevent XSS attacks
    const clean = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'u', 's', 'code', 'pre',
        'a', 'img',
        'ul', 'ol', 'li',
        'blockquote',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span',
        'script', // Allow script tags for TikZ diagrams
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel',
        'src', 'alt', 'title', 'width', 'height',
        'class', 'id',
        'type', // For script tags
      ],
      ALLOW_DATA_ATTR: true, // Allow data-* attributes for syntax highlighting
      ADD_TAGS: ['script'], // Explicitly allow script tags for TikZ
      ADD_ATTR: ['type'], // Allow type attribute for scripts
    })
    setSanitizedContent(clean)
  }, [content])

  return (
    <div
      className={`markdown-content prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}

