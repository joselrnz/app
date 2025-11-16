'use client'

import { useState } from 'react'

const frameworks = [
  {
    id: 'terraform',
    name: 'Terraform',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 4.5l5.25 3.031v6.062L1.5 10.562V4.5zM8.25 7.531L13.5 4.5v6.062l-5.25 3.031V7.531zM15 10.562l5.25-3.031v6.062L15 16.624V10.562z"/>
      </svg>
    )
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185"/>
      </svg>
    )
  },
  {
    id: 'ansible',
    name: 'Ansible',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.794a.6.6 0 01-.518.294.6.6 0 01-.518-.294l-1.788-3.09h-5.488l2.518 4.356a.6.6 0 010 .6.6.6 0 01-.518.294.6.6 0 01-.518-.294L6.432 9.206a.6.6 0 010-.6.6.6 0 01.518-.294.6.6 0 01.518.294l1.788 3.09h5.488l-2.518-4.356a.6.6 0 010-.6.6.6 0 01.518-.294.6.6 0 01.518.294l3.806 6.588a.6.6 0 010 .6z"/>
      </svg>
    )
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.8.8 0 01.08.32c0 .128-.048.256-.144.384l-.48.32c-.064.048-.128.064-.192.064-.08 0-.16-.04-.24-.104a2.729 2.729 0 01-.288-.384 6.779 6.779 0 01-.248-.456c-.624.736-1.408 1.104-2.353 1.104-.672 0-1.208-.192-1.608-.576-.4-.384-.6-.896-.6-1.536 0-.68.24-1.232.72-1.648.48-.416 1.120-.624 1.928-.624.264 0 .536.016.816.056.28.04.568.088.864.152v-.504c0-.52-.112-.888-.32-1.096-.216-.208-.584-.312-1.096-.312-.24 0-.488.032-.744.08-.256.048-.504.112-.744.192-.112.048-.192.08-.24.096a.399.399 0 01-.096.016c-.088 0-.136-.064-.136-.192v-.304c0-.096.016-.168.048-.216.032-.048.096-.096.192-.144.24-.128.528-.232.864-.32.336-.08.696-.128 1.08-.128.824 0 1.424.192 1.816.568.384.384.576.96.576 1.728v2.272z"/>
      </svg>
    )
  },
  {
    id: 'azure',
    name: 'Azure',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.483 18.923L8.8 5.167h4.176L9.241 18.923H5.483zm8.717 0L18.517 5.167H22.7L19.383 18.923H14.2z"/>
      </svg>
    )
  },
  {
    id: 'gcp',
    name: 'GCP',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.19 2.38a9.344 9.344 0 016.695 2.774 9.344 9.344 0 012.774 6.695 9.344 9.344 0 01-2.774 6.695 9.344 9.344 0 01-6.695 2.774 9.344 9.344 0 01-6.695-2.774A9.344 9.344 0 012.72 11.849a9.344 9.344 0 012.774-6.695A9.344 9.344 0 0112.19 2.38z"/>
      </svg>
    )
  },
  {
    id: 'helm',
    name: 'Helm',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
]

const codeExamples = {
  terraform: `# main.tf
resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t3.micro"
  
  tags = {
    Name        = "WebServer"
    Environment = "production"
  }
}

resource "aws_security_group" "web_sg" {
  name_prefix = "web-"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
  kubernetes: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.21
        ports:
        - containerPort: 80`,
  docker: `# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`,
  ansible: `# playbook.yml
---
- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        
    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes`,
  aws: `# CloudFormation Template
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c02fb55956c7d316
      InstanceType: t3.micro
      SecurityGroups:
        - !Ref WebSecurityGroup
        
  WebSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Web server security group
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0`,
  azure: `# Azure Resource Manager Template
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Compute/virtualMachines",
      "apiVersion": "2021-03-01",
      "name": "webServer",
      "location": "[resourceGroup().location]",
      "properties": {
        "hardwareProfile": {
          "vmSize": "Standard_B1s"
        },
        "osProfile": {
          "computerName": "webServer",
          "adminUsername": "azureuser"
        }
      }
    }
  ]
}`,
  gcp: `# Google Cloud Deployment Manager
resources:
- name: web-server
  type: compute.v1.instance
  properties:
    zone: us-central1-a
    machineType: zones/us-central1-a/machineTypes/e2-micro
    disks:
    - deviceName: boot
      type: PERSISTENT
      boot: true
      autoDelete: true
      initializeParams:
        sourceImage: projects/debian-cloud/global/images/family/debian-11`,
  helm: `# Chart.yaml
apiVersion: v2
name: web-app
description: A Helm chart for web application
version: 0.1.0
appVersion: "1.0"

# values.yaml
replicaCount: 3

image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80`
}

export function CodeShowcase() {
  const [selectedFramework, setSelectedFramework] = useState('terraform')

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <span className="text-2xl">🚀</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Integrate <span className="text-blue-400">tonight</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A simple, elegant interface so you can start deploying infrastructure in minutes. 
            It fits right into your workflow with tools for your favorite platforms.
          </p>
        </div>

        {/* Framework selector - Augment Style Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {frameworks.map((framework) => (
            <button
              key={framework.id}
              onClick={() => setSelectedFramework(framework.id)}
              aria-selected={selectedFramework === framework.id}
              className={`
                group relative flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300
                ${selectedFramework === framework.id
                  ? 'bg-white/10 text-white border-white/20'
                  : 'button-border-light bg-transparent text-gray-300 border-white/10 hover:border-white/20 hover:bg-white/5'
                }
              `}
            >
              <span className="relative z-10">{framework.icon}</span>
              <span className="relative z-10 text-sm font-normal">{framework.name}</span>
            </button>
          ))}
        </div>

        {/* Code example */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm text-gray-400">{selectedFramework}</span>
              </div>
            </div>
            
            {/* Code content */}
            <div className="p-6">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{codeExamples[selectedFramework as keyof typeof codeExamples] || codeExamples.terraform}</code>
              </pre>
            </div>
            
            {/* Action buttons - Augment Style */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 border-t border-white/10">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/joselrnz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-border-light group relative flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-sm transition-all duration-300"
                >
                  <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="relative z-10">View on GitHub</span>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeExamples[selectedFramework as keyof typeof codeExamples] || codeExamples.terraform)
                }}
                className="button-border-light group relative flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-sm transition-all duration-300"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Copy Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
