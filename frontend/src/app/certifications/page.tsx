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
                <a href="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="/certifications" className="text-white font-semibold">Certifications</a>
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
                icon: '☁️',
                title: 'AWS Certified Developer',
                issuer: 'Amazon Web Services',
                level: 'Associate',
                date: 'Oct 2025',
                status: 'Active'
              },
              {
                icon: '🔷',
                title: 'Azure Administrator',
                issuer: 'Microsoft',
                level: 'AZ-104',
                date: '2024',
                status: 'Active'
              },
              {
                icon: '🔧',
                title: 'HashiCorp Terraform',
                issuer: 'HashiCorp',
                level: 'Associate (003)',
                date: 'Dec 2026',
                status: 'Active'
              },
              {
                icon: '🐧',
                title: 'CompTIA Linux+',
                issuer: 'CompTIA',
                level: 'ce Certification',
                date: 'Feb 2028',
                status: 'Active'
              },
              {
                icon: '🖥️',
                title: 'CompTIA Server+',
                issuer: 'CompTIA',
                level: 'Certification',
                date: 'May 2022',
                status: 'Active'
              },
              {
                icon: '☸️',
                title: 'Kubernetes and Cloud Native',
                issuer: 'Cloud Native Computing Foundation',
                level: 'KCNA',
                date: '2024',
                status: 'Active'
              },
              {
                icon: '☁️',
                title: 'AWS Cloud Practitioner',
                issuer: 'Amazon Web Services',
                level: 'Foundational',
                date: 'Aug 2023',
                status: 'Expired'
              }
            ].map((cert, index) => (
              <div
                key={index}
                className={`button-border-light group p-8 rounded-2xl border transition-all duration-300 ${
                  cert.status === 'Expired'
                    ? 'border-white/5 bg-white/[0.02] opacity-60'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cert.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-400 mb-2">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-400">{cert.level}</span>
                  <span className="text-sm text-gray-500">
                    {cert.status === 'Expired' ? 'Expired ' : 'Expires '}{cert.date}
                  </span>
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to discuss your project?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's talk about how I can help with your cloud infrastructure needs.
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

