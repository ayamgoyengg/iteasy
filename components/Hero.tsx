"use client"

import { motion } from "framer-motion"
import { ShaderBackground } from "@/components/ui/hero-shader"

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } },
})

const Hero = () => {
  return (
    <ShaderBackground className="min-h-[100dvh] w-full">

      {/* ── Content: bottom-left ── */}
      <motion.main
        className="absolute bottom-0 left-0 px-8 sm:px-12 z-20 max-w-2xl"
        style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
      >
        {/* Headline */}
        <motion.h1
          variants={up()}
          className="leading-[1.1] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          <span className="font-serif italic font-normal text-white">Beautiful</span>
          {" "}
          <span className="font-display font-normal text-white">Design</span>
          <br />
          <span className="font-display font-bold text-white tracking-tight">Experiences</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={up(0.07)}
          className="text-xs font-light leading-relaxed mb-6 max-w-lg"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Discover the essence of creativity in our exquisite collection of modern digital
          solutions. Each project is a blend of beauty and performance, perfect for elevating any
          brand.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={up(0.13)} className="flex items-center gap-4 flex-wrap">
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-full text-white font-normal text-xs transition-all duration-200"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)" }}
          >
            Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90"
          >
            Get Started
          </a>
        </motion.div>
      </motion.main>

    </ShaderBackground>
  )
}

export default Hero
