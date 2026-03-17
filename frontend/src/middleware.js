import { NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    console.log(token, "token")

    if (!token) {
        // If trying to access /admin/dashboard without token → show 404
        if (pathname === '/admin/Dashboard') {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
        return NextResponse.redirect(new URL('/Login', request.url));
    }

    try {
        const payload = decodeJwt(token);

        if (payload?.role === 'admin') {
            return NextResponse.next();
        } else {
            if (pathname === '/admin/dashboard') {
                return NextResponse.rewrite(new URL('/404', request.url));
            }
            return NextResponse.redirect(new URL('/Login', request.url));
        }
    } catch (error) {
        console.error('JWT verification failed:', error);

        if (pathname === '/admin/dashboard') {
            return NextResponse.rewrite(new URL('/404', request.url));
        }

        return NextResponse.redirect(new URL('/Login', request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"]
};
