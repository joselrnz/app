'use client'

import { motion } from 'framer-motion'
import { useAnalytics } from '@/lib/analytics-provider'
import { ServerIcon } from '@heroicons/react/24/outline'

export function Footer() {
  const analytics = useAnalytics()

  const handleLinkClick = (linkName: string, url: string) => {
    analytics?.buttonClick({
      button_name: 'footer_link',
      link_name: linkName,
      url: url,
      context: 'footer',
    })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': [
      { name: 'Infrastructure', href: '#infrastructure' },
      { name: 'Pipeline', href: '#pipeline' },
      { name: 'Monitoring', href: '#monitoring' },
      { name: 'Tools', href: '#tools' },
    ],
    'Portfolio Sites': [
      { name: 'Data Science', href: 'https://data.joselrnz.com' },
      { name: 'Full Stack', href: 'https://fullstack.joselrnz.com' },
      { name: 'Frontend', href: 'https://frontend.joselrnz.com' },
      { name: 'Mobile', href: 'https://mobile.joselrnz.com' },
    ],
      'Connect': [
      { name: 'LinkedIn', href: 'https://linkedin.com/in/joselrnz' },
      { name: 'GitHub', href: 'https://github.com/joselrnz' },
        { name: 'Twitter', href: 'https://twitter.com/joselrnz' },
        { name: 'Email', href: 'mailto:joselorenzo.rodriguez@outlook.com' },
    ],
  }

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <ServerIcon className="w-8 h-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">Jose Lopez</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              DevOps Engineer specializing in cloud infrastructure, automation, 
              and building scalable systems that power modern applications.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: '💼', name: 'LinkedIn', url: 'https://linkedin.com/in/joselrnz' },
                { icon: '🐙', name: 'GitHub', url: 'https://github.com/joselrnz' },
                { icon: '🐦', name: 'Twitter', url: 'https://twitter.com/joselrnz' },
                { icon: '📧', name: 'Email', url: 'mailto:joselorenzo.rodriguez@outlook.com' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  onClick={() => handleLinkClick(social.name, social.url)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors text-lg"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link.name, link.href)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-slate-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Jose Lopez. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <a
                href="/privacy"
                onClick={() => handleLinkClick('Privacy Policy', '/privacy')}
                className="hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={() => handleLinkClick('Terms of Service', '/terms')}
                className="hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </a>
              <span className="flex items-center space-x-2">
                <span>Built with</span>
                <span className="text-red-400">❤️</span>
                <span>and</span>
                <span className="text-emerald-400">Next.js</span>
              </span>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-full text-xs text-slate-400">
              <span>Powered by:</span>
              <span className="text-blue-400">Next.js</span>
              <span>•</span>
              <span className="text-blue-400">TypeScript</span>
              <span>•</span>
              <span className="text-emerald-400">Tailwind CSS</span>
              <span>•</span>
              <span className="text-purple-400">Framer Motion</span>
              <span>•</span>
              <span className="text-orange-400">Chart.js</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
