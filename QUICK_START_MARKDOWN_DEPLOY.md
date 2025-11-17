# 🚀 Quick Start: Write Markdown → Auto-Deploy

## ⚡ **TL;DR**

```bash
# 1. Create article
cd frontend
npm run quick-article -- -c kubernetes -t "My Article" --tags "Kubernetes,CKA"

# 2. Edit markdown
code src/content/kubernetes/my-article.md

# 3. Deploy
git add . && git commit -m "feat: new article" && git push

# ✅ Live in 2 minutes!
```

---

## 🎯 **3 Ways to Deploy Markdown**

### **Option 1: Manual Git Push (Simple)** ⭐ RECOMMENDED

```bash
# Create article
npm run quick-article -- -c kubernetes -t "Pod Networking" --tags "Kubernetes,CKA"

# Edit content
code src/content/kubernetes/pod-networking.md

# Deploy
git add .
git commit -m "feat(kubernetes): add Pod Networking article"
git push origin main

# ✅ GitHub Actions deploys automatically in ~2 minutes
```

**Pros:**
- ✅ Simple and reliable
- ✅ Full control over commits
- ✅ Works with existing CI/CD
- ✅ No extra dependencies

---

### **Option 2: Auto-Deploy Watcher (Advanced)**

**Setup (one-time):**
```bash
# Install dependencies
.\scripts\setup-watch-deploy.ps1
```

**Usage:**
```bash
# Terminal 1: Start watcher
cd frontend
npm run watch-deploy

# Terminal 2: Create/edit markdown files
npm run quick-article -- -c kubernetes -t "My Article" --tags "tag1,tag2"
code src/content/kubernetes/my-article.md

# ✅ Saves automatically commit and deploy!
```

**Pros:**
- ✅ Zero manual git commands
- ✅ Auto-commits after 5 seconds
- ✅ Auto-pushes to GitHub
- ✅ Perfect for rapid content creation

**Cons:**
- ❌ Requires chokidar dependency
- ❌ Less control over commit messages
- ❌ Must keep watcher running

---

### **Option 3: Git Hook (Automatic Push)**

**Setup (one-time):**
```bash
# Create post-commit hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
git push origin main
EOF

# Make executable (Linux/Mac)
chmod +x .git/hooks/post-commit
```

**Usage:**
```bash
# Create and edit article
npm run quick-article -- -c kubernetes -t "My Article" --tags "tag1,tag2"
code src/content/kubernetes/my-article.md

# Commit (auto-pushes)
git add .
git commit -m "feat: new article"
# ✅ Automatically pushes and deploys!
```

**Pros:**
- ✅ Auto-push on commit
- ✅ No extra dependencies
- ✅ Full control over commit messages

