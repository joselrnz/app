'use client'

import { useState } from 'react'
import '../../styles/resend-animations.css'

export default function CertificatesPage() {
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
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="/certifications" className="text-white font-semibold">Certifications</a>
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              Certifications
              <br />
              & Credentials
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Professional certifications demonstrating expertise in cloud technologies and DevOps practices.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '/images/logos/aws.svg',
                title: 'AWS Certified Developer',
                issuer: 'Amazon Web Services',
                level: 'Associate',
                date: 'Oct 2025',
                isImage: true
              },
              {
                icon: '/images/logos/microsoft-certified-associate-badge.svg',
                title: 'Azure Administrator',
                issuer: 'Microsoft',
                level: 'AZ-104',
                date: 'June 2025',
                isImage: true,
                link: 'https://learn.microsoft.com/api/credentials/share/en-us/JoseLorenzoRodriguez-8076/820E3FCD080F26B?sharingId=CB6B3A76D8B6EB70'
              },
              {
                icon: '/images/logos/terraform.svg',
                title: 'HashiCorp Terraform',
                issuer: 'HashiCorp',
                level: 'Associate (003)',
                date: 'Dec 2026',
                isImage: true
              },
              {
                icon: '/images/logos/comptia-linux.svg',
                title: 'CompTIA Linux+',
                issuer: 'CompTIA',
                level: 'ce Certification',
                date: 'Feb 2028',
                isImage: true
              },
              {
                icon: '/images/logos/kubernetes.svg',
                title: 'Kubernetes and Cloud Native',
                issuer: 'Cloud Native Computing Foundation',
                level: 'KCNA',
                date: '2024',
                isImage: true
              }
            ].map((cert, index) => {
              const CardContent = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-16 flex items-center">
                      {cert.isImage ? (
                        <img src={cert.icon} alt={cert.title} className="h-16 w-auto object-contain" />
                      ) : (
                        <span className="text-4xl">{cert.icon}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                  <p className="text-gray-400 mb-2">{cert.issuer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-400">{cert.level}</span>
                    <span className="text-sm text-gray-500">Expires {cert.date}</span>
                  </div>
                  {cert.link && (
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
                        <span>View Credential</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  )}
                </>
              );

              return cert.link ? (
                <a
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 block"
                >
                  {CardContent}
                </a>
              ) : (
                <div
                  key={index}
                  className="button-border-light group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

          {/* Skills Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'AWS', 'Azure', 'GCP', 'Kubernetes',
                'Docker', 'Terraform', 'Ansible', 'Jenkins',
                'GitHub Actions', 'GitLab CI', 'Prometheus', 'Grafana',
                'ELK Stack', 'DataDog', 'Python', 'Bash'
              ].map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/10 transition-all duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal CTA: only Back to Home as requested */}
      <section className="py-12 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center">
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

