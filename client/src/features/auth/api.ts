import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export type Role = 'student' | 'counsellor' | 'admin';
export type User = { id: string; email: string; name: string; phone: string | null; role: Role };

export const ME_KEY = ['auth', 'me'] as const;

/** The signed-in user (null when signed out). Cached and shared across the app. */
export function useMe() {
  return useQuery({
    queryKey: ME_KEY,
    queryFn: () => api<{ user: User | null }>('/auth/me').then((r) => r.user),
    staleTime: 5 * 60_000,
    retry: false,
  });
}

export type SignupInput = { name: string; email: string; password: string; phone?: string };
export type LoginInput = { email: string; password: string };

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) =>
      api<{ user: User }>('/auth/login', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: ({ user }) => qc.setQueryData(ME_KEY, user),
  });
}

export function useSignup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SignupInput) =>
      api<{ user: User }>('/auth/signup', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: ({ user }) => qc.setQueryData(ME_KEY, user),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api<null>('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      qc.setQueryData(ME_KEY, null);
      // Drop everything that belonged to the signed-in student.
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}
