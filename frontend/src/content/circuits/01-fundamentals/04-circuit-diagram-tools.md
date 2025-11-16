---
title: "Circuit Diagram Tools & Visualization"
description: "Comprehensive guide to generating professional circuit diagrams using SchemDraw and NetlistSVG"
date: "2024-11-12"
author: "Circuit Design"
tags: ["schemdraw", "netlistsvg", "visualization", "tools", "svg"]
difficulty: "intermediate"
---

# Circuit Diagram Tools & Visualization

This guide showcases the circuit diagram generation tools integrated into this platform, with examples of each approach.

## Overview

We use two primary tools for generating circuit diagrams:

1. **SchemDraw** (Python) - Professional, publication-quality schematics
2. **NetlistSVG** (JavaScript) - Automatic layout from JSON netlists

Both generate SVG output that can be embedded directly in markdown articles.

---

## SchemDraw Examples

SchemDraw provides precise control over circuit layout with a rich component library.

### Voltage Divider Circuit

![Voltage Divider](/images/circuits/generated/voltage-divider.svg)

A classic voltage divider using two resistors. The output voltage is:

$$
V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}
$$

With equal resistors (R₁ = R₂ = 10kΩ), the output is exactly half the input voltage.

**Applications**:
- Sensor signal conditioning
- Reference voltage generation
- Analog-to-digital converter biasing

---

### RC Circuit (Low-Pass Filter)

![RC Circuit](/images/circuits/generated/rc-circuit.svg)

A resistor-capacitor circuit that filters high-frequency signals.

**Cutoff Frequency**:

$$
f_c = \frac{1}{2\pi RC}
$$

With R = 1kΩ and C = 100nF:

$$
f_c = \frac{1}{2\pi \times 1000 \times 100 \times 10^{-9}} \approx 1.59 \text{ kHz}
$$

**Applications**:
- Audio tone control
- Anti-aliasing filters
- Noise reduction
- Signal smoothing

---

### LED Circuit

![LED Circuit](/images/circuits/generated/led-circuit.svg)

A simple LED circuit with current-limiting resistor.

**Resistor Calculation**:

$$
R = \frac{V_{supply} - V_{LED}}{I_{LED}}
$$

For a red LED (Vf ≈ 2V) at 20mA from 5V:

$$
R = \frac{5V - 2V}{0.02A} = 150\Omega
$$

Use the nearest standard value: **150Ω or 220Ω**.

---

### Complete 555 Timer Circuit

![555 Timer LED Flasher](/images/circuits/generated/555_timer_complete.svg)

A complete, working astable multivibrator circuit. See the [full project guide](/circuits/04-projects/01-555-timer-led-flasher) for detailed build instructions.

**Key Features**:
- Oscillation frequency: ~1.4 Hz
- Duty cycle: ~55%
- Power consumption: <10mA
- Operating voltage: 6-15V

---

## NetlistSVG Examples

NetlistSVG generates circuits from JSON netlists with automatic layout using the ELK graph layout engine.

### RC Low-Pass Filter

![RC Low-Pass Filter](/images/circuits/netlist/rc_lowpass.svg)

Same RC filter as above, but generated from a JSON netlist with automatic component placement.

**JSON Netlist Structure**:
```json
{
  "modules": {
    "rc_lowpass": {
      "ports": {
        "Vin": {"direction": "input", "bits": [2]},
        "Vout": {"direction": "output", "bits": [3]}
      },
      "cells": {
        "R1": {
          "type": "r_v",
          "connections": {"A": [2], "B": [5]},
          "attributes": {"value": "1k"}
        },
        "C1": {
          "type": "c_v",
          "connections": {"A": [5], "B": [4]},
          "attributes": {"value": "100nF"}
        }
      }
    }
  }
}
```

---

### Voltage Divider (NetlistSVG)

![Voltage Divider](/images/circuits/netlist/voltage_divider.svg)

Two resistors in series with automatic layout. Notice the clean, symmetric appearance.

---

### RLC Series Circuit

![RLC Series Circuit](/images/circuits/netlist/rlc_series.svg)

A resistor, inductor, and capacitor in series - the foundation of resonant circuits.

**Resonant Frequency**:

$$
f_0 = \frac{1}{2\pi\sqrt{LC}}
$$

With L = 10mH and C = 100nF:

