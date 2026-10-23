import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';
import { HttpError, notFound } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';
import { requireAuth } from '../../middleware/auth.js';

export const slotsRouter = Router();
export const bookingsRouter = Router();

const ACTIVE = ['pending', 'confirmed'] as const;
const DAYS_AHEAD = 30;

/** Upcoming counselling slots with how many places are left. */
slotsRouter.get('/', async (req, res) => {
  const now = new Date();
  const until = new Date(now.getTime() + DAYS_AHEAD * 86_400_000);
  const slots = await prisma.counsellingSlot.findMany({
    where: { startsAt: { gt: now, lt: until } },
    orderBy: { startsAt: 'asc' },
    include: { bookings: { where: { status: { in: [...ACTIVE] } }, select: { userId: true } } },
  });
  res.json(
    slots.map(({ bookings, counsellorId: _c, ...s }) => ({
      ...s,
      remaining: Math.max(0, s.capacity - bookings.length),
      bookedByMe: Boolean(req.user && bookings.some((b) => b.userId === req.user!.id)),
    })),
  );
});

const bookingSchema = z.object({
  slotId: z.string().min(1).max(40),
  notes: z.string().trim().max(1000).optional(),
  cutoff: z.coerce.number().min(0).max(200).optional(),
});

bookingsRouter.post('/', requireAuth, async (req, res) => {
  const { slotId, notes, cutoff } = bookingSchema.parse(req.body);
  const userId = req.user!.id;

  // Serializable transaction: two students can't both take the last place.
  const booking = await prisma
    .$transaction(
      async (tx) => {
        const slot = await tx.counsellingSlot.findUnique({ where: { id: slotId } });
        if (!slot) throw notFound('Slot');
        if (slot.startsAt <= new Date()) throw new HttpError(409, 'This slot has already started');

        const active = await tx.booking.findMany({
          where: { slotId, status: { in: [...ACTIVE] } },
          select: { userId: true },
        });
        if (active.some((b) => b.userId === userId))
          throw new HttpError(409, 'You have already booked this slot');
        if (active.length >= slot.capacity)
          throw new HttpError(409, 'This slot is full — please pick another time');

        return tx.booking.create({
          data: { slotId, userId, notes, cutoff },
          include: { slot: { select: { startsAt: true, endsAt: true, mode: true } } },
        });
      },
      { isolationLevel: 'Serializable' },
    )
    .catch((e: unknown) => {
      // Lost a race with another booking for the same slot.
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2034') {
        throw new HttpError(409, 'This slot just changed — please try again');
      }
      throw e;
    });
  res.status(201).json(booking);
});

bookingsRouter.post('/:id/cancel', requireAuth, async (req, res) => {
  const booking = await prisma.booking.findFirst({
    where: { id: String(req.params.id), userId: req.user!.id },
    include: { slot: true },
  });
  if (!booking) throw notFound('Booking');
  if (!(ACTIVE as readonly string[]).includes(booking.status)) {
    throw new HttpError(409, 'This booking can no longer be cancelled');
  }
  if (booking.slot.startsAt <= new Date())
    throw new HttpError(409, 'This session has already started');

  res.json(
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'cancelled' },
      include: { slot: { select: { startsAt: true, endsAt: true, mode: true } } },
    }),
  );
});
