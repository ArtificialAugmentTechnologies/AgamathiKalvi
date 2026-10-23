import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { choiceList, type Choice } from '@/features/tools/choiceList';
import { useMe } from './api';

type ServerList = { items: Choice[] };

const same = (a: Choice[], b: Choice[]) =>
  a.length === b.length && a.every((c, i) => c.id === b[i]?.id);

/**
 * Keeps the browser's choice list and the student's account in step:
 * - on login, merges the account list with anything added while signed out;
 * - afterwards, saves every change to the account (debounced);
 * - on logout, clears the local copy so the next person on this device starts fresh.
 */
export function ChoiceListSync() {
  const { data: user } = useMe();
  const userId = user?.id ?? null;
  const previous = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const was = previous.current;
    previous.current = userId;
    if (was && !userId) choiceList.clear(); // just logged out
    if (!userId) return;

    let cancelled = false;
    let timer: number | undefined;
    let lastSaved: Choice[] = [];
    const save = (items: Choice[]) =>
      api<ServerList>('/me/choice-list', {
        method: 'PUT',
        body: JSON.stringify({ items: items.map((c) => c.id) }),
      })
        .then((r) => (lastSaved = r.items))
        .catch(() => undefined); // offline — the local list still has everything; we retry on the next change

    void api<ServerList>('/me/choice-list').then(async (server) => {
      if (cancelled) return;
      const local = choiceList.get();
      const merged = [
        ...server.items,
        ...local.filter((l) => !server.items.some((s) => s.id === l.id)),
      ];
      lastSaved = server.items;
      if (!same(merged, local)) choiceList.replace(merged);
      if (!same(merged, server.items)) await save(merged);
    });

    const unsubscribe = choiceList.subscribe(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const current = choiceList.get();
        if (!same(current, lastSaved)) void save(current);
      }, 700);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, [userId]);

  return null;
}
