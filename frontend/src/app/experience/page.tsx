'use client'

import '../../styles/resend-animations.css'

export default function ExperiencePage() {
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
                <a href="/experience" className="text-white font-semibold">Experience</a>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</a>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
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
              Professional
              <br />
              Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              A journey through cloud infrastructure, DevOps excellence, and building scalable systems.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {[
              {
                company: 'Tech Company',
                role: 'Senior DevOps Engineer',
                period: '2022 - Present',
                description: 'Leading cloud infrastructure initiatives, implementing CI/CD pipelines, and managing Kubernetes clusters at scale.',
                achievements: [
                  'Reduced deployment time by 60% through automated CI/CD pipelines',
                  'Managed multi-cloud infrastructure across AWS, Azure, and GCP',
                  'Implemented monitoring solutions with Prometheus and Grafana'
                ]
              },
              {
                company: 'Previous Company',
                role: 'DevOps Engineer',
                period: '2020 - 2022',
                description: 'Built and maintained cloud infrastructure, automated deployment processes, and improved system reliability.',
                achievements: [
                  'Migrated legacy applications to containerized environments',
                  'Implemented Infrastructure as Code using Terraform',
                  'Achieved 99.9% uptime for critical services'
                ]
              },
              {
                company: 'Startup',
                role: 'Junior DevOps Engineer',
                period: '2018 - 2020',
                description: 'Supported infrastructure operations, learned cloud technologies, and contributed to automation efforts.',
                achievements: [
                  'Automated server provisioning with Ansible',
                  'Set up monitoring and alerting systems',
                  'Contributed to CI/CD pipeline development'
                ]
              }
            ].map((job, index) => (
              <div
                key={index}
                className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{job.role}</h3>
                    <p className="text-xl text-gray-400">{job.company}</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">{job.period}</div>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's work together</h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in discussing opportunities or collaborations?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:jose@joselrnz.com"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">Get in Touch</span>
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

