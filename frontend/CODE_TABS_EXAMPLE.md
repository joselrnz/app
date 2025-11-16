# Code Tabs Example

This file demonstrates how to use the `CodeTabs` component in markdown articles.

## Basic Usage

To add tabbed code examples to your articles, you can use the `CodeTabs` component directly in your MDX files.

### Example 1: Arduino vs Python

```tsx
<CodeTabs
  tabs={[
    {
      label: 'Arduino',
      language: 'cpp',
      code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
      filename: 'led_blink.ino'
    },
    {
      label: 'Python',
      language: 'python',
      code: `import RPi.GPIO as GPIO
import time

LED_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)

while True:
    GPIO.output(LED_PIN, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(LED_PIN, GPIO.LOW)
    time.sleep(1)`,
      filename: 'led_blink.py'
    }
  ]}
  defaultTab="Arduino"
/>
```

### Example 2: Circuit Diagram + Code

```tsx
<CodeTabs
  tabs={[
    {
      label: 'Circuit',
      language: 'latex',
      code: `\\begin{circuitikz}[american]
  \\draw (0,0) to[battery, l=9V] (0,4)
        to[R, l=220$\\Omega$] (4,4)
        to[led] (4,0)
        to[short] (0,0);
\\end{circuitikz}`
    },
    {
      label: 'Arduino Code',
      language: 'cpp',
      code: `const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}`,
      filename: 'sketch.ino'
    },
    {
      label: 'Explanation',
      language: 'markdown',
      code: `# LED Blink Circuit

This circuit demonstrates:
- Basic LED connection
- Current limiting resistor
- Arduino digital output

**Components:**
- 1x LED
- 1x 220Ω resistor
- 1x Arduino board`
    }
  ]}
/>
```

### Example 3: Multi-Language Comparison

```tsx
<CodeTabs
  tabs={[
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
      filename: 'fibonacci.js'
    },
    {
      label: 'Python',
      language: 'python',
      code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
      filename: 'fibonacci.py'
    },
    {
      label: 'C++',
      language: 'cpp',
      code: `#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << fibonacci(10) << std::endl;
    return 0;
}`,
      filename: 'fibonacci.cpp'
    },
    {
      label: 'Rust',
      language: 'rust',
      code: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("{}", fibonacci(10));
}`,
      filename: 'fibonacci.rs'
    }
  ]}
  defaultTab="Python"
/>
```

## Props

### CodeTabs Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tabs` | `CodeTab[]` | Yes | Array of code tab objects |
| `defaultTab` | `string` | No | Label of the default active tab |

### CodeTab Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Tab label (e.g., "Arduino", "Python") |
| `language` | `string` | Yes | Programming language for syntax highlighting |
| `code` | `string` | Yes | Code content |
| `filename` | `string` | No | Optional filename to display above code |

## Supported Languages

The `language` prop supports all languages from Prism.js:

- `javascript`, `typescript`, `jsx`, `tsx`
- `python`, `java`, `cpp`, `c`, `csharp`
- `rust`, `go`, `ruby`, `php`
- `html`, `css`, `scss`, `sass`
- `json`, `yaml`, `markdown`
- `bash`, `shell`, `powershell`
- `sql`, `graphql`
- `latex` (for TikZ/CircuiTikZ)
- And many more...

## Tips

1. **Use meaningful tab labels** - "Arduino Code" is better than "Code 1"
2. **Add filenames** - Helps users understand the file structure
3. **Keep code concise** - Long code blocks can be overwhelming
4. **Use comments** - Explain complex parts in the code
5. **Consistent formatting** - Use proper indentation

## Integration with MDX

To use `CodeTabs` in your MDX articles:

1. **Import the component** at the top of your MDX file:
```mdx
import CodeTabs from '@/components/tech/CodeTabs'
```

2. **Use the component** anywhere in your content:
```mdx
# My Article

Here's a comparison of different implementations:

<CodeTabs tabs={[...]} />

Continue with your article...
```

## Styling

The component automatically matches your site's dark theme with:
- Dark background
- Emerald accent colors
- Smooth transitions
- Responsive design

You can customize the styling by modifying:
- `frontend/src/components/tech/CodeTabs.tsx`
- `frontend/src/components/ui/tabs.tsx`

---

**Happy coding! 🚀**

