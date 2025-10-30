/**
 * ============================================================================
 * 🛡️ MIDDLEWARE - ROUTE PROTECTION
 * ============================================================================
 * Protects routes that require authentication
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/register', '/'];

    // Check if current route is public
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // If user is authenticated and trying to access auth pages
    if ((accessToken || refreshToken) && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is not authenticated and trying to access protected routes
    if (!accessToken && !refreshToken && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
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