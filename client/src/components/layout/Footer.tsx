import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/icons/BrandIcons';
import { careerLinks, footerQuickLinks, toolLinks, type TKey } from '@/config/navigation';
import { useSettings } from '@/hooks/useSettings';
import { Logo } from './Logo';

const linkClass =
  'text-sm text-ink-muted transition-colors hover:text-ink-foreground focus-visible:text-ink-foreground focus-visible:outline-none';

export function Footer() {
  const { t } = useTranslation();
  const { data } = useSettings();
  const contact = data?.contact;
  const socials = data?.socials;
  const year = new Date().getFullYear();

  const socialLinks: {
    href?: string;
    label: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }[] = [
    { href: socials?.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: socials?.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: socials?.youtube, label: 'YouTube', Icon: YouTubeIcon },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-ink-accent/10 blur-3xl"
      />
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {t('footer.about')}
          </p>
          <p className="mt-5 text-xs font-semibold tracking-wider text-ink-muted uppercase">
            {t('footer.followUs')}
          </p>
          <ul className="mt-3 flex gap-2">
            {socialLinks
              .filter((s) => s.href)
              .map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-ink-border text-ink-muted transition hover:border-ink-accent hover:text-ink-accent focus-visible:ring-[3px] focus-visible:ring-ink-accent/50 focus-visible:outline-none"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <FooterColumn title={t('footer.quickLinks')} className="lg:col-span-2">
          {footerQuickLinks.map((l) => (
            <FooterLink key={l.to} to={l.to} label={l.label} />
          ))}
        </FooterColumn>

        <FooterColumn title={t('footer.programs')} className="lg:col-span-3">
          {careerLinks.slice(1).map((l) => (
            <FooterLink key={l.to} to={l.to} label={l.title} />
          ))}
        </FooterColumn>

        <FooterColumn title={t('footer.tools')} className="lg:col-span-3">
          {toolLinks.map((l) => (
            <FooterLink key={l.to} to={l.to} label={l.title} />
          ))}
        </FooterColumn>

        {contact && (
          <div className="sm:col-span-2 lg:col-span-12">
            <h2 className="sr-only">{t('footer.contact')}</h2>
            <ul className="grid gap-4 rounded-2xl border border-ink-border bg-ink-2/60 p-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <ContactItem Icon={MapPin}>
                <address className="not-italic">
                  {contact.addressLines.join(', ')}
                  {contact.pincode ? ` – ${contact.pincode}` : ''}
                </address>
              </ContactItem>
              <ContactItem Icon={Phone}>
                {contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={`${linkClass} block`}>
                    {p}
                  </a>
                ))}
              </ContactItem>
              <ContactItem Icon={Mail}>
                {contact.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className={`${linkClass} block break-all`}>
                    {e}
                  </a>
                ))}
              </ContactItem>
              {contact.hours && <ContactItem Icon={Clock}>{contact.hours}</ContactItem>}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-ink-border">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights', { year })}</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/privacy" className={linkClass}>
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className={linkClass}>
              {t('footer.terms')}
            </Link>
            <Link to="/disclaimer" className={linkClass}>
              {t('footer.disclaimer')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="font-sans text-xs font-semibold tracking-wider text-ink-foreground uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({ to, label }: { to: string; label: TKey }) {
  const { t } = useTranslation();
  return (
    <li>
      <Link to={to} className={linkClass}>
        {t(label)}
      </Link>
    </li>
  );
}

function ContactItem({
  Icon,
  children,
}: {
  Icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 text-ink-muted">
      <Icon className="mt-0.5 size-4 shrink-0 text-ink-accent" aria-hidden />
      <div>{children}</div>
    </li>
  );
}
