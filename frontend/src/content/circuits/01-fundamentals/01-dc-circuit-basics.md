---
title: "DC Circuit Fundamentals: Ohm's Law & Basic Principles"
date: "2024-10-27"
category: "circuits"
tags: ["DC Circuits", "Ohm's Law", "Electronics Basics", "Circuit Analysis"]
description: "Master the fundamentals of DC circuits including Ohm's Law, voltage dividers, current dividers, and essential circuit analysis techniques."
author: "Jose Lorenzo"

# Learning path metadata
module: "01-fundamentals"
order: 1
prerequisites: []
next: "01-fundamentals/02-voltage-current-dividers"
difficulty: "beginner"
estimatedTime: "20 min"
---

## Introduction

Understanding DC (Direct Current) circuits is fundamental to electronics. This guide covers the essential laws and principles that govern how electricity flows through circuits.

---

## ⚡ Ohm's Law

**Ohm's Law** is the most fundamental relationship in electronics, relating voltage, current, and resistance.

### The Formula

$$
V = I \times R
$$

Where:
- **V** = Voltage (Volts)
- **I** = Current (Amperes)
- **R** = Resistance (Ohms, Ω)

### Derived Forms

$$
I = \frac{V}{R}
$$

$$
R = \frac{V}{I}
$$

### Practical Example

**Given:** A 9V battery connected to a 470Ω resistor

**Find:** Current flowing through the circuit

$$
I = \frac{V}{R} = \frac{9V}{470Ω} = 0.0191A = 19.1mA
$$

---

## 🔋 Power in DC Circuits

Power is the rate at which energy is consumed or produced in a circuit.

### Basic Power Formula

$$
P = V \times I
$$

Where:
- **P** = Power (Watts)
- **V** = Voltage (Volts)
- **I** = Current (Amperes)

### Derived Power Formulas

Using Ohm's Law, we can derive alternative forms:

$$
P = I^2 \times R
$$

$$
P = \frac{V^2}{R}
$$

### Power Example

**Given:** 12V across a 100Ω resistor

**Find:** Power dissipated

$$
P = \frac{V^2}{R} = \frac{(12V)^2}{100Ω} = \frac{144}{100} = 1.44W
$$

---

## 🔗 Series Circuits

In a **series circuit**, components are connected end-to-end, forming a single path for current flow.

### Key Properties

1. **Current is the same** through all components:
   $$
   I_{total} = I_1 = I_2 = I_3 = ... = I_n
   $$

2. **Voltage divides** across components:
   $$
   V_{total} = V_1 + V_2 + V_3 + ... + V_n
   $$

3. **Total resistance** is the sum of individual resistances:
   $$
   R_{total} = R_1 + R_2 + R_3 + ... + R_n
   $$

### Series Circuit Example

**Given:** Three resistors in series: R₁ = 100Ω, R₂ = 220Ω, R₃ = 330Ω, connected to 12V

**Find:** Total resistance and current

$$
R_{total} = 100Ω + 220Ω + 330Ω = 650Ω
$$

$$
I = \frac{V}{R_{total}} = \frac{12V}{650Ω} = 0.0185A = 18.5mA
$$

---

## ⚡ Voltage Divider Rule (VDR)

The **Voltage Divider** is one of the most useful circuit configurations in electronics.

### Formula for 2 Resistors

$$
V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}
$$

### General Formula for n Resistors

For any resistor **Rₓ** in a series chain:

$$
V_x = V_{total} \times \frac{R_x}{R_{total}}
$$

### Voltage Divider Example

**Given:** 12V input, R₁ = 10kΩ, R₂ = 5kΩ

**Find:** Output voltage across R₂

$$
V_{out} = 12V \times \frac{5kΩ}{10kΩ + 5kΩ} = 12V \times \frac{5}{15} = 4V
$$

### Practical Applications

- **Sensor interfaces** - Converting sensor resistance to voltage
- **Reference voltages** - Creating specific voltage levels
- **Signal attenuation** - Reducing signal amplitude
- **Biasing circuits** - Setting operating points for transistors

