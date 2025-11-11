// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get auth data from cookie (Zustand persist format)
    const authCookie = request.cookies.get('auth-storage');

    let isAuthenticated = false;
    let userRole: string | null = null;

    if (authCookie) {
        try {
            const authData = JSON.parse(authCookie.value);

            // ✅ FIXED: Zustand persist stores directly in root
            isAuthenticated = authData.state?.isAuthenticated || false;
            userRole = authData.state?.user?.role || null;
        } catch (error) {
            // Invalid cookie, treat as not authenticated
            isAuthenticated = false;
        }
    }

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
        if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Protect authenticated routes
    if (!isAuthenticated && !publicRoutes.some((route) => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Protect admin routes
    if (
        isAuthenticated &&
        adminRoutes.some((route) => pathname.startsWith(route)) &&
        userRole !== 'ADMIN'
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};