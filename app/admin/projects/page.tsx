'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, X, Check, Loader2, LogOut } from 'lucide-react'
import type { Project } from '@/types/project'

const CATEGORIES = ['Design', 'Development', 'Design & Dev'] as const
const EMPTY: Omit<Project, 'id' | 'createdAt'> = {
  title: '',
  desc: '',
  tags: [],
  category: 'Design',
  year: new Date().getFullYear().toString(),
  image: '',
  href: '#',
  status: 'published',
}

export default function AdminProjects() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'create' | 'edit' | 'delete' | null>(null)
  const [active, setActive] = useState<Project | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [tagsInput, setTagsInput] = useState('')

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    setProjects(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openCreate = () => {
    setForm(EMPTY)
    setTagsInput('')
    setActive(null)
    setModal('create')
  }

  const openEdit = (p: Project) => {
    setForm({ title: p.title, desc: p.desc, tags: p.tags, category: p.category, year: p.year, image: p.image, href: p.href, status: p.status })
    setTagsInput(p.tags.join(', '))
    setActive(p)
    setModal('edit')
  }

  const openDelete = (p: Project) => { setActive(p); setModal('delete') }

  const save = async () => {
    setSaving(true)
    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) }
    if (modal === 'create') {
      await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else if (modal === 'edit' && active) {
      await fetch(`/api/projects/${active.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    setSaving(false)
    setModal(null)
    load()
  }

  const remove = async () => {
    if (!active) return
    setSaving(true)
    await fetch(`/api/projects/${active.id}`, { method: 'DELETE' })
    setSaving(false)
    setModal(null)
    load()
  }

  const toggleStatus = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: p.status === 'published' ? 'draft' : 'published' }),
    })
    load()
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors'
  const inputSt = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0F0F6' }
  const focusSt = (e: React.FocusEvent<HTMLElement>) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(12,192,223,0.5)')
  const blurSt  = (e: React.FocusEvent<HTMLElement>) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')

  return (
    <main className="min-h-screen" style={{ background: '#080810', color: '#F0F0F6' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{ background: 'rgba(8,8,16,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'rgba(240,240,246,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0F6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,246,0.45)')}
          >
            <ArrowLeft size={14} /> Back to Site
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
          <span className="text-sm font-medium text-white">Projects</span>
        </div>

        <Link href="/" className="hidden sm:block">
          <Image src="/assets/logoweb.png" alt="ITEASY" width={120} height={40} className="h-7 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{ background: '#fff', color: '#080810' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e8e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
          >
            <Plus size={14} /> Add Project
          </button>
          <button
            onClick={logout}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,240,246,0.5)' }}
            title="Logout"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,240,246,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total', value: projects.length },
            { label: 'Published', value: projects.filter((p) => p.status === 'published').length },
            { label: 'Draft', value: projects.filter((p) => p.status === 'draft').length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-display font-bold text-white" style={{ fontSize: '2rem' }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(240,240,246,0.4)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin" style={{ color: '#0CC0DF' }} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p className="font-display font-bold text-white text-xl mb-2">No projects yet</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(240,240,246,0.4)' }}>Add your first project to get started.</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ background: '#fff', color: '#080810' }}>
              <Plus size={14} /> Add Project
            </button>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Table head */}
            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(240,240,246,0.35)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span>Project</span>
              <span>Category</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 transition-colors"
                style={{
                  borderBottom: i < projects.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Title + image */}
                <div className="flex items-center gap-3 min-w-0">
                  {p.image && (
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 opacity-70" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(240,240,246,0.35)' }}>{p.year}</p>
                  </div>
                </div>

                {/* Category */}
                <span className="text-xs px-2.5 py-1 rounded-full w-fit" style={{ background: 'rgba(12,192,223,0.1)', color: '#0CC0DF', border: '1px solid rgba(12,192,223,0.2)' }}>
                  {p.category}
                </span>

                {/* Status */}
                <button
                  onClick={() => toggleStatus(p)}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full w-fit transition-all"
                  style={p.status === 'published'
                    ? { background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }
                    : { background: 'rgba(255,255,255,0.05)', color: 'rgba(240,240,246,0.4)', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {p.status === 'published' ? <Eye size={10} /> : <EyeOff size={10} />}
                  {p.status === 'published' ? 'Published' : 'Draft'}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(240,240,246,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#F0F0F6'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,240,246,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => openDelete(p)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(239,68,68,0.06)', color: 'rgba(239,68,68,0.5)', border: '1px solid rgba(239,68,68,0.1)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(239,68,68,0.5)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.1)' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      {(modal === 'create' || modal === 'edit') && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: '#0e0e1c', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="font-display font-semibold text-white">{modal === 'create' ? 'Add Project' : 'Edit Project'}</h2>
              <button onClick={() => setModal(null)} style={{ color: 'rgba(240,240,246,0.4)' }}><X size={18} /></button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Title *</label>
                <input className={inputCls} style={inputSt} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Project title" onFocus={focusSt} onBlur={blurSt} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Description *</label>
                <textarea className={`${inputCls} resize-none`} style={inputSt} rows={3} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} placeholder="Short project description" onFocus={focusSt} onBlur={blurSt} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Category *</label>
                  <select className={inputCls} style={{ ...inputSt, cursor: 'pointer' }} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Project['category'] }))} onFocus={focusSt} onBlur={blurSt}>
                    {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#0e0e1c' }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Year *</label>
                  <input className={inputCls} style={inputSt} value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2024" onFocus={focusSt} onBlur={blurSt} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Tags (comma separated)</label>
                <input className={inputCls} style={inputSt} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Next.js, Design, React" onFocus={focusSt} onBlur={blurSt} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Image URL</label>
                <input className={inputCls} style={inputSt} value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://..." onFocus={focusSt} onBlur={blurSt} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Project URL</label>
                <input className={inputCls} style={inputSt} value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} placeholder="https://..." onFocus={focusSt} onBlur={blurSt} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(240,240,246,0.4)' }}>Status</label>
                <div className="flex gap-3">
                  {(['published', 'draft'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, status: s }))}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all"
                      style={form.status === s
                        ? { background: 'rgba(12,192,223,0.15)', color: '#0CC0DF', border: '1px solid rgba(12,192,223,0.4)' }
                        : { background: 'transparent', color: 'rgba(240,240,246,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-full text-sm" style={{ color: 'rgba(240,240,246,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
              <button onClick={save} disabled={saving || !form.title} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50" style={{ background: '#fff', color: '#080810' }}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                {modal === 'create' ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {modal === 'delete' && active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: '#0e0e1c', border: '1px solid rgba(239,68,68,0.2)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <Trash2 size={20} style={{ color: '#ef4444' }} />
            </div>
            <h2 className="font-display font-bold text-white mb-2">Delete Project?</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(240,240,246,0.45)' }}>
              &ldquo;{active.title}&rdquo; will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-full text-sm" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,240,246,0.5)' }}>Cancel</button>
              <button onClick={remove} disabled={saving} className="flex-1 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: '#ef4444', color: '#fff' }}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