---

## 🔀 Parallel Circuits

In a **parallel circuit**, components are connected across the same two points, providing multiple paths for current.

### Key Properties

1. **Voltage is the same** across all components:
   $$
   V_{total} = V_1 = V_2 = V_3 = ... = V_n
   $$

2. **Current divides** among branches:
   $$
   I_{total} = I_1 + I_2 + I_3 + ... + I_n
   $$

3. **Total resistance** (reciprocal formula):
   $$
   \frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ... + \frac{1}{R_n}
   $$

### Simplified Formula for 2 Resistors

$$
R_{total} = \frac{R_1 \times R_2}{R_1 + R_2}
$$

### Parallel Circuit Example

**Given:** Two resistors in parallel: R₁ = 100Ω, R₂ = 150Ω, connected to 12V

**Find:** Total resistance and total current

$$
R_{total} = \frac{100Ω \times 150Ω}{100Ω + 150Ω} = \frac{15000}{250} = 60Ω
$$

$$
I_{total} = \frac{12V}{60Ω} = 0.2A = 200mA
$$

---

## ⚡ Current Divider Rule (CDR)

The **Current Divider** determines how current splits among parallel branches.

### Derivation for 2 Parallel Resistors

**Step 1: Equivalent Resistance**

$$
R_{eq} = \frac{R_1 \times R_2}{R_1 + R_2}
$$

**Step 2: Voltage Across Parallel Combination**

$$
V = I_T \times R_{eq} = I_T \times \frac{R_1 \times R_2}{R_1 + R_2}
$$

**Step 3: Current Through Each Resistor**

For R₁:
$$
I_1 = \frac{V}{R_1} = I_T \times \frac{R_2}{R_1 + R_2}
$$

For R₂:
$$
I_2 = \frac{V}{R_2} = I_T \times \frac{R_1}{R_1 + R_2}
$$

### 🔑 Key Insight

**Notice:** Current flows **inversely** to resistance:
- The **smaller** resistor gets **more** current
- The **larger** resistor gets **less** current

### General CDR Formula

For any resistor **Rₓ** in a parallel network:

$$
I_x = I_T \times \frac{R_{eq}}{R_x}
$$

Where:
- **I_x** = Current through resistor x
- **I_T** = Total current entering the parallel network
- **R_eq** = Equivalent resistance of all parallel resistors
- **R_x** = Resistance of the specific resistor

### Current Divider Example

**Given:** Total current I_T = 100mA, R₁ = 100Ω, R₂ = 200Ω in parallel

**Find:** Current through each resistor

**Step 1:** Calculate equivalent resistance
$$
R_{eq} = \frac{100Ω \times 200Ω}{100Ω + 200Ω} = \frac{20000}{300} = 66.67Ω
$$

**Step 2:** Calculate I₁
$$
I_1 = 100mA \times \frac{200Ω}{100Ω + 200Ω} = 100mA \times \frac{2}{3} = 66.67mA
$$

**Step 3:** Calculate I₂
$$
I_2 = 100mA \times \frac{100Ω}{100Ω + 200Ω} = 100mA \times \frac{1}{3} = 33.33mA
$$

**Verification:**
$$
I_1 + I_2 = 66.67mA + 33.33mA = 100mA = I_T \quad ✓
$$

---

## 📊 Kirchhoff's Laws

### Kirchhoff's Current Law (KCL)

**The sum of currents entering a node equals the sum of currents leaving the node.**

$$
\sum I_{in} = \sum I_{out}
$$

Or equivalently:
$$
\sum I = 0
$$

**Example:** At a node where I₁ = 5A enters, and I₂ = 2A and I₃ = 3A leave:
$$
I_1 = I_2 + I_3
$$
$$
5A = 2A + 3A \quad ✓
$$

### Kirchhoff's Voltage Law (KVL)

**The sum of all voltages around any closed loop equals zero.**

$$
\sum V = 0
$$

