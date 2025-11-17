# Jose Lorenzo - Cloud Engineering Portfolio

A modern, minimalist portfolio website showcasing cloud engineering, DevOps, and infrastructure expertise.

## 🚀 Live Demo

Visit the live site at [joselrnz.com](https://joselrnz.com)

## 📋 Features

- **Interactive 3D Rubik's Cube** - Built with Three.js, clickable and interactive
- **Augment-Style Design** - Clean, minimal interface with subtle animations
- **Border Light Animations** - Smooth circling light effects on buttons
- **Responsive Layout** - Works seamlessly on desktop and mobile
- **Skills Showcase** - Highlighting expertise in:
  - ☁️ Cloud Platforms (AWS, Azure, GCP)
  - ☸️ Container Orchestration (Kubernetes, Docker, Helm)
  - 🔧 Infrastructure as Code (Terraform, Ansible, CloudFormation)
  - 🚀 CI/CD Pipelines (Jenkins, GitHub Actions, GitLab CI)
  - 📊 Monitoring & Observability (Prometheus, Grafana, DataDog)
  - 📈 Data Engineering (Apache Spark, Airflow, Snowflake)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Language**: TypeScript
- **Deployment**: Vercel/Docker

## 📁 Project Structure

```
apps/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   │   ├── hero/        # Hero section with Rubik's Cube
│   │   │   ├── features/    # Feature sections
│   │   │   └── ResendStyleLanding.tsx  # Main landing page
│   │   └── styles/          # Global styles and animations
│   ├── public/              # Static assets
│   └── package.json         # Dependencies
└── archive/                 # Archived documentation and files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joselrnz/apps.git
cd apps/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Key Components

### ResendStyleLanding
The main landing page component featuring:
- Navigation with GitHub link
- Hero section with interactive Rubik's Cube
- Framework selector (Terraform, Kubernetes, Docker, etc.)
- Code showcase with syntax highlighting
- Feature sections (Infrastructure Monitoring, Real-time Webhooks)
- Skills grid with 6 expertise areas
- CTA section with contact links
- Footer with social links

### Button Border Light Animation
Custom CSS animation that creates a subtle light tracing effect around button borders:
- Smooth 4-second rotation
- Only visible on hover
- Consistent across all interactive elements
- Matches Augment's design aesthetic

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3002
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🌐 Deployment

The application is configured for deployment on:
- **Vercel** (recommended for Next.js)
- **Docker** (Dockerfile included)
- **Any Node.js hosting platform**

### Environment Variables

No environment variables required for basic deployment.

## 📦 Dependencies

Key dependencies:
- `next` - React framework
- `react` & `react-dom` - UI library
- `three` & `@react-three/fiber` - 3D graphics
- `tailwindcss` - Utility-first CSS
- `typescript` - Type safety

## 🗂️ Archive

The `archive/` folder contains:
- Development documentation
- Architecture guides
- Deployment guides
- Unused components from previous iterations

See `archive/README.md` for details.

## 👤 Author

**Jose Lorenzo Beltran Rodriguez**
- LinkedIn: [joselrnz](https://linkedin.com/in/joselrnz)
- GitHub: [joselrnz](https://github.com/joselrnz)
- Email: jose@joselrnz.com
- Website: [joselrnz.com](https://joselrnz.com)
