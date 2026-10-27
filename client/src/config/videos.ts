// Short vertical videos shown on the site. Ids come from the share links:
//   youtube.com/shorts/<id>   ·   instagram.com/reel/<id>
// YouTube serves a thumbnail for every video. Instagram has no stable thumbnail URL, so Reels need a
// `poster`: the cover image saved under public/images.
export type ShortVideo = { platform: 'youtube' | 'instagram'; id: string; poster?: string };

/** Career Tuner page — our YouTube Shorts. */
export const CAREER_TUNER_SHORTS: ShortVideo[] = [
  { platform: 'youtube', id: '9svAMYMzE4E' },
  { platform: 'youtube', id: 'F-G-vEBmuAE' },
  { platform: 'youtube', id: '5MQc_-OUZfA' },
];

/** Home page testimonials — video clips from students. */
export const TESTIMONIAL_CLIPS: ShortVideo[] = [
  { platform: 'youtube', id: 'K6w5nZQKeF0' },
  {
    platform: 'instagram',
    id: 'DVdxAAjEf0D',
    poster: '/images/testimonials/clip-sabareeshwaran.jpg',
  },
  {
    platform: 'instagram',
    id: 'Dclg7Z5pUnI',
    poster: '/images/testimonials/clip-gokulakrishnan.jpg',
  },
];
