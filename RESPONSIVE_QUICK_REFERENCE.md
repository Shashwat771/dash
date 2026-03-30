# Responsive Design Quick Reference Card

## Breakpoint Cheat Sheet

```
┌─────────────────────────────────────────────────────────────────────┐
│ MOBILE        TABLET         LAPTOP        DESKTOP                  │
│ 320-480px     481-768px      769-1024px    1025px+                  │
├─────────────────────────────────────────────────────────────────────┤
│ iPhone        iPad Mini      Laptop        Monitor                  │
│ Vertical      Portrait       Landscape     Large Screen             │
│ Touch-first   Hybrid         Keyboard      Mouse/Touch              │
└─────────────────────────────────────────────────────────────────────┘
```

## CSS Variables Quick Reference

### Colors
```css
Primary:     #6366f1 (Indigo)
Secondary:   #ec4899 (Pink)
Success:     #10b981 (Green)
Warning:     #f59e0b (Amber)
Error:       #ef4444 (Red)

BG Primary:  #0f0f0f (Nearly Black)
BG Sec:      #1a1a1a (Dark Gray)
BG Tert:     #252525 (Gray)

Text Primary:   #ffffff (White)
Text Secondary: #a0a0a0 (Light Gray)
Text Tertiary:  #707070 (Medium Gray)
```

### Spacing Scale
```
xs:  6px   (borders, micro gaps)
sm:  12px  (mobile padding/gap)
md:  16px  (standard spacing)
lg:  24px  (tablet spacing)
xl:  32px  (desktop spacing)
2xl: 48px  (large desktop)
```

### Font Sizes
```
Mobile:   12-14px base
Tablet:   14-16px base
Laptop:   16-18px base
Desktop:  16-20px base

Headings: 20px (mobile) → 32px (desktop)
```

## Media Query Patterns

### Mobile-First Approach ✅
```css
/* Mobile (default) */
.element { width: 100%; }

/* Tablet */
@media (min-width: 481px) { .element { width: 50%; } }

/* Desktop */
@media (min-width: 769px) { .element { width: 33%; } }
```

### Common Patterns

**1 → 2 → 3 Columns**
```css
grid-template-columns: 1fr;
@media (min-width: 481px) { grid-template-columns: 1fr 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(3, 1fr); }
```

**1 → 2 → 4 Columns**
```css
grid-template-columns: 1fr;
@media (min-width: 481px) { grid-template-columns: 1fr 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(4, 1fr); }
```

**Stack → Row**
```css
flex-direction: column;
@media (min-width: 481px) { flex-direction: row; }
```

**Hide/Show Elements**
```css
/* Hide on mobile, show on tablet+ */
display: none;
@media (min-width: 481px) { display: block; }

/* Show on mobile, hide on tablet+ */
display: block;
@media (min-width: 481px) { display: none; }
```

## Component Breakpoints

| Component | Mobile | Tablet | Laptop | Desktop |
|-----------|--------|--------|--------|---------|
| **Header Height** | 40px | 44px | 52px | 52px |
| **Header Padding** | 8px | 16px | 24px | 24px |
| **Button Height** | 44px | 40px | auto | auto |
| **Button Width** | 100% | auto | auto | auto |
| **Main Padding** | 16px | 24px | 48px | 48px |
| **Gap/Spacing** | 12px | 16px | 24px | 32px |
| **Font Size** | 12-14px | 14-16px | 16-18px | 16-20px |
| **Max Width** | 100% | 100% | 100% | 1400px |
| **Insights Grid** | 1 col | 2 col | 3 col | 3 col |
| **Charts Grid** | 1 col | 2 col | 4 col | 4 col |
| **Nav Display** | hidden | visible | visible | visible |

## Mobile-First CSS Template

```css
:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-bg: #0f0f0f;
  --color-text: #ffffff;
  
  /* Spacing - Mobile defaults */
  --spacing: 16px;
  --gap: 12px;
  
  /* Typography - Mobile defaults */
  --font-size: 16px;
  --heading-size: 20px;
}

/* Base mobile styles */
.element {
  padding: var(--spacing);
  gap: var(--gap);
  font-size: var(--font-size);
}

/* Tablet and up */
@media (min-width: 481px) {
  :root {
    --spacing: 24px;
    --gap: 16px;
    --font-size: 16px;
    --heading-size: 24px;
  }
}

/* Desktop and up */
@media (min-width: 769px) {
  :root {
    --spacing: 32px;
    --gap: 24px;
    --font-size: 18px;
    --heading-size: 32px;
  }
}
```

## Touch-Friendly Implementation

