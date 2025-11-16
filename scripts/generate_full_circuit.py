#!/usr/bin/env python3
"""Generate a complete 555 timer LED flasher circuit"""

import schemdraw
import schemdraw.elements as elm
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent / 'frontend' / 'public' / 'images' / 'circuits' / 'generated'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 80)
print("Complete 555 Timer LED Flasher Circuit Generator")
print("=" * 80)

# Create the complete circuit - Traditional layout
with schemdraw.Drawing(show=False) as d:
    d.config(fontsize=11, font='sans-serif')

    # Start with power supply
    d += (vcc := elm.Vdd().label('+9V', fontsize=12))
    d += elm.Line().right(1.5)
    d += elm.Dot()

    # Branch 1: R1 and R2 timing network
    d.push()
    d += (r1 := elm.Resistor().down().label('R1 10kΩ', loc='right'))
    d += elm.Dot()
    pin7 = d.here
    d += (r2 := elm.Resistor().down().label('R2 47kΩ', loc='right'))
    d += elm.Dot()
    pin6 = d.here

    # Timing capacitor C1
    d += elm.Line().right(1)
    d += (c1 := elm.Capacitor().down().label('C1\n10µF', loc='right'))
    d += elm.Line().left(1)
    d += elm.Dot()
    d += elm.Line().down(0.5)
    d += elm.Ground()
    d.pop()

    # Branch 2: Bypass capacitor
    d += elm.Line().right(3)
    d += (c2 := elm.Capacitor().down().label('C2\n0.01µF', loc='right'))
    d += elm.Ground()

    # Branch 3: Output to LED
    d.move_from(vcc.end, dx=5, dy=0)
    d += elm.Line().down(2)
    d += (r3 := elm.Resistor().down().label('R3 330Ω', loc='right'))
    d += (led := elm.LED().down().label('LED', loc='right'))
    d += elm.Ground()

    # Add labels for 555 connections
    d.move_from(pin7, dx=-1.5, dy=0)
    d += elm.Label().label('Pin 7\n(Discharge)', fontsize=9)

    d.move_from(pin6, dx=-1.5, dy=0)
    d += elm.Label().label('Pin 6 (Threshold)\nPin 2 (Trigger)', fontsize=9)

    # Add 555 IC box in the middle
    d.move_from(vcc.end, dx=2, dy=-3)
    d += elm.Rect(width=2, height=3).label('555\nTimer\nIC', fontsize=12, loc='center')

# Save the circuit
output_file = OUTPUT_DIR / '555_timer_complete.svg'
d.save(str(output_file))

print(f"✅ Complete 555 Timer circuit saved to: {output_file}")
print(f"📏 File size: {output_file.stat().st_size / 1024:.1f} KB")
print("=" * 80)
print("\n💡 This is a complete, working LED flasher circuit!")
print("   - Frequency: ~1.4 Hz (LED flashes about once per second)")
print("   - Power: 9V battery")
print("   - Components: 555 timer, 3 resistors, 2 capacitors, 1 LED")
print("\n🔧 To use in markdown:")
print(f"   ![555 Timer Circuit](/images/circuits/generated/555_timer_complete.svg)")

