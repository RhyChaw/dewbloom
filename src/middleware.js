import { NextResponse } from 'next/server'

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  
  // Protect /admin/* routes (except /admin/login and /api/admin/login)
  if (pathname.startsWith('/admin') && 
      pathname !== '/admin/login' &&
      !pathname.startsWith('/api/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }


  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin-cms/:path*'],
}
