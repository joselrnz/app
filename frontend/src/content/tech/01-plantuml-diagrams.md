---
title: "System Architecture Diagrams with PlantUML"
date: "2024-11-12"
category: "tech"
tags: ["PlantUML", "Architecture", "Diagrams", "Documentation"]
description: "Learn how to create professional system architecture diagrams using PlantUML"
author: "Jose Lorenzo"

# Learning path metadata
module: "01-fundamentals"
order: 1
prerequisites: []
difficulty: "beginner"
estimatedTime: "15 min"
---

## Introduction

PlantUML is a powerful tool for creating diagrams from plain text. This guide shows various diagram types useful for documenting cloud infrastructure and DevOps workflows.

---

## Sequence Diagram: API Authentication Flow

```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "API Gateway" as API
participant "Auth Service" as Auth
database "User DB" as DB

User -> FE: Login Request
FE -> API: POST /auth/login
API -> Auth: Validate Credentials
Auth -> DB: Query User
DB --> Auth: User Data
Auth --> API: JWT Token
API --> FE: Token Response
FE --> User: Login Success
@enduml
```

This sequence diagram shows a typical authentication flow in a microservices architecture.

---

## Component Diagram: Cloud Infrastructure

```plantuml
@startuml
package "AWS Cloud" {
    [Load Balancer] as LB
    [EC2 Instance 1] as EC2_1
    [EC2 Instance 2] as EC2_2
    [RDS Database] as RDS
    [S3 Bucket] as S3
}

package "Monitoring" {
    [CloudWatch] as CW
    [Grafana] as Graf
}

LB --> EC2_1
LB --> EC2_2
EC2_1 --> RDS
EC2_2 --> RDS
EC2_1 --> S3
EC2_2 --> S3
EC2_1 ..> CW : metrics
EC2_2 ..> CW : metrics
CW --> Graf : visualize
@enduml
```

This shows a typical AWS infrastructure setup with load balancing, auto-scaling, and monitoring.

---

## Deployment Diagram: Kubernetes Architecture

```plantuml
@startuml
node "Kubernetes Cluster" {
    node "Master Node" {
        [API Server]
        [Scheduler]
        [Controller]
    }
    
    node "Worker Node 1" {
        [Kubelet 1]
        [Pod 1]
        [Pod 2]
    }
    
    node "Worker Node 2" {
        [Kubelet 2]
        [Pod 3]
        [Pod 4]
    }
}

database "etcd" as ETCD

[API Server] --> ETCD
[Scheduler] --> [API Server]
[Controller] --> [API Server]
[Kubelet 1] --> [API Server]
[Kubelet 2] --> [API Server]
@enduml
```

Kubernetes cluster architecture showing master and worker nodes.

---

## Activity Diagram: CI/CD Pipeline

```plantuml
@startuml
start
:Developer pushes code;
:GitHub webhook triggers;
:Jenkins starts build;
if (Tests pass?) then (yes)
  :Build Docker image;
  :Push to registry;
  if (Deploy to staging?) then (yes)
    :Deploy to staging;
    :Run integration tests;
    if (Tests pass?) then (yes)
      :Deploy to production;
      :Send success notification;
    else (no)
      :Rollback staging;
      :Send failure notification;
    endif
  else (no)
    :Manual approval needed;
  endif
else (no)
  :Send failure notification;
endif
stop
@enduml
```

This activity diagram shows a complete CI/CD pipeline workflow.

---

## Network Diagram: Multi-Tier Architecture

```plantuml
@startuml
nwdiag {
  network dmz {
      address = "10.0.1.x/24"
      
      web01 [address = "10.0.1.10"];
      web02 [address = "10.0.1.11"];
  }
  
  network internal {
      address = "10.0.2.x/24"
      
      web01 [address = "10.0.2.10"];
      web02 [address = "10.0.2.11"];
      app01 [address = "10.0.2.20"];
      app02 [address = "10.0.2.21"];
  }
  
  network database {
      address = "10.0.3.x/24"
      
      app01 [address = "10.0.3.20"];
      app02 [address = "10.0.3.21"];
      db01 [address = "10.0.3.30"];
      db02 [address = "10.0.3.31"];
  }
}
@enduml
```

Network topology showing DMZ, application, and database tiers.

---

## State Diagram: Deployment States

```plantuml
@startuml
[*] --> Pending
Pending --> Building : Start Build
Building --> Testing : Build Success
Building --> Failed : Build Error
Testing --> Deploying : Tests Pass
Testing --> Failed : Tests Fail
Deploying --> Running : Deploy Success
Deploying --> Failed : Deploy Error
Running --> Updating : New Version
Updating --> Running : Update Success
Updating --> Failed : Update Error
Failed --> Pending : Retry
Running --> [*] : Shutdown
@enduml
```

State machine for application deployment lifecycle.

---

## Mind Map: DevOps Tools

```plantuml
@startmindmap
* DevOps Tools
** Version Control
*** Git
*** GitHub
*** GitLab
** CI/CD
*** Jenkins
*** GitHub Actions
*** ArgoCD
** Containers
*** Docker
*** Kubernetes
*** Helm
** Monitoring
*** Prometheus
*** Grafana
*** DataDog
** Infrastructure
*** Terraform
*** Ansible
*** CloudFormation
@endmindmap
```

Mind map organizing DevOps tools by category.

---

## Gantt Chart: Project Timeline

```plantuml
@startgantt
[Infrastructure Setup] lasts 5 days
[Application Development] lasts 10 days
[Application Development] starts at [Infrastructure Setup]'s end
[Testing] lasts 3 days
[Testing] starts at [Application Development]'s end
[Deployment] lasts 2 days
[Deployment] starts at [Testing]'s end
[Monitoring Setup] lasts 3 days
[Monitoring Setup] starts at [Deployment]'s end
@endgantt
```

Project timeline for a typical deployment project.

---

## Summary

PlantUML is an incredibly versatile tool for creating professional diagrams. Key benefits:

- ✅ **Text-based**: Easy to version control
- ✅ **Consistent**: Automatic layout and styling
- ✅ **Fast**: Quick to create and modify
- ✅ **Comprehensive**: Supports many diagram types
- ✅ **Free**: Open source with free public server

For more diagram types and syntax, visit [PlantUML.com](https://plantuml.com).

