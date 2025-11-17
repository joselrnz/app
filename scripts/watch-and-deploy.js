#!/usr/bin/env node

/**
 * Watch Markdown Files and Auto-Deploy
 * 
 * This script watches for changes to markdown files in the content directory
 * and automatically commits and pushes them to trigger CI/CD deployment.
 * 
 * Usage:
 *   npm run watch-deploy
 *   node scripts/watch-and-deploy.js
 * 
 * Features:
 *   - Watches all markdown files in frontend/src/content/
 *   - Debounces changes (waits 5 seconds after last change)
 *   - Auto-commits with descriptive message
 *   - Auto-pushes to trigger GitHub Actions
 *   - Logs all actions with timestamps
 */

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const WATCH_PATH = path.join(__dirname, '..', 'frontend', 'src', 'content');
const DEBOUNCE_MS = 5000; // Wait 5 seconds after last change
const GIT_BRANCH = 'main';

// State
let changeTimeout = null;
let changedFiles = new Set();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      resolve(stdout);
    });
  });
}

async function deployChanges() {
  if (changedFiles.size === 0) {
    return;
  }

  const files = Array.from(changedFiles);
  changedFiles.clear();

  log(`📝 Deploying ${files.length} file(s)...`, colors.blue);
  
  try {
    // Get file details for commit message
    const fileNames = files.map(f => {
      const relativePath = path.relative(WATCH_PATH, f);
      const parts = relativePath.split(path.sep);
      const category = parts[0];
      const fileName = path.basename(f, '.md');
      return { category, fileName, path: relativePath };
    });

    // Create descriptive commit message
    let commitMessage;
    if (fileNames.length === 1) {
      const { category, fileName } = fileNames[0];
      commitMessage = `feat(${category}): update ${fileName}`;
    } else {
      const categories = [...new Set(fileNames.map(f => f.category))];
      commitMessage = `feat: update ${fileNames.length} articles in ${categories.join(', ')}`;
    }

    // Git add
    log('📦 Staging changes...', colors.yellow);
    await execPromise('git add .');

    // Check if there are changes to commit
    const status = await execPromise('git status --porcelain');
    if (!status.trim()) {
      log('✅ No changes to commit', colors.green);
      return;
    }

    // Git commit
    log(`💾 Committing: "${commitMessage}"`, colors.yellow);
    await execPromise(`git commit -m "${commitMessage}"`);

    // Git push
    log(`🚀 Pushing to ${GIT_BRANCH}...`, colors.yellow);
    await execPromise(`git push origin ${GIT_BRANCH}`);

    log('✅ Successfully deployed! GitHub Actions will build and deploy to EC2.', colors.green);
    log(`⏱️  Your changes will be live in ~2 minutes`, colors.bright);
    
    // List deployed files
    fileNames.forEach(({ category, fileName }) => {
      log(`   - ${category}/${fileName}`, colors.green);
    });

  } catch (err) {
    log(`❌ Error deploying: ${err.stderr || err.error?.message || err}`, colors.red);
    
    // Add files back to queue for retry
    files.forEach(f => changedFiles.add(f));
  }
}

function handleChange(filePath) {
  // Only process markdown files
  if (!filePath.endsWith('.md') && !filePath.endsWith('.yaml')) {
    return;
  }

  // Skip module metadata files (they're less frequently changed)
  if (path.basename(filePath) === '_module.yaml') {
    log(`📋 Module metadata changed: ${path.relative(WATCH_PATH, filePath)}`, colors.blue);
  } else {
    log(`📝 File changed: ${path.relative(WATCH_PATH, filePath)}`, colors.blue);
  }

  changedFiles.add(filePath);

  // Clear existing timeout
  if (changeTimeout) {
    clearTimeout(changeTimeout);
  }

  // Set new timeout
  changeTimeout = setTimeout(() => {
    deployChanges();
  }, DEBOUNCE_MS);
}

// Initialize watcher
log('👀 Starting markdown file watcher...', colors.bright);
log(`📁 Watching: ${WATCH_PATH}`, colors.blue);
log(`⏱️  Debounce: ${DEBOUNCE_MS / 1000} seconds`, colors.blue);
log(`🌿 Branch: ${GIT_BRANCH}`, colors.blue);
log('', colors.reset);
log('💡 Tip: Edit markdown files and they will auto-deploy!', colors.yellow);
log('💡 Press Ctrl+C to stop watching', colors.yellow);
log('', colors.reset);

const watcher = chokidar.watch(WATCH_PATH, {
  ignored: /(^|[\/\\])\../, // Ignore dotfiles
  persistent: true,
  ignoreInitial: true, // Don't trigger on initial scan
});

watcher
  .on('add', handleChange)
  .on('change', handleChange)
  .on('unlink', (filePath) => {
    log(`🗑️  File deleted: ${path.relative(WATCH_PATH, filePath)}`, colors.red);
    changedFiles.add(filePath);
    
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }
    
    changeTimeout = setTimeout(() => {
      deployChanges();
    }, DEBOUNCE_MS);
  });

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('', colors.reset);
  log('👋 Stopping watcher...', colors.yellow);
  watcher.close();
  process.exit(0);
});

