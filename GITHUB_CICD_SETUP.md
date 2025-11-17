# 🚀 GitHub Container Registry + CI/CD Setup Guide

Complete guide to deploy your Next.js app to EC2 t2.micro using GitHub Actions and GHCR.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Setup](#github-setup)
4. [EC2 Setup](#ec2-setup)
5. [Deploy](#deploy)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### Architecture

```
GitHub Repository (Code)
    ↓
GitHub Actions (CI/CD)
    ↓
GitHub Container Registry (Docker Image)
    ↓
EC2 t2.micro (Production)
```

### What Happens When You Push Code

1. **Push to GitHub** → Triggers GitHub Actions
2. **Build Docker Image** → From your Next.js app
3. **Push to GHCR** → Stores image at `ghcr.io/joselrnz/app`
4. **Deploy to EC2** → Pulls image and runs container
5. **Live!** → Your app is updated

---

## ✅ Prerequisites

### 1. GitHub Account
- ✅ Repository: `https://github.com/joselrnz/app`
- ✅ Admin access to repository

### 2. AWS EC2 Instance
- ✅ Instance type: t2.micro
- ✅ OS: Ubuntu 22.04 LTS
- ✅ Security group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
- ✅ Elastic IP (optional but recommended)

### 3. Local Machine
- ✅ Git installed
- ✅ SSH key for EC2

---

## 🔧 GitHub Setup

### Step 1: Enable GitHub Container Registry

GHCR is **automatically available** for all GitHub accounts! No setup needed.

### Step 2: Configure Repository Secrets

Go to your repository: `https://github.com/joselrnz/app/settings/secrets/actions`

Add these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `EC2_HOST` | Your EC2 public IP or domain | `54.123.45.67` |
| `EC2_USER` | EC2 username | `ubuntu` |
| `EC2_SSH_KEY` | Your private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `SITE_URL` | Your app URL | `http://54.123.45.67:3000` |

#### How to Get EC2_SSH_KEY

```bash
# On your local machine
# Copy your private key content
cat ~/.ssh/your-ec2-key.pem

# Copy the ENTIRE output including:
# -----BEGIN RSA PRIVATE KEY-----
# ... key content ...
# -----END RSA PRIVATE KEY-----
```

### Step 3: Verify Workflow File

The workflow file is already created at `.github/workflows/deploy.yml`

It will:
- ✅ Build Docker image on every push to `main`
- ✅ Push image to GHCR
- ✅ Deploy to EC2 automatically

---

## 🖥️ EC2 Setup

### Step 1: Connect to EC2

```bash
# From your local machine
ssh -i ~/.ssh/your-ec2-key.pem ubuntu@YOUR_EC2_IP
```

### Step 2: Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes
exit
```

### Step 3: Configure Swap (Important for t2.micro!)

```bash
# Reconnect to EC2
ssh -i ~/.ssh/your-ec2-key.pem ubuntu@YOUR_EC2_IP

# Create 2GB swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify swap
free -h
```

### Step 4: Create App Directory

```bash
# Create directory for app
mkdir -p ~/app
cd ~/app

# Create .env file (optional)
cat > .env << EOF
SITE_URL=http://YOUR_EC2_IP:3000
NODE_ENV=production
EOF
```

### Step 5: Test Docker

```bash
# Verify Docker is working
docker --version
docker-compose --version

# Test Docker
docker run hello-world
```

---

## 🚀 Deploy

### Option 1: Automatic Deployment (Recommended)

```bash
# On your local machine
git add .
git commit -m "feat: setup CI/CD with GHCR"
git push origin main

# GitHub Actions will automatically:
# 1. Build Docker image
# 2. Push to GHCR
# 3. Deploy to EC2
```

### Option 2: Manual Deployment

```bash
# On EC2
cd ~/app

# Login to GHCR
echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u joselrnz --password-stdin

# Pull latest image
docker pull ghcr.io/joselrnz/app:latest

# Run container
docker run -d \
  --name jose-portfolio \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  ghcr.io/joselrnz/app:latest

# Check if running
docker ps
```

### Option 3: Using Docker Compose

```bash
# On EC2
cd ~/app

# Copy docker-compose.yml from repo
wget https://raw.githubusercontent.com/joselrnz/app/main/docker-compose.yml

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔍 Verify Deployment

### Check GitHub Actions

1. Go to: `https://github.com/joselrnz/app/actions`
2. Click on latest workflow run
3. Verify all steps are green ✅

### Check GHCR

1. Go to: `https://github.com/joselrnz?tab=packages`
2. You should see `app` package
3. Click on it to see image details

### Check EC2

```bash
# SSH to EC2
ssh -i ~/.ssh/your-ec2-key.pem ubuntu@YOUR_EC2_IP

# Check running containers
docker ps

# Check logs
docker logs jose-portfolio

# Check app health
curl http://localhost:3000
```

### Access Your App

Open browser: `http://YOUR_EC2_IP:3000`

---

## 🛠️ Useful Commands

### On EC2

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker logs jose-portfolio
docker logs -f jose-portfolio  # Follow logs

# Restart container
docker restart jose-portfolio

# Stop container
docker stop jose-portfolio

# Remove container
docker rm jose-portfolio

# Pull latest image
docker pull ghcr.io/joselrnz/app:latest

# Clean up old images
docker image prune -af

# Check disk usage
docker system df

# View container stats
docker stats jose-portfolio
```

---

## 🐛 Troubleshooting

### Issue: GitHub Actions fails at "Build and push Docker image"

**Solution:**
```bash
# Check Dockerfile exists
ls frontend/Dockerfile

# Verify package.json exists
ls frontend/package.json

# Check workflow file syntax
cat .github/workflows/deploy.yml
```

### Issue: Cannot push to GHCR

**Solution:**
- Verify `GITHUB_TOKEN` has package write permissions
- Check repository settings → Actions → General → Workflow permissions
- Enable "Read and write permissions"

### Issue: EC2 deployment fails

**Solution:**
```bash
# Verify secrets are set correctly
# GitHub → Settings → Secrets → Actions

# Test SSH connection manually
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP

# Check Docker is installed on EC2
docker --version
```

### Issue: Container keeps restarting

**Solution:**
```bash
# Check logs
docker logs jose-portfolio

# Check memory usage
free -h
docker stats

# Increase swap if needed
sudo fallocate -l 4G /swapfile2
```

### Issue: Port 3000 not accessible

**Solution:**
```bash
# Check EC2 security group
# Allow inbound: Port 3000, Source: 0.0.0.0/0

# Check container is running
docker ps | grep jose-portfolio

# Check port binding
docker port jose-portfolio
```

---

## 📊 Monitoring

### View Logs

```bash
# Real-time logs
docker logs -f jose-portfolio

# Last 100 lines
docker logs --tail 100 jose-portfolio

# Logs with timestamps
docker logs -t jose-portfolio
```

### Resource Usage

```bash
# Container stats
docker stats jose-portfolio

# System resources
htop  # Install: sudo apt install htop

# Disk usage
df -h
docker system df
```

---

## 🔄 Update Workflow

### To update your app:

```bash
# 1. Make changes to code
# 2. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin main

# 3. GitHub Actions automatically:
#    - Builds new image
#    - Pushes to GHCR
#    - Deploys to EC2
#    - Zero downtime!
```

---

## 🎯 Next Steps

- [ ] Set up custom domain
- [ ] Add SSL/TLS with Let's Encrypt
- [ ] Set up Nginx reverse proxy
- [ ] Configure CloudWatch monitoring
- [ ] Set up automated backups
- [ ] Add health check endpoint

---

## 📚 Additional Resources

- [GitHub Container Registry Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Docs](https://docs.docker.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**🎉 Congratulations! You now have a professional CI/CD pipeline!**

