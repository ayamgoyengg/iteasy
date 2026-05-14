'use client'

import { useEffect, useRef } from 'react'

export function EdgeAccent() {
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number

    const update = () => {
      const y      = window.scrollY
      const total  = document.documentElement.scrollHeight - window.innerHeight
      const pct    = total > 0 ? y / total : 0
      // gradient is 400% tall — shift it 300% as user scrolls full page
      const pos    = `${pct * -300}%`

      if (rightRef.current) rightRef.current.style.backgroundPositionY = pos
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    width: 3,
    height: '100vh',
    zIndex: 150,
    pointerEvents: 'none',
    backgroundImage: `linear-gradient(
      to bottom,
      transparent     0%,
      #0CC0DF        15%,
      #A855F7        35%,
      #0CC0DF        55%,
      #A855F7        75%,
      #0CC0DF        90%,
      transparent   100%
    )`,
    backgroundSize: '100% 400%',
    backgroundPositionY: '0%',
  }

  return (
    <div
      ref={rightRef}
      style={{
        ...base,
        right: 0,
        boxShadow: '0 0 10px rgba(168,85,247,0.5), 0 0 24px rgba(12,192,223,0.2)',
      }}
    />
  )
}