**Example:** In a loop with a 12V battery and three resistors with voltage drops of 4V, 5V, and 3V:
$$
+12V - 4V - 5V - 3V = 0 \quad ✓
$$

---

## 🛠️ Practical Circuit Analysis Tips

### 1. **Simplify Complex Circuits**
- Combine series resistors: R_total = R₁ + R₂ + R₃
- Combine parallel resistors: Use reciprocal formula
- Work step-by-step from inside out

### 2. **Use the Right Formula**
- **Series:** Same current, voltage divides
- **Parallel:** Same voltage, current divides
- **Power:** P = V × I = I²R = V²/R

### 3. **Check Your Work**
- Verify KCL at nodes (currents balance)
- Verify KVL around loops (voltages sum to zero)
- Check if power in = power out

### 4. **Common Mistakes to Avoid**
- ❌ Adding parallel resistances directly
- ❌ Forgetting to convert units (mA to A, kΩ to Ω)
- ❌ Using wrong power formula
- ❌ Ignoring polarity in KVL

---

## 🧮 Quick Reference Formulas

### Ohm's Law
```
V = I × R
I = V / R
R = V / I
```

### Power
```
P = V × I
P = I² × R
P = V² / R
```

### Series Circuits
```
I_total = I₁ = I₂ = I₃
V_total = V₁ + V₂ + V₃
R_total = R₁ + R₂ + R₃
```

### Parallel Circuits
```
V_total = V₁ = V₂ = V₃
I_total = I₁ + I₂ + I₃
1/R_total = 1/R₁ + 1/R₂ + 1/R₃
```

### Voltage Divider
```
V_out = V_in × (R₂ / (R₁ + R₂))
```

### Current Divider (2 resistors)
```
I₁ = I_total × (R₂ / (R₁ + R₂))
I₂ = I_total × (R₁ / (R₁ + R₂))
```

---

## 🎯 Practice Problems

### Problem 1: Series Circuit
**Given:** 9V battery, three resistors: 100Ω, 220Ω, 330Ω in series

**Find:**
a) Total resistance
b) Circuit current
c) Voltage across each resistor
d) Power dissipated by each resistor

### Problem 2: Parallel Circuit
**Given:** 12V source, two resistors in parallel: 1kΩ and 2kΩ

**Find:**
a) Total resistance
b) Current through each resistor
c) Total current
d) Total power

### Problem 3: Voltage Divider
**Given:** 5V input, need 3.3V output using voltage divider

**Find:** Resistor values if R₁ + R₂ = 10kΩ

---

## 🔬 Real-World Applications

### Arduino/ESP32 Projects
- **LED current limiting** - Using Ohm's Law to calculate resistor values
- **Voltage sensing** - Using voltage dividers to read higher voltages
- **Pull-up/pull-down resistors** - Ensuring defined logic levels

### Power Supply Design
- **Load calculations** - Determining current requirements
- **Heat dissipation** - Calculating power in resistors
- **Voltage regulation** - Using dividers for reference voltages

### Sensor Circuits
- **Thermistors** - Temperature sensing with voltage dividers
- **Photoresistors** - Light sensing circuits
- **Potentiometers** - Variable voltage dividers for user input

---

## 📚 Next Steps

Now that you understand DC circuit fundamentals, explore:

1. **AC Circuits** - Capacitors, inductors, and impedance
2. **Transistor Circuits** - Amplifiers and switches
3. **Op-Amp Circuits** - Analog signal processing
4. **Digital Logic** - Gates, flip-flops, and microcontrollers

---

## 🎓 Summary

**Key Takeaways:**

✅ **Ohm's Law** (V = IR) is the foundation of circuit analysis

✅ **Series circuits** have the same current, voltage divides

✅ **Parallel circuits** have the same voltage, current divides

✅ **Voltage dividers** create reference voltages from resistors

✅ **Current dividers** split current inversely to resistance

✅ **Kirchhoff's Laws** (KCL & KVL) verify circuit solutions

✅ **Power formulas** calculate energy dissipation

---

**Master these fundamentals, and you'll be ready to tackle any DC circuit!** ⚡

