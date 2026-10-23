import { useSyncExternalStore } from 'react';
import type { CollegeOption } from './types';

/**
 * The student's TNEA choice list, kept in this browser (localStorage) and shared by the
 * predictor and the choice list builder. Phase 6 syncs it to the student's account.
 */
export type Choice = Pick<CollegeOption, 'id' | 'college' | 'branch'>;

const KEY = 'agamathi-choice-list';
const listeners = new Set<() => void>();
let cache: Choice[] | null = null;

function read(): Choice[] {
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    cache = Array.isArray(parsed) ? (parsed as Choice[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: Choice[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private mode) — the list still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export const choiceList = {
  add: (c: Choice) => {
    const list = read();
    if (!list.some((x) => x.id === c.id))
      write([...list, { id: c.id, college: c.college, branch: c.branch }]);
  },
  remove: (id: string) => write(read().filter((x) => x.id !== id)),
  move: (from: number, to: number) => {
    const list = [...read()];
    if (to < 0 || to >= list.length || from === to) return;
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item!);
    write(list);
  },
  clear: () => write([]),
  /** Replace the whole list (used when syncing with the student's account). */
  replace: (next: Choice[]) =>
    write(next.map(({ id, college, branch }) => ({ id, college, branch }))),
  /** Current list without subscribing (for one-off reads). */
  get: () => read(),
  subscribe,
};

const EMPTY: Choice[] = [];

export function useChoiceList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
