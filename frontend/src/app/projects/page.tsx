'use client'

import '../../styles/resend-animations.css'

export default function ProjectsPage() {
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
                <a href="/projects" className="text-white font-semibold">Projects</a>
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
              Featured
              <br />
              Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing cloud infrastructure, automation, and DevOps solutions.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Multi-Cloud Infrastructure Platform',
                description: 'Built a unified infrastructure platform managing resources across AWS, Azure, and GCP using Terraform and Kubernetes.',
                tech: ['Terraform', 'Kubernetes', 'AWS', 'Azure', 'GCP'],
                link: 'https://github.com/joselrnz'
              },
              {
                title: 'CI/CD Pipeline Automation',
                description: 'Designed and implemented automated CI/CD pipelines reducing deployment time by 60% and improving reliability.',
                tech: ['Jenkins', 'GitHub Actions', 'Docker', 'ArgoCD'],
                link: 'https://github.com/joselrnz'
              },
              {
                title: 'Monitoring & Observability Stack',
                description: 'Deployed comprehensive monitoring solution with Prometheus, Grafana, and custom dashboards for real-time insights.',
                tech: ['Prometheus', 'Grafana', 'ELK Stack', 'DataDog'],
                link: 'https://github.com/joselrnz'
              },
              {
                title: 'Infrastructure as Code Framework',
                description: 'Created reusable IaC modules and templates for rapid infrastructure provisioning across multiple environments.',
                tech: ['Terraform', 'Ansible', 'CloudFormation', 'Helm'],
                link: 'https://github.com/joselrnz'
              },
              {
                title: 'Kubernetes Cluster Management',
                description: 'Managed production Kubernetes clusters with auto-scaling, security policies, and disaster recovery strategies.',
                tech: ['Kubernetes', 'Helm', 'Istio', 'Cert-Manager'],
                link: 'https://github.com/joselrnz'
              },
              {
                title: 'Data Pipeline Orchestration',
                description: 'Built scalable data pipelines using Apache Airflow and Spark for processing terabytes of data daily.',
                tech: ['Apache Airflow', 'Spark', 'Snowflake', 'Python'],
                link: 'https://github.com/joselrnz'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>View Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to collaborate?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's build something amazing together.
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

