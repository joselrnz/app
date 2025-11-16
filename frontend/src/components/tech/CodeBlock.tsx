'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = 'text', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-gray-900">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/10">
          <span className="text-sm text-gray-400">{filename}</span>
          <span className="text-xs text-gray-500 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        <pre className="p-4 overflow-x-auto">
          <code className={`language-${language} text-sm`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}

