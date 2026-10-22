import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('app', () => {
  const app = createApp();

  it('returns JSON 404 for unknown API routes', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('sets security headers', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
