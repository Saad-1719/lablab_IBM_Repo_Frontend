/**
 * Next.js Middleware
 * Handles CORS, security headers, and request processing
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get origin from request
  const origin = request.headers.get('origin') || '';
  
  // Allowed origins
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  // Check if origin is allowed
  const isAllowedOrigin = allowedOrigins.some(allowed => 
    origin.startsWith(allowed.trim())
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    return response;
  }

  // Process the request
  const response = NextResponse.next();

  // Add CORS headers
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add cache control for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
