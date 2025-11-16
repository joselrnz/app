#!/usr/bin/env python3
"""
Generate PlantUML diagrams from markdown files
Processes all markdown files in frontend/src/content and generates SVG diagrams
"""

import os
import re
import requests
import base64
import zlib
from pathlib import Path

# PlantUML server URL
PLANTUML_SERVER = "https://www.plantuml.com/plantuml/svg/"

# Output directory for generated diagrams
OUTPUT_DIR = Path("frontend/public/images/diagrams/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Content directory
CONTENT_DIR = Path("frontend/src/content")


def encode_plantuml(plantuml_text):
    """
    Encode PlantUML text to URL-safe format
    Uses the same encoding as PlantUML server
    """
    # PlantUML encoding alphabet
    plantuml_alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
    
    # Compress with zlib
    compressed = zlib.compress(plantuml_text.encode('utf-8'))[2:-4]
    
    # Encode to base64-like format
    encoded = ''
    for i in range(0, len(compressed), 3):
        if i + 2 < len(compressed):
            b1, b2, b3 = compressed[i], compressed[i + 1], compressed[i + 2]
            encoded += plantuml_alphabet[(b1 >> 2) & 0x3F]
            encoded += plantuml_alphabet[((b1 & 0x3) << 4) | ((b2 >> 4) & 0xF)]
            encoded += plantuml_alphabet[((b2 & 0xF) << 2) | ((b3 >> 6) & 0x3)]
            encoded += plantuml_alphabet[b3 & 0x3F]
        elif i + 1 < len(compressed):
            b1, b2 = compressed[i], compressed[i + 1]
            encoded += plantuml_alphabet[(b1 >> 2) & 0x3F]
            encoded += plantuml_alphabet[((b1 & 0x3) << 4) | ((b2 >> 4) & 0xF)]
            encoded += plantuml_alphabet[(b2 & 0xF) << 2]
        else:
            b1 = compressed[i]
            encoded += plantuml_alphabet[(b1 >> 2) & 0x3F]
            encoded += plantuml_alphabet[(b1 & 0x3) << 4]
    
    return encoded


def generate_diagram_from_server(plantuml_code, output_path):
    """Generate diagram using PlantUML server"""
    try:
        # Encode the PlantUML code
        encoded = encode_plantuml(plantuml_code)
        
        # Build URL
        url = f"{PLANTUML_SERVER}{encoded}"
        
        # Fetch SVG from server
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        # Save SVG
        with open(output_path, 'wb') as f:
            f.write(response.content)
        
        return True
    except Exception as e:
        print(f"   ❌ Error generating diagram: {e}")
        return False


def process_markdown_file(md_file):
    """Process a markdown file and extract PlantUML diagrams"""
    print(f"\n📄 Processing: {md_file.relative_to(CONTENT_DIR)}")
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all PlantUML code blocks
    # Pattern matches: ```plantuml ... ``` or ```uml ... ```
    pattern = r'```(?:plantuml|uml)(?:\s+[^\n]*)?\n(.*?)```'
    matches = re.findall(pattern, content, re.DOTALL)
    
    if not matches:
        print("   ℹ️  No PlantUML diagrams found")
        return 0
    
    print(f"   Found {len(matches)} diagram(s)")
    
    # Generate filename base from markdown file
    file_base = md_file.stem
    category = md_file.parent.name
    
    diagrams_generated = 0
    for idx, plantuml_code in enumerate(matches, 1):
        # Create output filename
        output_filename = f"{category}_{file_base}_diagram_{idx}.svg"
        output_path = OUTPUT_DIR / output_filename
        
        print(f"   🎨 Generating diagram {idx}/{len(matches)}: {output_filename}")
        
        # Ensure @startuml and @enduml tags
        if '@startuml' not in plantuml_code:
            plantuml_code = '@startuml\n' + plantuml_code
        if '@enduml' not in plantuml_code:
            plantuml_code = plantuml_code + '\n@enduml'
        
        # Generate diagram
        if generate_diagram_from_server(plantuml_code, output_path):
            print(f"      ✅ Saved: {output_path}")
            diagrams_generated += 1
        else:
            print(f"      ❌ Failed to generate diagram")
    
    return diagrams_generated


def main():
    print("=" * 80)
    print("PlantUML Diagram Generator")
    print("=" * 80)
    print(f"Server: {PLANTUML_SERVER}")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 80)
    
    # Find all markdown files
    md_files = list(CONTENT_DIR.rglob("*.md"))
    
    if not md_files:
        print("❌ No markdown files found!")
        return
    
    print(f"\nFound {len(md_files)} markdown file(s)")
    
    total_diagrams = 0
    for md_file in md_files:
        diagrams = process_markdown_file(md_file)
        total_diagrams += diagrams
    
    print("\n" + "=" * 80)
    print(f"✅ Complete! Generated {total_diagrams} diagram(s)")
    print(f"📁 Diagrams saved to: {OUTPUT_DIR}")
    print("=" * 80)
    
    if total_diagrams > 0:
        print("\n💡 Next steps:")
        print("1. Update your markdown files to reference the generated SVG files")
        print("2. Use paths like: /images/diagrams/generated/filename.svg")
        print("3. Restart your Next.js dev server to see the diagrams")


if __name__ == '__main__':
    main()

