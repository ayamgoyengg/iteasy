'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Code, Zap } from 'lucide-react'

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
})

const services = [
  {
    icon: Palette,
    number: '01',
    title: 'Design',
    subtitle: 'Where creativity meets strategy',
    desc: 'Beautiful, intuitive interfaces that users love. We craft visuals that resonate with your audience and strengthen your brand.',
    features: ['UI / UX Design', 'Brand Identity', 'Design Systems', 'Interactive Prototypes'],
  },
  {
    icon: Code,
    number: '02',
    title: 'Development',
    subtitle: 'Code that scales without limits',
    desc: 'Fast, resilient, and maintainable web applications built with modern frameworks and proven engineering practices.',
    features: ['Next.js & React', 'Full-stack Solutions', 'Progressive Web Apps', 'API & Integrations'],
  },
  {
    icon: Zap,
    number: '03',
    title: 'Digital Experience',
    subtitle: 'End-to-end, concept to launch',
    desc: 'Strategy, design, and technology working as one — unified digital experiences that grow your audience and your business.',
    features: ['Digital Strategy', '3D & Motion', 'Analytics & SEO', 'Performance Optimization'],
  },
]

/* ── 3D Tilt Card ──────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = el.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5   // -0.5 → +0.5
    const y = (e.clientY - top) / height - 0.5
    card.style.transform = `perspective(900px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale3d(1.02,1.02,1.02)`
    // Shift the subtle shine spot to follow cursor
    card.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }

  function onLeave() {
    const card = el.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={el}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1)', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

const Services = () => {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#0b0a18' }}>
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #080810, transparent)' }} />
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #080810, transparent)' }} />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"
        style={{
          width: '70vw', height: '50vh',
          background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(12,192,223,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={up()} className="tag tag-cyan block mb-5 w-fit">What We Offer</motion.span>
          <motion.h2
            variants={up(0.07)}
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Services built for{' '}
            <span className="font-serif italic font-normal" style={{ color: 'rgba(12,192,223,0.9)' }}>
              results
            </span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.title} variants={up()}>
                <TiltCard>
                  {/* Shine layer — follows cursor via CSS vars */}
                  <div
                    className="card p-7 flex flex-col relative overflow-hidden"
                    style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
                  >
                    {/* Cursor-following shine */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle 160px at var(--mx) var(--my), rgba(255,255,255,0.06) 0%, transparent 70%)',
                      }}
                    />

                    {/* Icon + number */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        <Icon size={20} style={{ color: 'rgba(240,240,246,0.7)' }} />
                      </div>
                      <span
                        className="font-display font-bold text-4xl select-none"
                        style={{ color: 'rgba(255,255,255,0.05)' }}
                      >
                        {s.number}
                      </span>
                    </div>

                    {/* Text */}
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(240,240,246,0.35)' }}>
                      {s.subtitle}
                    </p>
                    <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.35rem' }}>
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'rgba(240,240,246,0.45)' }}>
                      {s.desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(240,240,246,0.5)' }}>
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

    </section>
  )
}

export default Services
