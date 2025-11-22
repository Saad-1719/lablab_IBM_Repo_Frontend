/**
 * TypeScript types for JWT authentication and Watsonx Orchestrate integration
 */

export interface JWTPayload {
  sub: string; // User ID (subject)
  user_payload: string; // Encrypted user data (base64 encoded)
  context?: JWTContext;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

export interface UserPayload {
  custom_message?: string;
  name: string;
  custom_user_id?: string;
  [key: string]: any;
}

export interface SessionInfo {
  userName: string;
  customUserID: string;
  email?: string;
  role?: string;
}

export interface JWTContext {
  dev_id?: number;
  dev_name?: string;
  is_active?: boolean;
  timestamp?: string;
  [key: string]: any;
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  keysLoaded: boolean;
  timestamp: string;
  port?: number;
  environment?: string;
}

export interface APIError {
  error: string;
  message: string;
  timestamp: string;
}
