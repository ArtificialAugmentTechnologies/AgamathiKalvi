import { CloudCheck, FileDown, ListOrdered } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBlogCards } from '@/features/home/api';
import { useChoiceList } from '@/features/tools/choiceList';
import { localized } from '@/lib/format';

export function ChoicesPanel() {
  const { t } = useTranslation();
  const lang = useLanguage();
  const list = useChoiceList();

  return (
    <div className="rounded-3xl border bg-card p-6">
      <p className="flex items-center gap-2 text-sm text-success">
        <CloudCheck className="size-4" aria-hidden /> {t('dashboard.choices.synced')}
      </p>
      {list.length === 0 ? (
        <p className="mt-4 text-muted-foreground">{t('choiceList.emptyList')}</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {list.map((c, i) => (
            <li key={c.id} className="flex items-center gap-3 rounded-xl border p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground tabular-nums">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{c.college.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {c.branch.code} ·{' '}
                  {localized(lang, c.branch.name, c.branch.nameTa, c.branch.nameHi)} ·{' '}
                  {c.college.district}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
      <Button asChild className="mt-5">
        <Link to="/tools/choice-list">
          <ListOrdered /> {t('dashboard.choices.open')}
        </Link>
      </Button>
    </div>
  );
}

export function ResourcesPanel() {
  const { t } = useTranslation();
  const lang = useLanguage();
  const { data: posts = [] } = useBlogCards();
  const files = posts.filter((p) => p.pdfUrl);

  return (
    <div>
      <p className="text-muted-foreground">{t('dashboard.resources.lead')}</p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {files.map((p) => (
          <li key={p.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
            {p.coverUrl && (
              <img
                src={p.coverUrl}
                alt=""
                width={96}
                height={60}
                loading="lazy"
                className="h-16 w-24 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{localized(lang, p.title, p.titleTa, p.titleHi)}</p>
              <a
                href={p.pdfUrl!}
                target="_blank"
                rel="noopener"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                <FileDown className="size-4" aria-hidden /> {t('dashboard.resources.download')}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
