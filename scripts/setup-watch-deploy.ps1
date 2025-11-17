# Setup Watch and Deploy (PowerShell)
# This script installs the required dependencies for the watch-and-deploy feature

Write-Host "🚀 Setting up Watch and Deploy..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "frontend/package.json")) {
    Write-Host "❌ Error: Must run from repository root" -ForegroundColor Red
    Write-Host "   Current directory: $(Get-Location)" -ForegroundColor Red
    Write-Host "   Expected: repository root with frontend/ directory" -ForegroundColor Red
    exit 1
}

# Install chokidar
Write-Host "📦 Installing chokidar..." -ForegroundColor Yellow
Set-Location frontend
npm install --save-dev chokidar

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Usage:" -ForegroundColor Cyan
    Write-Host "   cd frontend"
    Write-Host "   npm run watch-deploy"
    Write-Host ""
    Write-Host "💡 The watcher will:" -ForegroundColor Yellow
    Write-Host "   - Monitor all markdown files in src/content/"
    Write-Host "   - Auto-commit changes after 5 seconds"
    Write-Host "   - Auto-push to trigger GitHub Actions"
    Write-Host "   - Deploy to EC2 automatically"
    Write-Host ""
    Write-Host "🎯 Just edit your markdown files and they'll deploy automatically!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Installation failed" -ForegroundColor Red
    exit 1
}

