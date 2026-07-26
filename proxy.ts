import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Dalam skenario nyata, ini akan mengecek token JWT dari Supabase atau NextAuth
  // Untuk saat ini kita mengecek cookie 'smart-schedule-session' fiktif
  const sessionCookie = request.cookies.get('smart-schedule-session');
  
  // Rute yang perlu diproteksi
  const protectedRoutes = ['/dashboard', '/tasks', '/calendar', '/ai-schedule', '/productivity'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rute otentikasi (tidak boleh diakses jika sudah login)
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
