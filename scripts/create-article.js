#!/usr/bin/env node

/**
 * Streamlined Markdown Article Generator
 * 
 * Usage:
 *   npm run create-article
 *   node scripts/create-article.js
 * 
 * Interactive prompts guide you through creating a new article
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for better UX
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

const categories = {
  circuits: { emoji: '⚡', name: 'Circuits & Electronics' },
  linux: { emoji: '🐧', name: 'Linux/IoT' },
  ai: { emoji: '🤖', name: 'AI/ML' },
  notes: { emoji: '📝', name: 'Notes' }
};

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateFrontmatter(data) {
  const tags = data.tags.split(',').map(t => `"${t.trim()}"`).join(', ');
  
  return `---
title: "${data.title}"
description: "${data.description}"
date: "${data.date}"
category: "${data.category}"
tags: [${tags}]
author: "${data.author || 'Jose Lorenzo'}"
---

`;
}

function generateTemplate(data) {
  const frontmatter = generateFrontmatter(data);
  
  const template = `${frontmatter}# ${data.title}

${data.description}

---

## Introduction

Write your introduction here...

## Main Content

### Section 1

Your content here...

### Section 2

More content...

## Examples

### Example 1: Basic Example

**Problem:** Describe the problem

**Solution:**

\`\`\`javascript
// Your code here
console.log('Hello, World!');
\`\`\`

## Mathematical Formulas (LaTeX)

You can use inline math like $x = y + z$ or display math:

$$
E = mc^2
$$

$$
f(x) = \\int_{-\\infty}^{\\infty} e^{-x^2} dx
$$

## Key Takeaways

✅ **Point 1:** Important takeaway
✅ **Point 2:** Another key point
✅ **Point 3:** Final insight

## Practice Problems

### Problem 1
Description of the problem...

<details>
<summary>Solution</summary>

Your solution here with explanation.

</details>

## Conclusion

Summarize your article here...

---

**Next Topics:** Related topics to explore
`;

  return template;
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     📝 Streamlined Markdown Article Generator 📝          ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

  try {
    // Step 1: Select Category
    log('Available Categories:', 'bright');
    Object.entries(categories).forEach(([key, value]) => {
      log(`  ${value.emoji} ${key.padEnd(10)} - ${value.name}`, 'blue');
    });
    
    const category = await question('\n📁 Select category (circuits/linux/ai/notes): ');
    
    if (!categories[category]) {
      log('❌ Invalid category! Please choose from: circuits, linux, ai, notes', 'red');
      rl.close();
      return;
    }

    // Step 2: Article Title
    const title = await question('\n📌 Article title: ');
    if (!title.trim()) {
      log('❌ Title cannot be empty!', 'red');
      rl.close();
      return;
    }

    // Step 3: Description
    const description = await question('\n📝 Brief description: ');
    if (!description.trim()) {
      log('❌ Description cannot be empty!', 'red');
      rl.close();
      return;
    }

    // Step 4: Tags
    const tags = await question('\n🏷️  Tags (comma-separated): ');
    if (!tags.trim()) {
      log('❌ Please provide at least one tag!', 'red');
      rl.close();
      return;
    }

    // Step 5: Date (optional)
    const dateInput = await question(`\n📅 Date (YYYY-MM-DD) [${getCurrentDate()}]: `);
    const date = dateInput.trim() || getCurrentDate();

    // Step 6: Author (optional)
    const author = await question('\n✍️  Author [Jose Lorenzo]: ');

    // Step 7: Generate slug
    const defaultSlug = slugify(title);
    const slugInput = await question(`\n🔗 URL slug [${defaultSlug}]: `);
    const slug = slugInput.trim() || defaultSlug;

    // Prepare data
    const articleData = {
      title,
      description,
      category,
      tags,
      date,
      author: author.trim() || 'Jose Lorenzo',
      slug
    };

    // Generate file path
    const contentDir = path.join(__dirname, '..', 'frontend', 'src', 'content', category);
    const filePath = path.join(contentDir, `${slug}.md`);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      const overwrite = await question(`\n⚠️  File already exists! Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        log('\n❌ Operation cancelled.', 'yellow');
        rl.close();
        return;
      }
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
      log(`\n✅ Created directory: ${contentDir}`, 'green');
    }

    // Generate and write file
    const content = generateTemplate(articleData);
    fs.writeFileSync(filePath, content, 'utf8');

    // Success message
    log('\n╔════════════════════════════════════════════════════════════╗', 'green');
    log('║              ✅ Article Created Successfully! ✅           ║', 'green');
    log('╚════════════════════════════════════════════════════════════╝\n', 'green');

    log('📄 File Details:', 'bright');
    log(`   Location: ${filePath}`, 'cyan');
    log(`   Category: ${categories[category].emoji} ${category}`, 'cyan');
    log(`   Title: ${title}`, 'cyan');
    log(`   Slug: ${slug}`, 'cyan');
    log(`   Date: ${date}`, 'cyan');
    log(`   Tags: ${tags}`, 'cyan');

    log('\n🌐 URLs:', 'bright');
    log(`   Listing: http://localhost:3002/tech/${category}`, 'blue');
    log(`   Article: http://localhost:3002/tech/${category}/${slug}`, 'blue');

    log('\n📝 Next Steps:', 'bright');
    log('   1. Edit the generated file to add your content', 'yellow');
    log('   2. Add LaTeX equations using $ or $$', 'yellow');
    log('   3. Save the file - changes auto-reload in dev mode', 'yellow');
    log('   4. View in browser to verify rendering', 'yellow');

    log('\n💡 Tips:', 'bright');
    log('   • Use $...$ for inline math: $x = y + z$', 'cyan');
    log('   • Use $$...$$ for display math (centered)', 'cyan');
    log('   • Tables use GitHub Flavored Markdown syntax', 'cyan');
    log('   • Code blocks support syntax highlighting', 'cyan');
    log('   • <details> tags create collapsible sections', 'cyan');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
  } finally {
    rl.close();
  }
}

// Run the script
main();

