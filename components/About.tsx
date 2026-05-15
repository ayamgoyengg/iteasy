'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
})

const values = [
  { title: 'Innovation', desc: 'Pushing creative and technical boundaries on every project.' },
  { title: 'Quality', desc: 'Every detail crafted with precision and intention.' },
  { title: 'Collaboration', desc: 'We work alongside you, not just for you.' },
  { title: 'Reliability', desc: 'Consistent delivery, honest communication, real results.' },
] as const

const About = () => {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#080810' }}>
      {/* Top fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,0.6) 0%, transparent 100%)' }} />
      {/* Bottom fade into Services */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0b0a18 0%, transparent 100%)' }} />
      <div
        className="absolute top-0 right-0 -z-10 pointer-events-none"
        style={{
          width: '60vw', height: '70vh',
          background: 'radial-gradient(ellipse 80% 80% at 80% 20%, rgba(168,85,247,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <motion.div
            className="space-y-7"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={up()}>
              <span className="tag tag-cyan">About ITEASY</span>
            </motion.div>

            <motion.h2 variants={up(0.05)} className="font-display font-bold leading-tight text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              A studio built on{' '}
              <span className="font-serif italic font-normal" style={{ color: 'rgba(168,85,247,0.9)' }}>craft</span>{' '}
              and purpose
            </motion.h2>

            <motion.p variants={up(0.1)} className="text-base leading-relaxed" style={{ color: 'rgba(240,240,246,0.5)' }}>
              ITEASY is a design and development studio based in Surabaya, Indonesia. We specialize
              in creating modern, high-impact digital experiences that drive real business results.
            </motion.p>

            <motion.p variants={up(0.14)} className="text-base leading-relaxed" style={{ color: 'rgba(240,240,246,0.5)' }}>
              With a team of passionate designers and engineers, we transform ambitious ideas into
              exceptional digital products — from ambitious startups to established enterprises.
            </motion.p>

            <motion.div variants={up(0.18)}>
              <a href="#contact" className="btn-primary inline-flex" style={{ padding: '13px 28px', fontSize: '0.88rem' }}>
                Work With Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right — values */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={up()} className="card p-6">
                <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '1.05rem' }}>
                  {v.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,246,0.45)' }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
