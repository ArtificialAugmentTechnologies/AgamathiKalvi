import { ArrowRight, Clock, FileDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TiltCard } from '@/components/common/TiltCard';
import { localized } from '@/lib/format';
import type { BlogCard as BlogCardData } from '@/types/content';

/** Article card used on the home page and the blog list. */
export function BlogCard({ post }: { post: BlogCardData }) {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';

  return (
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
            {post.category && (
              <span className="font-semibold text-primary">
                {localized(isTamil, post.category.name, post.category.nameTa)}
              </span>
            )}
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
              {localized(isTamil, post.title, post.titleTa)}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
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
  );
}
