---
title: "Circuit Diagrams with SchemDraw"
date: "2024-11-12"
category: "circuits"
tags: ["Circuit Diagrams", "SchemDraw", "Visualization"]
description: "Testing circuit diagram generation with SchemDraw library"
author: "Jose Lorenzo"

# Learning path metadata
module: "01-fundamentals"
order: 3
prerequisites: []
difficulty: "beginner"
estimatedTime: "10 min"
---

## Introduction

This is a test of circuit diagram generation using SchemDraw.

## Simple Voltage Divider

Here's a basic voltage divider circuit:

![Voltage Divider](/images/circuits/generated/voltage-divider.svg)

The circuit above shows a 10V source connected to two 1kΩ resistors in series.

### Circuit Analysis

Using the voltage divider formula:

$$
V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}
$$

With equal resistors (1kΩ each):

$$
V_{out} = 10V \times \frac{1kΩ}{1kΩ + 1kΩ} = 5V
$$

---

## RC Circuit

An RC (Resistor-Capacitor) circuit:

![RC Circuit](/images/circuits/generated/rc-circuit.svg)

This demonstrates a simple RC low-pass filter.

### Cutoff Frequency

The cutoff frequency is calculated as:

$$
f_c = \frac{1}{2\pi RC}
$$

For R = 1kΩ and C = 10μF:

$$
f_c = \frac{1}{2\pi \times 1000 \times 10 \times 10^{-6}} = 15.9 Hz
$$

---

## LED Circuit

A basic LED circuit with current-limiting resistor:

![LED Circuit](/images/circuits/generated/led-circuit.svg)

This shows proper LED connection with a 330Ω current-limiting resistor.

### Current Calculation

Assuming LED forward voltage (V_f) = 2V:

$$
I = \frac{V_{supply} - V_f}{R} = \frac{5V - 2V}{330Ω} = 9.1mA
$$

This is a safe current for most standard LEDs (typically rated for 20mA max).

