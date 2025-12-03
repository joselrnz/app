# 🚀 Jose Lorenzo's Portfolio Apps - Monorepo

A monorepo containing multiple portfolio applications showcasing cloud engineering, DevOps, and cybersecurity expertise.

## 📦 Applications

### 1. **Frontend Portfolio** (`frontend/`)
- **Subdomain**: https://app.joselrnz.com
- **Description**: Professional cloud engineering portfolio with interactive CI/CD pipeline visualization
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Docker Image**: `ghcr.io/joselrnz/portfolio:latest`
- **Port**: 3002 (local), 3000 (container)

### 2. **Webkali Portfolio** (`webkali-portfolio/`)
- **Subdomain**: https://linux.joselrnz.com
- **Description**: Kali Linux simulator and cybersecurity portfolio
- **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS, xterm.js, Monaco Editor
- **Docker Image**: `ghcr.io/joselrnz/webkali:latest`
- **Port**: 3003 (local), 3000 (container)

### 3. **Shared Package** (`shared/`)
- **Description**: Shared TypeScript types, utilities, and constants
- **Contents**: Types, utils, constants
- **Usage**: Imported by both frontend and webkali apps

## 🏗️ Architecture

```
apps/                                    # Monorepo root
├── .github/workflows/
│   ├── deploy-frontend.yml              # CI/CD for frontend → ghcr.io/joselrnz/portfolio
│   └── deploy-webkali.yml               # CI/CD for webkali → ghcr.io/joselrnz/webkali
│
├── frontend/                            # Portfolio app
│   ├── Dockerfile                       # Multi-stage Docker build
│   ├── src/
│   ├── public/
│   └── package.json
│
├── webkali-portfolio/                   # Kali Linux simulator
│   ├── Dockerfile                       # Multi-stage Docker build
│   ├── src/
│   ├── public/
│   └── package.json
│
├── shared/                              # Shared code
│   ├── types/                           # TypeScript types
│   ├── utils/                           # Utility functions
│   ├── constants/                       # Shared constants
│   └── package.json
│
├── tools/                               # Development tools
│   ├── circuits-creator/                # Circuit diagram generators
│   ├── scripts/                         # Utility scripts
│   └── personal-docs/                   # Deployment docs & scripts
│
├── package.json                         # Root workspace config
├── docker-compose.yml                   # Local development
└── README.md                            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Docker & Docker Compose (optional)

### Local Development

#### Install Dependencies
```bash
# Install all workspace dependencies
npm install
```

#### Run Both Apps
```bash
# Run all apps in development mode
npm run dev

# Or run individually
npm run dev:frontend    # http://localhost:3002
npm run dev:webkali     # http://localhost:3003
```

#### Build Apps
```bash
# Build all apps
npm run build

# Or build individually
npm run build:frontend
npm run build:webkali
```

## 🐳 Docker

### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

**Access:**
- Frontend: http://localhost:3002
- Webkali: http://localhost:3003

### Build Individual Images

```bash
# Build frontend image
docker build -t portfolio:local -f frontend/Dockerfile .

# Build webkali image
docker build -t webkali:local -f webkali-portfolio/Dockerfile .
```

### Run Individual Containers

```bash
# Run frontend
docker run -p 3002:3000 portfolio:local

# Run webkali
docker run -p 3003:3000 webkali:local
```

## 📦 Docker Images

Both apps are automatically built and pushed to GitHub Container Registry (ghcr.io) on every push to `main`:

```bash
# Pull images
docker pull ghcr.io/joselrnz/portfolio:latest
docker pull ghcr.io/joselrnz/webkali:latest

# Run from registry
docker run -p 3002:3000 ghcr.io/joselrnz/portfolio:latest
docker run -p 3003:3000 ghcr.io/joselrnz/webkali:latest
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Frontend Deployment
- **Trigger**: Push to `main` with changes in `frontend/` or `shared/`
- **Workflow**: `.github/workflows/deploy-frontend.yml`
- **Output**: `ghcr.io/joselrnz/portfolio:latest`
- **Tags**: `latest`, `main-<sha>`

#### Webkali Deployment
- **Trigger**: Push to `main` with changes in `webkali-portfolio/` or `shared/`
- **Workflow**: `.github/workflows/deploy-webkali.yml`
- **Output**: `ghcr.io/joselrnz/webkali:latest`
- **Tags**: `latest`, `main-<sha>`

### Path Filtering

The workflows use path filtering to only build what changed:

- **Frontend only**: Changes in `frontend/**` → Only frontend builds
- **Webkali only**: Changes in `webkali-portfolio/**` → Only webkali builds
- **Shared code**: Changes in `shared/**` → Both apps build

## 📝 Available Scripts

### Root Level
```bash
npm run dev              # Run all apps in dev mode
npm run dev:frontend     # Run frontend only
npm run dev:webkali      # Run webkali only
npm run build            # Build all apps
npm run build:frontend   # Build frontend only
npm run build:webkali    # Build webkali only
npm run lint             # Lint all apps
npm run clean            # Clean all build artifacts
npm run docker:build     # Build all Docker images
npm run docker:up        # Start all containers
npm run docker:down      # Stop all containers
```

### Frontend App
```bash
cd frontend
npm run dev              # Start dev server on port 3002
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Webkali App
```bash
cd webkali-portfolio
npm run dev              # Start dev server on port 3003
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

## 🌐 Deployment

Both apps are automatically deployed to GitHub Container Registry (ghcr.io) via GitHub Actions:

- **Frontend Portfolio**: `ghcr.io/joselrnz/portfolio:latest` → `app.joselrnz.com`
- **Webkali Simulator**: `ghcr.io/joselrnz/webkali:latest` → `linux.joselrnz.com`

### Pull and Run

```bash
# Pull images
docker pull ghcr.io/joselrnz/portfolio:latest
docker pull ghcr.io/joselrnz/webkali:latest

# Run frontend
docker run -p 3002:3000 ghcr.io/joselrnz/portfolio:latest

# Run webkali
docker run -p 3003:3000 ghcr.io/joselrnz/webkali:latest
```

For detailed deployment instructions, see `tools/personal-docs/`.

## 🔒 Security

- Multi-stage Docker builds for minimal attack surface
- Non-root user in containers
- Health checks enabled
- Security headers configured
- No secrets in code (use environment variables)

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📚 Documentation

- **Frontend README**: `frontend/README.md`
- **Webkali README**: `webkali-portfolio/README.md`
- **Shared Package**: `shared/README.md`
- **Tools & Scripts**: `tools/`
  - Circuit diagram generators: `tools/circuits-creator/`
  - Utility scripts: `tools/scripts/`
  - Deployment guides: `tools/personal-docs/`

## 👤 Author

**Jose Lorenzo**
- **Email**: joselorenzo.rodriguez@outlook.com
- **LinkedIn**: [joselrnz](https://linkedin.com/in/joselrnz)
- **GitHub**: [joselrnz](https://github.com/joselrnz)
- **Portfolio**: [app.joselrnz.com](https://app.joselrnz.com)
- **Linux Simulator**: [linux.joselrnz.com](https://linux.joselrnz.com)

## 📄 License

MIT License - feel free to use this code for your own portfolio!

---

**Built with ❤️ by Jose Lorenzo**
