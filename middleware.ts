import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TOKEN = process.env.ADMIN_SESSION_TOKEN ?? 'iteasy-admin-s3cr3t-2024'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session')
    if (!session || session.value !== TOKEN) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
