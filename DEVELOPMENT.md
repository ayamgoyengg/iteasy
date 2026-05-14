# ITEASY Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 18.17 or later)
- npm, yarn, or pnpm

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Run development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

## Development

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
iteasy/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout wrapper
│   ├── page.tsx           # Home page / main sections
│   └── globals.css        # Global styles and animations
├── components/            # React components
│   ├── Navbar.tsx         # Navigation component
│   ├── Hero.tsx           # Hero section with 3D
│   ├── Laptop3D.tsx       # Three.js 3D laptop
│   ├── About.tsx          # About section
│   ├── Services.tsx       # Services showcase
│   ├── Portfolio.tsx      # Project portfolio
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── lib/                   # Utility functions
│   └── cn.ts             # Classname merger utility
├── public/                # Static assets
├── models/                # 3D models (if needed)
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
├── postcss.config.js      # PostCSS config
└── package.json           # Dependencies
```

## Key Technologies

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing tool

### Animations & 3D
- **Framer Motion**: Smooth entrance and scroll animations
- **Three.js**: 3D graphics library
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helpful utilities for Three.js scenes

### UI & Icons
- **Lucide React**: Beautiful SVG icons
- **react-intersection-observer**: Scroll-triggered elements

## Component Documentation

### Hero Component
Displays the 3D animated laptop model with tagline and CTA buttons.

**Key Features:**
- Dynamic 3D laptop with mouse-following rotation
- Smooth entrance animations
- Scroll indicator with bounce animation

### Services Section
Showcases three main services with glassmorphism cards.

**Services:**
- Design (UI/UX, Brand Identity, Design Systems)
- Web Development (Next.js, Full-stack, PWAs)
- Digital Experience (Strategy, Development, Analytics)

### Portfolio Section
Displays featured projects with images and links.

**Features:**
- Image hover zoom effects
- Technology tag badges
- Live project and GitHub links

### Contact Section
Email form with validation and success feedback.

**Features:**
- Form validation
- Loading state
- Success message
- Direct email and location info

## Styling Guide

### Color Palette

```css
/* Primary Colors */
--primary: #0CC0DF (Teal/Cyan)
--primary-dark: #0891b2

/* Neutral Colors */
--background: #0a0a0a (Dark)
--foreground: #ffffff (White)
--muted: #1a1a1a
--muted-foreground: #a0a0a0
--border: #2a2a2a
```

### Design Patterns

#### Glassmorphism
```jsx
<div className="glass rounded-lg p-6">
  {/* Content */}
</div>
```

The `.glass` class provides:
- Semi-transparent background with blur
- Subtle border
- Hover effects

#### Gradient Text
```jsx
<h1 className="gradient-text">
  Heading Text
</h1>
```

Creates a teal-to-white gradient text effect.

#### Glow Effects
```jsx
<div className="shadow-glow hover:shadow-glow-lg">
  {/* Content */}
</div>
```

Adds subtle teal glow with hover enhancement.

## Animation Guide

### Scroll Triggers
Components use `react-intersection-observer` to trigger animations when elements enter viewport:

```typescript
const { ref, inView } = useInView({
  triggerOnce: true,      // Animate only once
  threshold: 0.1,         // Trigger at 10% visibility
})
```

### Framer Motion
Used for smooth entrance and interactive animations:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 3D Scene Setup

### Laptop3D Component
The 3D laptop uses:
- **Canvas**: Renders the Three.js scene
- **Lights**: Ambient, directional, and point lights
- **Laptop Model**: Procedurally generated 3D geometry
- **Mouse Interaction**: OrbitControls with auto-rotation

### Performance Considerations
- Laptop3D is dynamically imported with SSR disabled
- Uses lower DPR on lower-end devices
- Camera adjusted for proper viewing angle

## Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Optimizations
- Touch-friendly navigation
- Simplified 3D scene on mobile
- Stack layout on smaller screens
- Optimized font sizes

## Performance Tips

1. **Images**: Use Next.js Image component for optimization
2. **Fonts**: Google Fonts are self-hosted via next/font
3. **Bundle Size**: Keep components modular for tree-shaking
4. **Animations**: Use `will-change` sparingly
5. **3D Scene**: Disable on low-end devices if needed

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set environment variables in deployment platform

## Troubleshooting

### 3D Laptop Not Rendering
- Check browser console for WebGL errors
- Ensure Three.js is properly installed
- Try clearing cache: `rm -rf .next node_modules`

### Animations Not Triggering
- Verify `react-intersection-observer` is installed
- Check browser DevTools for CSS errors
- Ensure Framer Motion version compatibility

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Adding New Sections

### Template
```typescript
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const NewSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="section-name" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
      >
        {/* Content */}
      </motion.div>
    </section>
  )
}

export default NewSection
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Contributing

When making changes:
1. Follow the existing code style
2. Use TypeScript for type safety
3. Add proper comments for complex logic
4. Test responsive design on multiple devices
5. Keep animations performant

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

## Support

For issues or questions:
- Check existing documentation
- Review component code comments
- Test in a clean Next.js environment
