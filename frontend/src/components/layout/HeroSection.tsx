'use client'

import { motion } from 'framer-motion'
import { useAnalytics } from '@/lib/analytics-provider'
import { 
  CloudIcon, 
  ServerIcon, 
  CommandLineIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export function HeroSection() {
  const analytics = useAnalytics()

  const handleCTAClick = (action: string) => {
    analytics?.buttonClick({
      button_name: action,
      context: 'hero_section',
      section: 'cta',
    })
  }

  const skills = [
    { name: 'Kubernetes', icon: CloudIcon, level: 95 },
    { name: 'Docker', icon: ServerIcon, level: 98 },
    { name: 'CI/CD', icon: CommandLineIcon, level: 92 },
    { name: 'Monitoring', icon: ChartBarIcon, level: 90 },
    { name: 'Automation', icon: CogIcon, level: 94 },
    { name: 'Security', icon: ShieldCheckIcon, level: 88 },
  ]

  return (
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            DevOps Engineer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
        >
          Building scalable infrastructure, automating deployments, and ensuring 
          <span className="text-emerald-400 font-semibold"> 99.9% uptime</span> through 
          modern DevOps practices and Site Reliability Engineering.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Uptime', value: '99.9%' },
            { label: 'Deployments', value: '500+' },
            { label: 'Servers', value: '1000+' },
            { label: 'Experience', value: '5+ Years' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="metric-card text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              className="metric-card flex items-center space-x-3"
            >
              <skill.icon className="w-6 h-6 text-emerald-400" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-slate-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 1 }}
                    className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#infrastructure"
            onClick={() => handleCTAClick('view_infrastructure')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          >
            View Infrastructure
          </motion.a>
          
          <motion.a
            href="#contact"
            onClick={() => handleCTAClick('get_in_touch')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
