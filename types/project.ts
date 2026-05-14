export interface Project {
  id: string
  title: string
  desc: string
  tags: string[]
  category: 'Design' | 'Development' | 'Design & Dev'
  year: string
  image: string
  href: string
  status: 'published' | 'draft'
  createdAt: string
}
