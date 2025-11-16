---
title: "TikZ Embedded Circuit Diagrams"
description: "Advanced circuit visualization using TikZJax for embedded LaTeX diagrams"
date: "2025-11-10"
category: "circuits"
tags: ["tikz", "visualization", "advanced", "latex"]
author: "Jose Lorenzo"

# Learning path metadata
module: "03-advanced-topics"
order: 1
prerequisites:
  - "01-fundamentals/01-dc-circuit-basics"
difficulty: "advanced"
estimatedTime: "10 min"
---

# TikZ Embedded Circuit Diagrams

This article demonstrates **TikZJax** - the ability to embed TikZ/CircuiTikZ code directly in markdown and have it render as SVG in the browser!

---

## Your Op-Amp Circuit

Here's your exact TikZ code rendering live:

<script type="text/tikz">
\begin{tikzpicture}
  % Paths, nodes and wires:
  \node[shape=rectangle, draw, line width=1pt, minimum width=2.965cm, minimum height=4.215cm] at (10, 6.375){};
  \node[shape=rectangle, rotate=-90, draw, line width=1pt, minimum width=1.965cm, minimum height=2.715cm] at (8, 8.125){};
  \node[op amp] at (14.5, 7.75){};
  \node[op amp] at (14.583, 5.039){};
  \node[op amp] at (10.81, 10.5){};
  \node[op amp] at (15.833, 8.461){};
\end{tikzpicture}
</script>

*Figure 1: Four-stage operational amplifier configuration with control blocks*

## How It Works

**TikZJax** runs TeX in WebAssembly directly in your browser, converting TikZ code to SVG on-the-fly!

**Benefits:**
- ✅ No image conversion needed
- ✅ No external image files
- ✅ Version control friendly (text-based)
- ✅ Scalable vector graphics
- ✅ Professional IEEE-standard diagrams

## Simple Circuit Example

Here's a basic voltage divider:

<script type="text/tikz">
\begin{tikzpicture}[circuit ee IEC, scale=0.8]
  \draw (0,0) node[ground] {}
              to [resistor={info={$R_2$}}] (0,2)
              to [resistor={info={$R_1$}}] (0,4)
              to [voltage source={info={$V_T$}}] (0,6);
  \draw (0,2) -- (1,2) node[right] {$V_{out}$};
\end{tikzpicture}
</script>

*Figure 2: Voltage divider circuit*

The output voltage is given by:

$$V_{out} = V_T \times \frac{R_2}{R_1 + R_2}$$

## Key Takeaways

✅ **Embedded TikZ:** Paste TikZ code directly in markdown
✅ **No conversion:** Renders automatically in browser
✅ **Professional:** IEEE-standard circuit diagrams
✅ **Scalable:** Vector graphics that look crisp at any size

## Conclusion

**TikZJax makes it incredibly easy to add professional circuit diagrams to your markdown articles!**

No more:
- ❌ Converting to images
- ❌ Managing image files
- ❌ Uploading to servers
- ❌ Dealing with image scaling

Just paste your TikZ code and it renders! 🎉

---

**Next Topics:** Mesh Analysis, Nodal Analysis, Op-Amp Circuits
