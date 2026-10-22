import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const create = vi.fn();
vi.mock('../../lib/prisma.js', () => ({ prisma: { lead: { create } } }));

const { createApp } = await import('../../app.js');
const app = createApp();

const invite = {
  type: 'school_invite',
  name: 'Kavin',
  phone: '97892 88421',
  schoolName: 'Govt Hr Sec School, Salem',
  classLevel: 'class12',
  district: 'Salem',
};

describe('POST /api/leads', () => {
  beforeEach(() => {
    create.mockReset();
    create.mockResolvedValue({ id: 'lead_1', type: 'school_invite' });
  });

  it('stores a school invite with a normalised phone number', async () => {
    const res = await request(app).post('/api/leads').send(invite);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 'lead_1', type: 'school_invite' });
    expect(create.mock.calls[0]![0].data).toMatchObject({
      type: 'school_invite',
      phone: '+919789288421',
      district: 'Salem',
    });
  });

  it.each(['12345', '5789288421', '+91 97892 8842'])('rejects invalid phone %s', async (phone) => {
    const res = await request(app)
      .post('/api/leads')
      .send({ ...invite, phone });
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects an unknown district', async () => {
    const res = await request(app)
      .post('/api/leads')
      .send({ ...invite, district: 'Atlantis' });
    expect(res.status).toBe(400);
  });

  it('stores counselling extras in meta', async () => {
    create.mockResolvedValue({ id: 'lead_2', type: 'counselling' });
    const res = await request(app).post('/api/leads').send({
      type: 'counselling',
      name: 'Divya',
      phone: '+91 95973 05959',
      district: 'Erode',
      classLevel: 'class12',
      interest: 'engineering',
      cutoff: '185.5',
      mode: 'video',
    });
    expect(res.status).toBe(201);
    expect(create.mock.calls[0]![0].data.meta).toEqual({
      interest: 'engineering',
      cutoff: 185.5,
      mode: 'video',
    });
  });

  it('silently drops honeypot submissions', async () => {
    const res = await request(app)
      .post('/api/leads')
      .send({ ...invite, website: 'http://spam' });
    expect(res.status).toBe(201);
    expect(create).not.toHaveBeenCalled();
  });
});
