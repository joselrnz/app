---
title: "Voltage and Current Divider Rules"
description: "Fundamental circuit analysis techniques for calculating voltage drops and current distribution in series and parallel circuits"
date: "2024-11-08"
category: "circuits"
tags: ["circuit-analysis", "fundamentals", "voltage", "current", "resistors"]
author: "Jose Lorenzo"

# Learning path metadata
module: "01-fundamentals"
order: 2
prerequisites:
  - "01-fundamentals/01-dc-circuit-basics"
previous: "01-fundamentals/01-dc-circuit-basics"
difficulty: "beginner"
estimatedTime: "15 min"
---

# Voltage and Current Divider Rules

Two of the most fundamental and frequently used techniques in circuit analysis are the **Voltage Divider Rule** and the **Current Divider Rule**. These rules provide quick methods to calculate voltage drops across series resistors and current distribution through parallel resistors without solving complex circuit equations.

## Quick Visual Comparison

### Voltage Divider (Series)
```
     VT = 12V
        +
        |
      [R1] ← V1 = VT × R1/(R1+R2)
        |
      [R2] ← V2 = VT × R2/(R1+R2)
        |
       GND
```

### Current Divider (Parallel)
```
    IT = 6A
        ↓
    ┌───┴───┐
    |       |
  [R1]    [R2]
    ↓       ↓
   I1      I2
    |       |
    └───┬───┘
       GND

I1 = IT × R2/(R1+R2)  ← Notice: R2 in numerator!
I2 = IT × R1/(R1+R2)  ← Notice: R1 in numerator!
```

**Key Difference:**

- **VDR**: Voltage proportional to **own** resistance (direct)
- **CDR**: Current proportional to **other** resistance (inverse)

---

## 1. Voltage Divider Rule (VDR)

### Overview

The **Voltage Divider Rule** is used to determine the voltage across a resistor in a series circuit. When resistors are connected in series, the total voltage is divided among them proportionally to their resistance values.

### The Formula

For a series circuit with resistors $R_1, R_2, ..., R_n$ and total voltage $V_T$, the voltage across resistor $R_k$ is:

$$
V_k = V_T \times \frac{R_k}{R_1 + R_2 + ... + R_n}
$$

Or more simply, for two resistors in series:

$$
V_1 = V_T \times \frac{R_1}{R_1 + R_2}
$$

$$
V_2 = V_T \times \frac{R_2}{R_1 + R_2}
$$

### Circuit Diagram

![Voltage Divider Circuit](/images/circuits/generated/voltage_divider_detailed.svg)

**Circuit Analysis:**
- Total voltage VT = 12V is divided between R1 and R2
- V1 across R1 (10kΩ) = 8V
- V2 across R2 (5kΩ) = 4V
- Notice: Larger resistor gets larger voltage drop
- Series Circuit: Same current I flows through all resistors

### Detailed Derivation

Starting with Ohm's Law and Kirchhoff's Voltage Law (KVL):

**Step 1:** Apply KVL to the series circuit
$$V_T = V_1 + V_2 + ... + V_n$$

**Step 2:** Express each voltage using Ohm's Law ($V = IR$)
$$V_T = IR_1 + IR_2 + ... + IR_n$$

**Step 3:** Factor out the current (same in series)
$$V_T = I(R_1 + R_2 + ... + R_n) = I \cdot R_{total}$$

**Step 4:** Solve for current
$$I = \frac{V_T}{R_{total}} = \frac{V_T}{R_1 + R_2 + ... + R_n}$$

**Step 5:** Find voltage across any resistor $R_k$
$$V_k = I \times R_k = \frac{V_T}{R_1 + R_2 + ... + R_n} \times R_k$$

**Step 6:** Rearrange to get the Voltage Divider Rule
$$\boxed{V_k = V_T \times \frac{R_k}{R_1 + R_2 + ... + R_n}}$$

**Physical Interpretation:** The voltage across a resistor is proportional to its resistance relative to the total resistance. A resistor with twice the resistance gets twice the voltage drop.

### Example 1: Simple Voltage Divider

