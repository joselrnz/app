# 🚀 Markdown Auto-Deploy Solutions

## 🎯 **Your Goal**

Write markdown files → Automatically deploy to your site → No manual intervention

---

## ✅ **Current System**

You already have a **powerful markdown system**:

```bash
frontend/src/content/
├── kubernetes/     # CKA articles
├── circuits/       # Electronics articles
├── linux/          # Linux/IoT articles
├── ai/             # AI/ML articles
└── notes/          # General notes
```

**How it works:**
1. ✅ Drop a `.md` file in any category folder
2. ✅ App automatically picks it up (no code changes needed)
3. ✅ Generates page at `/tech/{category}/{slug}`
4. ✅ Adds to sidebar navigation
5. ✅ Creates table of contents
6. ✅ Enables progress tracking

---

## 🎨 **3 Solutions for Auto-Deploy**

### **Solution 1: GitHub Actions Auto-Deploy (RECOMMENDED)** ⭐

**How it works:**
1. Write markdown file locally
2. Commit and push to GitHub
3. GitHub Actions automatically builds and deploys to EC2

**Pros:**
- ✅ Fully automated
- ✅ Already configured (`.github/workflows/deploy.yml`)
- ✅ Free (GitHub Actions free tier)
- ✅ Version controlled
- ✅ Rollback capability

**Workflow:**
```bash
# 1. Create article
npm run quick-article -- -c kubernetes -t "Pod Networking" --tags "Kubernetes,CKA,Networking"

# 2. Edit the markdown file
code frontend/src/content/kubernetes/pod-networking.md

# 3. Commit and push
git add .
git commit -m "feat: add Pod Networking article"
git push origin main

# 4. Done! GitHub Actions deploys automatically
# Your article is live in ~2 minutes at:
# http://YOUR_EC2_IP:3000/tech/kubernetes/pod-networking
```

**Setup Required:**
- [x] GitHub Actions workflow (already created)
- [ ] Push to GHCR (one-time setup)
- [ ] Configure GitHub secrets (one-time setup)
- [ ] Launch EC2 instance (one-time setup)

---

### **Solution 2: Git Hook Auto-Deploy**

**How it works:**
1. Write markdown file locally
2. Commit to git
3. Git hook automatically pushes to GitHub
4. GitHub Actions deploys

**Pros:**
- ✅ One command (`git commit`)
- ✅ No manual push needed
- ✅ Works with existing CI/CD

**Setup:**
```bash
# Create git hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
# Auto-push after commit
git push origin main
EOF

# Make executable
chmod +x .git/hooks/post-commit
```

**Workflow:**
```bash
# 1. Create article
npm run quick-article -- -c kubernetes -t "Pod Networking" --tags "Kubernetes,CKA"

# 2. Edit markdown
code frontend/src/content/kubernetes/pod-networking.md

# 3. Commit (auto-pushes and deploys)
git add .
git commit -m "feat: add Pod Networking article"
# ✅ Automatically pushes and deploys!
```

---

### **Solution 3: Watch Folder + Auto-Deploy**

**How it works:**
1. Drop markdown file in watched folder
2. Script detects new file
3. Auto-commits, pushes, and deploys

**Pros:**
- ✅ Zero git commands needed
- ✅ Just save file and it deploys
- ✅ Great for non-technical writers

**Setup:**
```bash
# Install file watcher
npm install --save-dev chokidar-cli

# Add to package.json scripts
"watch-content": "chokidar 'frontend/src/content/**/*.md' -c 'node scripts/auto-deploy.js'"
```

**Workflow:**
```bash
# 1. Start watcher (one time)
npm run watch-content

# 2. Create/edit markdown files
# Files are automatically committed and deployed!
```

---

## 🎯 **RECOMMENDED: Solution 1 (GitHub Actions)**

This is the **best solution** because:
- ✅ Already configured
- ✅ Version controlled
- ✅ Rollback capability
- ✅ Free
- ✅ Industry standard

---

## 📝 **Quick Article Creation**

You already have scripts to create articles quickly:

### **Interactive Mode**
```bash
cd frontend
npm run create-article

# Follow prompts:
# 1. Select category (kubernetes/circuits/linux/ai/notes)
# 2. Enter title
# 3. Enter description
# 4. Enter tags
# 5. Done! File created with frontmatter
```

