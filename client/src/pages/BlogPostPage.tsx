import { ArrowLeft, Check, Clock, FileDown, Link2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { FacebookIcon, WhatsAppIcon } from '@/components/icons/BrandIcons';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { useBlogPost } from '@/features/content/api';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatDate, localized } from '@/lib/format';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const { t, i18n } = useTranslation();
  const lang = useLanguage();
  const { data: post, isPending, isError } = useBlogPost(slug);
  const [copied, setCopied] = useState(false);
  const title = post
    ? localized(lang, post.title, post.titleTa, post.titleHi)
    : t('pages.blogPost');
  usePageMeta(title);

  if (isPending) {
    return (
      <div className="container-page min-h-[60vh] py-24" aria-busy>
        <div className="h-12 w-2/3 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <PageHeader art="blog" eyebrow="404" title={t('blogPage.notFound')}>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft /> {t('blogPage.back')}
          </Link>
        </Button>
      </PageHeader>
    );
  }

  const url = window.location.href;
  const shareText = encodeURIComponent(`${title} — ${url}`);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the share links still work.
    }
  };
  // The seeded body repeats the title as a heading; drop it since the page header shows it.
  const body = post.body.replace(/^##?\s.*\n+/, '');

  return (
    <>
      <PageHeader
        art="blog"
        eyebrow={
          post.category
            ? localized(lang, post.category.name, post.category.nameTa, post.category.nameHi)
            : t('blogPage.eyebrow')
        }
        title={title}
        description={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {post.publishedAt && (
            <span>
              {t('blogPage.published', {
                date: formatDate(post.publishedAt, i18n.resolvedLanguage ?? 'en'),
              })}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden />{' '}
            {t('home.blog.minRead', { count: post.readingMins })}
          </span>
        </div>
      </PageHeader>

      <article className="container-page pb-20">
        <div className="mx-auto max-w-3xl">
          {post.coverUrl && (
            <img
              src={post.coverUrl}
              alt=""
              width={800}
              height={500}
              className="w-full rounded-3xl border object-cover"
            />
          )}

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-6 [&_ol]:list-decimal [&_strong]:text-foreground [&_ul]:list-disc">
            {post.comingSoon ? (
              <p>{t('blogPage.comingSoonBody')}</p>
            ) : (
              <ReactMarkdown>{body}</ReactMarkdown>
            )}
          </div>

          {post.pdfUrl && (
            <Button asChild size="lg" className="mt-8">
              <a href={post.pdfUrl} target="_blank" rel="noopener">
                <FileDown /> {t('blogPage.download')}
              </a>
            </Button>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-2 border-t pt-6">
            <span className="mr-2 text-sm font-semibold">{t('blogPage.share')}</span>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('blogPage.shareWhatsapp')}
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('blogPage.shareFacebook')}
              >
                <FacebookIcon /> Facebook
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? <Check /> : <Link2 />}{' '}
              {copied ? t('blogPage.copied') : t('blogPage.copyLink')}
            </Button>
          </div>

          <Button variant="link" asChild className="mt-6">
            <Link to="/blog">
              <ArrowLeft /> {t('blogPage.back')}
            </Link>
          </Button>
        </div>
      </article>

      <CallToAction />
    </>
  );
}
