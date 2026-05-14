import { Redis } from '@upstash/redis'
import type { Project } from '@/types/project'

const redis = Redis.fromEnv()
const KEY = 'projects'

export async function readProjects(): Promise<Project[]> {
  try {
    const data = await redis.get<Project[]>(KEY)
    return data ?? []
  } catch {
    return []
  }
}

export async function writeProjects(projects: Project[]): Promise<void> {
  await redis.set(KEY, projects)
}
