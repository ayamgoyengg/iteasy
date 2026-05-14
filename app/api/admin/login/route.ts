import { NextResponse } from 'next/server'

const USER  = process.env.ADMIN_USERNAME ?? 'admin'
const PASS  = process.env.ADMIN_PASSWORD ?? ''
const TOKEN = process.env.ADMIN_SESSION_TOKEN ?? 'iteasy-admin-s3cr3t-2024'

export async function POST(req: Request) {
  const { username, password } = await req.json() as { username: string; password: string }

  if (username !== USER || password !== PASS) {
    return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  })
  return res
}
