import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = [
    '/clients'
]

const authPaths = [
    '/signin'
]

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('token')

    const path = request.nextUrl.pathname
    const isPathEmpty = path === '/'
    const isPathPrivate = privatePaths.some((route) => path.startsWith(route))
    const isAuthPath = authPaths.some((route) => path.startsWith(route))

    if (!isAuthenticated) {
        if (isPathPrivate || isPathEmpty) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }
    else if (isPathEmpty || isAuthPath) {
        return NextResponse.redirect(new URL('/clients', request.url))
    }
}