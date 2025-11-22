/**
 * Session Management API - Set Session
 * POST /api/session/set
 */

import { NextRequest, NextResponse } from 'next/server';
import { setSessionInfo } from '@/lib/server/cookies';
import type { SessionInfo, APIError } from '@/lib/types/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userName, customUserID, email, role } = body;

    if (!userName || !customUserID) {
      const error: APIError = {
        error: 'Validation Error',
        message: 'userName and customUserID are required',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(error, { status: 400 });
    }

    const sessionInfo: SessionInfo = {
      userName,
      customUserID,
      email,
      role,
    };

    await setSessionInfo(sessionInfo);

    return NextResponse.json({
      success: true,
      message: 'Session set successfully',
      sessionInfo,
    });
  } catch (error) {
    console.error('Error setting session:', error);
    
    const apiError: APIError = {
      error: 'Session Error',
      message: error instanceof Error ? error.message : 'Failed to set session',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(apiError, { status: 500 });
  }
}
