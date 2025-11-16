#!/usr/bin/env node

/**
 * Quick Markdown Article Generator (Non-Interactive)
 * 
 * Usage:
 *   npm run quick-article -- --category circuits --title "My Article" --tags "tag1,tag2"
 *   node scripts/quick-article.js --category circuits --title "My Article" --tags "tag1,tag2"
 * 
 * Options:
 *   --category, -c    Category (circuits/linux/ai/notes) [required]
 *   --title, -t       Article title [required]
 *   --description, -d Article description [optional]
 *   --tags            Comma-separated tags [required]
 *   --date            Date (YYYY-MM-DD) [default: today]
 *   --author, -a      Author name [default: Jose Lorenzo]
 *   --slug, -s        URL slug [default: auto-generated from title]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      parsed[key] = value;
      i++;
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      const value = args[i + 1];
      
      // Map short flags to long names
      const mapping = {
        'c': 'category',
        't': 'title',
        'd': 'description',
        'a': 'author',
        's': 'slug'
      };
      
      parsed[mapping[key] || key] = value;
      i++;
    }
  }
  
  return parsed;
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

function generateTemplate(data) {
  const tags = data.tags.split(',').map(t => `"${t.trim()}"`).join(', ');
  
  const frontmatter = `---
title: "${data.title}"
description: "${data.description}"
date: "${data.date}"
category: "${data.category}"
tags: [${tags}]
author: "${data.author}"
---

`;

  const template = `${frontmatter}# ${data.title}

${data.description}

---

## Introduction

Write your introduction here...

## Main Content

### Section 1

Your content here...

## Examples

### Example 1

**Problem:** Describe the problem

**Solution:**

\`\`\`javascript
// Your code here
console.log('Hello, World!');
\`\`\`

## Mathematical Formulas (LaTeX)

Inline math: $x = y + z$

Display math:

$$
E = mc^2
$$

## Key Takeaways

✅ **Point 1:** Important takeaway
✅ **Point 2:** Another key point

## Conclusion

Summarize your article here...

---

**Next Topics:** Related topics to explore
`;

  return template;
}

function showUsage() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║        📝 Quick Markdown Article Generator 📝             ║
╚════════════════════════════════════════════════════════════╝

Usage:
  npm run quick-article -- --category circuits --title "My Article" --tags "tag1,tag2"

Required Options:
  --category, -c    Category (circuits/linux/ai/notes)
  --title, -t       Article title
  --tags            Comma-separated tags

Optional Options:
  --description, -d Article description [default: same as title]
  --date            Date (YYYY-MM-DD) [default: today]
  --author, -a      Author name [default: Jose Lorenzo]
  --slug, -s        URL slug [default: auto-generated from title]

Examples:
  # Basic usage
  npm run quick-article -- -c circuits -t "LED Basics" --tags "electronics,led"

  # With all options
  npm run quick-article -- \\
    --category ai \\
    --title "Neural Networks 101" \\
    --description "Introduction to neural networks" \\
    --tags "ai,ml,neural-networks" \\
    --date "2025-11-08" \\
    --author "Jose Lorenzo" \\
    --slug "neural-networks-intro"

Categories:
  ⚡ circuits  - Circuits & Electronics
  🐧 linux    - Linux/IoT
  🤖 ai       - AI/ML
  📝 notes    - Notes
`);
}

function main() {
  const args = parseArgs();
  
  // Show usage if no arguments or help flag
  if (process.argv.length <= 2 || args.help || args.h) {
    showUsage();
    process.exit(0);
  }
  
  // Validate required arguments
  const required = ['category', 'title', 'tags'];
  const missing = required.filter(key => !args[key]);
  
  if (missing.length > 0) {
    console.error(`\n❌ Error: Missing required arguments: ${missing.join(', ')}\n`);
    showUsage();
    process.exit(1);
  }
  
  // Validate category
  const validCategories = ['circuits', 'linux', 'ai', 'notes'];
  if (!validCategories.includes(args.category)) {
    console.error(`\n❌ Error: Invalid category "${args.category}"`);
    console.error(`   Valid categories: ${validCategories.join(', ')}\n`);
    process.exit(1);
  }
  
  // Prepare article data
  const articleData = {
    category: args.category,
    title: args.title,
    description: args.description || args.title,
    tags: args.tags,
    date: args.date || getCurrentDate(),
    author: args.author || 'Jose Lorenzo',
    slug: args.slug || slugify(args.title)
  };
  
  // Generate file path
  const contentDir = path.join(__dirname, '..', 'frontend', 'src', 'content', articleData.category);
  const filePath = path.join(contentDir, `${articleData.slug}.md`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log(`✅ Created directory: ${contentDir}`);
  }
  
  // Check if file exists
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Error: File already exists: ${filePath}`);
    console.error(`   Use a different --slug or delete the existing file\n`);
    process.exit(1);
  }
  
  // Generate and write file
  const content = generateTemplate(articleData);
  fs.writeFileSync(filePath, content, 'utf8');
  
  // Success message
  console.log(`
╔════════════════════════════════════════════════════════════╗
║              ✅ Article Created Successfully! ✅           ║
╚════════════════════════════════════════════════════════════╝

📄 File: ${filePath}
📁 Category: ${articleData.category}
📌 Title: ${articleData.title}
🔗 Slug: ${articleData.slug}
📅 Date: ${articleData.date}
🏷️  Tags: ${articleData.tags}

🌐 URLs:
   Listing: http://localhost:3002/tech/${articleData.category}
   Article: http://localhost:3002/tech/${articleData.category}/${articleData.slug}

📝 Next Steps:
   1. Edit: ${filePath}
   2. Add your content, LaTeX equations, code examples
   3. Save - changes auto-reload in dev mode
   4. View in browser to verify

💡 LaTeX Tips:
   • Inline: $x = y + z$
   • Display: $$E = mc^2$$
`);
}

// Run the script
main();

