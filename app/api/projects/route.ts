import { NextResponse } from 'next/server'
import { readProjects, writeProjects } from '@/lib/projects-store'
import type { Project } from '@/types/project'
import { randomUUID } from 'crypto'

export async function GET() {
  return NextResponse.json(readProjects())
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<Project, 'id' | 'createdAt'>
  const projects = readProjects()
  const newProject: Project = {
    ...body,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  }
  writeProjects([...projects, newProject])
  return NextResponse.json(newProject, { status: 201 })
}
