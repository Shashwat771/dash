# Responsive UI Design Guide

## Overview
Complete responsive design system for DataViz AI dashboard with AI features that seamlessly adapts across all device sizes from 320px (small phones) to 4K displays.

---

## Breakpoints & Device Classes

### Mobile (320px - 480px)
- **Devices**: Phones, small devices
- **Layout**: Single column, stacked elements
- **Features**:
  - Full-width buttons (100%)
  - Vertical tabs (stacked)
  - Collapsed navigation
  - Touch-friendly targets (44px minimum)
  - Bottom action buttons
  - Optimized font sizes (12-14px)

### Tablet (481px - 768px)
- **Devices**: Tablets, large phones, iPad mini
- **Layout**: 2-column grid, partial side-by-side
- **Features**:
  - Horizontal tabs
  - 2-column insights grid
  - Sidebar-less layout
  - Larger fonts (14-16px)
  - Moderate spacing

### Laptop (769px - 1024px)
- **Devices**: Desktop monitors, large tablets
- **Layout**: Multi-column grid (3-4 columns)
- **Features**:
  - Full navigation visible
  - 3-column insights grid
  - Maximum content width
  - Larger typography (16-20px)
  - Generous spacing

### Desktop (1025px+)
- **Devices**: Large monitors, 4K displays
- **Layout**: Flexible grid, maximum visual hierarchy
- **Features**:
  - Unrestricted width (capped at 1400px max-width)
  - Enhanced spacing
  - Full feature set visible
  - Side-by-side panels
  - Largest font sizes (20-32px)

---

## Mobile-First Approach

### Principle
Start with mobile (smallest viewport) and progressively enhance for larger screens using `@media (min-width: ...)` queries.

### CSS Structure
```css
/* Base mobile styles - applies to all devices */
.element {
  width: 100%;
  padding: 12px;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 481px) {
  .element {
    width: 50%;
    padding: 16px;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 769px) {
  .element {
    width: 33.333%;
    padding: 24px;
    font-size: 18px;
  }
}
```

---

## Responsive Components

### 1. Header & Navigation

#### Mobile (320px - 480px)
- Sticky header with 8px padding
- Logo visible, nav hidden
- Compact breadcrumbs
- No navigation menu

#### Tablet (481px - 768px)
- Header padding: 16px
- Navigation appears (display: flex)
- Larger logo (20px → 24px)
- More breathing room

#### Desktop (769px+)
- Full navigation menu visible
- Maximum header styling
- Optimized spacing

```jsx
.rds-header {
  padding: var(--spacing-sm); /* 12px on mobile */
  
  @media (min-width: 481px) {
    padding: var(--spacing-md); /* 16px on tablet */
  }
}

.rds-nav {
  display: none; /* Hidden on mobile */
  
  @media (min-width: 481px) {
    display: flex; /* Visible on tablet+ */
  }
}
```

### 2. Insights Grid

#### Mobile: 1 Column
```
┌─────────────────┐
│   Trends        │
├─────────────────┤
│   Predictions   │
├─────────────────┤
│   Summary       │
└─────────────────┘
```

#### Tablet: 2 Columns
```
┌─────────────┬─────────────┐
│   Trends    │ Predictions │
├─────────────┼─────────────┤
│   Summary               │
└─────────────┴─────────────┘
```

#### Desktop: 3 Columns
```
┌─────────────┬─────────────┬─────────────┐
│   Trends    │ Predictions │   Summary   │
└─────────────┴─────────────┴─────────────┘
```

```css
.rds-insights-grid {
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
  gap: var(--spacing-lg); /* 24px */
  
  /* Tablet: 2 columns */
  @media (min-width: 481px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl); /* 32px */
  }
  
  /* Desktop: 3 columns */
  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl); /* 48px */
  }
}
```

### 3. Charts Grid

#### Mobile: 1 Column (2 charts fit)
- Full width responsive
- Scrollable horizontally if needed

#### Tablet: 2 Columns
- Side-by-side layout
- Balanced proportions

#### Desktop: 4 Columns
- Full grid visibility
- Compact density

### 4. Buttons & Touch Targets

#### Mobile Standards
- Minimum height: 44px (iOS) / 48px (Android)
- Minimum width: 44px
- Padding: 12px 16px minimum
- Full width (100%) for primary actions