### **Command-Line Mode**
```bash
cd frontend
npm run quick-article -- \
  --category kubernetes \
  --title "Pod Networking Deep Dive" \
  --description "Understanding Kubernetes pod networking" \
  --tags "Kubernetes,CKA,Networking,Pods"
```

---

## 📋 **Article Frontmatter Template**

Every markdown file needs this frontmatter:

```yaml
---
title: "Your Article Title"
date: "2025-01-17"
category: "kubernetes"
tags: ["Kubernetes", "CKA", "Topic"]
description: "Brief description of the article"
author: "Jose Lorenzo"
module: "01-cluster-architecture"
order: 4
prerequisites: ["01-kubernetes-overview"]
difficulty: "intermediate"
estimatedTime: "20 minutes"
---

# Your Article Title

Your content here...
```

---

## 🔄 **Complete Workflow Example**

### **Scenario: Add new CKA article**

```bash
# 1. Create article with script
cd frontend
npm run quick-article -- \
  -c kubernetes \
  -t "StatefulSets and Persistent Storage" \
  --tags "Kubernetes,CKA,Storage,StatefulSets"

# Output:
# ✅ Created: frontend/src/content/kubernetes/statefulsets-and-persistent-storage.md

# 2. Edit the file
code frontend/src/content/kubernetes/statefulsets-and-persistent-storage.md

# Add your content:
# - Introduction
# - Code examples
# - Practice commands
# - Exam tips

# 3. Save file

# 4. Commit and push
git add .
git commit -m "feat(kubernetes): add StatefulSets article"
git push origin main

# 5. Wait ~2 minutes
# GitHub Actions builds and deploys automatically

# 6. Access your article
# http://YOUR_EC2_IP:3000/tech/kubernetes/statefulsets-and-persistent-storage
```

---

## 🎨 **Markdown Features Supported**

Your system supports:

### **1. Code Blocks with Syntax Highlighting**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
```

### **2. Math Equations (LaTeX)**
```markdown
$$E = mc^2$$

Inline: $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$
```

### **3. Tables**
```markdown
| Command | Description |
|---------|-------------|
| `kubectl get pods` | List pods |
```

### **4. Callouts/Alerts**
```markdown
> **Note:** This is important information
```

### **5. Images**
```markdown
![Diagram](/images/diagram.png)
```

---

## 📁 **Folder Structure**

```bash
frontend/src/content/
├── kubernetes/
│   ├── 01-cluster-architecture/
│   │   ├── _module.yaml              # Module metadata
│   │   ├── 01-kubernetes-overview.md
│   │   ├── 02-control-plane.md
│   │   └── 03-worker-nodes.md
│   ├── 02-workloads-scheduling/
│   │   ├── _module.yaml
│   │   └── 01-pods.md
│   └── ...
```

**Rules:**
- ✅ Organize by modules (folders)
- ✅ Use `_module.yaml` for module metadata
- ✅ Number files for ordering (01-, 02-, etc.)
- ✅ Use kebab-case for filenames

---

## 🚀 **Auto-Deploy Script (Solution 3)**

I'll create a file watcher script for you:

### **Installation**

```bash
# Install dependencies
cd frontend
npm install --save-dev chokidar
```

### **Usage**

```bash
# Terminal 1: Start file watcher
npm run watch-deploy

# Terminal 2: Create/edit markdown files
# Files are automatically committed and deployed!
```

---

## 🎯 **Best Practices**

### **1. Article Naming**
```bash
# Good ✅
01-kubernetes-overview.md
02-pod-networking.md
03-statefulsets.md

# Bad ❌
article1.md
my-article.md
test.md
```

### **2. Module Organization**
```bash
# Good ✅
kubernetes/
├── 01-cluster-architecture/
│   ├── _module.yaml
│   ├── 01-overview.md
│   └── 02-components.md
└── 02-workloads/
    ├── _module.yaml
    └── 01-pods.md

