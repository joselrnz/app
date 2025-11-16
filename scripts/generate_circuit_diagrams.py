#!/usr/bin/env python3
"""
Generate circuit diagrams using SchemDraw
Saves SVG files to frontend/public/images/circuits/
"""

import os
import schemdraw
import schemdraw.elements as elm

# Output directory
OUTPUT_DIR = os.path.join('frontend', 'public', 'images', 'circuits', 'generated')
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_voltage_divider():
    """Generate a voltage divider circuit"""
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=12, font='sans-serif')
        d += elm.SourceV().label('10V')
        d += elm.Resistor().right().label('R1\n1kΩ')
        d += elm.Dot()
        d.push()
        d += elm.Resistor().down().label('R2\n1kΩ')
        d += elm.Line().left()
        d.pop()
        d += elm.Gap().right().label('Vout')
        
    d.save(os.path.join(OUTPUT_DIR, 'voltage-divider.svg'))
    print(f"✅ Generated: voltage-divider.svg")

def generate_rc_circuit():
    """Generate an RC circuit"""
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=12, font='sans-serif')
        d += elm.SourceV().label('Vin')
        d += elm.Resistor().right().label('R\n1kΩ')
        d += elm.Dot()
        d.push()
        d += elm.Capacitor().down().label('C\n10μF')
        d += elm.Line().left()
        d.pop()
        d += elm.Gap().right().label('Vout')
        
    d.save(os.path.join(OUTPUT_DIR, 'rc-circuit.svg'))
    print(f"✅ Generated: rc-circuit.svg")

def generate_led_circuit():
    """Generate an LED circuit"""
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=12, font='sans-serif')
        d += elm.SourceV().label('5V')
        d += elm.Resistor().right().label('R\n330Ω')
        d += elm.LED().label('LED')
        d += elm.Line().down()
        d += elm.Ground()

    d.save(os.path.join(OUTPUT_DIR, 'led-circuit.svg'))
    print(f"✅ Generated: led-circuit.svg")

def generate_voltage_divider_detailed():
    """Generate detailed voltage divider with voltage labels"""
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=12, font='sans-serif')

        # Power supply
        d += (vcc := elm.SourceV().label('VT = 12V', fontsize=13))
        d += elm.Line().right(1)
        d += elm.Dot()

        # First resistor with voltage measurement
        d.push()
        d += (r1 := elm.Resistor().down().label('R1\n10kΩ', loc='left'))
        d += elm.Dot()
        d.pop()

        # Voltage label for V1
        d += elm.Line().right(1.5)
        d += elm.Gap().down().label(['', 'V1 = 8V'], fontsize=11)
        d += elm.Line().left(1.5)

        # Second resistor with voltage measurement
        d += elm.Dot()
        d.push()
        d += (r2 := elm.Resistor().down().label('R2\n5kΩ', loc='left'))
        d += elm.Line().left(1)
        d.pop()

        # Voltage label for V2
        d += elm.Line().right(1.5)
        d += elm.Gap().down().label(['', 'V2 = 4V'], fontsize=11)
        d += elm.Line().left(1.5)

    d.save(os.path.join(OUTPUT_DIR, 'voltage_divider_detailed.svg'))
    print(f"✅ Generated: voltage_divider_detailed.svg")

def generate_current_divider():
    """Generate current divider circuit - properly closed loop"""
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=12, font='sans-serif')

        # Start with current source
        d += (isrc := elm.SourceI().label('IT = 6A', fontsize=13))
        d += elm.Line().right(1.5)
        d += elm.Dot()

        # Split into two parallel branches
        d.push()
        # Branch 1 - R1
        d += elm.Line().right(0.5)
        d += (r1 := elm.Resistor().down().label('R1\n10Ω', loc='right'))
        d += elm.Dot()
        bottom_left = d.here
        d.pop()

        # Branch 2 - R2
        d += elm.Line().right(2.5)
        d += (r2 := elm.Resistor().down().label('R2\n20Ω', loc='right'))
        d += elm.Dot()
        bottom_right = d.here

        # Connect bottom of both resistors
        d += elm.Line().left(2.5)

        # Close the loop back to current source
        d += elm.Line().left(1.5)

        # Add ground at bottom
        d.push()
        d.move_from(bottom_left, dx=1.25, dy=0)
        d += elm.Ground()
        d.pop()

        # Current labels
        d.push()
        d.move_from(r1.start, dx=0.8, dy=-0.5)
        d += elm.CurrentLabel(direction='in').label('I1 = 4A', fontsize=11)
        d.pop()

        d.push()
        d.move_from(r2.start, dx=0.8, dy=-0.5)
        d += elm.CurrentLabel(direction='in').label('I2 = 2A', fontsize=11)
        d.pop()

    d.save(os.path.join(OUTPUT_DIR, 'current_divider.svg'))
    print(f"✅ Generated: current_divider.svg")

def main():
    print("=" * 60)
    print("Generating Circuit Diagrams with SchemDraw")
    print("=" * 60)

    generate_voltage_divider()
    generate_rc_circuit()
    generate_led_circuit()
    generate_voltage_divider_detailed()
    generate_current_divider()

    print("=" * 60)
    print(f"✅ All diagrams saved to: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == '__main__':
    main()

