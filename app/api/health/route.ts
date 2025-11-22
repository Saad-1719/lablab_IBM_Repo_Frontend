/**
 * Health Check API Route
 * GET /api/health
 */

import { NextResponse } from 'next/server';
import { areKeysLoaded } from '@/lib/server/jwt';
import type { HealthCheckResponse } from '@/lib/types/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
  const keysLoaded = areKeysLoaded();

  const response: HealthCheckResponse = {
    status: 'ok',
    keysLoaded,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