**Given:**
- Total voltage: $V_T = 12V$
- Resistor 1: $R_1 = 3k\Omega$
- Resistor 2: $R_2 = 6k\Omega$

**Find:** Voltage across each resistor

**Solution:**

Total resistance:
$$R_{total} = R_1 + R_2 = 3k\Omega + 6k\Omega = 9k\Omega$$

Voltage across $R_1$:
$$V_1 = 12V \times \frac{3k\Omega}{9k\Omega} = 12V \times \frac{1}{3} = 4V$$

Voltage across $R_2$:
$$V_2 = 12V \times \frac{6k\Omega}{9k\Omega} = 12V \times \frac{2}{3} = 8V$$

**Verification:** $V_1 + V_2 = 4V + 8V = 12V$ ✓

### Example 2: Three Resistors in Series

**Given:**
- Total voltage: $V_T = 24V$
- $R_1 = 2\Omega$, $R_2 = 4\Omega$, $R_3 = 6\Omega$

**Find:** Voltage across $R_2$

**Solution:**

$$V_2 = 24V \times \frac{4\Omega}{2\Omega + 4\Omega + 6\Omega} = 24V \times \frac{4}{12} = 8V$$

### Practical Applications

1. **Sensor Interfacing**: Converting sensor resistance changes to voltage signals
2. **Reference Voltage Generation**: Creating specific voltage levels from a supply
3. **Biasing Circuits**: Setting DC operating points in amplifiers
4. **Level Shifting**: Adjusting signal voltage levels
5. **Battery Monitoring**: Measuring battery voltage with protection

### Important Notes

⚠️ **Loading Effect**: The voltage divider formula assumes no current is drawn from the output. When a load is connected, the effective resistance changes:

$$V_{out} = V_T \times \frac{R_2 \parallel R_{load}}{R_1 + (R_2 \parallel R_{load})}$$

where $R_2 \parallel R_{load} = \frac{R_2 \times R_{load}}{R_2 + R_{load}}$

---

## 2. Current Divider Rule (CDR)

### Overview

The **Current Divider Rule** is used to determine how current splits between parallel branches. When resistors are connected in parallel, the total current divides inversely proportional to their resistance values (lower resistance gets more current).

### The Formula

For parallel resistors $R_1$ and $R_2$ with total current $I_T$, the current through each resistor is:

$$
I_1 = I_T \times \frac{R_2}{R_1 + R_2}
$$

$$
I_2 = I_T \times \frac{R_1}{R_1 + R_2}
$$

**Note:** The current through a resistor is proportional to the **other** resistor's value (inverse relationship).

### General Formula (Multiple Resistors)

For $n$ resistors in parallel, the current through resistor $R_k$ is:

$$
I_k = I_T \times \frac{R_{eq}}{R_k}
$$

where $R_{eq}$ is the equivalent parallel resistance:

$$
\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_n}
$$

### Circuit Diagram

![Current Divider Circuit](/images/circuits/generated/current_divider.svg)

**Circuit Analysis:**
- Total current IT = 6A splits between R1 and R2
- I1 through R1 (10Ω) = 4A
- I2 through R2 (20Ω) = 2A
- Notice: Smaller resistor gets larger current (inverse relationship)
- Parallel Circuit: Same voltage V across all resistors
- Current splits: IT = I1 + I2 + ... + In

### Detailed Derivation

Using Ohm's Law and Kirchhoff's Current Law (KCL):

**Step 1:** Apply KCL at the junction
$$I_T = I_1 + I_2 + ... + I_n$$

**Step 2:** In parallel, voltage is the same across all resistors
$$V = I_1 R_1 = I_2 R_2 = ... = I_n R_n$$

**Step 3:** Express the voltage using total current and equivalent resistance
$$V = I_T \times R_{eq}$$

where for parallel resistors:
$$\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_n}$$

**Step 4:** Find current through any resistor $R_k$ using Ohm's Law
$$I_k = \frac{V}{R_k} = \frac{I_T \times R_{eq}}{R_k}$$

