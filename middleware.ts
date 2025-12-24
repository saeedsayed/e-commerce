import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('token')?.value
    const { pathname, origin } = request.nextUrl
    if ((pathname === '/login' || pathname === '/register') && cookie) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if ((pathname.includes('/profile') || pathname.includes('/cart')) && !cookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register', "/cart/:path*"],
}