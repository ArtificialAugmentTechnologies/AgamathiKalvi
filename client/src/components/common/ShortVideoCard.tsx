import { Play } from 'lucide-react';
import { useState } from 'react';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/BrandIcons';
import type { ShortVideo } from '@/config/videos';
import { cn } from '@/lib/utils';

type Props = {
  video: ShortVideo;
  title: string;
  playLabel: string;
  className?: string;
};

const embedSrc = ({ platform, id }: ShortVideo) =>
  platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`
    : `https://www.instagram.com/reel/${id}/embed/`;

/**
 * A portrait box for one YouTube Short or Instagram Reel. Like YouTubeEmbed, it shows a light
 * poster first and only loads the platform's player when the visitor presses play.
 */
export function ShortVideoCard({ video, title, playLabel, className }: Props) {
  const [playing, setPlaying] = useState(false);
  const isYouTube = video.platform === 'youtube';
  const Icon = isYouTube ? YouTubeIcon : InstagramIcon;

  return (
    <div
      className={cn(
        'relative aspect-[9/16] overflow-hidden rounded-3xl border bg-ink shadow-lg shadow-black/10',
        className,
      )}
    >
      {playing ? (
        <iframe
          src={embedSrc(video)}
          title={title}
          className="absolute inset-0 size-full bg-white"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 grid place-items-center focus-visible:outline-none"
        >
          {isYouTube || video.poster ? (
            <img
              src={video.poster ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] opacity-90 transition duration-500 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          <span className="absolute top-4 left-4 grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur">
            <Icon className="size-5" aria-hidden />
          </span>
          <span
            className={cn(
              'relative grid size-16 place-items-center rounded-full text-white shadow-2xl transition-transform group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-white/60',
              isYouTube ? 'bg-[#ff0033]' : 'bg-white/20 ring-1 ring-white/60 backdrop-blur',
            )}
          >
            <Play className="ml-1 size-7 fill-current" aria-hidden />
          </span>
          <span className="absolute bottom-5 left-1/2 max-w-[85%] -translate-x-1/2 truncate rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {playLabel}
          </span>
        </button>
      )}
    </div>
  );
}
