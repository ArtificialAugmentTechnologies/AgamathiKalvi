import { useTranslation } from 'react-i18next';
import { usePartners } from './api';

/** Infinite logo strip; CSS-only, pauses on hover, static under reduced motion. */
export function PartnersMarquee() {
  const { t } = useTranslation();
  const { data: logos = [] } = usePartners();
  if (!logos.length) return null;

  // Repeat enough times that one copy is always wider than the viewport.
  const row = Array.from({ length: Math.max(2, Math.ceil(14 / logos.length)) }, () => logos).flat();

  return (
    <section className="border-y bg-muted/40 py-14" aria-labelledby="partners-title">
      <div className="container-page text-center">
        <h2 id="partners-title" className="text-2xl font-semibold sm:text-3xl">
          {t('home.partners.title')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t('home.partners.subtitle')}</p>
      </div>
      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max motion-safe:animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:justify-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex shrink-0 gap-5 pr-5 ${copy === 1 ? 'motion-reduce:hidden' : ''}`}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {row.map((logo, i) => (
                <li key={`${logo.id}-${i}`} className="shrink-0">
                  <img
                    src={logo.logoUrl}
                    alt={copy === 0 && i < logos.length ? logo.name : ''}
                    title={logo.name}
                    width={120}
                    height={120}
                    loading="lazy"
                    className="size-24 rounded-2xl object-contain transition duration-300 hover:scale-105 sm:size-28"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
