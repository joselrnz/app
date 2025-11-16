'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAnalytics } from '@/lib/analytics-provider'
import { 
  ServerIcon, 
  ChartBarIcon, 
  CogIcon, 
  CommandLineIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const analytics = useAnalytics()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Infrastructure', href: '#infrastructure', icon: ServerIcon },
    { name: 'Pipeline', href: '#pipeline', icon: CommandLineIcon },
    { name: 'Monitoring', href: '#monitoring', icon: ChartBarIcon },
    { name: 'Tools', href: '#tools', icon: CogIcon },
    { name: 'Contact', href: '#contact', icon: null },
  ]

  const handleNavClick = (item: any) => {
    analytics?.buttonClick({
      button_name: 'nav_link',
      nav_item: item.name.toLowerCase(),
      context: 'navigation',
    })
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    analytics?.buttonClick({
      button_name: 'logo',
      context: 'navigation',
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center space-x-2 text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ServerIcon className="w-8 h-8" />
            <span>Jose Lopez</span>
            <span className="text-slate-400 text-sm font-normal">DevOps</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-emerald-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className="flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-colors duration-200 px-4 py-2"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
