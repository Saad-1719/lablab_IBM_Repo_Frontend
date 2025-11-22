/**
 * Cookie management utilities for Next.js
 */

import { cookies } from 'next/headers';
import { generateAnonymousID } from './jwt';

const TIME_45_DAYS = 60 * 60 * 24 * 45; // 45 days in seconds

/**
 * Get or create anonymous user ID from cookies
 */
export async function getOrSetAnonymousID(): Promise<string> {
  const cookieStore = await cookies();
  let anonymousID = cookieStore.get('ANONYMOUS-USER-ID')?.value;

  if (!anonymousID) {
    anonymousID = generateAnonymousID();
    
    // Set cookie with 45-day expiration
    cookieStore.set('ANONYMOUS-USER-ID', anonymousID, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: TIME_45_DAYS,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return anonymousID;
}

/**
 * Parse all cookies into a key-value object
 */
export async function getAllCookies(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const cookiesObj: Record<string, string> = {};
  
  cookieStore.getAll().forEach((cookie) => {
    cookiesObj[cookie.name] = cookie.value;
  });

  return cookiesObj;
}

/**
 * Set session info cookie
 */
export async function setSessionInfo(sessionInfo: {
  userName: string;
  customUserID: string;
  email?: string;
  role?: string;
}): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('SESSION_INFO', encodeURIComponent(JSON.stringify(sessionInfo)), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: TIME_45_DAYS,
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Clear session info cookie
 */
export async function clearSessionInfo(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('SESSION_INFO');
}
