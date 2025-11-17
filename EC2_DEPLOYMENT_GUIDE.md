# 🚀 EC2 Deployment Guide - App Public, SSH Private

Complete guide to deploy your Next.js app to EC2 t2.micro with proper security.

---

## 🎯 Security Configuration

### What We're Setting Up

```
✅ App (Port 3000/80) → PUBLIC (accessible from anywhere)
✅ SSH (Port 22) → PRIVATE (only from your IP)
```

---

## 📋 Step-by-Step Deployment

### **Step 1: Launch EC2 Instance**

1. **Go to AWS Console** → EC2 → Launch Instance

2. **Configure Instance:**
   ```
   Name: jose-portfolio
   AMI: Ubuntu Server 22.04 LTS
   Instance Type: t2.micro (Free Tier)
   Key Pair: Create new or use existing
   ```

3. **Network Settings - IMPORTANT!**
   
   Click "Edit" and configure:
   
   **Security Group Rules:**
   
   | Type | Protocol | Port | Source | Description |
   |------|----------|------|--------|-------------|
   | SSH | TCP | 22 | **My IP** | SSH access (PRIVATE) |
   | HTTP | TCP | 80 | 0.0.0.0/0 | Web traffic (PUBLIC) |
   | Custom TCP | TCP | 3000 | 0.0.0.0/0 | Next.js app (PUBLIC) |
   | HTTPS | TCP | 443 | 0.0.0.0/0 | SSL traffic (PUBLIC) |

   **CRITICAL**: 
   - SSH (Port 22) → Source: **My IP** (NOT 0.0.0.0/0)
   - HTTP/3000/443 → Source: **0.0.0.0/0** (PUBLIC)

4. **Storage:**
   ```
   Size: 8 GB (Free Tier)
   Type: gp3
   ```

5. **Launch Instance**

6. **Allocate Elastic IP (Recommended)**
   - Go to EC2 → Elastic IPs → Allocate
   - Associate with your instance
   - This gives you a permanent IP address

---

### **Step 2: Connect to EC2**

```bash
# Download your .pem key from AWS
# Move it to ~/.ssh/
mv ~/Downloads/your-key.pem ~/.ssh/

# Set correct permissions
chmod 400 ~/.ssh/your-key.pem

# Connect to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
```

---

### **Step 3: Install Docker on EC2**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login for group changes
exit
```

---

### **Step 4: Add Swap (CRITICAL for t2.micro!)**

```bash
# Reconnect
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP

# Create 2GB swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
free -h
# Should show 2GB swap
```

---

### **Step 5: Setup GitHub Secrets**

Go to: `https://github.com/joselrnz/app/settings/secrets/actions`

Add these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `EC2_HOST` | Your EC2 Elastic IP | `54.123.45.67` |
| `EC2_USER` | `ubuntu` | `ubuntu` |
| `EC2_SSH_KEY` | Your private key content | See below |
| `SITE_URL` | Your app URL | `http://54.123.45.67:3000` |

**How to get EC2_SSH_KEY:**

```bash
# On your local machine
cat ~/.ssh/your-key.pem

# Copy ENTIRE output including:
# -----BEGIN RSA PRIVATE KEY-----
# ... all the key content ...
# -----END RSA PRIVATE KEY-----
```

---

### **Step 6: Enable GitHub Actions Permissions**

1. Go to: `https://github.com/joselrnz/app/settings/actions`
2. Under "Workflow permissions"
3. Select: **"Read and write permissions"**
4. Check: **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

---

### **Step 7: Deploy!**

```bash
# On your local machine
git add .
git commit -m "feat: setup CI/CD deployment"
git push origin main
```

**GitHub Actions will automatically:**
1. ✅ Build Docker image
2. ✅ Push to GHCR (ghcr.io/joselrnz/app)
3. ✅ SSH to EC2
4. ✅ Pull image
5. ✅ Run container
6. ✅ Your app is live!

---

### **Step 8: Verify Deployment**

#### **Check GitHub Actions**
1. Go to: `https://github.com/joselrnz/app/actions`
2. Click on latest workflow run
3. All steps should be green ✅

#### **Check GHCR**
1. Go to: `https://github.com/joselrnz?tab=packages`
2. You should see `app` package
3. Click to see image details

#### **Check EC2**
```bash
# SSH to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP

# Check container is running
docker ps

# Should see output like:
# CONTAINER ID   IMAGE                          STATUS         PORTS
# abc123def456   ghcr.io/joselrnz/app:latest   Up 2 minutes   0.0.0.0:3000->3000/tcp

# Check logs
docker logs jose-portfolio

# Should see:
# ▲ Next.js 14.2.33
# - Local:        http://localhost:3000
# ✓ Ready in 2.3s
```