#### Implementation
```css
.rds-action-btn {
  /* Mobile base */
  padding: var(--spacing-sm) var(--spacing-md); /* 12px 16px */
  height: auto;
  
  /* Tablet: larger padding */
  @media (min-width: 481px) {
    padding: var(--spacing-md) var(--spacing-lg); /* 16px 24px */
  }
  
  /* Touch device: enforce 44px minimum */
  @media (hover: none) and (pointer: coarse) {
    min-height: 44px;
    padding: var(--spacing-md) var(--spacing-lg);
  }
}

.rds-mobile-action-btn {
  /* Full width on mobile */
  width: 100%;
  
  /* Hide on tablet and up */
  @media (min-width: 481px) {
    display: none;
  }
}
```

### 5. Query Input

#### Mobile Layout
- Full width input
- Stacked submit button below (or side icon)
- Single-column suggestions

#### Tablet Layout
- Input with button on right
- 2-column suggestions grid

#### Desktop Layout
- Input with button on right
- Multi-column suggestions
- Wider input field

---

## Responsive Typography

### Font Sizing Scale

| Device | HTML | P | H3 | H2 | H1 |
|--------|------|----|----|----|----|
| 320px  | 12px | 12px | 14px | 16px | 18px |
| 480px  | 14px | 14px | 16px | 20px | 22px |
| 768px  | 16px | 16px | 18px | 24px | 28px |
| 1024px | 16px | 16px | 20px | 28px | 32px |

### Implementation
```css
html {
  font-size: 16px;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 12px;
  }
}

h1 {
  font-size: var(--font-size-xl); /* 20px mobile */
  
  @media (min-width: 481px) {
    font-size: var(--font-size-2xl); /* 24px tablet */
  }
  
  @media (min-width: 769px) {
    font-size: var(--font-size-3xl); /* 32px desktop */
  }
}
```

---

## Spacing System

### Mobile-First Spacing
Start with tighter spacing on mobile, expand on larger screens.

```css
--spacing-xs: 6px;    /* 4px touch target borders *)
--spacing-sm: 12px;   /* Mobile padding, gaps *)
--spacing-md: 16px;   /* Standard mobile spacing *)
--spacing-lg: 24px;   /* Tablet spacing *)
--spacing-xl: 32px;   /* Desktop spacing *)
--spacing-2xl: 48px;  /* Large desktop spacing *)
```

### Usage Pattern
```css
.card {
  padding: var(--spacing-md); /* 16px on mobile */
  gap: var(--spacing-md);
  
  @media (min-width: 481px) {
    padding: var(--spacing-lg); /* 24px on tablet */
    gap: var(--spacing-lg);
  }
  
  @media (min-width: 769px) {
    padding: var(--spacing-xl); /* 32px on desktop */
    gap: var(--spacing-xl);
  }
}
```

---

## Color System

### Dark Mode Palette
```css
--color-bg-primary: #0f0f0f;        /* Main background *)
--color-bg-secondary: #1a1a1a;      /* Card backgrounds *)
--color-bg-tertiary: #252525;       /* Section backgrounds *)

--color-text-primary: #ffffff;      /* Main text *)
--color-text-secondary: #a0a0a0;    /* Secondary text *)
--color-text-tertiary: #707070;     /* Tertiary text *)

--color-accent-primary: #6366f1;    /* Primary CTA (indigo) *)
--color-accent-secondary: #ec4899;  /* Secondary accent (pink) *)
--color-accent-success: #10b981;    /* Success state (green) *)
--color-accent-warning: #f59e0b;    /* Warning state (amber) *)
--color-accent-error: #ef4444;      /* Error state (red) *)

--color-border: #333333;            /* Standard borders *)
--color-border-light: #2a2a2a;      /* Subtle borders *)
```

### Accessible Color Contrast
- Text on background: AA compliance (4.5:1 minimum)
- UI components: AA compliance (3:1 minimum)
- All colors tested for WCAG accessibility

---

## Responsive Patterns

### 1. Responsive Grid System

```css
/* Mobile: 1 column */
.grid {
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

/* Tablet: auto-fit with minimum width */
@media (min-width: 481px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
  }
}

/* Desktop: fixed columns */
@media (min-width: 769px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-xl);
  }
}
```

### 2. Responsive Flex Layout

```css
/* Stack vertically on mobile */
.flex-container {
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Side-by-side on tablet+ */
@media (min-width: 481px) {
  .flex-container {
    flex-direction: row;
    gap: var(--spacing-md);
  }
}
```

### 3. Responsive Text Wrapping

```css
.title {
  /* Allow text to break naturally on mobile */
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  /* Optimize line length on desktop */
  @media (min-width: 769px) {
    max-width: 60ch;
  }
}
```

### 4. Responsive Container Queries (Future)

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Testing Responsive Design

