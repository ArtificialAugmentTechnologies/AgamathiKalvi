import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { BlogCard } from '@/features/blog/BlogCard';
import { useBlogCards } from '@/features/home/api';
import { usePageMeta } from '@/hooks/usePageMeta';
import { localized } from '@/lib/format';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const { t } = useTranslation();
  const lang = useLanguage();
  const { data: posts = [], isPending } = useBlogCards();
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  usePageMeta(t('pages.blog'));

  const categories = useMemo(() => {
    const map = new Map<
      string,
      { slug: string; name: string; nameTa: string | null; nameHi: string | null }
    >();
    posts.forEach((p) => p.category && map.set(p.category.slug, p.category));
    return [...map.values()];
  }, [posts]);

  const q = query.trim().toLowerCase();
  const shown = posts.filter(
    (p) =>
      (!category || p.category?.slug === category) &&
      (!q ||
        `${p.title} ${p.titleTa ?? ''} ${p.titleHi ?? ''} ${p.excerpt}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <PageHeader
        art="blog"
        eyebrow={t('blogPage.eyebrow')}
        title={t('blogPage.title')}
        description={t('blogPage.subtitle')}
      >
        <label className="relative block max-w-xl">
          <span className="sr-only">{t('blogPage.search')}</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('blogPage.search')}
            className="h-14 w-full rounded-full border bg-card/80 pr-5 pl-12 text-base shadow-lg shadow-black/10 backdrop-blur outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
          />
        </label>
      </PageHeader>

      <section className="container-page pb-20">
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2" role="group">
            {[{ slug: '', name: t('blogPage.all'), nameTa: null, nameHi: null }, ...categories].map(
              (c) => (
                <button
                  key={c.slug || 'all'}
                  type="button"
                  aria-pressed={category === c.slug}
                  onClick={() => setCategory(c.slug)}
                  className={cn(
                    'h-10 rounded-full border px-4 text-sm font-medium transition-colors',
                    category === c.slug
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'bg-card hover:border-primary/50',
                  )}
                >
                  {localized(lang, c.name, c.nameTa, c.nameHi)}
                </button>
              ),
            )}
          </div>
        )}

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isPending &&
            Array.from({ length: 3 }, (_, i) => (
              <li key={i} className="h-96 animate-pulse rounded-3xl border bg-card" aria-hidden />
            ))}
          {shown.map((post, i) => (
            <Reveal as="li" key={post.id} delay={Math.min(i, 6) * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </ul>
        {!isPending && shown.length === 0 && (
          <p className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
            {t('blogPage.empty')}
          </p>
        )}
      </section>

      <CallToAction />
    </>
  );
}
