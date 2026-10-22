import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type {
  BlogPost,
  Career,
  CareerSummary,
  MediaItem,
  Stream,
  TeamMember,
} from '@/types/content';

const LONG = 10 * 60_000;

export const useTeam = () =>
  useQuery({
    queryKey: ['team'],
    queryFn: () => api<TeamMember[]>('/content/team'),
    staleTime: LONG,
  });

export const useMedia = () =>
  useQuery({
    queryKey: ['media'],
    queryFn: () => api<MediaItem[]>('/content/media'),
    staleTime: LONG,
  });

export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => api<BlogPost>(`/content/blog/${encodeURIComponent(slug)}`),
    staleTime: LONG,
    retry: false,
  });

export const useStreams = () =>
  useQuery({
    queryKey: ['streams'],
    queryFn: () => api<Stream[]>('/careers/streams'),
    staleTime: LONG,
  });

export type CareerFilters = { stream?: string; entry?: string; q?: string };

export const useCareers = (filters: CareerFilters) => {
  const params = new URLSearchParams(
    Object.entries(filters).filter((e): e is [string, string] => Boolean(e[1])),
  ).toString();
  return useQuery({
    queryKey: ['careers', params],
    queryFn: () => api<CareerSummary[]>(`/careers${params ? `?${params}` : ''}`),
    staleTime: LONG,
    placeholderData: (previous) => previous,
  });
};

export const useCareer = (slug: string) =>
  useQuery({
    queryKey: ['career', slug],
    queryFn: () => api<Career>(`/careers/${encodeURIComponent(slug)}`),
    staleTime: LONG,
    retry: false,
  });
