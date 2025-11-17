#!/bin/bash

# Setup Watch and Deploy
# This script installs the required dependencies for the watch-and-deploy feature

echo "🚀 Setting up Watch and Deploy..."
echo ""

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
  echo "❌ Error: Must run from repository root"
  echo "   Current directory: $(pwd)"
  echo "   Expected: repository root with frontend/ directory"
  exit 1
fi

# Install chokidar
echo "📦 Installing chokidar..."
cd frontend
npm install --save-dev chokidar

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Setup complete!"
  echo ""
  echo "📝 Usage:"
  echo "   cd frontend"
  echo "   npm run watch-deploy"
  echo ""
  echo "💡 The watcher will:"
  echo "   - Monitor all markdown files in src/content/"
  echo "   - Auto-commit changes after 5 seconds"
  echo "   - Auto-push to trigger GitHub Actions"
  echo "   - Deploy to EC2 automatically"
  echo ""
  echo "🎯 Just edit your markdown files and they'll deploy automatically!"
else
  echo ""
  echo "❌ Installation failed"
  exit 1
fi

