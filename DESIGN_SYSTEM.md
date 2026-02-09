# Design System Documentation

## Overview
This portfolio uses a minimalist, dark-themed design system with the following core principles:
- **Monochromatic Palette**: Black background with white text hierarchy
- **Sharp Edges**: `border-radius: 0` for all components
- **Pretendard Font**: Korean-optimized sans-serif for all text

---

## Colors

### CSS Variables (`:root`)
| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#ffffff` | Light mode background |
| `--foreground` | `#111111` | Primary text |
| `--primary` | `#000000` | Primary buttons/elements |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#f8f8f8` | Secondary surfaces |
| `--muted` | `#f1f1f1` | Muted backgrounds |
| `--muted-foreground` | `#666666` | Secondary text |
| `--accent` | `#2563eb` | Accent (Klein Blue) |

### Dark Mode Text Hierarchy
| Class | Opacity | Usage |
|-------|---------|-------|
| `text-white` | 100% | Headings, emphasis |
| `text-white/80` | 80% | Body text |
| `text-white/60` | 60% | Secondary text |
| `text-white/40` | 40% | Labels, captions |

---

## Typography

### Font Family
- **Pretendard** (CDN-loaded, all weights 100-900)
- Variable: `--font-sans`, `--font-display`

### Scale (Tailwind)
| Size | Class | Usage |
|------|-------|-------|
| 5xl | `text-5xl` | Hero headings |
| 4xl | `text-4xl` | Page titles |
| xl | `text-xl` | Section headers |
| lg | `text-lg` | Lead paragraphs |
| base | `text-base` | Body |
| sm | `text-sm` | Labels, captions |

---

## Components

### Button (`button.tsx`)
Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
Sizes: `default (h-12)`, `sm (h-10)`, `lg (h-14)`, `icon (h-10 w-10)`

### Card (`card.tsx`)
Sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

### Interactive Components
- **DispersingText**: Mouse-reactive text that disperses on hover
- **CursorFollower**: Custom cursor that follows mouse movement
- **ZoomableImage**: Click-to-zoom image modal
- **MagneticText**: Text with magnetic hover effect

---

## Spacing

### Container
- Max width: `max-w-screen-xl` (1280px)
- Padding: `px-4 md:px-6 lg:px-8`

### Section Padding
| Class | Value |
|-------|-------|
| `pt-32` | 128px top padding (after header) |
| `pb-20` | 80px bottom padding |
| `mb-16` | 64px section gap |

---

## Layout Patterns

### Header
- Fixed position, `z-50`
- Height: `h-16` (mobile), `h-24` (desktop)
- Dark mode: `bg-gradient-to-b from-black via-black/50 to-transparent`

### Page Structure
```
<main className="min-h-screen bg-black pt-32 pb-20">
  <div className="container mx-auto px-4 md:px-6 max-w-screen-md">
    <motion.section className="mb-16">
      ...
    </motion.section>
  </div>
</main>
```

---

## Animation

### Framer Motion Defaults
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Stagger Delay
- Section 1: `delay: 0`
- Section 2: `delay: 0.1`
- Section 3: `delay: 0.2`

---

## Files
- `globals.css`: CSS variables, font-face, theme tokens
- `components/ui/button.tsx`: Button component with variants
- `components/ui/card.tsx`: Card component with sub-components
- `components/ui/dispersing-text.tsx`: Interactive text effect
- `components/ui/zoomable-image.tsx`: Image zoom modal
