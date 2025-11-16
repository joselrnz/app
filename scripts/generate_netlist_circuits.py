#!/usr/bin/env python3
"""
Generate circuit diagrams using NetlistSVG
Creates JSON netlists and converts them to SVG using netlistsvg
"""

import os
import json
import subprocess
from pathlib import Path

# Output directory
OUTPUT_DIR = Path("frontend/public/images/circuits/netlist")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# NetlistSVG command (adjust path if needed)
NETLISTSVG_CMD = "netlistsvg"


def run_netlistsvg(json_file, output_svg, use_analog_skin=True):
    """Run netlistsvg command to convert JSON to SVG"""
    try:
        # Set up environment with Node.js in PATH
        env = os.environ.copy()
        node_path = r"C:\Program Files\nodejs"
        npm_path = r"C:\Users\josel\AppData\Roaming\npm"
        env['PATH'] = f"{node_path};{npm_path};{env.get('PATH', '')}"

        # Use netlistsvg.cmd on Windows
        netlistsvg_path = r"C:\Users\josel\AppData\Roaming\npm\netlistsvg.cmd"

        # Build command with analog skin if requested
        cmd = [netlistsvg_path, str(json_file), "-o", str(output_svg)]
        if use_analog_skin:
            # Find the analog skin file in the netlistsvg installation
            analog_skin = Path(npm_path) / "node_modules" / "netlistsvg" / "lib" / "analog.svg"
            if analog_skin.exists():
                cmd.extend(["--skin", str(analog_skin)])
                print(f"   🎨 Using analog skin: {analog_skin}")

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            shell=True,  # Required for .cmd files on Windows
            env=env
        )

        if result.returncode == 0:
            return True
        else:
            print(f"   ❌ Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"   ❌ Exception: {e}")
        return False


# Circuit 1: Simple RC Low-Pass Filter
rc_lowpass = {
    "modules": {
        "rc_lowpass": {
            "ports": {
                "Vin": {"direction": "input", "bits": [2]},
                "Vout": {"direction": "output", "bits": [3]},
                "GND": {"direction": "input", "bits": [4]}
            },
            "cells": {
                "R1": {
                    "type": "r_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [2], "B": [5]},
                    "attributes": {"value": "1kΩ"}
                },
                "C1": {
                    "type": "c_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [5], "B": [4]},
                    "attributes": {"value": "100nF"}
                }
            }
        }
    }
}

# Circuit 2: Voltage Divider
voltage_divider = {
    "modules": {
        "voltage_divider": {
            "ports": {
                "Vin": {"direction": "input", "bits": [2]},
                "Vout": {"direction": "output", "bits": [3]},
                "GND": {"direction": "input", "bits": [4]}
            },
            "cells": {
                "R1": {
                    "type": "r_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [2], "B": [5]},
                    "attributes": {"value": "10kΩ"}
                },
                "R2": {
                    "type": "r_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [5], "B": [4]},
                    "attributes": {"value": "10kΩ"}
                }
            }
        }
    }
}

# Circuit 3: LED with Current Limiting Resistor
led_circuit = {
    "modules": {
        "led_circuit": {
            "ports": {
                "Vcc": {"direction": "input", "bits": [2]},
                "GND": {"direction": "input", "bits": [4]}
            },
            "cells": {
                "R1": {
                    "type": "r_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [2], "B": [5]},
                    "attributes": {"value": "220Ω"}
                },
                "LED1": {
                    "type": "d_v",
                    "port_directions": {"A": "input", "C": "output"},
                    "connections": {"A": [5], "C": [4]},
                    "attributes": {"type": "LED"}
                }
            }
        }
    }
}

# Circuit 4: RLC Series Circuit
rlc_series = {
    "modules": {
        "rlc_series": {
            "ports": {
                "Vin": {"direction": "input", "bits": [2]},
                "GND": {"direction": "input", "bits": [4]}
            },
            "cells": {
                "R1": {
                    "type": "r_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [2], "B": [5]},
                    "attributes": {"value": "100Ω"}
                },
                "L1": {
                    "type": "l_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [5], "B": [6]},
                    "attributes": {"value": "10mH"}
                },
                "C1": {
                    "type": "c_v",
                    "port_directions": {"A": "input", "B": "output"},
                    "connections": {"A": [6], "B": [4]},
                    "attributes": {"value": "100µF"}
                }
            }
        }
    }
}


circuits = {
    "rc_lowpass": rc_lowpass,
    "voltage_divider": voltage_divider,
    "led_circuit": led_circuit,
    "rlc_series": rlc_series
}


def main():
    print("=" * 80)
    print("NetlistSVG Circuit Generator")
    print("=" * 80)
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 80)
    
    generated = 0
    for name, circuit_data in circuits.items():
        print(f"\n🔌 Generating: {name}")
        
        # Save JSON netlist
        json_file = OUTPUT_DIR / f"{name}.json"
        with open(json_file, 'w') as f:
            json.dump(circuit_data, f, indent=2)
        print(f"   📝 JSON saved: {json_file}")
        
        # Generate SVG
        svg_file = OUTPUT_DIR / f"{name}.svg"
        if run_netlistsvg(json_file, svg_file):
            print(f"   ✅ SVG created: {svg_file}")
            generated += 1
        else:
            print(f"   ❌ Failed to create SVG")
    
    print("\n" + "=" * 80)
    print(f"✅ Complete! Generated {generated}/{len(circuits)} circuit diagrams")
    print(f"📁 Circuits saved to: {OUTPUT_DIR}")
    print("=" * 80)
    
    if generated > 0:
        print("\n💡 Next steps:")
        print("1. Reference these SVG files in your markdown:")
        print("   ![RC Filter](/images/circuits/netlist/rc_lowpass.svg)")
        print("2. Restart your Next.js dev server")
        print("3. View at http://localhost:3002")


if __name__ == '__main__':
    main()

