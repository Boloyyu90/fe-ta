import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin'];

/**
 * Safely parse auth cookie
 * Returns null if parsing fails
 */
function parseAuthCookie(cookieValue: string): {
    isAuthenticated: boolean;
    userRole: string | null;
} | null {
    try {
        const authData = JSON.parse(cookieValue);

        const state = authData.state || authData;

        return {
            isAuthenticated: state?.isAuthenticated === true,
            userRole: state?.user?.role || null,
        };
    } catch (error) {
        console.warn('[Middleware] Failed to parse auth cookie:', error);
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get auth data from cookie
    const authCookie = request.cookies.get('auth-storage');

    let isAuthenticated = false;
    let userRole: string | null = null;

    if (authCookie) {
        const authData = parseAuthCookie(authCookie.value);
        if (authData) {
            isAuthenticated = authData.isAuthenticated;
            userRole = authData.userRole;
        }
    }

    // ============================================
    // RULE 1: Redirect authenticated users away from auth pages
    // ============================================
    if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
        const redirectTo = userRole === 'ADMIN' ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // ============================================
    // RULE 2: Protect authenticated routes
    // ============================================
    if (!isAuthenticated && !publicRoutes.some((route) => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ============================================
    // RULE 3: Protect admin routes
    // ============================================
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
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico (favicon file)
         * - public files (.*\\.*)
         * - api routes
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};