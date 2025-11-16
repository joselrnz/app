# Shadcn/UI Components Guide

This guide shows how to use the newly integrated Shadcn/UI components in the learning platform.

## 📦 Installed Components

- ✅ **Accordion** - Collapsible content sections
- ✅ **Tooltip** - Contextual information on hover
- ✅ **Tabs** - Tabbed interface for code examples
- ✅ **Badge** - Labels and tags with variants

---

## 🎯 Component Usage

### 1. Accordion (Sidebar Navigation)

The sidebar now uses Shadcn Accordion for collapsible module sections.

**Features:**
- ✅ Smooth animations
- ✅ Keyboard navigation (Arrow keys, Enter, Space)
- ✅ Multiple items can be open simultaneously
- ✅ Accessible (ARIA attributes)

**Location:** `frontend/src/components/tech/SidebarNavigation.tsx`

**Example:**
```tsx
<Accordion type="multiple" defaultValue={['module-1', 'module-2']}>
  <AccordionItem value="module-1">
    <AccordionTrigger>Module Title</AccordionTrigger>
    <AccordionContent>
      {/* Module content */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### 2. Tooltip (Article Metadata)

Tooltips provide additional context for difficulty levels and time estimates.

**Features:**
- ✅ Appears on hover
- ✅ Customizable positioning
- ✅ Smooth fade-in/out animations
- ✅ Accessible

**Location:** `frontend/src/components/tech/SidebarNavigation.tsx`

**Example:**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="beginner">Beginner</Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p>Suitable for beginners with basic knowledge</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### 3. Tabs (Code Examples)

Use the `CodeTabs` component to display multiple code examples in a tabbed interface.

**Features:**
- ✅ Multiple code examples in one view
- ✅ Syntax highlighting
- ✅ Optional filename display
- ✅ Keyboard navigation

**Location:** `frontend/src/components/tech/CodeTabs.tsx`

**Example in Markdown:**
```tsx
import CodeTabs from '@/components/tech/CodeTabs'

<CodeTabs
  tabs={[
    {
      label: 'Arduino',
      language: 'cpp',
      code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}`,
      filename: 'led_blink.ino'
    },
    {
      label: 'Python',
      language: 'python',
      code: `import RPi.GPIO as GPIO
GPIO.setup(18, GPIO.OUT)`,
      filename: 'led_blink.py'
    },
    {
      label: 'Circuit',
      language: 'latex',
      code: `\\begin{circuitikz}
  \\draw (0,0) to[battery] (0,2);
\\end{circuitikz}`
    }
  ]}
  defaultTab="Arduino"
/>
```

---

### 4. Badge (Labels & Tags)

Badges display difficulty levels, time estimates, and other metadata.

**Variants:**
- `default` - Emerald (default)
- `secondary` - Gray
- `destructive` - Red
- `outline` - Outlined
- `beginner` - Green
- `intermediate` - Blue
- `advanced` - Purple

**Example:**
```tsx
<Badge variant="beginner">Beginner</Badge>
<Badge variant="intermediate">Intermediate</Badge>
<Badge variant="advanced">Advanced</Badge>
<Badge variant="secondary">15 min</Badge>
```

---

## 🎨 Customization

All components use Tailwind CSS and can be customized via the `cn()` utility function.

**Example:**
```tsx
<Badge variant="beginner" className="text-lg px-4 py-2">
  Custom Styled Badge
</Badge>
```

---

## 🔧 Configuration Files

### Tailwind Config
**File:** `frontend/tailwind.config.js`

Added animations:
- `accordion-down` - Accordion expand animation
- `accordion-up` - Accordion collapse animation

### Utils
**File:** `frontend/src/lib/utils.ts`

The `cn()` function merges Tailwind classes intelligently:
```tsx
import { cn } from '@/lib/utils'

<div className={cn("base-class", condition && "conditional-class")} />
```

---

## 📚 Adding More Shadcn Components

To add more components from Shadcn:

1. **Install Radix UI primitive:**
```bash
npm install @radix-ui/react-[component-name] --legacy-peer-deps
```

2. **Create component file:**
```bash
# Create file in frontend/src/components/ui/[component-name].tsx
```

3. **Copy component code from:**
https://ui.shadcn.com/docs/components/[component-name]

4. **Customize styling** to match the dark theme

---

## 🚀 Next Steps

**Recommended components to add:**
- **Dialog** - For project details, image galleries
- **Popover** - For additional information
- **Select** - For filtering articles
- **Command** - For search functionality
- **Card** - For article previews
- **Separator** - For visual breaks

---

## 📖 Resources

- **Shadcn/UI Docs:** https://ui.shadcn.com
- **Radix UI Docs:** https://www.radix-ui.com
- **Tailwind CSS:** https://tailwindcss.com

---

## ✨ Benefits

**Why Shadcn/UI?**
- ✅ Copy-paste components (no npm bloat)
- ✅ Full control over code
- ✅ Built on Radix UI (accessibility)
- ✅ Customizable with Tailwind
- ✅ TypeScript support
- ✅ No runtime dependencies
- ✅ Tree-shakeable
- ✅ Production-ready

---

**Happy coding! 🎉**

