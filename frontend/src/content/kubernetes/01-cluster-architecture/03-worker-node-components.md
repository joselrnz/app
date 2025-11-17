---
title: "Worker Node Components: kubelet, kube-proxy & Container Runtime"
date: "2025-01-16"
category: "kubernetes"
tags: ["Kubernetes", "CKA", "Worker Nodes", "kubelet", "kube-proxy", "Container Runtime"]
description: "Understand worker node components including kubelet, kube-proxy, and container runtime (containerd, CRI-O, Docker)."
author: "Jose Lorenzo"

# Learning path metadata
module: "01-cluster-architecture"
order: 3
prerequisites: ["01-cluster-architecture/02-control-plane-components"]
next: "02-workloads-scheduling/01-pods-fundamentals"
difficulty: "beginner"
estimatedTime: "25 min"
---

## Introduction

Worker nodes are the machines that run your containerized applications. Each worker node contains the necessary components to run Pods and communicate with the control plane.

---

## 🎯 Worker Node Components

### 1. kubelet

The **kubelet** is an agent that runs on every node. It ensures containers are running in Pods.

**Key Responsibilities**:
- Registers the node with the API server
- Watches for Pod assignments from the API server
- Ensures containers described in PodSpecs are running and healthy
- Reports node and Pod status back to the control plane
- Executes liveness and readiness probes

**How kubelet works**:
```
1. API Server assigns Pod to node
2. kubelet receives PodSpec
3. kubelet tells container runtime to pull image
4. Container runtime starts container
5. kubelet monitors container health
6. kubelet reports status to API server
```

**Configuration**:
```bash
# View kubelet service
systemctl status kubelet

# kubelet config file
cat /var/lib/kubelet/config.yaml

# Common kubelet flags
--pod-manifest-path=/etc/kubernetes/manifests  # Static pods
--kubeconfig=/etc/kubernetes/kubelet.conf
--container-runtime-endpoint=unix:///var/run/containerd/containerd.sock
```

**Static Pods** (Important for CKA):
```bash
# Static pod directory
ls /etc/kubernetes/manifests/

# Control plane components run as static pods
kube-apiserver.yaml
kube-controller-manager.yaml
kube-scheduler.yaml
etcd.yaml
```

---

### 2. kube-proxy

**kube-proxy** is a network proxy that maintains network rules on nodes. It enables the Kubernetes Service abstraction.

**Key Responsibilities**:
- Implements Kubernetes Services
- Maintains network rules for Pod communication
- Handles load balancing for Services
- Enables service discovery

**Proxy Modes**:

| Mode | Description | Performance |
|------|-------------|-------------|
| **iptables** | Uses iptables rules (default) | Good |
| **IPVS** | Uses IP Virtual Server | Better |
| **userspace** | Legacy mode | Poor |

**How Services work with kube-proxy**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
  type: ClusterIP
```

When you create this Service:
1. API server creates Service object
2. kube-proxy watches for Service changes
3. kube-proxy creates iptables/IPVS rules
4. Traffic to `my-service:80` is load-balanced to Pods with label `app: MyApp`

**View kube-proxy**:
```bash
# kube-proxy runs as DaemonSet
kubectl get daemonset kube-proxy -n kube-system

# View kube-proxy logs
kubectl logs -n kube-system kube-proxy-xxxxx

# Check iptables rules (on node)
sudo iptables -t nat -L -n | grep my-service
```

---

### 3. Container Runtime

The **container runtime** is the software responsible for running containers.

**Supported Runtimes**:
- **containerd** (most common, default in Kubernetes 1.24+)
- **CRI-O** (lightweight, OCI-compliant)
- **Docker** (deprecated as of Kubernetes 1.24, but still works via containerd)

**Container Runtime Interface (CRI)**:
```
kubelet ←→ CRI ←→ Container Runtime ←→ Containers
```

**containerd** (Recommended):
```bash
# Check containerd status
systemctl status containerd

# List containers with crictl
crictl ps

# List images
crictl images

# Pull an image
crictl pull nginx:latest

# Inspect a container
crictl inspect <container-id>
```

**Important CKA Commands**:
```bash
# List all containers on a node
crictl ps -a

# View container logs
crictl logs <container-id>

# Execute command in container
crictl exec -it <container-id> /bin/sh

# Remove a container
crictl rm <container-id>
```

---

## 🔄 Complete Pod Lifecycle

Let's trace a Pod from creation to running:

```bash
kubectl create deployment nginx --image=nginx --replicas=3
```

**Step-by-step**:
1. **kubectl** sends request to **API Server**
2. **API Server** validates and stores in **etcd**
3. **Deployment Controller** creates ReplicaSet
4. **ReplicaSet Controller** creates 3 Pod objects
5. **Scheduler** assigns Pods to nodes
6. **kubelet** on each node sees Pod assignment
7. **kubelet** tells **container runtime** to pull nginx image
8. **Container runtime** starts containers
9. **kubelet** monitors containers and reports status
10. **kube-proxy** updates network rules for Service

---

## 🔑 CKA Exam Tips

1. Know the difference between **kubelet** (manages Pods) and **kube-proxy** (manages networking)
2. Understand **static pods** and where they're defined
3. Be comfortable with **crictl** commands
4. Know how to troubleshoot node issues using `systemctl` and logs
5. Understand the **Container Runtime Interface (CRI)**

---

## 📝 Practice Commands

```bash
# Check node status
kubectl get nodes
kubectl describe node <node-name>

# View kubelet logs
journalctl -u kubelet -f

# Check kubelet config
cat /var/lib/kubelet/config.yaml

# List containers on node
crictl ps

# Check kube-proxy
kubectl get pods -n kube-system | grep kube-proxy

# View network rules (on node)
sudo iptables -t nat -L -n
```

---

## 🛠️ Troubleshooting Worker Nodes

**Node NotReady**:
```bash
# Check kubelet status
systemctl status kubelet

# Restart kubelet
systemctl restart kubelet

# Check kubelet logs
journalctl -u kubelet -n 50
```

**Container not starting**:
```bash
# Check container runtime
systemctl status containerd

# View container logs
crictl logs <container-id>

# Check image pull
crictl images | grep <image-name>
```

---

## ✅ Summary

- **kubelet**: Agent on each node that manages Pods and containers
- **kube-proxy**: Network proxy that implements Kubernetes Services
- **Container Runtime**: Software that runs containers (containerd, CRI-O)
- All three components work together to run workloads on worker nodes

---

## 🔗 Next Steps

You've completed the Cluster Architecture module! Continue to [Pods Fundamentals](../../02-workloads-scheduling/01-pods-fundamentals) to start learning about workloads and scheduling.

