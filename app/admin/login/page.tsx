'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/admin/projects')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Login gagal.')
      }
    } catch {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F0F0F6',
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#080810' }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(168,85,247,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/logoweb.png"
            alt="ITEASY"
            width={160}
            height={160}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}
            >
              <Lock size={15} style={{ color: '#A855F7' }} />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-base">Admin Panel</h1>
              <p className="text-xs" style={{ color: 'rgba(240,240,246,0.4)' }}>
                Masuk untuk mengelola proyek
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl text-xs"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
                placeholder="Username"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors font-body"
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-colors font-body"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(240,240,246,0.35)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.35)')}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-50"
              style={{ background: '#ffffff', color: '#080810' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#e8e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Masuk...</>
              ) : (
                'Masuk'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(240,240,246,0.2)' }}>
          ITEASY Studio — Admin
        </p>
      </motion.div>
    </main>
  )
}
