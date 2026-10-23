/** Only allow same-site relative paths as a post-login destination (no open redirects). */
export function safeNext(raw: string | null, fallback = '/dashboard') {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/\\'))
    return fallback;
  return raw;
}
