import { ArrowRight, Clock, FileDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { TiltCard } from '@/components/common/TiltCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { useBlogCards } from './api';

export function BlogSection() {
  const { t, i18n } = useTranslation();
  const { data: posts = [], isPending } = useBlogCards();
  const isTamil = i18n.resolvedLanguage === 'ta';

  return (
    <section className="container-page py-20 sm:py-28" aria-labelledby="blog-title">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="blog-title"
          eyebrow={t('home.blog.eyebrow')}
          title={t('home.blog.title')}
          subtitle={t('home.blog.subtitle')}
        />
        <Button variant="outline" asChild className="self-start sm:self-auto">
          <Link to="/blog">
            {t('home.blog.seeAll')} <ArrowRight />
          </Link>
        </Button>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending &&
          Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="h-96 animate-pulse rounded-3xl border bg-card" aria-hidden />
          ))}
        {posts.slice(0, 3).map((post, i) => (
          <Reveal as="li" key={post.id} delay={0.08 * i}>
            <TiltCard max={6}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-black/15">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {post.coverUrl && (
                    <img
                      src={post.coverUrl}
                      alt=""
                      width={800}
                      height={500}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {post.comingSoon && (
                    <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold backdrop-blur">
                      {t('common.comingSoon')}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">
                      {(isTamil && post.category?.nameTa) || post.category?.name}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden />
                      {t('home.blog.minRead', { count: post.readingMins })}
                    </span>
                  </p>
                  <h3 className="mt-3 text-xl leading-snug font-semibold">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {(isTamil && post.titleTa) || post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="relative z-10 mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t('home.blog.readMore')}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                    {post.pdfUrl && (
                      <a
                        href={post.pdfUrl}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                      >
                        <FileDown className="size-3.5" aria-hidden />
                        {t('home.blog.download')}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
