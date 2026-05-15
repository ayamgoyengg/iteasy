'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
})

const Contact = () => {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="relative py-28 sm:py-40 overflow-hidden" style={{ background: '#0b0a18' }}>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #080810, transparent)' }} />
      {/* Bottom fade into footer */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #050510, transparent)' }} />
      {/* Radial glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(168,85,247,0.15) 0%, rgba(12,192,223,0.07) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-7"
        >
          <motion.span variants={up()} className="tag tag-purple inline-block">
            Get In Touch
          </motion.span>

          <motion.h2
            variants={up(0.07)}
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Ready to create something{' '}
            <span className="font-serif italic font-normal" style={{ color: 'rgba(12,192,223,0.9)' }}>
              remarkable?
            </span>
          </motion.h2>

          <motion.p
            variants={up(0.12)}
            className="text-base max-w-lg mx-auto"
            style={{ color: 'rgba(240,240,246,0.45)' }}
          >
            Leave the design work to us — we&apos;ll ensure your brand stands out from the
            competition and leaves a lasting impression.
          </motion.p>

          <motion.div variants={up(0.17)}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-display font-semibold text-white transition-all duration-300 group"
              style={{ fontSize: '1.1rem' }}
            >
              <span
                className="px-8 py-4 rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                Let&apos;s Collaborate
              </span>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #0CC0DF, #A855F7)' }}
              >
                <ArrowUpRight size={18} color="#080810" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
