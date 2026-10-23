import {
  ArrowDown,
  ArrowUp,
  Check,
  GripVertical,
  Plus,
  Printer,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useState, type DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/form-controls';
import { useBranches, useCollegeOptions } from '@/features/tools/api';
import { choiceList, useChoiceList } from '@/features/tools/choiceList';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatDate, localized } from '@/lib/format';
import { cn } from '@/lib/utils';

export default function ChoiceListPage() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  usePageMeta(t('pages.choiceList'));
  const list = useChoiceList();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [branch, setBranch] = useState('');
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const { data: branches = [] } = useBranches();
  const { data: options = [], isFetching } = useCollegeOptions(debounced, branch);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(id);
  }, [query]);

  const onDrop = (e: DragEvent, to: number) => {
    e.preventDefault();
    if (dragFrom !== null) choiceList.move(dragFrom, to);
    setDragFrom(null);
  };

  return (
    <>
      <div className="print:hidden">
        <PageHeader
          eyebrow={t('nav.toolsHeading')}
          title={t('pages.choiceList')}
          description={t('choiceList.lead')}
        />
      </div>

      <section className="container-page grid grid-cols-1 gap-6 pb-20 lg:grid-cols-2 lg:items-start print:block">
        {/* Search */}
        <div className="rounded-3xl border bg-card p-5 sm:p-6 print:hidden">
          <label className="relative block">
            <span className="mb-2 block text-sm font-medium">{t('choiceList.searchLabel')}</span>
            <Search
              className="pointer-events-none absolute bottom-3.5 left-3.5 size-5 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('choiceList.searchPlaceholder')}
              className="h-12 w-full rounded-xl border border-input bg-background/60 pr-4 pl-11 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
            />
          </label>
          <Select
            aria-label={t('choiceList.allBranches')}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="mt-3"
          >
            <option value="">{t('choiceList.allBranches')}</option>
            {branches.map((b) => (
              <option key={b.code} value={b.code}>
                {localized(isTamil, b.name, b.nameTa)}
              </option>
            ))}
          </Select>

          <ul
            className={cn(
              'mt-4 max-h-[32rem] space-y-2 overflow-y-auto pr-1 transition-opacity',
              isFetching && 'opacity-60',
            )}
          >
            {options.length === 0 && !isFetching && (
              <li className="p-6 text-center text-sm text-muted-foreground">
                {t('choiceList.noResults')}
              </li>
            )}
            {options.map((o) => {
              const added = list.some((c) => c.id === o.id);
              return (
                <li key={o.id} className="flex items-center gap-3 rounded-xl border p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{o.college.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.branch.code} · {localized(isTamil, o.branch.name, o.branch.nameTa)} ·{' '}
                      {o.college.district}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={added ? 'secondary' : 'outline'}
                    disabled={added}
                    onClick={() => choiceList.add(o)}
                  >
                    {added ? <Check /> : <Plus />}{' '}
                    {added ? t('choiceList.added') : t('choiceList.add')}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The list */}
        <div className="rounded-3xl border bg-card p-5 sm:p-6 print:border-0 print:p-0">
          <div className="hidden print:mb-4 print:block">
            <h1 className="text-2xl font-semibold">{t('choiceList.printTitle')}</h1>
            <p className="text-sm">
              {t('choiceList.printedOn', {
                date: formatDate(new Date().toISOString(), i18n.resolvedLanguage ?? 'en'),
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <h2 className="font-sans text-lg font-semibold">{t('choiceList.listTitle')}</h2>
            <span className="rounded-full bg-clay-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
              {t('choiceList.count', { count: list.length })}
            </span>
            {list.length > 0 && (
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onClick={() => window.print()}>
                  <Printer /> {t('choiceList.print')}
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label={t('choiceList.clear')}
                  title={t('choiceList.clear')}
                  onClick={() => window.confirm(t('choiceList.confirmClear')) && choiceList.clear()}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
          {list.length > 1 && (
            <p className="mt-1 text-xs text-muted-foreground print:hidden">
              {t('choiceList.dragHint')}
            </p>
          )}

          {list.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              {t('choiceList.emptyList')}
            </p>
          ) : (
            <>
              <ol className="mt-4 space-y-2 print:hidden">
                {list.map((c, i) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={() => setDragFrom(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, i)}
                    onDragEnd={() => setDragFrom(null)}
                    className={cn(
                      'flex items-center gap-2 rounded-xl border bg-background/40 p-2.5 transition',
                      dragFrom === i && 'opacity-40',
                    )}
                  >
                    <GripVertical
                      className="size-4 shrink-0 cursor-grab text-muted-foreground"
                      aria-hidden
                    />
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground tabular-nums">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{c.college.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.branch.code} · {localized(isTamil, c.branch.name, c.branch.nameTa)}
                      </p>
                    </div>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      disabled={i === 0}
                      onClick={() => choiceList.move(i, i - 1)}
                      aria-label={t('choiceList.moveUp')}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      disabled={i === list.length - 1}
                      onClick={() => choiceList.move(i, i + 1)}
                      aria-label={t('choiceList.moveDown')}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => choiceList.remove(c.id)}
                      aria-label={t('choiceList.remove')}
                    >
                      <X />
                    </Button>
                  </li>
                ))}
              </ol>

              {/* Clean table for print / "Save as PDF" */}
              <table className="hidden w-full border-collapse text-sm print:table">
                <thead>
                  <tr>
                    {(['order', 'college', 'branch', 'district'] as const).map((k) => (
                      <th key={k} className="border border-black/30 p-2 text-left">
                        {t(`choiceList.column.${k}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((c, i) => (
                    <tr key={c.id}>
                      <td className="border border-black/30 p-2">{i + 1}</td>
                      <td className="border border-black/30 p-2">{c.college.name}</td>
                      <td className="border border-black/30 p-2">
                        {c.branch.code} — {c.branch.name}
                      </td>
                      <td className="border border-black/30 p-2">{c.college.district}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <p className="mt-4 text-xs text-muted-foreground print:hidden">
            {t('choiceList.savedNote')}
          </p>
        </div>
      </section>
    </>
  );
}
