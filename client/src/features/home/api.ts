import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { BlogCard, Faq, PartnerLogo, Testimonial } from '@/types/content';

const LONG = 10 * 60_000;

export const useTestimonials = () =>
  useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api<Testimonial[]>('/content/testimonials'),
    staleTime: LONG,
  });

export const useBlogCards = () =>
  useQuery({
    queryKey: ['blog-cards'],
    queryFn: () => api<BlogCard[]>('/content/blog'),
    staleTime: LONG,
  });

export const usePartners = () =>
  useQuery({
    queryKey: ['partners'],
    queryFn: () => api<PartnerLogo[]>('/content/partners'),
    staleTime: LONG,
  });

export const useFaqs = () =>
  useQuery({ queryKey: ['faqs'], queryFn: () => api<Faq[]>('/content/faqs'), staleTime: LONG });