### Button Sizes
```css
/* Mobile: 44px minimum */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Tablet: 40px minimum */
@media (min-width: 481px) {
  button {
    min-height: 40px;
    padding: 10px 16px;
  }
}

/* Desktop: auto sizing */
@media (min-width: 769px) {
  button {
    min-height: auto;
    padding: 8px 16px;
  }
}
```

### Touch Target Spacing
```css
/* Ensure 8px minimum spacing between touch targets */
button + button {
  margin-left: 8px;
}

/* Stack vertically on mobile */
@media (max-width: 480px) {
  button {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-bottom: 8px;
  }
}
```

## Responsive Typography

### Scaling Formula
```css
/* Mobile: smaller */
body { font-size: 14px; }
h1 { font-size: 24px; }

/* Tablet: medium */
@media (min-width: 481px) {
  body { font-size: 16px; }
  h1 { font-size: 28px; }
}

/* Desktop: larger */
@media (min-width: 769px) {
  body { font-size: 18px; }
  h1 { font-size: 32px; }
}
```

### Optimal Line Length
```css
/* Mobile: 20-30 characters */
body {
  max-width: 100%;
}

/* Tablet: 30-40 characters */
@media (min-width: 481px) {
  body {
    max-width: 500px;
  }
}

/* Desktop: 50-75 characters */
@media (min-width: 769px) {
  body {
    max-width: 800px;
  }
}
```

## Testing Checklist

### Mobile (320px - 480px)
- [ ] Content fits without horizontal scroll
- [ ] Touch targets are 44px minimum
- [ ] Text is readable (16px+)
- [ ] Images scale proportionally
- [ ] Navigation is accessible
- [ ] No fixed widths

### Tablet (481px - 768px)
- [ ] Navigation appears
- [ ] 2-column layouts work
- [ ] Spacing increases appropriately
- [ ] Touch targets are 40px minimum
- [ ] Flexible grid layout

### Laptop (769px - 1024px)
- [ ] 3-4 column grids display
- [ ] Full navigation visible
- [ ] Desktop spacing applied
- [ ] Images at optimal size
- [ ] Full feature set available

### Desktop (1025px+)
- [ ] Content centered
- [ ] Max-width constraint applied
- [ ] Professional spacing
- [ ] All grids at full capacity
- [ ] Optimal visual hierarchy

## Common Mistakes to Avoid

### ❌ Don't: Fixed Widths
```css
.container { width: 1200px; } /* ❌ Breaks on mobile */
```

### ✅ Do: Fluid Widths
```css
.container { 
  width: 100%;
  max-width: 1200px;
} /* ✅ Works everywhere */
```

### ❌ Don't: Desktop-First
```css
.card { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 768px) { grid-template-columns: 1fr; } /* Heavy CSS on mobile */
```

### ✅ Do: Mobile-First
```css
.card { grid-template-columns: 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(4, 1fr); } /* Lighter on mobile */
```

### ❌ Don't: Horizontal Scrolling
```css
.gallery { display: flex; width: 2000px; } /* ❌ Creates scroll */
```

### ✅ Do: Wrapping Layout
```css
.gallery { 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
} /* ✅ Wraps naturally */
```

## DevTools Testing

### Chrome DevTools Shortcut
```
Ctrl+Shift+M (Windows/Linux)
Cmd+Shift+M (Mac)
```

### Common Viewport Sizes to Test
- 375px (iPhone 12)
- 390px (iPhone 14)
- 430px (iPhone 14 Pro Max)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)
- 2560px (4K)

## Performance Tips

### CSS Optimization
✓ Use CSS variables for consistency
✓ Mobile-first reduces CSS on mobile
✓ Combine related media queries
✓ Use shorthand properties

### Layout Performance
✓ Prefer flexbox/grid over floats
✓ Avoid deep nesting
✓ Use semantic HTML
✓ Minimize repaints

### Image Optimization
```html
<!-- Use responsive images -->
<img
  src="mobile.png"
  srcset="mobile.png 480w, desktop.png 1024w"
  sizes="(max-width: 480px) 100vw, 1024px"
  alt="Description"
/>
```

## Accessibility Quick Tips

✓ **Touch Targets**: 44px × 44px minimum
✓ **Color Contrast**: 4.5:1 for text, 3:1 for UI
✓ **Focus States**: Always visible and clear
✓ **Semantic HTML**: Use proper heading hierarchy
✓ **ARIA Labels**: For complex components
✓ **Reduced Motion**: Respect user preferences

## Resources

- MDN: https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design
- Web.dev: https://web.dev/responsive-web-design-basics/
- A List Apart: https://alistapart.com/
- CSS-Tricks: https://css-tricks.com/
- Can I Use: https://caniuse.com/

---

**Print this card and keep it handy while coding responsive designs!**
