'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'

/* ── colour tokens ── */
const C = {
  text:        '#E8E8F2',
  textMuted:   'rgba(232,232,242,0.45)',
  textDim:     'rgba(232,232,242,0.3)',
  border:      'rgba(255,255,255,0.09)',
  borderFocus: 'rgba(12,192,223,0.5)',
  surface:     'rgba(255,255,255,0.04)',
  bg:          '#080810',
}

const budgetOptions = [
  'Di bawah Rp 5 juta',
  'Rp 5 – 15 juta',
  'Rp 15 – 30 juta',
  'Rp 30 – 50 juta',
  'Di atas Rp 50 juta',
]

const serviceChips = [
  'UI / UX Design',
  'Web Development',
  'Brand Identity',
  'Design System',
  'Digital Strategy',
  'Lainnya',
]

/* ── Floating label input ── */
function FloatField({
  name, label, type = 'text', value, onChange, required = false,
}: {
  name: string; label: string; type?: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={name} name={name} type={type} value={value}
        onChange={onChange} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        className="w-full pt-6 pb-2 px-4 rounded-2xl text-sm outline-none transition-all duration-200"
        style={{
          background: C.surface,
          border: `1px solid ${focused ? C.borderFocus : C.border}`,
          color: C.text,
          boxShadow: focused ? '0 0 0 3px rgba(12,192,223,0.08)' : 'none',
        }}
      />
      <label
        htmlFor={name}
        className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{
          top:      lifted ? '8px'   : '50%',
          fontSize: lifted ? '10px'  : '13px',
          transform: lifted ? 'none' : 'translateY(-50%)',
          color:    focused ? '#0CC0DF' : C.textDim,
          letterSpacing: lifted ? '0.06em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

/* ── Float select ── */
function FloatSelect({
  name, label, value, onChange, options, required = false,
}: {
  name: string; label: string; value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <select
        id={name} name={name} value={value}
        onChange={onChange} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-6 pb-2 px-4 rounded-2xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
        style={{
          background: C.surface,
          border: `1px solid ${focused ? C.borderFocus : C.border}`,
          color: value ? C.text : 'transparent',
          boxShadow: focused ? '0 0 0 3px rgba(12,192,223,0.08)' : 'none',
        }}
      >
        <option value="" disabled style={{ background: '#111120', color: C.text }} />
        {options.map((o) => (
          <option key={o} value={o} style={{ background: '#111120', color: C.text }}>{o}</option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{
          top:      lifted ? '8px'   : '50%',
          fontSize: lifted ? '10px'  : '13px',
          transform: lifted ? 'none' : 'translateY(-50%)',
          color:    focused ? '#0CC0DF' : C.textDim,
          letterSpacing: lifted ? '0.06em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
      <ChevronDown
        size={14}
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200"
        style={{ color: C.textDim, transform: `translateY(-50%) rotate(${focused ? 180 : 0}deg)` }}
      />
    </div>
  )
}

/* ── Float textarea ── */
function FloatTextarea({
  name, label, value, onChange,
}: {
  name: string; label: string; value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        id={name} name={name} value={value}
        onChange={onChange} rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-7 pb-3 px-4 rounded-2xl text-sm outline-none transition-all duration-200 resize-none"
        style={{
          background: C.surface,
          border: `1px solid ${focused ? C.borderFocus : C.border}`,
          color: C.text,
          boxShadow: focused ? '0 0 0 3px rgba(12,192,223,0.08)' : 'none',
        }}
      />
      <label
        htmlFor={name}
        className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{
          top:      lifted ? '10px'  : '18px',
          fontSize: lifted ? '10px'  : '13px',
          color:    focused ? '#0CC0DF' : C.textDim,
          letterSpacing: lifted ? '0.06em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

/* ── Page ── */
export default function ContactPage() {
  const [form, setForm] = useState({
    nama: '', email: '', phone: '', budget: '', message: '',
  })
  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSent(true); setLoading(false) }, 1400)
  }

  const up = (delay = 0) => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
  })

  return (
    <main className="min-h-screen" style={{ background: C.bg }}>

      {/* subtle bg blob */}
      <div className="fixed inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 30%, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />

      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{ background: 'rgba(8,8,16,0.8)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}
      >
        <Link href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: C.textMuted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image src="/assets/logoweb.png" alt="ITEASY" width={160} height={60} className="h-8 w-auto object-contain" priority />
        </Link>

        <span />
      </header>

      <div className="max-w-xl mx-auto px-6 sm:px-8 pt-28 pb-24">

        <AnimatePresence mode="wait">
          {sent ? (
            /* ── Success ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center pt-16 space-y-5"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(12,192,223,0.1)', border: '1px solid rgba(12,192,223,0.25)' }}
              >
                <CheckCircle2 size={34} style={{ color: '#0CC0DF' }} />
              </motion.div>
              <h2 className="font-display font-bold text-white text-2xl">Terima kasih!</h2>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
                Pesan kamu sudah kami terima. Tim kami akan menghubungi kamu dalam 1×24 jam.
              </p>
              <Link href="/"
                className="inline-flex items-center gap-2 text-sm font-medium mt-2 transition-colors"
                style={{ color: '#0CC0DF' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#0CC0DF')}
              >
                <ArrowLeft size={14} /> Kembali ke beranda
              </Link>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div
              key="form"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            >
              {/* Header */}
              <motion.div variants={up()} className="text-center mb-12">
                <h1
                  className="font-display font-bold text-white leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
                >
                  Let&apos;s Talk About{' '}
                  <span className="font-serif italic font-normal" style={{ color: 'rgba(12,192,223,0.9)' }}>
                    Your Project
                  </span>
                </h1>
                <p className="text-sm" style={{ color: C.textMuted }}>
                  Ceritakan proyek kamu — kami akan pastikan brand kamu tampil beda.
                </p>
              </motion.div>

              <form onSubmit={submit} className="space-y-4">

                {/* Row: Nama + Email */}
                <motion.div variants={up()} className="grid sm:grid-cols-2 gap-4">
                  <FloatField name="nama"  label="Nama *"  value={form.nama}  onChange={handle} required />
                  <FloatField name="email" label="Email *" type="email" value={form.email} onChange={handle} required />
                </motion.div>

                {/* No HP */}
                <motion.div variants={up()}>
                  <FloatField name="phone" label="No HP / WhatsApp *" type="tel" value={form.phone} onChange={handle} required />
                </motion.div>

                {/* Budget */}
                <motion.div variants={up()}>
                  <FloatSelect name="budget" label="Estimasi Budget *" value={form.budget} onChange={handle} options={budgetOptions} required />
                </motion.div>

                {/* Service chips */}
                <motion.div variants={up()}>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.textDim }}>
                    Kebutuhan Layanan *
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {serviceChips.map((s) => {
                      const active = services.includes(s)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
                          style={{
                            background: active ? 'rgba(12,192,223,0.12)' : C.surface,
                            border: `1px solid ${active ? 'rgba(12,192,223,0.45)' : C.border}`,
                            color: active ? '#0CC0DF' : C.textMuted,
                            boxShadow: active ? '0 0 12px rgba(12,192,223,0.12)' : 'none',
                          }}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Pesan */}
                <motion.div variants={up()}>
                  <FloatTextarea
                    name="message" label="Ceritakan lebih lanjut (opsional)"
                    value={form.message} onChange={handle}
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={up()} className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || services.length === 0}
                    className="w-full py-4 rounded-full font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: '#ffffff', color: '#080810' }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#e8e8f0' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff' }}
                  >
                    {loading ? (
                      <><Loader2 size={15} className="animate-spin" /> Mengirim...</>
                    ) : 'Kirim Pesan'}
                  </button>
                  {services.length === 0 && (
                    <p className="text-center text-xs mt-2" style={{ color: C.textDim }}>
                      Pilih minimal satu layanan
                    </p>
                  )}
                </motion.div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
