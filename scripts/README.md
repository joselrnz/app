# 📝 Streamlined Markdown Article Generator

Automated tools for creating technical articles with LaTeX support for your portfolio's Tech Hub.

---

## 🚀 Quick Start

### Method 1: Interactive Mode (Recommended for Beginners)

```bash
cd frontend
npm run create-article
```

Follow the interactive prompts to create your article!

### Method 2: Command Line (Fast & Scriptable)

```bash
cd frontend
npm run quick-article -- --category circuits --title "My Article" --tags "tag1,tag2"
```

---

## 📚 Available Categories

| Category | Emoji | Description |
|----------|-------|-------------|
| `circuits` | ⚡ | Circuits & Electronics (Arduino, ESP32, PCB design) |
| `linux` | 🐧 | Linux/IoT (Raspberry Pi, embedded systems) |
| `ai` | 🤖 | AI/ML (Machine learning, neural networks) |
| `notes` | 📝 | General notes and documentation |

---

## 🎯 Interactive Mode (`create-article`)

### Usage

```bash
cd frontend
npm run create-article
```

### Features

✅ **User-friendly prompts** - Step-by-step guidance  
✅ **Smart defaults** - Auto-generates slug, uses current date  
✅ **Validation** - Checks for required fields  
✅ **Preview** - Shows URLs and next steps  
✅ **Safe** - Asks before overwriting existing files

### Example Session

```
📝 Streamlined Markdown Article Generator 📝

Available Categories:
  ⚡ circuits    - Circuits & Electronics
  🐧 linux      - Linux/IoT
  🤖 ai         - AI/ML
  📝 notes      - Notes

📁 Select category: circuits
📌 Article title: LED Matrix Display
📝 Brief description: Building an 8x8 LED matrix with Arduino
🏷️  Tags: arduino,led,electronics
📅 Date (2025-11-08): 
✍️  Author [Jose Lorenzo]: 
🔗 URL slug [led-matrix-display]: 

✅ Article Created Successfully!

📄 File: frontend/src/content/tech/circuits/led-matrix-display.md
🌐 Article: http://localhost:3002/tech/circuits/led-matrix-display
```

---

## ⚡ Quick Mode (`quick-article`)

### Usage

```bash
cd frontend
npm run quick-article -- [options]
```

### Required Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--category` | `-c` | Category name | `circuits` |
| `--title` | `-t` | Article title | `"LED Basics"` |
| `--tags` | | Comma-separated tags | `"electronics,led"` |

### Optional Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--description` | `-d` | Article description | Same as title |
| `--date` | | Date (YYYY-MM-DD) | Today's date |
| `--author` | `-a` | Author name | `Jose Lorenzo` |
| `--slug` | `-s` | URL slug | Auto-generated from title |

### Examples

**Basic usage:**
```bash
npm run quick-article -- -c circuits -t "LED Basics" --tags "electronics,led"
```

**With description:**
```bash
npm run quick-article -- \
  --category ai \
  --title "Neural Networks 101" \
  --description "Introduction to neural networks and deep learning" \
  --tags "ai,ml,neural-networks"
```

**Full options:**
```bash
npm run quick-article -- \
  --category linux \
  --title "Raspberry Pi GPIO Programming" \
  --description "Complete guide to GPIO programming on Raspberry Pi" \
  --tags "raspberry-pi,gpio,python" \
  --date "2025-11-08" \
  --author "Jose Lorenzo" \
  --slug "rpi-gpio-guide"
```

**Quick one-liner:**
```bash
npm run quick-article -- -c notes -t "Quick Tips" --tags "tips,productivity"
```

---

## 📝 Generated Article Template

Every article is created with this structure:

```markdown
---
title: "Your Title"
description: "Your description"
date: "2025-11-08"
category: "circuits"
tags: ["tag1", "tag2"]
author: "Jose Lorenzo"
---

# Your Title

Your description

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
```

---

## 🧮 LaTeX Math Support

### Inline Math

Use single dollar signs `$...$` for inline equations:

```markdown
The voltage across resistor $R_1$ is $V_1 = I \times R_1$.
```

**Renders as:** The voltage across resistor $R_1$ is $V_1 = I \times R_1$.

### Display Math

Use double dollar signs `$$...$$` for centered display equations:

```markdown
$$
V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}
$$
```

**Renders as:**
$$
V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}
$$

### Common LaTeX Symbols

