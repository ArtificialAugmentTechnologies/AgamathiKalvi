import { Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';

export function AppComingSoon() {
  const { t } = useTranslation();
  const stores = [t('home.app.appStore'), t('home.app.googlePlay')];

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" aria-labelledby="app-title">
      <div aria-hidden className="bg-aurora absolute inset-0 opacity-80" />
      <div className="container-page relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            id="app-title"
            eyebrow={t('home.app.eyebrow')}
            title={t('home.app.title')}
            subtitle={t('home.app.body')}
          />
          <ul className="mt-8 flex flex-wrap gap-3">
            {stores.map((store) => (
              <li
                key={store}
                className="inline-flex items-center gap-3 rounded-2xl border bg-card/80 px-5 py-3 backdrop-blur"
              >
                <Smartphone className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-[11px] tracking-wide text-muted-foreground uppercase">
                    {t('home.app.soon')}
                  </span>
                  <span className="block font-semibold">{store}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="order-1 lg:order-2" y={30}>
          <img
            src="/images/brand/app-mockup.webp"
            alt={t('home.app.mockupAlt')}
            width={720}
            height={658}
            loading="lazy"
            className="mx-auto w-full max-w-md drop-shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