### DevTools Testing
1. Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Test all breakpoints:
   - 320px (iPhone SE)
   - 375px (iPhone 12)
   - 430px (iPhone 14 Pro Max)
   - 768px (iPad)
   - 1024px (iPad Pro / Desktop)
   - 1440px (Desktop)
   - 2560px (4K)

### Manual Testing Checklist
- [ ] Navigation visible/hidden correctly
- [ ] Content reflows without horizontal scroll
- [ ] Touch targets are 44px minimum
- [ ] Text is readable (16px minimum)
- [ ] Images scale proportionally
- [ ] Modals/overlays fit screen
- [ ] Forms are touch-friendly
- [ ] Spacing is consistent
- [ ] Colors have sufficient contrast

### Real Device Testing
- iPhone 12/13/14
- iPad (6th gen+)
- Samsung Galaxy S21+
- Pixel 6+
- Desktop Chrome/Firefox/Safari

---

## Performance Considerations

### Mobile-Optimized Loading
- Critical CSS inline
- Non-critical CSS deferred
- Images optimized for viewport
- Minimal JavaScript on mobile

### Media Query Performance
```css
/* ✅ Good: Mobile-first approach loads less CSS initially */
.element { /* base styles */ }
@media (min-width: 768px) { /* enhanced styles */ }

/* ❌ Avoid: Desktop-first requires overrides on mobile */
.element { /* desktop styles */ }
@media (max-width: 768px) { /* mobile overrides */ }
```

### Image Optimization
```html
<!-- Responsive images with srcset -->
<img
  src="chart-mobile.png"
  srcset="
    chart-mobile.png 480w,
    chart-tablet.png 768w,
    chart-desktop.png 1024w
  "
  sizes="(max-width: 480px) 100vw,
         (max-width: 768px) 90vw,
         1024px"
  alt="Chart description"
/>
```

---

## Accessibility Features

### Touch-Friendly Targets
```css
/* Minimum 44x44px touch targets */
button, a, [role="button"] {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}

/* Add spacing between touch targets */
button + button {
  margin-left: var(--spacing-md);
}
```

### Keyboard Navigation
```css
/* Focus states visible on all devices */
button:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
}

/* Remove focus on mouse clicks only */
button:focus:not(:focus-visible) {
  outline: none;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
```html
<!-- Use semantic HTML -->
<header>Navigation</header>
<main>Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>

<!-- ARIA labels for complex components -->
<button aria-label="Export chart as PDF">
  <span aria-hidden="true">📄</span>
</button>
```

---

## Common Pitfalls to Avoid

### ❌ Desktop-First Approach
```css
/* Bad: Forces mobile devices to parse desktop styles */
.card { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 768px) { grid-template-columns: 1fr; }
```

### ✅ Mobile-First Approach
```css
/* Good: Mobile loads minimal CSS */
.card { grid-template-columns: 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(4, 1fr); }
```

### ❌ Fixed Widths
```css
/* Bad: Breaks on small screens */
.container { width: 1200px; }
```

### ✅ Fluid Widths
```css
/* Good: Adapts to viewport */
.container { width: 100%; max-width: 1200px; }
```

### ❌ Horizontal Scrolling
```css
/* Bad: Forces horizontal scroll on mobile */
.grid { display: flex; width: 2000px; }
```

### ✅ Wrapping Layout
```css
/* Good: Wraps on smaller screens */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
```

---

## Quick Reference

### Responsive Grid Templates

#### 1 → 2 → 3 Columns
```css
grid-template-columns: 1fr;
@media (min-width: 481px) { grid-template-columns: 1fr 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(3, 1fr); }
```

#### 1 → 2 → 4 Columns
```css
grid-template-columns: 1fr;
@media (min-width: 481px) { grid-template-columns: 1fr 1fr; }
@media (min-width: 769px) { grid-template-columns: repeat(4, 1fr); }
```

#### Stack → Side-by-Side
```css
flex-direction: column;
@media (min-width: 481px) { flex-direction: row; }
```

### Responsive Font Sizes
```css
font-size: 14px;           /* Mobile */
@media (min-width: 481px) { font-size: 16px; }
@media (min-width: 769px) { font-size: 18px; }
```

### Responsive Padding
```css
padding: 12px;             /* Mobile */
@media (min-width: 481px) { padding: 16px; }
@media (min-width: 769px) { padding: 24px; }
```

---

## Resources

- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS-Tricks: Media Queries](https://css-tricks.com/a-complete-guide-to-grid/)
- [Google: Mobile-Friendly Testing](https://search.google.com/test/mobile-friendly)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
