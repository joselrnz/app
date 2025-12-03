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
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="/experience" className="text-white font-semibold">Experience</a>
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
              Building AI infrastructure platforms, automating workflows, and securing cloud systems at scale.
            </p>
          </div>

          {/* Current Focus Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="button-border-light group p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300">
              <h2 className="text-3xl font-semibold mb-4 text-emerald-400">Current Focus</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Building AI infrastructure platforms and MCP (Model Context Protocol) tools on AWS that automate workflows and orchestrate complex processes.
                Focused on cutting deployment time while improving efficiency in project delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">🤖</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">AI Platform Engineering</h4>
                    <p className="text-gray-400 text-sm">Building LLM-powered platforms on AWS to expedite processes while maintaining compliance and security</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">🔒</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">LLM Security & Monitoring</h4>
                    <p className="text-gray-400 text-sm">Preventing hallucinations, prompt injection, and AI security risks through CloudWatch logging and monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">🔄</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Workflow Automation</h4>
                    <p className="text-gray-400 text-sm">Building orchestration workflows with Lambda, Step Functions, and EventBridge to automate repetitive tasks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">🛡️</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Cloud Security & Compliance</h4>
                    <p className="text-gray-400 text-sm">Implementing IAM policies, VPC isolation, and security guardrails to keep data internal and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">Professional Experience</h2>
            {[
              {
                company: 'USAA',
                role: 'AI Cloud / Platform Engineer',
                period: 'Jul 2025 - Present',
                location: 'San Antonio, TX',
                description: 'Building AI-powered platform infrastructure on AWS, deploying MCP-based automation tools, and implementing LLM security gateways to streamline operations.',
                achievements: [
                  'Streamlined environment setup and deployment by building an MCP (Model Context Protocol) server on AWS using Lambda and API Gateway, enabling LLM-driven infrastructure automation',
                  'Developed AI security gateway with FastAPI and Redis for LLM request routing, implementing rate limiting, PII redaction, and hallucination detection to prevent data leakage',
                  'Automated infrastructure creation using AWS CLI, Python, and Terraform with LLM-assisted workflows, eliminating repetitive manual steps and improving deployment consistency',
                  'Implemented monitoring and audit logging with CloudWatch and EventBridge for AI operations, tracking LLM interactions and ensuring compliance with security policies',
                  'Optimized ECS-based AI workloads and Lambda functions for MCP tool execution, improving runtime performance and reliability for LLM-powered platform services'
                ]
              },
              {
                company: 'Sarah Cannon Research Institute',
                role: 'Cloud Engineer',
                period: 'Sep 2023 - Jul 2025',
                location: 'San Antonio, TX',
                description: 'Built AWS cloud infrastructure, developed deployment workflows, and strengthened security while migrating legacy workloads to the cloud.',
                achievements: [
                  'Accelerated environment provisioning by designing reusable Terraform modules for VPCs, EC2, and S3, enabling faster and more consistent application deployments on AWS',
                  'Built and refined CI/CD pipelines in GitHub Actions and Jenkins, making rollouts of services and infrastructure components smoother and more predictable',
                  'Implemented monitoring and alerting with CloudWatch and Grafana, surfacing issues earlier and helping reduce on-call incidents across AWS workloads',
                  'Strengthened security and governance using IAM policies, Security Groups, and AWS Config guardrails without slowing down delivery cycles',
                  'Migrated web applications and stateful data from on-premises data centers to AWS via Direct Connect, ensuring secure connectivity and reliable cloud operations'
                ]
              },
              {
                company: 'USAA',
                role: 'DevOps Engineer',
                period: 'Jun 2021 - Sep 2023',
                location: 'San Antonio, TX',
                description: 'Managed AWS-based container platforms, CI/CD automation, and observability to keep cloud-native workloads running smoothly and securely.',
                achievements: [
                  'Improved deployment workflows by managing containerized applications on Kubernetes (EKS), keeping production services scalable and steady on AWS',
                  'Developed self-healing infrastructure with automated scaling and failover policies, helping applications recover cleanly from cluster or node issues',
                  'Built and refined CI/CD pipelines in GitHub Actions and Jenkins, making releases more predictable and reducing manual deployment steps',
                  'Enhanced observability with Grafana and CloudWatch dashboards, giving teams clearer insight into application and infrastructure behavior on AWS',
                  'Implemented security controls including IAM roles, RBAC, and encryption with KMS, keeping AWS workloads aligned with compliance expectations'
                ]
              },
              {
                company: 'Accenture Federal Services',
                role: 'DevOps Engineer',
                period: 'Nov 2020 - Jun 2021',
                location: 'San Antonio, TX',
                description: 'Supported cloud adoption by migrating workloads to AWS, automating infrastructure, and building monitoring around production applications.',
                achievements: [
                  'Simplified cloud adoption by migrating web applications and data from on-premises to AWS, keeping cutovers smooth and giving teams a more reliable platform',
                  'Automated infrastructure provisioning using Terraform and CloudFormation, reducing repetitive setup work and keeping AWS environments consistent',
                  'Designed Grafana and CloudWatch dashboards to troubleshoot issues faster and understand how production systems behaved on AWS',
                  'Tuned AWS production environments by addressing performance bottlenecks and improving day-to-day stability for applications',
                  'Configured AWS networking including VPCs, subnets, and Security Groups, supporting secure connectivity for cloud workloads'
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
                    {job.location && <p className="text-sm text-gray-500 mt-1">{job.location}</p>}
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">{job.period}</div>
                </div>
                <div className="flex flex-row items-start gap-2 mb-4">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-300 flex-1">{job.description}</p>
                </div>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex flex-row items-start gap-2 text-gray-400">
                      <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-semibold mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Cloud Platforms</h3>
                <p className="text-gray-400 text-sm">AWS, Azure, GCP</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Container Orchestration</h3>
                <p className="text-gray-400 text-sm">Kubernetes, Docker, Helm, EKS, AKS</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Infrastructure as Code</h3>
                <p className="text-gray-400 text-sm">Terraform, Ansible, CloudFormation</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">CI/CD</h3>
                <p className="text-gray-400 text-sm">Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Monitoring & Observability</h3>
                <p className="text-gray-400 text-sm">Prometheus, Grafana, DataDog, CloudWatch</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">AI/ML Platforms</h3>
                <p className="text-gray-400 text-sm">LangChain, OpenAI, Hugging Face, MCP</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Programming Languages</h3>
                <p className="text-gray-400 text-sm">Python, Bash, PowerShell, Go, JavaScript</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Databases</h3>
                <p className="text-gray-400 text-sm">PostgreSQL, MySQL, MongoDB, Redis</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-3 text-emerald-400">Version Control</h3>
                <p className="text-gray-400 text-sm">Git, GitHub, GitLab, Bitbucket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <a
            href="/"
            className="button-border-light group relative inline-flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
          >
            <span className="relative z-10 font-medium">Back to Home</span>
          </a>
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

