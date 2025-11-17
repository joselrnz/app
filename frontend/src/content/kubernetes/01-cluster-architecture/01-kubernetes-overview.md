---
title: "Kubernetes Overview: Architecture & Core Concepts"
date: "2025-01-16"
category: "kubernetes"
tags: ["Kubernetes", "CKA", "Architecture", "Containers", "Orchestration"]
description: "Comprehensive overview of Kubernetes architecture, core concepts, and why it's the leading container orchestration platform."
author: "Jose Lorenzo"

# Learning path metadata
module: "01-cluster-architecture"
order: 1
prerequisites: []
next: "01-cluster-architecture/02-control-plane-components"
difficulty: "beginner"
estimatedTime: "25 min"
---

## Introduction

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. Understanding its architecture is crucial for the CKA exam.

---

## 🎯 What is Kubernetes?

Kubernetes provides:
- **Container Orchestration**: Automated deployment and scaling
- **Self-Healing**: Automatic restart and replacement of failed containers
- **Service Discovery**: Built-in DNS and load balancing
- **Storage Orchestration**: Automatic mounting of storage systems
- **Automated Rollouts/Rollbacks**: Progressive deployment strategies
- **Secret & Configuration Management**: Secure handling of sensitive data
- **Batch Execution**: Run batch and CI workloads

---

## 🏗️ Kubernetes Architecture

### High-Level Overview

Kubernetes follows a **master-worker** architecture with two main components:

1. **Control Plane** (Master Node): Manages the cluster
2. **Worker Nodes**: Run application workloads

```
┌─────────────────────────────────────────────────────────┐
│                    Control Plane                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ API      │  │Scheduler │  │Controller│  │  etcd   │ │
│  │ Server   │  │          │  │ Manager  │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌──────▼───────┐
│ Worker Node  │  │ Worker Node  │  │ Worker Node  │
│ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │
│ │ kubelet  │ │  │ │ kubelet  │ │  │ │ kubelet  │ │
│ │ kube-    │ │  │ │ kube-    │ │  │ │ kube-    │ │
│ │ proxy    │ │  │ │ proxy    │ │  │ │ proxy    │ │
│ │ Container│ │  │ │ Container│ │  │ │ Container│ │
│ │ Runtime  │ │  │ │ Runtime  │ │  │ │ Runtime  │ │
│ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎓 Key Concepts

### Pods
The smallest deployable unit in Kubernetes. A Pod can contain one or more containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

### Namespaces
Virtual clusters for resource isolation and multi-tenancy.

```bash
# List namespaces
kubectl get namespaces

# Create namespace
kubectl create namespace dev

# Set default namespace
kubectl config set-context --current --namespace=dev
```

### Labels and Selectors
Key-value pairs for organizing and selecting Kubernetes objects.

```yaml
metadata:
  labels:
    app: frontend
    tier: web
    environment: production
```

---

## 🔑 CKA Exam Focus

**Weight**: 25% of exam  
**Key Topics**:
- Understand cluster architecture
- Identify control plane components
- Understand worker node components
- Know the role of etcd
- Understand container runtime interface (CRI)

---

## 📝 Practice Commands

```bash
# Get cluster info
kubectl cluster-info

# Get nodes with details
kubectl get nodes -o wide

# Describe a node
kubectl describe node <node-name>

# Get component status (deprecated in newer versions)
kubectl get componentstatuses

# Check API server health
kubectl get --raw='/readyz?verbose'

# View cluster events
kubectl get events --all-namespaces
```

---

## ✅ Summary

- Kubernetes uses a **master-worker** architecture
- **Control Plane** manages the cluster state and scheduling
- **Worker Nodes** run application workloads in Pods
- **etcd** stores all cluster data as the source of truth
- Understanding architecture is foundational for CKA success

---

## 🔗 Next Steps

Continue to [Control Plane Components](./02-control-plane-components) to dive deeper into the master node components.

