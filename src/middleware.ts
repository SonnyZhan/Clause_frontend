import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We can't access localStorage in middleware, so we'll rely on client-side protection for now
  // or use cookies if we were implementing real auth.
  // For this mock implementation, we'll just pass through and let the client-side AuthProvider handle redirects.
  // However, we can still implement some basic path-based logic if needed.
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     * - welcome (landing page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth|welcome).*)',
  ],
};
