"use client"

import type React from "react"
import { useRef } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function ShaderBackground({ children, className = "" }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Primary animated mesh gradient — ITEASY theme: dark + cyan + purple */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#080810", "#0CC0DF", "#080810", "#A855F7", "#030712"]}
        speed={0.25}
      />

      {/* Secondary overlay — depth layer with softer blend */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#080810", "#0891b2", "#A855F7", "#080810"]}
        speed={0.15}
      />

      {/* Subtle dark vignette bottom so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
        }}
      />

      {children}
    </div>
  )
}
