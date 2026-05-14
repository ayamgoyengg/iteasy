import fs from 'fs'
import path from 'path'
import type { Project } from '@/types/project'

const FILE = path.join(process.cwd(), 'data', 'projects.json')

export function readProjects(): Project[] {
  try {
    if (!fs.existsSync(FILE)) return []
    return JSON.parse(fs.readFileSync(FILE, 'utf-8')) as Project[]
  } catch {
    return []
  }
}

export function writeProjects(projects: Project[]): void {
  fs.writeFileSync(FILE, JSON.stringify(projects, null, 2), 'utf-8')
}
