'use client'

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  const links = {
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
    Services: [
      { label: 'UI / UX Design', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'Brand Identity', href: '#services' },
      { label: 'Digital Strategy', href: '#services' },
    ],
  }

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  if (pathname !== '/') return null

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#050510', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center w-fit">
              <Image
                src="/assets/logoweb.png"
                alt="ITEASY"
                width={200}
                height={200}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,246,0.4)', maxWidth: 200 }}>
              Making IT Easy — Crafting outstanding digital experiences for ambitious brands.
            </p>

            <div className="space-y-2.5">
              <a
                href="mailto:admin@iteasy.co"
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: 'rgba(240,240,246,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0CC0DF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.4)')}
              >
                <Mail size={13} className="text-primary flex-shrink-0" />
                admin@iteasy.co
              </a>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(240,240,246,0.4)' }}>
                <MapPin size={13} className="text-primary flex-shrink-0" />
                Surabaya, Indonesia
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h5
                className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider"
                style={{ fontSize: '0.72rem' }}
              >
                {cat}
              </h5>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(240,240,246,0.4)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0F6')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.4)')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <h5
              className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider"
              style={{ fontSize: '0.72rem' }}
            >
              Start Today
            </h5>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,240,246,0.4)' }}>
              Ready to build something outstanding?
            </p>
            <a
              href="#contact"
              className="btn-outline inline-flex"
              style={{ padding: '10px 22px', fontSize: '0.82rem' }}
            >
              Get in Touch
            </a>

            <div className="flex gap-2.5 mt-7">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(240,240,246,0.4)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.color = '#F0F0F6'
                      el.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.color = 'rgba(240,240,246,0.4)'
                      el.style.borderColor = 'rgba(255,255,255,0.07)'
                    }}
                  >
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: 'rgba(240,240,246,0.3)' }}>
          <p>© {year} ITEASY. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