# Bad ❌
kubernetes/
├── article1.md
├── article2.md
└── random.md
```

### **3. Frontmatter Completeness**
```yaml
# Good ✅
---
title: "Complete Title"
date: "2025-01-17"
category: "kubernetes"
tags: ["Kubernetes", "CKA"]
description: "Clear description"
author: "Jose Lorenzo"
module: "01-cluster-architecture"
order: 1
prerequisites: []
difficulty: "beginner"
estimatedTime: "15 minutes"
---

# Bad ❌
---
title: "Title"
---
```

---

## 🔧 **Troubleshooting**

### **Article not showing up?**

1. **Check file location**
   ```bash
   # Should be in:
   frontend/src/content/{category}/{slug}.md
   # OR
   frontend/src/content/{category}/{module}/{slug}.md
   ```

2. **Check frontmatter**
   ```bash
   # Must have valid YAML frontmatter
   # Must have category field matching folder
   ```

3. **Restart dev server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. **Check build**
   ```bash
   npm run build
   # Look for errors
   ```

### **Deployment not working?**

1. **Check GitHub Actions**
   ```bash
   # Go to: https://github.com/joselrnz/app/actions
   # Check latest workflow run
   # Look for errors
   ```

2. **Check GitHub secrets**
   ```bash
   # Required secrets:
   # - EC2_HOST
   # - EC2_USER
   # - EC2_SSH_KEY
   # - SITE_URL
   ```

3. **Check EC2 container**
   ```bash
   # SSH to EC2
   ssh -i ~/.ssh/key.pem ubuntu@YOUR_EC2_IP

   # Check container
   docker ps | grep jose-portfolio
   docker logs jose-portfolio
   ```

---

## 📊 **Deployment Timeline**

```bash
# Local changes
Write markdown → Save file
    ↓ (0 seconds)

# Git commit
git add . && git commit -m "feat: new article"
    ↓ (1 second)

# Git push
git push origin main
    ↓ (5 seconds)

# GitHub Actions triggered
Build Docker image → Push to GHCR
    ↓ (60 seconds)

# Deploy to EC2
Pull image → Restart container
    ↓ (30 seconds)

# Live! 🎉
Total time: ~2 minutes
```

---

## 🎉 **Summary**

### **What You Have**

✅ **Markdown-based content system**
- Drop `.md` files in folders
- Automatically generates pages
- No code changes needed

✅ **Quick article creation scripts**
- Interactive mode: `npm run create-article`
- CLI mode: `npm run quick-article`

✅ **GitHub Actions CI/CD**
- Auto-build on push
- Auto-deploy to EC2
- ~2 minute deployment time

✅ **Rich markdown features**
- Syntax highlighting
- Math equations (LaTeX)
- Tables, images, callouts
- Table of contents
- Progress tracking

### **What You Need to Do**

1. **One-time setup** (follow `EC2_DEPLOYMENT_GUIDE.md`):
   - [ ] Launch EC2 t2.micro
   - [ ] Configure security groups
   - [ ] Push image to GHCR
   - [ ] Set GitHub secrets

2. **Daily workflow**:
   ```bash
   # Create article
   npm run quick-article -- -c kubernetes -t "My Article" --tags "tag1,tag2"

   # Edit content
   code frontend/src/content/kubernetes/my-article.md

   # Deploy
   git add . && git commit -m "feat: new article" && git push

   # Wait 2 minutes → Live! 🎉
   ```

---

## 🔗 **Related Documentation**

- **`EC2_DEPLOYMENT_GUIDE.md`** - Complete EC2 setup
- **`GITHUB_CICD_SETUP.md`** - GitHub Actions setup
- **`DOCKER_DEPLOYMENT_SUMMARY.md`** - Docker container info
- **`scripts/README.md`** - Article creation scripts
- **`KUBERNETES_CKA_IMPLEMENTATION_SUMMARY.md`** - CKA structure

---

## 💡 **Pro Tips**

1. **Use templates** - Copy existing articles as templates
2. **Preview locally** - Run `npm run dev` to see changes instantly
3. **Batch commits** - Write multiple articles, commit once
4. **Use modules** - Organize related articles in folders
5. **Add prerequisites** - Link related articles for learning paths
6. **Include code examples** - Use syntax highlighting
7. **Add practice problems** - Great for CKA prep
8. **Estimate time** - Help readers plan their learning

---

**Ready to start writing? Follow the workflow above!** 🚀

