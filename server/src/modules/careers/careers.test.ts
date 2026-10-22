import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const findMany = vi.fn();
const findFirst = vi.fn();
vi.mock('../../lib/prisma.js', () => ({
  prisma: { career: { findMany, findFirst }, blogPost: { findFirst } },
}));

const { createApp } = await import('../../app.js');
const app = createApp();

describe('careers API', () => {
  beforeEach(() => {
    findMany.mockReset().mockResolvedValue([]);
    findFirst.mockReset();
  });

  it('filters by stream, entry and search text', async () => {
    const res = await request(app).get('/api/careers?stream=science&entry=after12&q=medic');
    expect(res.status).toBe(200);
    const { where } = findMany.mock.calls[0]![0];
    expect(where).toMatchObject({
      status: 'published',
      entry: 'after12',
      stream: { slug: 'science' },
    });
    expect(where.OR[0].title).toEqual({ contains: 'medic', mode: 'insensitive' });
  });

  it('rejects an invalid entry filter', async () => {
    const res = await request(app).get('/api/careers?entry=after8');
    expect(res.status).toBe(400);
  });

  it('returns 404 for an unknown career and hides internal fields', async () => {
    findFirst.mockResolvedValueOnce(null);
    expect((await request(app).get('/api/careers/nope')).status).toBe(404);

    findFirst.mockResolvedValueOnce({
      slug: 'law',
      title: 'Law',
      needsReview: true,
      streamId: 's1',
    });
    const res = await request(app).get('/api/careers/law');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ slug: 'law', title: 'Law' });
  });

  it('returns 404 for an unpublished or missing article', async () => {
    findFirst.mockResolvedValueOnce(null);
    expect((await request(app).get('/api/content/blog/missing')).status).toBe(404);
  });
});
