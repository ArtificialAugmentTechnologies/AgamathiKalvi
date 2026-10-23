import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ME_KEY, type User } from '@/features/auth/api';

export type Profile = {
  classLevel: 'class10' | 'class11' | 'class12' | null;
  school: string | null;
  district: string | null;
  community: string | null;
  marks: { maths?: number; physics?: number; chemistry?: number } | null;
  interests: string[] | null;
};

export type SavedResult = {
  id: string;
  tool: 'cutoff' | 'predictor' | 'quiz' | 'scholarship';
  title: string | null;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  createdAt: string;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type Mode = 'phone' | 'video' | 'office';

export type Slot = {
  id: string;
  startsAt: string;
  endsAt: string;
  mode: Mode;
  capacity: number;
  remaining: number;
  bookedByMe: boolean;
};

export type Booking = {
  id: string;
  status: BookingStatus;
  notes: string | null;
  slot: { startsAt: string; endsAt: string; mode: Mode };
};

export const useProfile = () =>
  useQuery({
    queryKey: ['me', 'profile'],
    queryFn: () => api<{ user: User; profile: Profile | null }>('/me/profile'),
  });

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<Profile> & { name?: string; phone?: string }) =>
      api<{ user: User; profile: Profile }>('/me/profile', {
        method: 'PUT',
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      qc.setQueryData(['me', 'profile'], data);
      qc.setQueryData(ME_KEY, data.user);
    },
  });
}

export const useResults = () =>
  useQuery({ queryKey: ['me', 'results'], queryFn: () => api<SavedResult[]>('/me/results') });

export function useDeleteResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/me/results/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me', 'results'] }),
  });
}

export const useSlots = () =>
  useQuery({
    queryKey: ['me', 'slots'],
    queryFn: () => api<Slot[]>('/slots'),
    refetchInterval: 60_000,
  });

export const useMyBookings = () =>
  useQuery({ queryKey: ['me', 'bookings'], queryFn: () => api<Booking[]>('/me/bookings') });

export function useBookSlot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { slotId: string; notes?: string }) =>
      api<Booking>('/bookings', { method: 'POST', body: JSON.stringify(body) }),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: ['me', 'slots'] });
      void qc.invalidateQueries({ queryKey: ['me', 'bookings'] });
    },
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<Booking>(`/bookings/${id}/cancel`, { method: 'POST' }),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: ['me', 'slots'] });
      void qc.invalidateQueries({ queryKey: ['me', 'bookings'] });
    },
  });
}

/** Sessions that are still ahead and not cancelled, soonest first. */
export const upcoming = (bookings: Booking[]) =>
  bookings
    .filter(
      (b) =>
        (b.status === 'pending' || b.status === 'confirmed') &&
        new Date(b.slot.startsAt) > new Date(),
    )
    .sort((a, b) => +new Date(a.slot.startsAt) - +new Date(b.slot.startsAt));
