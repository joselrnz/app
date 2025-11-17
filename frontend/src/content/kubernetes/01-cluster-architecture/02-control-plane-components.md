---
title: "Control Plane Components: API Server, Scheduler, Controller Manager & etcd"
date: "2025-01-16"
category: "kubernetes"
tags: ["Kubernetes", "CKA", "Control Plane", "API Server", "etcd", "Scheduler"]
description: "Deep dive into Kubernetes control plane components including kube-apiserver, kube-scheduler, kube-controller-manager, and etcd."
author: "Jose Lorenzo"

# Learning path metadata
module: "01-cluster-architecture"
order: 2
prerequisites: ["01-cluster-architecture/01-kubernetes-overview"]
next: "01-cluster-architecture/03-worker-node-components"
difficulty: "beginner"
estimatedTime: "30 min"
---

## Introduction

The Control Plane is the brain of a Kubernetes cluster. It makes global decisions about the cluster and detects and responds to cluster events. Let's explore each component in detail.

---

## 🎯 Control Plane Components

### 1. kube-apiserver

The **API Server** is the front-end for the Kubernetes control plane. All communication goes through it.

**Key Responsibilities**:
- Exposes the Kubernetes API
- Processes REST operations
- Validates and configures data for API objects
- Serves as the gateway to the cluster
- Only component that talks to etcd

**How it works**:
```bash
# All kubectl commands go through the API server
kubectl get pods
# ↓
# kubectl → API Server → etcd (read)

kubectl create deployment nginx --image=nginx
# ↓
# kubectl → API Server → etcd (write) → Scheduler → kubelet
```

**Configuration**:
```bash
# View API server pod (in kubeadm cluster)
kubectl get pod kube-apiserver-master -n kube-system -o yaml

# Common API server flags
--etcd-servers=https://127.0.0.1:2379
--service-cluster-ip-range=10.96.0.0/12
--authorization-mode=Node,RBAC
```

---

### 2. etcd

**etcd** is a distributed key-value store that stores all cluster data. It's the single source of truth.

**Key Characteristics**:
- Consistent and highly-available
- Stores cluster state, configuration, and metadata
- Only the API server communicates with etcd
- Uses Raft consensus algorithm

**What's stored in etcd**:
- Nodes, Pods, ConfigMaps, Secrets
- Deployments, Services, Namespaces
- RBAC policies
- Network policies

**Important Commands**:
```bash
# Backup etcd (CRITICAL for CKA)
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Verify backup
ETCDCTL_API=3 etcdctl snapshot status /backup/etcd-snapshot.db

# Restore etcd
ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db \
  --data-dir=/var/lib/etcd-restore
```

---

### 3. kube-scheduler

The **Scheduler** watches for newly created Pods and assigns them to nodes.

**Scheduling Process**:
1. **Filtering**: Find nodes that can run the Pod
2. **Scoring**: Rank the filtered nodes
3. **Binding**: Assign Pod to the highest-scoring node

**Factors considered**:
- Resource requests (CPU, memory)
- Node affinity/anti-affinity
- Taints and tolerations
- Pod affinity/anti-affinity
- Data locality

**Example**:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: app
    image: nginx
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

**Manual Scheduling** (CKA exam trick):
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: manual-pod
spec:
  nodeName: worker-node-1  # Bypass scheduler
  containers:
  - name: nginx
    image: nginx
```

---

### 4. kube-controller-manager

Runs multiple **controllers** that regulate the cluster state.

**Key Controllers**:

| Controller | Purpose |
|------------|---------|
| **Node Controller** | Monitors node health |
| **Replication Controller** | Maintains correct number of Pods |
| **Endpoints Controller** | Populates Endpoints objects |
| **Service Account Controller** | Creates default ServiceAccounts |
| **Deployment Controller** | Manages Deployments |
| **Job Controller** | Manages Jobs |

**Control Loop**:
```
1. Watch current state
2. Compare with desired state
3. Take action if different
4. Repeat
```

**Example - ReplicaSet Controller**:
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
spec:
  replicas: 3  # Desired state
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nginx
        image: nginx
```

If a Pod dies, the controller creates a new one to maintain `replicas: 3`.

---

## 🔑 CKA Exam Tips

1. **Know the communication flow**: kubectl → API Server → etcd
2. **etcd backup/restore** is heavily tested
3. Understand **scheduler** decision-making
4. Know which **controllers** handle which resources
5. Be able to identify control plane components in `/etc/kubernetes/manifests/`

---

## 📝 Practice Commands

```bash
# View control plane pods
kubectl get pods -n kube-system

# Check API server logs
kubectl logs kube-apiserver-master -n kube-system

# View scheduler logs
kubectl logs kube-scheduler-master -n kube-system

# Check controller manager
kubectl logs kube-controller-manager-master -n kube-system

# List all controllers
kubectl get deployments -n kube-system
```

---

## ✅ Summary

- **kube-apiserver**: Front-end for Kubernetes, handles all API requests
- **etcd**: Distributed key-value store, single source of truth
- **kube-scheduler**: Assigns Pods to nodes based on resources and constraints
- **kube-controller-manager**: Runs controllers that maintain desired state

---

## 🔗 Next Steps

Continue to [Worker Node Components](./03-worker-node-components) to learn about kubelet, kube-proxy, and container runtime.

