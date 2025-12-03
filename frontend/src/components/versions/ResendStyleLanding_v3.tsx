'use client'

import { RubiksCube } from '../layout/RubiksCube'
import '../../styles/resend-animations.css'

export default function ResendStyleLanding_v3() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-semibold">Jose Lorenzo</a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/" className="text-white font-semibold">Home</a>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</a>
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
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Rubik's Cube */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Full-bleed animated background (Rubik's Cube + circuit grid) */}
        <div className="absolute inset-0 z-0">
          <RubiksCube />
        </div>

        {/* Hero Content Grid with Text + Rubik's Cube */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side: Hero Text */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
                AI Platform
                <br />
                &
                <br />
                Cloud Engineer
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                Designing and deploying scalable cloud infrastructure across AWS, Azure, and GCP.
                Specializing in Kubernetes orchestration, automated CI/CD pipelines, and reliable systems.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="/projects"
                  className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90 pointer-events-auto"
                >
                  <span className="relative z-10 font-medium">View Projects</span>
                </a>

                <a
                  href="https://linux.joselrnz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5 pointer-events-auto"
                >
                  <img src="/images/tux.svg" alt="Tux" className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-medium">Linux Desktop</span>
                </a>
              </div>
            </div>

            {/* Right Side: (background now hosts Rubik's Cube) */}
            <div className="hidden lg:block" />

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Core Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI Platforms',
                description: 'LangChain, OpenAI, Hugging Face - Building and deploying AI/ML infrastructure',
                isImage: false
              },
              {
                icon: '🚀',
                title: 'CI/CD Pipelines',
                description: 'GitHub Actions, GitLab CI, Jenkins - Automated deployment workflows',
                isImage: false
              },
              {
                icon: '/images/logos/aws.svg',
                title: 'Cloud Architecture',
                description: 'AWS, Azure, GCP - Multi-cloud infrastructure design and implementation',
                isImage: true
              },
              {
                icon: '/images/logos/kubernetes.svg',
                title: 'Container Orchestration',
                description: 'Docker, Helm, Kubernetes - Scalable containerized applications',
                isImage: true
              },
              {
                icon: '/images/logos/terraform.svg',
                title: 'Infrastructure as Code',
                description: 'Ansible, CloudFormation, Terraform - Automated infrastructure provisioning',
                isImage: true
              },
              {
                icon: '/images/logos/grafana.svg',
                title: 'Monitoring & Observability',
                description: 'DataDog, Grafana, Prometheus - Real-time system insights',
                isImage: true
              }
            ].map((skill, index) => (
              <div
                key={index}
                className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-4 h-16 flex items-center">
                  {skill.isImage ? (
                    <img src={skill.icon} alt={skill.title} className="h-16 w-auto object-contain" />
                  ) : (
                    <span className="text-4xl">{skill.icon}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                <p className="text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something amazing</h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in collaborating or learning more about my work?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:joselorenzo.rodriguez@outlook.com"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-white text-black border-white hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">Get in Touch</span>
            </a>

            <a
              href="https://github.com/joselrnz"
              target="_blank"
              rel="noopener noreferrer"
              className="button-border-light group relative flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              <span className="relative z-10 font-medium">View GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">
              © 2025 Jose Lorenzo. All rights reserved.
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
                href="mailto:joselorenzo.rodriguez@outlook.com"
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

