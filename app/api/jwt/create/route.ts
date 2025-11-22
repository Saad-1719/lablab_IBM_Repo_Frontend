/**
 * JWT Token Generation API Route
 * POST /api/jwt/create
 * GET /api/jwt/create (legacy support)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createJWT, parseSessionInfo, getDefaultContext, areKeysLoaded } from '@/lib/server/jwt';
import { getOrSetAnonymousID, getAllCookies } from '@/lib/server/cookies';
import type { APIError } from '@/lib/types/jwt';

export const dynamic = 'force-dynamic';

/**
 * Handle JWT creation requests
 */
async function handleJWTCreation() {
  try {
    // Check if keys are loaded
    if (!areKeysLoaded()) {
      const error: APIError = {
        error: 'Configuration Error',
        message: 'RSA keys not loaded. Please ensure keys exist in the keys/ directory.',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(error, { status: 500 });
    }

    // Get or create anonymous user ID
    const anonymousUserID = await getOrSetAnonymousID();

    // Get session info from cookies
    const allCookies = await getAllCookies();
    const sessionInfo = parseSessionInfo(allCookies);

    // Get default context
    const context = getDefaultContext();

    // Create JWT token
    const token = createJWT(anonymousUserID, sessionInfo, context);

    console.log(`✓ JWT created for user: ${anonymousUserID}`);
    console.log(`  Token preview: ${token.substring(0, 50)}...`);

    // Return token as plain text (Watsonx Orchestrate expects this format)
    return new NextResponse(token, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('✗ Error creating JWT:', error);
    
    const apiError: APIError = {
      error: 'JWT Creation Failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleJWTCreation();
}

export async function POST(request: NextRequest) {
  return handleJWTCreation();
}
