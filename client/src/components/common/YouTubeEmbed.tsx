import { Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  /** A playlist id (e.g. a channel's "UU…" uploads list) or a single video id. */
  playlistId?: string;
  videoId?: string;
  title: string;
  playLabel: string;
  poster?: string;
  className?: string;
};

/**
 * Click-to-load YouTube player. Shows a lightweight poster first, so YouTube's
 * scripts and cookies only load if the visitor actually presses play.
 */
export function YouTubeEmbed({ playlistId, videoId, title, playLabel, poster, className }: Props) {
  const [playing, setPlaying] = useState(false);
  const src = playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div
      className={cn('relative aspect-video overflow-hidden rounded-3xl border bg-ink', className)}
    >
      {playing ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 grid place-items-center focus-visible:outline-none"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-contain p-8 opacity-80 transition duration-500 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <span className="relative grid size-20 place-items-center rounded-full bg-[#ff0033] text-white shadow-2xl transition-transform group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-white/60">
            <Play className="ml-1 size-9 fill-current" aria-hidden />
          </span>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {playLabel}
          </span>
        </button>
      )}
    </div>
  );
}
