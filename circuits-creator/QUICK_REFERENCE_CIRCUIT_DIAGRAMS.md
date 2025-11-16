# ⚡ Quick Reference: Circuit Diagrams

## 🎯 GENERATE ALL CIRCUITS (2 commands)

```bash
# Step 1: Generate ALL SchemDraw circuits (4 circuits)
python scripts/generate_full_circuit.py

# Step 2: Generate ALL NetlistSVG circuits (3 circuits)
python scripts/generate_netlist_circuits.py
```

**Done!** All 7 circuits are now in `frontend/public/images/circuits/`

---

## 🚀 Generate New Custom Circuit (30 seconds)

### Method 1: SchemDraw (Python)
```python
# Add to scripts/generate_circuit_diagrams.py
with schemdraw.Drawing(show=False) as d:
    d += elm.SourceV().label('9V')
    d += elm.Resistor().right().label('R1\n1kΩ')
    d += elm.LED().down().label('LED')
    d += elm.Line().left()
d.save("frontend/public/images/circuits/generated/my_circuit.svg")
```

### Method 2: NetlistSVG (JSON)
```json
{
  "modules": {
    "my_circuit": {
      "ports": {"Vin": {"direction": "input"}, "GND": {"direction": "input"}},
      "cells": {"R1": {"type": "r_v", "attributes": {"value": "1kΩ"}}},
      "connections": {"Vin": [["R1", "A"]], "GND": [["R1", "B"]]}
    }
  }
}
```

## 📝 Add to Markdown
```markdown
![My Circuit](/images/circuits/generated/my_circuit.svg)
```

## 🎨 CSS Styling (Already Applied)
```css
.markdown-content img {
  background: white;           /* Visibility on dark background */
  padding: 2rem;              /* Breathing room */
  border: 2px solid #10b981;  /* Green border */
  box-shadow: ...;            /* Shadow effect */
  /* Left-aligned by default - flows naturally with text */
}
```

## 🔧 Run Scripts (MAIN COMMANDS)

```bash
# ⚡ STEP 1: Generate ALL SchemDraw circuits (RECOMMENDED)
python scripts/generate_full_circuit.py

# ⚡ STEP 2: Generate ALL NetlistSVG circuits (RECOMMENDED)
python scripts/generate_netlist_circuits.py

# ⚡ STEP 3: Start dev server to view
cd frontend && npm run dev
# Open: http://localhost:3002/tech/circuits/01-555-timer-led-flasher
```

**Note:** `generate_full_circuit.py` generates all 4 SchemDraw circuits including the 555 timer!

## 📂 File Locations
- **SchemDraw Output**: `frontend/public/images/circuits/generated/`
- **NetlistSVG Output**: `frontend/public/images/circuits/netlist/`
- **Markdown Content**: `frontend/src/content/circuits/`
- **Scripts**: `scripts/`

## ✅ Checklist for New Circuit
- [ ] Generate SVG using SchemDraw or NetlistSVG
- [ ] Verify file in `frontend/public/images/circuits/`
- [ ] Reference in markdown: `![Name](/images/circuits/.../file.svg)`
- [ ] Test in browser: `http://localhost:3002/tech/circuits/article-name`
- [ ] Verify: White background, centered, visible

## 🎯 Component Types (NetlistSVG)
- `r_v` - Vertical resistor
- `c_v` - Vertical capacitor  
- `l_v` - Vertical inductor
- `generic` - Generic component

## 🔍 Troubleshooting
| Issue | Solution |
|-------|----------|
| Dark/invisible circuit | Add `background: white` in CSS |
| Not centered | Add `margin: auto` in CSS |
| Command not found | Use full path to `netlistsvg.cmd` |
| Generic boxes | Use `--skin analog.svg` flag |

## 📊 Current Inventory
- **SchemDraw**: 4 circuits (68 KB)
- **NetlistSVG**: 3 circuits (9 KB)
- **Articles**: 3 markdown files
- **Status**: ✅ All working

---

**For full documentation, see:** `CIRCUIT_DIAGRAM_AUTOMATION_GUIDE.md`

