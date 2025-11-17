import Link from 'next/link'

interface TechNavigationProps {
  currentCategory?: 'circuits' | 'kubernetes' | 'linux' | 'ai' | 'notes'
}

export default function TechNavigation({ currentCategory }: TechNavigationProps) {
  const categories = [
    { name: 'Circuits', href: '/tech/circuits', key: 'circuits' },
    { name: 'Kubernetes', href: '/tech/kubernetes', key: 'kubernetes' },
    { name: 'Linux/IoT', href: '/tech/linux', key: 'linux' },
    { name: 'AI/ML', href: '/tech/ai', key: 'ai' },
    { name: 'Notes', href: '/tech/notes', key: 'notes' },
  ]

  return (
    <div className="border-b border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          <Link
            href="/tech"
            className="px-4 py-3 text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap"
          >
            ← Tech Hub
          </Link>
          <span className="text-gray-600">|</span>
          {categories.map((category) => (
            <Link
              key={category.key}
              href={category.href}
              className={`px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                currentCategory === category.key
                  ? 'text-white font-semibold border-b-2 border-emerald-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