**Step 5:** For two resistors, substitute $R_{eq} = \frac{R_1 \times R_2}{R_1 + R_2}$
$$I_1 = I_T \times \frac{R_1 \times R_2}{R_1(R_1 + R_2)} = I_T \times \frac{R_2}{R_1 + R_2}$$

**Step 6:** Current Divider Rule (Two Resistors)
$$\boxed{I_1 = I_T \times \frac{R_2}{R_1 + R_2}}$$

$$\boxed{I_2 = I_T \times \frac{R_1}{R_1 + R_2}}$$

**Physical Interpretation:** Current takes the path of least resistance. A resistor with half the resistance carries twice the current. Notice the "opposite" resistor appears in the numerator - this is the inverse relationship.

### Example 3: Simple Current Divider

**Given:**
- Total current: $I_T = 6A$
- Resistor 1: $R_1 = 4\Omega$
- Resistor 2: $R_2 = 8\Omega$

**Find:** Current through each resistor

**Solution:**

Current through $R_1$ (note: uses $R_2$ in numerator):
$$I_1 = 6A \times \frac{8\Omega}{4\Omega + 8\Omega} = 6A \times \frac{8}{12} = 4A$$

Current through $R_2$ (note: uses $R_1$ in numerator):
$$I_2 = 6A \times \frac{4\Omega}{4\Omega + 8\Omega} = 6A \times \frac{4}{12} = 2A$$

**Verification:** $I_1 + I_2 = 4A + 2A = 6A$ ✓

**Observation:** $R_1$ has half the resistance of $R_2$, so it carries twice the current.

### Example 4: Three Parallel Resistors

**Given:**
- Total current: $I_T = 12A$
- $R_1 = 6\Omega$, $R_2 = 3\Omega$, $R_3 = 2\Omega$

**Find:** Current through $R_2$

**Solution:**

First, find equivalent resistance:
$$\frac{1}{R_{eq}} = \frac{1}{6} + \frac{1}{3} + \frac{1}{2} = \frac{1 + 2 + 3}{6} = 1$$

$$R_{eq} = 1\Omega$$

Current through $R_2$:
$$I_2 = 12A \times \frac{1\Omega}{3\Omega} = 4A$$

### Practical Applications

1. **Current Sensing**: Shunt resistors for measuring high currents
2. **Load Sharing**: Distributing current among parallel power supplies
3. **LED Arrays**: Balancing current through parallel LED strings
4. **Battery Charging**: Managing charge current distribution
5. **Protection Circuits**: Bypassing excess current around sensitive components

### Special Cases

#### Case 1: Equal Resistors

When all parallel resistors have the same value ($R_1 = R_2 = ... = R_n = R$), the current divides equally:

$$I_k = \frac{I_T}{n}$$

**Proof:**
$$R_{eq} = \frac{R}{n}$$

$$I_k = I_T \times \frac{R_{eq}}{R_k} = I_T \times \frac{R/n}{R} = \frac{I_T}{n}$$

**Example:** Three equal $6\Omega$ resistors with $I_T = 9A$:
$$I_1 = I_2 = I_3 = \frac{9A}{3} = 3A$$

#### Case 2: Two Equal Resistors

Special case where each resistor gets exactly half the total current:

$$I_1 = I_2 = \frac{I_T}{2}$$

**Proof:**
$$I_1 = I_T \times \frac{R_2}{R_1 + R_2} = I_T \times \frac{R}{R + R} = I_T \times \frac{R}{2R} = \frac{I_T}{2}$$

#### Case 3: One Resistor Much Smaller

When $R_1 \ll R_2$ (e.g., $R_1 = 0.01R_2$), almost all current flows through $R_1$:

$$I_1 \approx I_T \times \frac{R_2}{R_1} \approx I_T$$

$$I_2 \approx I_T \times \frac{R_1}{R_2} \approx 0$$

**Example:** $R_1 = 1\Omega$, $R_2 = 1000\Omega$, $I_T = 10A$:
$$I_1 = 10A \times \frac{1000}{1001} \approx 9.99A$$
$$I_2 = 10A \times \frac{1}{1001} \approx 0.01A$$

