# ⚡ Quick Start: GitHub CICD to EC2

**TL;DR**: Push code → GitHub builds Docker image → Stores in GHCR → Deploys to EC2

---

## 🎯 Answer to Your Question

### **Does GitHub repo have the image?**

**NO!** The image is stored in **GitHub Container Registry (GHCR)**, which is separate from your repository.

```
┌─────────────────────────────────────────┐
│ GitHub Repository                       │
│ github.com/joselrnz/app                 │
│                                         │
│ Contains: Source code (.tsx, .ts, etc) │
│ Size: ~50 MB                            │
└─────────────────────────────────────────┘
                  ↓
         (GitHub Actions builds)
                  ↓
┌─────────────────────────────────────────┐
│ GitHub Container Registry (GHCR)        │
│ ghcr.io/joselrnz/app                    │
│                                         │
│ Contains: Docker image (compiled app)  │
│ Size: ~200-400 MB                       │
└─────────────────────────────────────────┘
                  ↓
         (EC2 pulls and runs)
                  ↓
┌─────────────────────────────────────────┐
│ EC2 t2.micro                            │
│ Your server                             │
│                                         │
│ Runs: Docker container                 │
└─────────────────────────────────────────┘
```

---

## 🚀 5-Minute Setup

### 1. Add GitHub Secrets (2 min)

Go to: `https://github.com/joselrnz/app/settings/secrets/actions`

Click "New repository secret" and add:

```
EC2_HOST = 54.123.45.67  (your EC2 IP)
EC2_USER = ubuntu
EC2_SSH_KEY = (paste your private key)
SITE_URL = http://54.123.45.67:3000
```

### 2. Setup EC2 (3 min)

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Install Docker (one command)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu

# Add swap for t2.micro
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile

# Logout and login
exit
```

### 3. Push Code (30 sec)

```bash
# On your local machine
git add .
git commit -m "feat: setup CI/CD"
git push origin main

# Done! GitHub Actions will deploy automatically
```

---

## 📦 What Files Were Created

```
.github/workflows/deploy.yml  ← GitHub Actions workflow
docker-compose.yml            ← Docker Compose config
GITHUB_CICD_SETUP.md          ← Full setup guide
QUICK_START_CICD.md           ← This file
```

---

## 🔍 How to Check It's Working

### 1. Check GitHub Actions
`https://github.com/joselrnz/app/actions`
- Should see green checkmarks ✅

### 2. Check GHCR
`https://github.com/joselrnz?tab=packages`
- Should see `app` package

### 3. Check EC2
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
docker ps  # Should show running container
```

### 4. Check App
Open browser: `http://YOUR_EC2_IP:3000`

---

## 🎯 Common Questions

### Q: Where is the Docker image stored?
**A:** In GitHub Container Registry at `ghcr.io/joselrnz/app`

### Q: Is GHCR free?
**A:** Yes! Free for public repositories, 500MB free for private repos

### Q: How do I update my app?
**A:** Just push to GitHub! CI/CD handles everything automatically

### Q: Can I see the image?
**A:** Yes! Go to `https://github.com/joselrnz?tab=packages`

### Q: How much does GHCR cost?
**A:** 
- Public repos: **FREE unlimited**
- Private repos: **500MB free**, then $0.25/GB/month

### Q: Will t2.micro handle this?
**A:** Yes! With 2GB swap, it's perfect for your portfolio

---

## 🛠️ Useful Commands

### On EC2

```bash
# View logs
docker logs -f jose-portfolio

# Restart app
docker restart jose-portfolio

# Pull latest manually
docker pull ghcr.io/joselrnz/app:latest

# Check resources
docker stats
free -h
```

### On Local Machine

```bash
# Trigger deployment
git push origin main

# Check workflow status
gh run list  # (requires GitHub CLI)
```

---

## 🎉 That's It!

You now have:
- ✅ Automated CI/CD pipeline
- ✅ Docker images in GHCR
- ✅ Auto-deployment to EC2
- ✅ Professional DevOps setup

**Next time you push code, it automatically deploys!** 🚀

---

## 📚 Full Documentation

See `GITHUB_CICD_SETUP.md` for complete details, troubleshooting, and advanced configuration.

