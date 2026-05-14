'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function PageLoader() {
  const [show, setShow] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState(false)

  useEffect(() => {
    // Hide loader after animation completes
    const t = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: '#080810' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/logoweb.png"
              alt="ITEASY"
              width={200}
              height={200}
              className="h-12 w-auto object-contain"
              priority
              onLoad={() => setLogoLoaded(true)}
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="mt-10 overflow-hidden rounded-full"
            style={{ width: 120, height: 2, background: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #0CC0DF, #A855F7)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