$$
f_0 = \frac{1}{2\pi\sqrt{10 \times 10^{-3} \times 100 \times 10^{-9}}} \approx 5.03 \text{ kHz}
$$

**Applications**:
- Radio tuning circuits
- Bandpass filters
- Impedance matching
- Oscillator circuits

---

## Tool Comparison

| Feature | SchemDraw | NetlistSVG |
|---------|-----------|------------|
| **Language** | Python | JavaScript/Node.js |
| **Layout** | Manual positioning | Automatic (ELK) |
| **Component Library** | Extensive (100+) | Moderate (20+) |
| **Best For** | Analog circuits | Digital/simple circuits |
| **Customization** | High | Medium |
| **Learning Curve** | Moderate | Easy |
| **Output Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## When to Use Each Tool

### Use SchemDraw When:
- ✅ You need publication-quality diagrams
- ✅ You want precise control over layout
- ✅ You're drawing complex analog circuits
- ✅ You need specialized components (op-amps, transformers, etc.)
- ✅ You're creating educational materials

### Use NetlistSVG When:
- ✅ You want automatic layout
- ✅ You're working with digital logic
- ✅ You have netlists from synthesis tools (Yosys)
- ✅ You need quick, simple diagrams
- ✅ You prefer JSON-based definitions

---

## Generating Your Own Diagrams

### SchemDraw Script

Create a Python script:

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing(show=False) as d:
    d += elm.SourceV().label('5V')
    d += elm.Resistor().right().label('1kΩ')
    d += elm.LED().down().label('LED')
    d += elm.Line().left()
    
d.save('my_circuit.svg')
```

Run: `python my_circuit_script.py`

### NetlistSVG Command

Create a JSON netlist file, then:

```bash
netlistsvg my_circuit.json -o my_circuit.svg --skin analog.svg
```

The `--skin analog.svg` flag ensures proper resistor/capacitor symbols are used.

---

## Integration in This Platform

All circuit diagrams are:
1. **Generated as SVG** - Scalable, crisp at any size
2. **Stored in `/public/images/circuits/`** - Served as static assets
3. **Referenced in markdown** - Standard image syntax
4. **Version controlled** - Tracked in git for reproducibility

### Directory Structure

```
frontend/public/images/circuits/
├── generated/          # SchemDraw outputs
│   ├── voltage-divider.svg
│   ├── rc-circuit.svg
│   ├── led-circuit.svg
│   └── 555_timer_complete.svg
└── netlist/           # NetlistSVG outputs
    ├── rc_lowpass.svg
    ├── voltage_divider.svg
    └── rlc_series.svg
```

---

## Best Practices

### 1. Component Labeling
Always label components with:
- Reference designator (R1, C1, etc.)
- Value (10kΩ, 100nF, etc.)
- Clear, readable font

### 2. Wire Routing
- Minimize crossings
- Use right angles (90°)
- Keep related components close
- Show ground connections clearly

### 3. File Organization
- Use descriptive filenames
- Keep source scripts with outputs
- Document component values
- Include calculation notes

### 4. Accessibility
- Provide alt text for images
- Include text descriptions
- Use high contrast colors
- Ensure SVG text is readable

---

## Resources

### SchemDraw
- [Official Documentation](https://schemdraw.readthedocs.io/)
- [Component Gallery](https://schemdraw.readthedocs.io/en/latest/gallery/index.html)
- [GitHub Repository](https://github.com/cdelker/schemdraw)

### NetlistSVG
- [GitHub Repository](https://github.com/nturley/netlistsvg)
- [Analog Skin Reference](https://github.com/nturley/netlistsvg/blob/master/lib/analog.svg)
- [Digital Skin Reference](https://github.com/nturley/netlistsvg/blob/master/lib/default.svg)

### Circuit Design
- [All About Circuits](https://www.allaboutcircuits.com/)
- [Electronics Tutorials](https://www.electronics-tutorials.ws/)
- [CircuitLab Simulator](https://www.circuitlab.com/)

---

## Next Steps

1. **Explore the [555 Timer Project](/circuits/04-projects/01-555-timer-led-flasher)** - Build a complete working circuit
2. **Learn [DC Circuit Analysis](/circuits/01-fundamentals/01-dc-circuit-basics)** - Understand the fundamentals
3. **Try the tools yourself** - Install SchemDraw or NetlistSVG and create your own diagrams

---

*All diagrams on this page are generated programmatically and can be regenerated with updated parameters at any time.*

