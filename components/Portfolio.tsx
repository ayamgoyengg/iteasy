/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { Project } from '@/types/project'

/** Strip leading '#' that users accidentally prefix to external URLs */
const safeHref = (href: string) => href.replace(/^#+(?=https?:\/\/)/, '')

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
})

const Portfolio = () => {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data.filter((p) => p.status === 'published').slice(0, 4))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const isEmpty = !loading && projects.length === 0

  return (
    <section id="portfolio" ref={ref} className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#080810' }}>
      {/* Top fade from Services */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #080810, transparent)' }} />
      {/* Bottom fade into Contact */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0b0a18, transparent)' }} />
      <div
        className="absolute bottom-0 right-0 -z-10 pointer-events-none"
        style={{ width: '60vw', height: '60vh', background: 'radial-gradient(ellipse 80% 80% at 80% 80%, rgba(168,85,247,0.13) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <div>
            <motion.span variants={up()} className="tag tag-purple block mb-5 w-fit">Our Work</motion.span>
            <motion.h2 variants={up(0.07)} className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Featured{' '}
              <span className="font-serif italic font-normal" style={{ color: 'rgba(168,85,247,0.9)' }}>projects</span>
            </motion.h2>
          </div>
          {!isEmpty && (
            <motion.div variants={up(0.12)}>
              <Link href="/projects" className="btn-outline shrink-0 inline-flex items-center gap-2" style={{ padding: '11px 24px', fontSize: '0.85rem' }}>
                View All <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-52 w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="h-2.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <div className="h-2.5 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming state */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center py-24 rounded-2xl"
            style={{ border: '1px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <Clock size={22} style={{ color: '#A855F7' }} />
            </div>
            <p className="font-display font-bold text-white text-xl mb-2">Upcoming</p>
            <p className="text-sm" style={{ color: 'rgba(240,240,246,0.4)' }}>
              Exciting projects are on their way. Check back soon.
            </p>
          </motion.div>
        )}

        {/* Projects grid */}
        {!loading && !isEmpty && (
          <motion.div
            className="grid md:grid-cols-2 gap-5"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          >
            {projects.map((p) => (
              <motion.a
                key={p.id}
                href={safeHref(p.href)}
                target="_blank"
                rel="noopener noreferrer"
                variants={up()}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } }}
                className="overflow-hidden group block relative cursor-pointer"
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(12,192,223,0.35)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(12,192,223,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Image area */}
                <div className="relative h-52 sm:h-60 overflow-hidden" style={{ background: '#111120' }}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out"
                      style={{ opacity: 0.65, transform: 'scale(1)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.65'; e.currentTarget.style.transform = 'scale(1)' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.05)' }}>
                      <span className="text-3xl font-display font-bold" style={{ color: 'rgba(168,85,247,0.2)' }}>{p.title.charAt(0)}</span>
                    </div>
                  )}

                  {/* Gradient overlay — slides up on hover */}
                  <div
                    className="absolute inset-0 flex items-end p-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.85) 0%, rgba(8,8,16,0.3) 50%, transparent 100%)' }}
                  >
                    <span
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      Open Project <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(240,240,246,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors duration-300" style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>{p.title}</h3>
                    <ArrowUpRight size={16} className="flex-shrink-0 mt-0.5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(240,240,246,0.4)' }}>{p.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
