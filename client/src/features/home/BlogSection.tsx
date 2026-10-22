import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/features/blog/BlogCard';
import { useBlogCards } from './api';

export function BlogSection() {
  const { t } = useTranslation();
  const { data: posts = [], isPending } = useBlogCards();

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
            <BlogCard post={post} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