This is the principle behind **shunt resistors** for current measurement.

#### Case 4: Conductance Form (Alternative)

For easier calculation with many parallel resistors, use conductance ($G = 1/R$):

$$I_k = I_T \times \frac{G_k}{G_1 + G_2 + ... + G_n}$$

This makes the formula look like voltage divider (direct proportion)!

**Example:** $R_1 = 2\Omega$ (G₁ = 0.5S), $R_2 = 4\Omega$ (G₂ = 0.25S), $I_T = 6A$:
$$I_1 = 6A \times \frac{0.5}{0.5 + 0.25} = 6A \times \frac{0.5}{0.75} = 4A$$

---

## Comparison: VDR vs CDR

| Aspect | Voltage Divider Rule | Current Divider Rule |
|--------|---------------------|---------------------|
| **Circuit Type** | Series resistors | Parallel resistors |
| **Divides** | Voltage | Current |
| **Proportional to** | Resistance (direct) | Resistance (inverse) |
| **Formula Pattern** | $V_k = V_T \times \frac{R_k}{R_{total}}$ | $I_k = I_T \times \frac{R_{other}}{R_{sum}}$ |
| **Equal Values** | Equal voltage drops | Equal current splits |
| **Common Use** | Biasing, references | Current sensing, sharing |

---

## Combined Example: Mixed Circuit

**Problem:** A 12V source connects to a series combination of $R_1 = 2\Omega$ and a parallel combination of $R_2 = 6\Omega$ and $R_3 = 3\Omega$.

**Find:** 
1. Voltage across the parallel combination
2. Current through $R_2$ and $R_3$

**Solution:**

**Step 1:** Find equivalent resistance of parallel combination:
$$R_{23} = \frac{R_2 \times R_3}{R_2 + R_3} = \frac{6 \times 3}{6 + 3} = 2\Omega$$

**Step 2:** Use VDR to find voltage across parallel combination:
$$V_{23} = 12V \times \frac{2\Omega}{2\Omega + 2\Omega} = 6V$$

**Step 3:** Find total current through parallel combination:
$$I_{total} = \frac{V_{23}}{R_{23}} = \frac{6V}{2\Omega} = 3A$$

**Step 4:** Use CDR to find individual currents:
$$I_2 = 3A \times \frac{3\Omega}{6\Omega + 3\Omega} = 1A$$

$$I_3 = 3A \times \frac{6\Omega}{6\Omega + 3\Omega} = 2A$$

**Verification:** $I_2 + I_3 = 1A + 2A = 3A$ ✓

---

## Key Takeaways

✅ **Voltage Divider Rule**: Use for series resistors to find voltage drops
- Voltage divides **proportionally** to resistance
- Higher resistance → Higher voltage drop

✅ **Current Divider Rule**: Use for parallel resistors to find current distribution  
- Current divides **inversely** to resistance
- Lower resistance → Higher current flow

✅ **Remember**: 
- Series circuits: Same current, voltage divides
- Parallel circuits: Same voltage, current divides

✅ **Practical Tip**: Always verify your answer using KVL (voltages sum to source) or KCL (currents sum to total)

---

## Interactive Circuit Simulator

Try this interactive voltage divider circuit in Falstad Circuit Simulator:

<div style="margin: 20px 0; padding: 15px; background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; border-radius: 8px;">
  <p style="margin: 0 0 10px 0; font-weight: 600; color: #10b981;">🔧 Interactive Demo</p>
  <p style="margin: 0 0 10px 0;">Click the link below to open an interactive voltage divider circuit. You can:</p>
  <ul style="margin: 0 0 10px 0;">
    <li>Adjust resistor values by right-clicking on them</li>
    <li>See voltage and current values in real-time</li>
    <li>Verify the voltage divider formula yourself!</li>
  </ul>
  <a href="https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgpABZsKBTAWjDACgAncDQkPK7Hhp8qVMJDYBnEIOH9aNPCKjgQAMwCGAG0kM2Ad2695YHjIQoobAMYyh5y6d7YLtKLHhgkTYtEpZsRWxiPDJCSHoWUTYtOzkBexdLMXdIcS8IwjQ8UycsKwA3BSUk4uVRWiokCpgETjiHMtKxODYAezdCYSoaSFIQNFTqgbdsdpkQLpVe-sGYSCQIS3oxjqopnr7idyzq2CRLZJk2QQmAMQhRD09UuHSQFhAAYQ0ABw1rAEsAFw0AO2selOwguKnmEDAsAgjwAkn8ACYAV2svwBQKUVFBKXujwASgxJJ9JKjAWwABaqYRjIA" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 8px 16px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
    Open Interactive Circuit Simulator →
  </a>
