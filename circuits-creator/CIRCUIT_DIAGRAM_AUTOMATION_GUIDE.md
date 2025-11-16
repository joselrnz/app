# 🔌 Circuit Diagram Automation Guide
## Complete 0-100 Process for Generating Circuit Diagrams

**Created:** November 12, 2024  
**Purpose:** Reference guide for automating circuit diagram generation and integration into Next.js portfolio  
**Status:** ✅ Fully Working & Tested

---

## ⚡ QUICK START - Generate All Circuits Now!

```bash
# Generate ALL SchemDraw circuits (4 circuits)
python scripts/generate_full_circuit.py

# Generate ALL NetlistSVG circuits (3 circuits)
python scripts/generate_netlist_circuits.py

# Start dev server to view
cd frontend && npm run dev
# Open: http://localhost:3002/tech/circuits/01-555-timer-led-flasher
```

**That's it!** All 7 circuit diagrams will be generated and ready to use in your markdown articles.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tools & Technologies](#tools--technologies)
3. [Installation & Setup](#installation--setup)
4. [Method 1: SchemDraw (Python)](#method-1-schemdraw-python)
5. [Method 2: NetlistSVG (JavaScript)](#method-2-netlistsvg-javascript)
6. [Integration into Next.js](#integration-into-nextjs)
7. [Automation Scripts](#automation-scripts)
8. [Troubleshooting](#troubleshooting)
9. [Future Workflow](#future-workflow)

---

## 🎯 Overview

This guide documents the complete process for generating professional circuit diagrams and integrating them into a Next.js portfolio application. Two methods are available:

- **SchemDraw**: Python-based, precise control, publication-quality
- **NetlistSVG**: JavaScript-based, automatic layout from JSON netlists

Both generate SVG files that are displayed in markdown articles with proper styling.

---

## 🛠️ Tools & Technologies

### Core Tools

| Tool | Version | Purpose | Language |
|------|---------|---------|----------|
| **SchemDraw** | 0.21 | Circuit diagram generation | Python |
| **NetlistSVG** | 1.0.2 | Netlist-to-SVG converter | JavaScript/Node.js |
| **Next.js** | 14.2.33 | Web application framework | TypeScript |
| **Python** | 3.x | Script execution | Python |
| **Node.js** | Latest | JavaScript runtime | JavaScript |

### Supporting Libraries

- `matplotlib` - Required by SchemDraw
- `unified` - Markdown processing
- `remark-*` - Markdown parsing
- `rehype-*` - HTML generation

---

## 📦 Installation & Setup

### Step 1: Install Python Dependencies

```bash
# Install SchemDraw
pip3 install schemdraw

# Verify installation
python -c "import schemdraw; print(schemdraw.__version__)"
```

### Step 2: Install Node.js Dependencies

```bash
# Install NetlistSVG globally
npm install -g netlistsvg

# Verify installation
netlistsvg --version
```

### Step 3: Verify Paths (Windows)

```bash
# Node.js location
which node
# Expected: /c/Program Files/nodejs/node

# npm global packages
npm config get prefix
# Expected: C:\Users\{username}\AppData\Roaming\npm

# NetlistSVG command
which netlistsvg
# Expected: /c/Users/{username}/AppData/Roaming/npm/netlistsvg
```

---

## 🎨 Method 1: SchemDraw (Python)

### Overview
SchemDraw provides precise control over circuit layout with a Python API.

### Script Location
```
scripts/generate_circuit_diagrams.py
scripts/generate_full_circuit.py
```

### Output Location
```
frontend/public/images/circuits/generated/
```

### Basic Usage

```python
import schemdraw
import schemdraw.elements as elm
from pathlib import Path

# Create output directory
output_dir = Path("frontend/public/images/circuits/generated")
output_dir.mkdir(parents=True, exist_ok=True)

# Generate circuit
with schemdraw.Drawing(show=False) as d:
    d.config(fontsize=12, font='sans-serif')
    
    # Add components
    d += elm.SourceV().label('9V')
    d += elm.Resistor().right().label('R1\n10kΩ')
    d += elm.LED().down().label('LED')
    d += elm.Line().left()
    
# Save as SVG
d.save(str(output_dir / "my_circuit.svg"))
```

### Running the Script

```bash
# Generate ALL SchemDraw circuits (recommended - runs all at once)
python scripts/generate_full_circuit.py

# OR generate basic circuits only
python scripts/generate_circuit_diagrams.py
```

**⚡ RECOMMENDED:** Use `generate_full_circuit.py` - it generates all 4 circuits including the 555 timer!

### Generated Files

- `voltage-divider.svg` (11 KB)
- `rc-circuit.svg` (12 KB)
- `led-circuit.svg` (9.4 KB)
- `555_timer_complete.svg` (34 KB)

---

## ⚡ Method 2: NetlistSVG (JavaScript)

### Overview
NetlistSVG automatically generates circuit diagrams from JSON netlist descriptions.

### Script Location
```
scripts/generate_netlist_circuits.py
```

### Output Location
```
frontend/public/images/circuits/netlist/
```

### JSON Netlist Format

```json
{
  "modules": {
    "rc_lowpass": {
      "ports": {
        "Vin": {"direction": "input"},
        "Vout": {"direction": "output"},
        "GND": {"direction": "input"}
      },
      "cells": {
        "R1": {
          "type": "r_v",
          "attributes": {"value": "10kΩ"}
        },
        "C1": {
          "type": "c_v",
          "attributes": {"value": "100nF"}
        }
      },
      "connections": {
        "Vin": [["R1", "A"]],
        "Vout": [["R1", "B"], ["C1", "A"]],
        "GND": [["C1", "B"]]
      }
    }
  }
}
```

### Running the Script

```bash
# Generate ALL NetlistSVG circuits (recommended)
python scripts/generate_netlist_circuits.py
```

**⚡ RECOMMENDED:** This script generates all 3 NetlistSVG circuits at once!

### Key Features

- **Analog Skin**: Uses proper resistor/capacitor symbols
- **Automatic Layout**: No manual positioning needed
- **Component Types**:
  - `r_v` - Vertical resistor
  - `c_v` - Vertical capacitor
  - `l_v` - Vertical inductor
  - `generic` - Generic component

### Generated Files

- `rc_lowpass.svg` (2.9 KB)
- `voltage_divider.svg` (2.9 KB)
- `rlc_series.svg` (3.2 KB)

---

## 🌐 Integration into Next.js

### Step 1: File Structure

```
frontend/
├── public/
│   └── images/
│       └── circuits/
│           ├── generated/      # SchemDraw outputs
│           └── netlist/        # NetlistSVG outputs
├── src/
│   ├── content/
│   │   └── circuits/
│   │       ├── 01-fundamentals/
│   │       └── 04-projects/
│   └── styles/
│       └── markdown.css        # Image styling
```

### Step 2: Markdown Integration

In your markdown files (`.md`):

```markdown
---
title: "My Circuit Project"
description: "A cool circuit"
date: "2024-11-12"
---

# My Circuit

Here's the circuit diagram:

![Circuit Diagram](/images/circuits/generated/my_circuit.svg)

## How It Works

The circuit operates by...
```

### Step 3: CSS Styling

File: `frontend/src/styles/markdown.css`

```css
.markdown-content img {
  @apply rounded-lg my-6 max-w-full h-auto;
  border: 2px solid #10b981;
  background: white;
  padding: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 
              0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
```

**Key Features:**
- ✅ White background (makes dark circuit lines visible)
- ✅ Left-aligned (flows naturally with text)
- ✅ Green border (#10b981)
- ✅ Padding for breathing room
- ✅ Shadow for depth

### Step 4: Content Security Policy

File: `frontend/next.config.js`

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' data:; img-src 'self' data: https: blob:; connect-src 'self';"
}
```

**Important:** Added `blob:` to `img-src` to allow SVG rendering.

---

## 🤖 Automation Scripts

### Script 1: SchemDraw Generator

**File:** `scripts/generate_circuit_diagrams.py`

```python
import schemdraw
import schemdraw.elements as elm
from pathlib import Path

def generate_circuits():
    output_dir = Path("frontend/public/images/circuits/generated")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Voltage Divider
    with schemdraw.Drawing(show=False) as d:
        d += elm.SourceV().label('Vin')
        d += elm.Resistor().right().label('R1\n10kΩ')
        d += elm.Dot()
        d.push()
        d += elm.Resistor().down().label('R2\n10kΩ')
        d += elm.Line().left()
    d.save(str(output_dir / "voltage-divider.svg"))
    
    print("✅ Generated voltage-divider.svg")

if __name__ == "__main__":
    generate_circuits()
```

### Script 2: NetlistSVG Generator

**File:** `scripts/generate_netlist_circuits.py`

```python
import json
import subprocess
from pathlib import Path
import os

def run_netlistsvg(json_file, output_svg, use_analog_skin=True):
    env = os.environ.copy()
    node_path = r"C:\Program Files\nodejs"
    npm_path = r"C:\Users\josel\AppData\Roaming\npm"
    env['PATH'] = f"{node_path};{npm_path};{env.get('PATH', '')}"
    
    netlistsvg_path = r"C:\Users\josel\AppData\Roaming\npm\netlistsvg.cmd"
    cmd = [netlistsvg_path, str(json_file), "-o", str(output_svg)]
    
    if use_analog_skin:
        analog_skin = Path(npm_path) / "node_modules" / "netlistsvg" / "lib" / "analog.svg"
        if analog_skin.exists():
            cmd.extend(["--skin", str(analog_skin)])
    
    result = subprocess.run(cmd, capture_output=True, text=True, shell=True, env=env)
    
    if result.returncode == 0:
        print(f"✅ Generated {output_svg.name}")
    else:
        print(f"❌ Error: {result.stderr}")

# Usage
output_dir = Path("frontend/public/images/circuits/netlist")
output_dir.mkdir(parents=True, exist_ok=True)

# Create netlist JSON and generate SVG
# ... (see full script for details)
```

---

## 🔧 Troubleshooting

### Issue 1: Images Not Visible (Dark on Dark)

**Problem:** Circuit diagrams have dark lines on dark background

**Solution:** Add white background in CSS
```css
.markdown-content img {
  background: white;
  padding: 2rem;
}
```

### Issue 2: NetlistSVG Command Not Found

**Problem:** `subprocess.run(['netlistsvg', ...])` fails with `[WinError 2]`

**Solution:** Use full path to `.cmd` file
```python
netlistsvg_path = r"C:\Users\{username}\AppData\Roaming\npm\netlistsvg.cmd"
subprocess.run([netlistsvg_path, ...], shell=True)
```

### Issue 3: Generic Boxes Instead of Resistor Symbols

**Problem:** NetlistSVG shows rectangles labeled "r_v"

**Solution:** Use analog skin
```bash
netlistsvg input.json -o output.svg --skin analog.svg
```

### Issue 4: CSP Blocking Images

**Problem:** Browser console shows CSP violations

**Solution:** Update `next.config.js` to allow SVG
```javascript
img-src 'self' data: https: blob:
```

---

## 🚀 Future Workflow

### For New Circuit Diagrams

#### Option A: SchemDraw (Precise Control)

1. **Create Python script** or add to existing generator
2. **Define circuit** using SchemDraw elements
3. **Run script**: `python scripts/generate_circuit_diagrams.py`
4. **Verify output**: Check `frontend/public/images/circuits/generated/`
5. **Reference in markdown**: `![Circuit](/images/circuits/generated/my_circuit.svg)`

#### Option B: NetlistSVG (Quick & Automatic)

1. **Create JSON netlist** with circuit definition
2. **Add to generator script** in `scripts/generate_netlist_circuits.py`
3. **Run script**: `python scripts/generate_netlist_circuits.py`
4. **Verify output**: Check `frontend/public/images/circuits/netlist/`
5. **Reference in markdown**: `![Circuit](/images/circuits/netlist/my_circuit.svg)`

### For New Articles

1. **Create markdown file**: `frontend/src/content/circuits/{category}/{article-name}.md`
2. **Add frontmatter**:
   ```yaml
   ---
   title: "Article Title"
   description: "Description"
   date: "YYYY-MM-DD"
   tags: ["tag1", "tag2"]
   ---
   ```
3. **Add circuit images**: `![Description](/images/circuits/{generated|netlist}/filename.svg)`
4. **Test locally**: `npm run dev` and navigate to article
5. **Verify images**: Check white background, centered, visible

### Automation Checklist

- [ ] Python 3.x installed
- [ ] Node.js installed
- [ ] SchemDraw installed (`pip3 install schemdraw`)
- [ ] NetlistSVG installed (`npm install -g netlistsvg`)
- [ ] Output directories exist
- [ ] Scripts have correct paths
- [ ] CSS styling applied
- [ ] CSP allows SVG images
- [ ] Test in browser

---

## 📊 Summary

### What We Achieved

✅ **Two working circuit diagram generators**
- SchemDraw: 4 circuits generated
- NetlistSVG: 3 circuits generated

✅ **Full Next.js integration**
- Markdown rendering
- Proper styling (white background, centered, bordered)
- CSP configuration

✅ **Automation scripts**
- Python generators for both tools
- Automatic output to correct directories

✅ **Documentation**
- 3 markdown articles created
- Complete reference guide (this document)

### File Inventory

**Scripts:**
- `scripts/generate_circuit_diagrams.py`
- `scripts/generate_full_circuit.py`
- `scripts/generate_netlist_circuits.py`

**Generated Assets:**
- 4 SchemDraw SVG files (68 KB total)
- 3 NetlistSVG SVG files (9 KB total)

**Content:**
- `frontend/src/content/circuits/01-fundamentals/03-schemdraw-test.md`
- `frontend/src/content/circuits/01-fundamentals/04-circuit-diagram-tools.md`
- `frontend/src/content/circuits/04-projects/01-555-timer-led-flasher.md`

**Configuration:**
- `frontend/src/styles/markdown.css` (image styling)
- `frontend/next.config.js` (CSP configuration)

---

## 🎓 Key Learnings

1. **SVG on Dark Backgrounds**: Always add white background for visibility
2. **Windows Paths**: Use full paths to `.cmd` files in subprocess calls
3. **NetlistSVG Skins**: Analog skin provides proper component symbols
4. **CSP Configuration**: Must allow `blob:` for SVG rendering
5. **Centering Images**: Use `margin-left: auto; margin-right: auto;`

---

## 📞 Quick Reference

### Generate All Circuits
```bash
# SchemDraw circuits
python scripts/generate_circuit_diagrams.py
python scripts/generate_full_circuit.py

# NetlistSVG circuits
python scripts/generate_netlist_circuits.py
```

### Start Dev Server
```bash
cd frontend
npm run dev
```

### View Circuits
```
http://localhost:3002/tech/circuits/01-555-timer-led-flasher
http://localhost:3002/tech/circuits/04-circuit-diagram-tools
http://localhost:3002/tech/circuits/03-schemdraw-test
```

---

**🎉 Circuit diagram automation is now fully operational!**

All circuits are visible, properly styled, and integrated into your Next.js portfolio. You can now create professional circuit diagrams for any electronics project with a simple Python script!

