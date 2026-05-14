'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      const p = total > 0 ? (scrollTop / total) * 100 : 0
      setPct(p)
      setVisible(p > 0.5) // only show after minimal scroll
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200]"
      style={{ height: '4px', background: 'transparent' }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #0CC0DF, #A855F7)',
          transition: 'width 0.08s linear, opacity 0.3s ease',
          boxShadow: '0 0 8px rgba(12,192,223,0.6), 0 0 16px rgba(168,85,247,0.3)',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  )
}