#### **Access Your App**
Open browser: `http://YOUR_EC2_IP:3000`

You should see your portfolio! 🎉

---

## 🔒 Security Verification

### **Test SSH is Private**

```bash
# From a different network/computer (NOT your IP)
# This should FAIL:
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
# Expected: Connection timeout or refused ✅

# From YOUR IP
# This should WORK:
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
# Expected: Connected successfully ✅
```

### **Test App is Public**

```bash
# From ANY computer/phone/network
# Open browser: http://YOUR_EC2_IP:3000
# Expected: Your app loads ✅

# Or use curl:
curl http://YOUR_EC2_IP:3000
# Expected: HTML response ✅
```

---

## 🛠️ Useful Commands

### **On EC2**

```bash
# View running containers
docker ps

# View logs (real-time)
docker logs -f jose-portfolio

# Restart container
docker restart jose-portfolio

# Stop container
docker stop jose-portfolio

# Remove container
docker rm jose-portfolio

# Pull latest image manually
docker pull ghcr.io/joselrnz/app:latest

# Run container manually
docker run -d \
  --name jose-portfolio \
  --restart unless-stopped \
  -p 3000:3000 \
  ghcr.io/joselrnz/app:latest

# Check resource usage
docker stats jose-portfolio
free -h
df -h

# Clean up old images
docker image prune -af
```

---

## 🔄 Update Your App

```bash
# Make changes to code
# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin main

# GitHub Actions automatically:
# 1. Builds new image
# 2. Pushes to GHCR
# 3. Deploys to EC2
# 4. Zero downtime!
```

---

## 🐛 Troubleshooting

### **Issue: Can't SSH to EC2**

**Solution:**
```bash
# 1. Check security group allows your IP
# AWS Console → EC2 → Security Groups → Edit inbound rules
# SSH (22) → Source: My IP

# 2. Verify key permissions
chmod 400 ~/.ssh/your-key.pem

# 3. Check you're using correct IP
# Use Elastic IP, not public DNS

# 4. Try verbose mode
ssh -v -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
```

### **Issue: App not accessible**

**Solution:**
```bash
# 1. Check security group allows port 3000
# AWS Console → EC2 → Security Groups
# Custom TCP (3000) → Source: 0.0.0.0/0

# 2. Check container is running
docker ps | grep jose-portfolio

# 3. Check logs
docker logs jose-portfolio

# 4. Test locally on EC2
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
curl http://localhost:3000
```

### **Issue: Container keeps restarting**

**Solution:**
```bash
# Check logs
docker logs jose-portfolio

# Check memory
free -h
docker stats

# If out of memory, increase swap
sudo fallocate -l 4G /swapfile2
sudo chmod 600 /swapfile2
sudo mkswap /swapfile2
sudo swapon /swapfile2
```

### **Issue: GitHub Actions fails**

**Solution:**
```bash
# 1. Check secrets are set correctly
# GitHub → Settings → Secrets → Actions

# 2. Verify EC2_SSH_KEY is complete
# Must include BEGIN and END lines

# 3. Check EC2 is running
# AWS Console → EC2 → Instances

# 4. Test SSH manually
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
```

---

## 📊 Monitoring

### **CloudWatch (Optional)**

```bash
# Install CloudWatch agent on EC2
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Configure metrics
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

### **Simple Monitoring**

```bash
# Create monitoring script
cat > ~/monitor.sh << 'EOF'
#!/bin/bash
echo "=== System Resources ==="
free -h
echo ""
echo "=== Disk Usage ==="
df -h
echo ""
echo "=== Docker Stats ==="
docker stats --no-stream jose-portfolio
echo ""
echo "=== Container Status ==="
docker ps | grep jose-portfolio
EOF

chmod +x ~/monitor.sh

# Run it
./monitor.sh

# Or add to cron for regular checks
crontab -e
# Add: */5 * * * * /home/ubuntu/monitor.sh >> /home/ubuntu/monitor.log 2>&1
```

---

## 🎯 Next Steps

- [ ] Set up custom domain
- [ ] Add SSL/TLS with Let's Encrypt
- [ ] Configure Nginx reverse proxy
- [ ] Set up automated backups
- [ ] Add monitoring/alerts
- [ ] Configure auto-scaling (if needed)

---

**🎉 Congratulations! Your app is now deployed with proper security!**

- ✅ App is PUBLIC (accessible from anywhere)
- ✅ SSH is PRIVATE (only from your IP)
- ✅ Automatic deployments via GitHub Actions
- ✅ Docker containerized
- ✅ Running on AWS Free Tier

**Your app:** `http://YOUR_EC2_IP:3000`

