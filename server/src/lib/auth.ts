import type { CookieOptions, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env, isProd } from '../env.js';
import type { AuthUser } from '../types/express.js';

export const SESSION_COOKIE = 'agamathi_session';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

type TokenPayload = { sub: string; role: AuthUser['role'] };

export function signSession(user: Pick<AuthUser, 'id' | 'role'>): string {
  const payload: TokenPayload = { sub: user.id, role: user.role };
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
}

export function verifySession(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return typeof decoded === 'object' && typeof decoded.sub === 'string'
      ? (decoded as TokenPayload)
      : null;
  } catch {
    return null;
  }
}

/** httpOnly so page scripts can never read it; SameSite=Lax blocks cross-site POSTs. */
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  path: '/',
};

export function setSessionCookie(res: Response, token: string) {
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, maxAge: SEVEN_DAYS });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(SESSION_COOKIE, cookieOptions);
}

/** Fields that are safe to send to the browser. */
export const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  phone: true,
  role: true,
} as const;
