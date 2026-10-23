import bcrypt from 'bcryptjs';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { upcomingSlots } from '../../../prisma/seed/slots.js';

const user = { create: vi.fn(), findUnique: vi.fn() };
vi.mock('../../lib/prisma.js', () => ({ prisma: { user } }));

const { createApp } = await import('../../app.js');
const app = createApp();

const publicUser = {
  id: 'u1',
  email: 'kavin@example.com',
  name: 'Kavin',
  phone: null,
  role: 'student',
};
const sessionCookie = (res: request.Response) =>
  ([] as string[])
    .concat(res.headers['set-cookie'] ?? [])
    .find((c) => c.startsWith('agamathi_session='));

describe('auth', () => {
  beforeEach(() => {
    user.create.mockReset();
    user.findUnique.mockReset();
  });

  it('signs up, hashes the password and sets an httpOnly session cookie', async () => {
    user.create.mockResolvedValue(publicUser);
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'Kavin', email: 'Kavin@Example.com', password: 'tnea2026' });
    expect(res.status).toBe(201);
    expect(res.body.user).toEqual(publicUser);
    const data = user.create.mock.calls[0]![0].data;
    expect(data.email).toBe('kavin@example.com');
    expect(data.passwordHash).not.toBe('tnea2026');
    expect(await bcrypt.compare('tnea2026', data.passwordHash)).toBe(true);
    const cookie = sessionCookie(res);
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/SameSite=Lax/i);
  });

  it('rejects weak passwords', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'A b', email: 'a@b.co', password: 'password' });
    expect(res.status).toBe(400);
    expect(user.create).not.toHaveBeenCalled();
  });

  it('gives the same error for an unknown email and a wrong password', async () => {
    user.findUnique.mockResolvedValueOnce(null);
    const unknown = await request(app)
      .post('/api/auth/login')
      .send({ email: 'x@y.co', password: 'whatever1' });
    user.findUnique.mockResolvedValueOnce({
      ...publicUser,
      passwordHash: await bcrypt.hash('right-pass1', 4),
    });
    const wrong = await request(app)
      .post('/api/auth/login')
      .send({ email: publicUser.email, password: 'wrong-pass1' });
    expect(unknown.status).toBe(401);
    expect(wrong.status).toBe(401);
    expect(unknown.body.error).toBe(wrong.body.error);
  });

  it('logs in and the cookie identifies the user on /me', async () => {
    user.findUnique.mockResolvedValueOnce({
      ...publicUser,
      passwordHash: await bcrypt.hash('right-pass1', 4),
    });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: publicUser.email, password: 'right-pass1' });
    expect(login.status).toBe(200);

    user.findUnique.mockResolvedValueOnce(publicUser); // attachUser lookup
    const me = await request(app)
      .get('/api/auth/me')
      .set('Cookie', sessionCookie(login)!.split(';')[0]!);
    expect(me.body.user).toEqual(publicUser);
  });

  it('treats missing or forged cookies as signed out, and protects /api/me', async () => {
    expect((await request(app).get('/api/auth/me')).body).toEqual({ user: null });
    const forged = await request(app)
      .get('/api/me/profile')
      .set('Cookie', 'agamathi_session=not-a-jwt');
    expect(forged.status).toBe(401);
  });

  it('allows body-less writes such as logout', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.status).toBe(204);
  });

  it('refuses non-JSON writes (CSRF defence)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .type('form')
      .send('email=a@b.co&password=x');
    expect(res.status).toBe(415);
  });
});

describe('sample slots', () => {
  it('creates Mon–Sat slots at IST times and skips Sundays', () => {
    const from = new Date('2026-10-23T08:00:00Z'); // a Friday
    const slots = upcomingSlots(7, from);
    expect(slots).toHaveLength(6 * 4); // 7 days minus Sunday, 4 slots a day
    const first = slots[0]!;
    // 10:00 IST on Saturday 24 Oct = 04:30 UTC
    expect(first.startsAt.toISOString()).toBe('2026-10-24T04:30:00.000Z');
    expect(first.endsAt.getTime() - first.startsAt.getTime()).toBe(45 * 60_000);
    const sundays = slots.filter(
      (s) => new Date(s.startsAt.getTime() + 330 * 60_000).getUTCDay() === 0,
    );
    expect(sundays).toHaveLength(0);
  });
});
