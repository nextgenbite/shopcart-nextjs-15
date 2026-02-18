import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that do NOT require authentication
const publicPaths = ['/login', '/register', '/', '/deal','/cart', '/products', '/products/(.*)']; // homepage and product pages are public
const authPaths = ['/login', '/register']; // paths that should redirect to dashboard if already authenticated

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Check if the path is public (matches any public path pattern)
  const isPublic = publicPaths.some(path => {
    if (path.endsWith('/(.*)')) {
      const basePath = path.slice(0, -5);
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  // Check if the path is an auth path (login/register)
  const isAuthPath = authPaths.includes(pathname);

  // If no token and trying to access a protected route → redirect to login
  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname); // optional: save intended destination
    return NextResponse.redirect(loginUrl);
  }

  // If token exists and trying to access login/register → redirect to dashboard
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};