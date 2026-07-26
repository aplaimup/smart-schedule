import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('smart-schedule-session')?.value;
  const roleCookie = request.cookies.get('smart-schedule-role')?.value;
  
  // Admin routes protection
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  if (isAdminRoute && roleCookie !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Regular protected routes
  const protectedRoutes = ['/dashboard', '/tasks', '/calendar', '/ai-schedule', '/productivity', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth routes (cannot be accessed if logged in)
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Hanya jalankan middleware pada rute halaman (lewati API, statis, dan aset)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
