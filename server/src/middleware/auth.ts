import type { Role } from '@prisma/client';
import type { RequestHandler } from 'express';
import { publicUserSelect, SESSION_COOKIE, verifySession } from '../lib/auth.js';
import { HttpError } from '../lib/http-error.js';
import { prisma } from '../lib/prisma.js';

/**
 * Reads the session cookie and, if valid, loads the user onto `req.user`.
 * The user is re-read from the database each time, so role changes and deleted
 * accounts take effect immediately.
 */
export const attachUser: RequestHandler = async (req, _res, next) => {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
  const payload = token ? verifySession(token) : null;
  if (payload) {
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: publicUserSelect,
    });
    if (user) req.user = user;
  }
  next();
};

export const requireAuth: RequestHandler = (req, _res, next) => {
  if (!req.user) throw new HttpError(401, 'Please log in to continue');
  next();
};

export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) throw new HttpError(401, 'Please log in to continue');
    if (!roles.includes(req.user.role)) throw new HttpError(403, 'You do not have access to this');
    next();
  };

/**
 * CSRF defence for cookie-authenticated writes. Cross-site forms can only send
 * form-encoded or plain-text bodies — a JSON body needs a CORS preflight, which our
 * CORS policy refuses for unknown origins. So any write that declares a non-JSON body
 * type is rejected. Body-less writes (logout, cancel) carry no such type and pass;
 * SameSite=Lax already keeps the session cookie off cross-site POSTs.
 */
export const requireJson: RequestHandler = (req, _res, next) => {
  const write = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
  const type = req.headers['content-type'];
  if (write && type && !type.toLowerCase().startsWith('application/json')) {
    throw new HttpError(415, 'Requests must be sent as JSON');
  }
  next();
};
