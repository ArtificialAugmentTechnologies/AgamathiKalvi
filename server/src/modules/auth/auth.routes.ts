import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { z } from 'zod';
import {
  clearSessionCookie,
  publicUserSelect,
  setSessionCookie,
  signSession,
} from '../../lib/auth.js';
import { HttpError } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';
import { authLimiter } from '../../middleware/rate-limit.js';
import { indianMobile } from '../leads/leads.schema.js';

export const authRouter = Router();

const email = z.string().trim().toLowerCase().email('Enter a valid email').max(120);
const password = z
  .string()
  .min(8, 'Use at least 8 characters')
  .max(72) // bcrypt only uses the first 72 bytes
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), 'Use letters and numbers');

const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email,
  password,
  phone: indianMobile.optional().or(z.literal('').transform(() => undefined)),
});

const loginSchema = z.object({ email, password: z.string().min(1).max(72) });

// Compared against when the email is unknown, so both paths take similar time.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password-1', 12);

authRouter.post('/signup', authLimiter, async (req, res) => {
  const input = signupSchema.parse(req.body);
  try {
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        passwordHash: await bcrypt.hash(input.password, 12),
        role: 'student',
        profile: { create: {} },
      },
      select: publicUserSelect,
    });
    setSessionCookie(res, signSession(user));
    res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new HttpError(409, 'An account with this email already exists');
    }
    throw e;
  }
});

authRouter.post('/login', authLimiter, async (req, res) => {
  const { email: mail, password: pass } = loginSchema.parse(req.body);
  const found = await prisma.user.findUnique({ where: { email: mail } });
  const ok = await bcrypt.compare(pass, found?.passwordHash ?? DUMMY_HASH);
  if (!found || !ok) throw new HttpError(401, 'Email or password is incorrect');

  const user = {
    id: found.id,
    email: found.email,
    name: found.name,
    phone: found.phone,
    role: found.role,
  };
  setSessionCookie(res, signSession(user));
  res.json({ user });
});

authRouter.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  res.status(204).end();
});

/** The signed-in user, or `{ user: null }` — never a 401, so the site can call it freely. */
authRouter.get('/me', (req, res) => {
  res.json({ user: req.user ?? null });
});