| Symbol | LaTeX | Example |
|--------|-------|---------|
| Subscript | `R_1` | $R_1$ |
| Superscript | `x^2` | $x^2$ |
| Fraction | `\frac{a}{b}` | $\frac{a}{b}$ |
| Square root | `\sqrt{x}` | $\sqrt{x}$ |
| Integral | `\int` | $\int$ |
| Sum | `\sum` | $\sum$ |
| Greek letters | `\alpha, \beta, \Omega` | $\alpha, \beta, \Omega$ |
| Multiply | `\times` | $\times$ |
| Plus/minus | `\pm` | $\pm$ |

---

## 📋 Markdown Features

### Code Blocks with Syntax Highlighting

````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Collapsible Sections

```markdown
<details>
<summary>Click to expand</summary>

Hidden content goes here...

</details>
```

### Lists

```markdown
- Unordered item 1
- Unordered item 2
  - Nested item

1. Ordered item 1
2. Ordered item 2
```

### Emphasis

```markdown
**Bold text**
*Italic text*
`Inline code`
```

---

## 🔄 Workflow

### 1. Create Article

```bash
cd frontend
npm run quick-article -- -c circuits -t "My Article" --tags "tag1,tag2"
```

### 2. Edit Content

Open the generated file in your editor:

```bash
code frontend/src/content/tech/circuits/my-article.md
```

### 3. Add Your Content

- Write your introduction
- Add sections with `##` and `###` headers
- Include code examples with syntax highlighting
- Add LaTeX equations for formulas
- Create tables for comparisons
- Add practice problems with collapsible solutions

### 4. Save & Auto-Reload

The dev server automatically detects changes:

```bash
# In another terminal
cd frontend
npm run dev
```

### 5. View in Browser

Navigate to:
- **Listing:** http://localhost:3002/tech/circuits
- **Article:** http://localhost:3002/tech/circuits/my-article

### 6. Verify Rendering

Check that:
- ✅ Article appears in category listing
- ✅ LaTeX equations render correctly
- ✅ Code blocks have syntax highlighting
- ✅ Tables display properly
- ✅ Images load (if any)
- ✅ Table of Contents generates automatically
- ✅ Responsive design works on mobile

---

## 💡 Tips & Best Practices

### Article Structure

✅ **Start with a clear introduction** - Explain what the article covers  
✅ **Use descriptive headers** - Makes content scannable  
✅ **Include examples** - Show practical applications  
✅ **Add visuals** - Diagrams, code blocks, tables  
✅ **End with takeaways** - Summarize key points  

### LaTeX Equations

✅ **Use inline math for variables** - $R_1$, $V_{out}$  
✅ **Use display math for formulas** - Center important equations  
✅ **Add explanations** - Don't just show equations, explain them  
✅ **Test rendering** - Verify equations display correctly  

### Tags

✅ **Be specific** - Use relevant, searchable tags  
✅ **Use 3-5 tags** - Not too few, not too many  
✅ **Lowercase** - Keep tags consistent  
✅ **Hyphenate multi-word tags** - `neural-networks`, not `neural networks`  

### Slugs

✅ **Keep it short** - Easier to share and remember  
✅ **Use hyphens** - `my-article`, not `my_article` or `myarticle`  
✅ **Descriptive** - Should indicate article content  
✅ **Lowercase** - Consistent URL structure  

---

## 🛠️ Troubleshooting

### Article doesn't appear in listing

**Solution:** Refresh the browser or restart the dev server

```bash
# Stop dev server (Ctrl+C)
npm run dev
```

### LaTeX equations not rendering

**Check:**
- ✅ Using correct syntax: `$...$` or `$$...$$`
- ✅ Escaping backslashes in special cases
- ✅ No syntax errors in LaTeX code

### File already exists error

**Solution:** Use a different slug or delete the existing file

```bash
rm frontend/src/content/tech/circuits/existing-article.md
```

### Category not found

**Solution:** Use one of the valid categories: `circuits`, `linux`, `ai`, `notes`

---

## 📊 File Locations

```
apps/
├── frontend/
│   ├── src/
│   │   └── content/
│   │       └── tech/
│   │           ├── circuits/     # ⚡ Electronics articles
│   │           ├── linux/        # 🐧 Linux/IoT articles
│   │           ├── ai/           # 🤖 AI/ML articles
│   │           └── notes/        # 📝 General notes
│   └── package.json              # npm scripts defined here
└── scripts/
    ├── create-article.js         # Interactive mode
    ├── quick-article.js          # Command-line mode
    └── README.md                 # This file
```

---

## 🎉 Success!

You now have a **streamlined process** for creating technical articles!

**Next Steps:**
1. Create your first article using the interactive mode
2. Experiment with LaTeX equations
3. Add code examples and diagrams
4. Share your knowledge with the world! 🚀

---

**Questions or Issues?** Check the troubleshooting section or review existing articles for examples.

