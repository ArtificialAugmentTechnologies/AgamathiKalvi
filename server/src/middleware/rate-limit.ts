import { rateLimit } from 'express-rate-limit';
import { env } from '../env.js';

/** Public form submissions: 8 per IP per 15 minutes. */
export const formLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { error: 'Too many submissions — please try again in a few minutes.' },
});

/** Free tools (e.g. quiz results): generous, just enough to stop scripted abuse. */
export const toolLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: { error: 'Too many requests — please try again in a few minutes.' },
});
