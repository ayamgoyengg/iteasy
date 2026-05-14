/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Filter, Clock, Loader2 } from 'lucide-react'
import type { Project } from '@/types/project'

const safeHref = (href: string) => href.replace(/^#+(?=https?:\/\/)/, '')

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
})

const CATEGORIES = ['All', 'Design', 'Development', 'Design & Dev']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data.filter((p) => p.status === 'published'))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)
  const isEmpty = !loading && projects.length === 0

  return (
    <main className="min-h-screen" style={{ background: '#080810' }}>

      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 py-5"
        style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: 'rgba(240,240,246,0.5)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0F6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.5)')}
        >
          <ArrowLeft size={14} /> Back
        </Link>
        <span className="font-display font-semibold text-white text-sm">All Projects</span>
        <span className="text-xs" style={{ color: 'rgba(240,240,246,0.35)' }}>{filtered.length} works</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24">

        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="mb-16"
          >
            <motion.span variants={up()} className="tag tag-purple block mb-5 w-fit">Selected Works</motion.span>
            <motion.h1 variants={up(0.07)} className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Every project, a{' '}
              <span className="font-serif italic font-normal" style={{ color: 'rgba(168,85,247,0.9)' }}>story</span>
            </motion.h1>

            {!isEmpty && (
              <motion.div variants={up(0.12)} className="flex flex-wrap items-center gap-2 mt-8">
                <Filter size={14} style={{ color: 'rgba(240,240,246,0.3)', marginTop: 1 }} />
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setActive(c)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      background: active === c ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${active === c ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: active === c ? '#A855F7' : 'rgba(240,240,246,0.5)',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="animate-spin" style={{ color: '#0CC0DF' }} />
          </div>
        )}

        {isEmpty && (
          <div className="text-center py-32 rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <Clock size={24} style={{ color: '#A855F7' }} />
            </div>
            <p className="font-display font-bold text-white text-2xl mb-3">Upcoming</p>
            <p className="text-sm mb-8" style={{ color: 'rgba(240,240,246,0.4)' }}>
              Our team is working on exciting projects. Check back soon.
            </p>
            <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ background: '#fff', color: '#080810' }}>
              Start a Project
            </Link>
          </div>
        )}

        {/* Grid */}
        {!loading && !isEmpty && (
          <div ref={gridRef}>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden" animate={gridInView ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-16" style={{ color: 'rgba(240,240,246,0.4)' }}>
                  <p className="text-sm">No projects in this category yet.</p>
                </div>
              ) : filtered.map((p) => (
                <motion.a
                  key={p.id}
                  href={safeHref(p.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={up()}
                  whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } }}
                  className="overflow-hidden group block cursor-pointer"
                  style={{
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.35)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden" style={{ background: '#111120' }}>
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
                        <span className="text-4xl font-display font-bold" style={{ color: 'rgba(168,85,247,0.15)' }}>{p.title.charAt(0)}</span>
                      </div>
                    )}

                    {/* Year chip */}
                    <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full z-10" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {p.year}
                    </span>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.85) 0%, rgba(8,8,16,0.3) 50%, transparent 100%)' }}
                    >
                      <span
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-1.5 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                        style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        Open Project <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="font-display font-semibold text-white leading-snug group-hover:text-primary transition-colors duration-300" style={{ fontSize: '1rem' }}>{p.title}</h2>
                      <ArrowUpRight size={15} className="flex-shrink-0 mt-0.5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(240,240,246,0.4)' }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(240,240,246,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}

        {/* CTA */}
        {!isEmpty && (
          <div className="mt-20 pt-14 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="font-display font-bold text-white mb-2" style={{ fontSize: '1.6rem' }}>Have a project in mind?</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(240,240,246,0.4)' }}>Let&apos;s build something remarkable together.</p>
            <Link href="/#contact" className="btn-primary inline-flex" style={{ padding: '13px 32px' }}>Start a Project</Link>
          </div>
        )}
      </div>
    </main>
  )
}
