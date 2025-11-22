/**
 * API Documentation Route
 * GET /api
 */

import { NextResponse } from 'next/server';
import { areKeysLoaded } from '@/lib/server/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
  const keysLoaded = areKeysLoaded();

  const documentation = {
    name: 'Watsonx Orchestrate JWT Server',
    version: '2.0.0',
    description: 'Full-stack Next.js application for Watsonx Orchestrate authentication',
    endpoints: {
      '/api': 'This documentation',
      '/api/health': 'Health check and status',
      '/api/jwt/create': 'Generate JWT token (GET or POST)',
      '/api/session/set': 'Set authenticated session (POST)',
      '/api/session/clear': 'Clear session (POST)',
    },
    status: keysLoaded ? 'ready' : 'keys not loaded',
    keysLoaded,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(documentation, {
    status: 200,
  });
}
