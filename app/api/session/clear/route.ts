/**
 * Session Management API - Clear Session
 * POST /api/session/clear
 */

import { NextResponse } from 'next/server';
import { clearSessionInfo } from '@/lib/server/cookies';

export async function POST() {
  try {
    await clearSessionInfo();

    return NextResponse.json({
      success: true,
      message: 'Session cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing session:', error);
    
    return NextResponse.json(
      {
        error: 'Session Error',
        message: error instanceof Error ? error.message : 'Failed to clear session',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
