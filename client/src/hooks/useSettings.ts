import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { SiteSettings } from '@/types/content';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => api<SiteSettings>('/content/settings'),
    staleTime: 10 * 60_000,
  });
}

/** WhatsApp number in international format without "+", e.g. 919789288421. */
export function useWhatsAppNumber() {
  const { data } = useSettings();
  return data?.contact?.whatsapp || import.meta.env.VITE_WHATSAPP_NUMBER || '919789288421';
}
