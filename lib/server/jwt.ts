/**
 * Server-side JWT utilities for Watsonx Orchestrate authentication
 * This module handles JWT token generation and encryption
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import type { JWTPayload, UserPayload, SessionInfo, JWTContext } from '../types/jwt';

// Cache for loaded keys
let privateKeyCache: Buffer | null = null;
let ibmPublicKeyCache: Buffer | null = null;

/**
 * Load RSA keys from the filesystem or environment variables
 * Keys are cached after first load for performance
 */
function loadKeys(): { privateKey: Buffer; ibmPublicKey: Buffer } {
  if (privateKeyCache && ibmPublicKeyCache) {
    return { privateKey: privateKeyCache, ibmPublicKey: ibmPublicKeyCache };
  }

  // In production, try to load from environment variables first (for Vercel, etc.)
  if (process.env.NODE_ENV === 'production') {
    const privateKeyEnv = process.env.CLIENT_PRIVATE_KEY;
    const ibmPublicKeyEnv = process.env.IBM_PUBLIC_KEY;
    
    if (privateKeyEnv && ibmPublicKeyEnv) {
      privateKeyCache = Buffer.from(privateKeyEnv, 'utf-8');
      ibmPublicKeyCache = Buffer.from(ibmPublicKeyEnv, 'utf-8');
      console.log('✓ Keys loaded from environment variables');
      return { privateKey: privateKeyCache, ibmPublicKey: ibmPublicKeyCache };
    }
  }

  // Use environment variables or fallback to defaults
  const keysDir = path.join(
    process.cwd(), 
    process.env.KEYS_DIRECTORY || 'keys'
  );
  const privateKeyPath = path.join(
    keysDir, 
    process.env.PRIVATE_KEY_FILENAME || 'private.key'
  );
  const ibmPublicKeyPath = path.join(
    keysDir, 
    process.env.IBM_PUBLIC_KEY_FILENAME || 'ibm_public.pub'
  );

  try {
    privateKeyCache = fs.readFileSync(privateKeyPath);
    ibmPublicKeyCache = fs.readFileSync(ibmPublicKeyPath);
    
    console.log('✓ Keys loaded successfully from:', keysDir);
    console.log('  - Private key:', path.basename(privateKeyPath));
    console.log('  - IBM public key:', path.basename(ibmPublicKeyPath));
    return { privateKey: privateKeyCache, ibmPublicKey: ibmPublicKeyCache };
  } catch (error) {
    console.error('✗ Error loading keys:', error);
    console.error('  - Keys directory:', keysDir);
    console.error('  - Private key path:', privateKeyPath);
    console.error('  - IBM public key path:', ibmPublicKeyPath);
    throw new Error(
      'Failed to load RSA keys. Please ensure keys exist in the configured directory or set CLIENT_PRIVATE_KEY and IBM_PUBLIC_KEY environment variables. ' +
      'Run wxo-security-config.sh to generate keys.'
    );
  }
}

/**
 * Check if keys are available
 */
export function areKeysLoaded(): boolean {
  try {
    loadKeys();
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a new anonymous user ID
 */
export function generateAnonymousID(): string {
  // Generate a short UUID for easier debugging
  return `anon-${uuid().substring(0, 8)}`;
}

/**
 * Encrypt user payload using IBM's public key
 */
function encryptUserPayload(userPayload: UserPayload, ibmPublicKey: Buffer): string {
  const dataString = JSON.stringify(userPayload);

  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: ibmPublicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(dataString, 'utf-8')
  );

  return encryptedBuffer.toString('base64');
}

/**
 * Create a signed JWT token for Watsonx Orchestrate
 */
export function createJWT(
  anonymousUserID: string,
  sessionInfo?: SessionInfo | null,
  context?: JWTContext
): string {
  const { privateKey, ibmPublicKey } = loadKeys();

  // Build user payload
  const userPayload: UserPayload = {
    custom_message: 'Encrypted message',
    name: sessionInfo?.userName || 'Anonymous User',
  };

  // Add authenticated user info if available
  if (sessionInfo) {
    userPayload.custom_user_id = sessionInfo.customUserID;
    if (sessionInfo.email) {
      userPayload.email = sessionInfo.email;
    }
    if (sessionInfo.role) {
      userPayload.role = sessionInfo.role;
    }
  }

  // Build JWT content
  const jwtContent: Partial<JWTPayload> = {
    sub: anonymousUserID,
    user_payload: encryptUserPayload(userPayload, ibmPublicKey),
  };

  // Add context if provided
  if (context) {
    jwtContent.context = {
      ...context,
      timestamp: context.timestamp || new Date().toISOString(),
    };
  }

  // Sign the JWT
  const token = jwt.sign(jwtContent, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h', // 1 hour expiration
  });

  return token;
}

/**
 * Parse session info from cookies or headers
 */
export function parseSessionInfo(cookies: Record<string, string>): SessionInfo | null {
  const sessionInfoString = cookies['SESSION_INFO'];
  
  if (!sessionInfoString) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(sessionInfoString));
  } catch (error) {
    console.error('Error parsing session info:', error);
    return null;
  }
}

/**
 * Get default JWT context
 */
export function getDefaultContext(): JWTContext {
  return {
    dev_id: 23424,
    dev_name: 'LabLab IBM Team',
    is_active: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };
}
