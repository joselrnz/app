# ⚡ Circuit Generation Cheat Sheet

## 🎯 GENERATE ALL CIRCUITS (Copy & Paste)

```bash
# Generate ALL circuits (7 SchemDraw + 3 NetlistSVG = 10 total)
python scripts/generate_circuit_diagrams.py
python scripts/generate_full_circuit.py
python scripts/generate_netlist_circuits.py

# View in browser
cd frontend && npm run dev
# Open: http://localhost:3002/tech/circuits/01-555-timer-led-flasher
# Open: http://localhost:3002/tech/circuits/02-voltage-current-dividers
```

---

## 📁 What Gets Generated

### SchemDraw Circuits (7 total)
```
frontend/public/images/circuits/generated/
├── 555_timer_complete.svg         (34 KB) - Complete 555 timer LED flasher
├── voltage-divider.svg             (11 KB) - Basic voltage divider
├── voltage_divider_detailed.svg    (15 KB) - Voltage divider with labels ⭐ NEW
├── current_divider.svg             (13 KB) - Current divider with labels ⭐ NEW
├── rc-circuit.svg                  (12 KB) - RC low-pass filter
└── led-circuit.svg                 (9.4 KB) - Simple LED circuit
```

### NetlistSVG Circuits (3 total)
```
frontend/public/images/circuits/netlist/
├── rc_lowpass.svg             (2.9 KB) - RC filter
├── voltage_divider.svg        (2.9 KB) - Voltage divider
└── rlc_series.svg             (3.2 KB) - RLC series circuit
```

---

## 📝 Use in Markdown

```markdown
![555 Timer](/images/circuits/generated/555_timer_complete.svg)
![RC Filter](/images/circuits/netlist/rc_lowpass.svg)
```

---

## 🛠️ Scripts Explained

| Script | What It Does | Output |
|--------|--------------|--------|
| `scripts/generate_circuit_diagrams.py` | Generates 5 basic SchemDraw circuits ⭐ | `frontend/public/images/circuits/generated/` |
| `scripts/generate_full_circuit.py` | Generates 555 timer circuit | `frontend/public/images/circuits/generated/` |
| `scripts/generate_netlist_circuits.py` | Generates 3 NetlistSVG circuits | `frontend/public/images/circuits/netlist/` |

**Total: 10 circuits (7 SchemDraw + 3 NetlistSVG)**

---

## ✅ Quick Checklist

- [ ] Run `python scripts/generate_full_circuit.py`
- [ ] Run `python scripts/generate_netlist_circuits.py`
- [ ] Verify 7 SVG files created
- [ ] Start dev server: `cd frontend && npm run dev`
- [ ] Open browser: `http://localhost:3002/tech/circuits/01-555-timer-led-flasher`
- [ ] Verify circuits visible with white background

---

## 🎨 Styling (Already Applied)

Images automatically get:
- ✅ White background (visible on dark theme)
- ✅ Green border (#10b981)
- ✅ Padding (2rem)
- ✅ Shadow effect
- ✅ Left-aligned

---

## 📚 Full Documentation

- **Complete Guide**: `CIRCUIT_DIAGRAM_AUTOMATION_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE_CIRCUIT_DIAGRAMS.md`
- **This Cheat Sheet**: `GENERATE_CIRCUITS_CHEATSHEET.md`

---

**That's it! Two commands generate all 7 circuits.** 🎉

