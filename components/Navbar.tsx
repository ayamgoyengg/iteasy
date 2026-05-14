'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (pathname !== '/') return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-xl'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(8,8,16,0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      } : {}}
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/assets/logoweb.png"
              alt="ITEASY"
              width={200}
              height={200}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — center */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium whitespace-nowrap transition-colors duration-200 relative group"
                style={{ color: 'rgba(240,240,246,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0F6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.5)')}
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #0CC0DF, #A855F7)' }}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex flex-shrink-0">
            <a
              href="#contact"
              className="whitespace-nowrap text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
              style={{ background: '#fff', color: '#080810' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e8e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              Start a Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              background: isOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(240,240,246,0.7)',
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'x' : 'm'}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10,10,20,0.97)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div className="p-3">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 group"
                    style={{ color: 'rgba(240,240,246,0.6)' }}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.color = '#F0F0F6'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(240,240,246,0.6)'
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <div className="px-3 pt-2 pb-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a
                    href="#contact"
                    className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-2"
                    style={{ background: '#ffffff', color: '#080810' }}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#e8e8f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    Start a Project
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