</div>

---

## Real-World Application: LED Brightness Control

Let's design a practical circuit that uses both VDR and CDR principles.

### Problem Statement

Design a circuit to power two LEDs with different brightness levels from a 9V battery:
- LED1 (Red): Needs 2V at 20mA (bright)
- LED2 (Green): Needs 2V at 10mA (dim)

### Circuit Design

```
                    9V Battery
                        +
                        |
                      [R1] ← Current limiting resistor
                        |
                    ┌───┴───┐
                    |       |
                  [R2]    [R3]
                    |       |
                  [LED1]  [LED2]
                  (Red)   (Green)
                    |       |
                    └───┬───┘
                       GND

R1 = Series resistor (voltage divider)
R2, R3 = Parallel resistors (current divider)
```

### Solution Steps

**Step 1:** Determine total current needed
$$I_{total} = I_{LED1} + I_{LED2} = 20mA + 10mA = 30mA$$

**Step 2:** Calculate voltage drop needed across R1 (using VDR concept)
$$V_{R1} = V_{battery} - V_{LED} = 9V - 2V = 7V$$

**Step 3:** Calculate R1 value
$$R1 = \frac{V_{R1}}{I_{total}} = \frac{7V}{30mA} = 233\Omega \approx 220\Omega \text{ (standard value)}$$

**Step 4:** Design current divider for LED currents (using CDR)

For LED1 to get 20mA and LED2 to get 10mA (2:1 ratio), we need:
$$\frac{I_2}{I_1} = \frac{R_1}{R_2}$$

Since we want $I_{LED1} = 2 \times I_{LED2}$, we need $R_3 = 2 \times R_2$

Let's choose $R_2 = 100\Omega$, then $R_3 = 200\Omega$

**Step 5:** Verify using CDR

$$I_{LED1} = 30mA \times \frac{R_3}{R_2 + R_3} = 30mA \times \frac{200}{100 + 200} = 20mA$$ ✓

$$I_{LED2} = 30mA \times \frac{R_2}{R_2 + R_3} = 30mA \times \frac{100}{100 + 200} = 10mA$$ ✓

### Final Component Values

- **R1**: 220Ω (voltage divider - drops 7V)
- **R2**: 100Ω (current divider - LED1 path)
- **R3**: 200Ω (current divider - LED2 path)
- **Power dissipation**: $P = V \times I = 9V \times 30mA = 270mW$

This example demonstrates how VDR and CDR work together in practical circuit design! 💡

---

## Practice Problems

### Problem 1
A 15V source is connected to three series resistors: $R_1 = 1k\Omega$, $R_2 = 2k\Omega$, $R_3 = 3k\Omega$. Find the voltage across $R_2$.

<details>
<summary>Solution</summary>

$$V_2 = 15V \times \frac{2k\Omega}{1k\Omega + 2k\Omega + 3k\Omega} = 15V \times \frac{2}{6} = 5V$$
</details>

### Problem 2
A 9A current source feeds two parallel resistors: $R_1 = 6\Omega$ and $R_2 = 3\Omega$. Find the current through each resistor.

<details>
<summary>Solution</summary>

$$I_1 = 9A \times \frac{3\Omega}{6\Omega + 3\Omega} = 3A$$

$$I_2 = 9A \times \frac{6\Omega}{6\Omega + 3\Omega} = 6A$$
</details>

---

**Next Topics**: Thevenin's Theorem, Norton's Theorem, Superposition Principle