**Cons:**
- ❌ Pushes every commit (can't batch)
- ❌ Requires git hook setup

---

## 📝 **Article Creation Commands**

### **Interactive Mode**
```bash
cd frontend
npm run create-article

# Follow prompts:
# 1. Category: kubernetes
# 2. Title: Pod Networking Deep Dive
# 3. Description: Understanding Kubernetes pod networking
# 4. Tags: Kubernetes,CKA,Networking
```

### **Command-Line Mode (Faster)**
```bash
cd frontend
npm run quick-article -- \
  --category kubernetes \
  --title "Pod Networking Deep Dive" \
  --description "Understanding Kubernetes pod networking" \
  --tags "Kubernetes,CKA,Networking"
```

### **Short Flags**
```bash
npm run quick-article -- \
  -c kubernetes \
  -t "Pod Networking" \
  --tags "Kubernetes,CKA"
```

---

## 📁 **Where to Put Markdown Files**

```bash
frontend/src/content/
├── kubernetes/          # CKA/Kubernetes articles
│   ├── 01-cluster-architecture/
│   │   ├── _module.yaml
│   │   ├── 01-overview.md
│   │   └── 02-components.md
│   └── 02-workloads-scheduling/
│       └── _module.yaml
│
├── circuits/            # Electronics articles
│   ├── 01-fundamentals/
│   └── 02-analysis-methods/
│
├── linux/               # Linux/IoT articles
│   └── 01-iot-platforms/
│
├── ai/                  # AI/ML articles
│   └── 01-fundamentals/
│
└── notes/               # General notes
    └── 01-productivity/
```

---

## 📋 **Article Template**

Every markdown file needs this frontmatter:

```yaml
---
title: "Your Article Title"
date: "2025-01-17"
category: "kubernetes"
tags: ["Kubernetes", "CKA", "Networking"]
description: "Brief description of the article"
author: "Jose Lorenzo"
module: "01-cluster-architecture"
order: 4
prerequisites: ["01-kubernetes-overview"]
difficulty: "intermediate"
estimatedTime: "20 minutes"
---

# Your Article Title

## Introduction

Your content here...

## Section 1

More content...

## Practice Commands

```bash
kubectl get pods
kubectl describe pod nginx
```

## Summary

Key takeaways...
```

---

## 🎨 **Markdown Features**

### **Code Blocks**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
```

### **Math Equations**
```markdown
$$E = mc^2$$

Inline: $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$
```

### **Tables**
```markdown
| Command | Description |
|---------|-------------|
| `kubectl get pods` | List all pods |
| `kubectl describe pod <name>` | Show pod details |
```

### **Callouts**
```markdown
> **Note:** This is important information

> **Warning:** Be careful with this command

> **Tip:** Pro tip for better results
```

---

## 🔄 **Complete Workflow**

### **Scenario: Add new CKA article**

```bash
# 1. Create article
cd frontend
npm run quick-article -- \
  -c kubernetes \
  -t "StatefulSets and Persistent Storage" \
  --tags "Kubernetes,CKA,Storage"

# Output:
# ✅ Created: src/content/kubernetes/statefulsets-and-persistent-storage.md

# 2. Edit the file
code src/content/kubernetes/statefulsets-and-persistent-storage.md

# 3. Add content (see template above)

# 4. Preview locally (optional)
npm run dev
# Visit: http://localhost:3002/tech/kubernetes/statefulsets-and-persistent-storage

# 5. Deploy
git add .
git commit -m "feat(kubernetes): add StatefulSets article"
git push origin main

# 6. Wait ~2 minutes
# GitHub Actions builds and deploys

# 7. Access live
# http://YOUR_EC2_IP:3000/tech/kubernetes/statefulsets-and-persistent-storage
```

---

## ⏱️ **Deployment Timeline**

```
Write markdown → Save file
    ↓ (0 seconds)

git add . && git commit
    ↓ (1 second)

git push origin main
    ↓ (5 seconds)

GitHub Actions: Build Docker image
    ↓ (60 seconds)

GitHub Actions: Deploy to EC2
    ↓ (30 seconds)

✅ Live!
Total: ~2 minutes
```

---

## 🎯 **Best Practices**

1. **Use descriptive titles**
   - ✅ "Pod Networking Deep Dive"
   - ❌ "Article 1"

2. **Add proper tags**
   - ✅ ["Kubernetes", "CKA", "Networking"]
   - ❌ ["test"]

3. **Organize by modules**
   - ✅ `kubernetes/01-cluster-architecture/01-overview.md`
   - ❌ `kubernetes/random-article.md`

4. **Include code examples**
   - Use syntax highlighting
   - Add comments
   - Show expected output

5. **Add practice problems**
   - Great for CKA prep
   - Include solutions
   - Link to documentation

---

## 🔧 **Troubleshooting**

### **Article not showing up?**

1. Check file location:
   ```bash
   # Should be in:
   frontend/src/content/{category}/{slug}.md
   ```

2. Check frontmatter (must have valid YAML)

3. Restart dev server:
   ```bash
   # Stop (Ctrl+C)
   npm run dev
   ```

### **Deployment failed?**

1. Check GitHub Actions:
   - Go to: https://github.com/joselrnz/app/actions
   - Look for errors

2. Check GitHub secrets (required):
   - EC2_HOST
   - EC2_USER
   - EC2_SSH_KEY
   - SITE_URL

3. Check EC2 container:
   ```bash
   ssh -i ~/.ssh/key.pem ubuntu@YOUR_EC2_IP
   docker logs jose-portfolio
   ```

---

## 📚 **Related Documentation**

- **`MARKDOWN_AUTO_DEPLOY_GUIDE.md`** - Complete guide (this file)
- **`EC2_DEPLOYMENT_GUIDE.md`** - EC2 setup
- **`GITHUB_CICD_SETUP.md`** - GitHub Actions setup
- **`scripts/README.md`** - Article creation scripts

---

## 🎉 **You're Ready!**

**Choose your workflow:**

1. **Simple** → Manual git push (Option 1)
2. **Advanced** → Auto-deploy watcher (Option 2)
3. **Automatic** → Git hook (Option 3)

**Start creating content:**

```bash
cd frontend
npm run quick-article -- -c kubernetes -t "My First Article" --tags "Kubernetes,CKA"
```

**Happy writing!** 🚀

