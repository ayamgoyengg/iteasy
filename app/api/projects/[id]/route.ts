import { NextResponse } from 'next/server'
import { readProjects, writeProjects } from '@/lib/projects-store'
import type { Project } from '@/types/project'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const projects = await readProjects()
  const project = projects.find((p) => p.id === params.id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as Partial<Project>
  const projects = await readProjects()
  const idx = projects.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  projects[idx] = { ...projects[idx], ...body }
  await writeProjects(projects)
  return NextResponse.json(projects[idx])
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const projects = await readProjects()
  const filtered = projects.filter((p) => p.id !== params.id)
  if (filtered.length === projects.length)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await writeProjects(filtered)
  return NextResponse.json({ success: true })
}
