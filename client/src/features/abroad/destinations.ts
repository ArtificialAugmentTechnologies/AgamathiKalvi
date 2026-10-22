// Shared between the Abroad page (plain DOM) and the 3D globe scene. No three.js imports here,
// so the page can use it without pulling the 3D bundle.

export const DESTINATIONS = [
  { key: 'usa', lat: 39, lng: -98 },
  { key: 'uk', lat: 54, lng: -2 },
  { key: 'canada', lat: 56, lng: -106 },
  { key: 'germany', lat: 51, lng: 10 },
  { key: 'australia', lat: -25, lng: 134 },
] as const;

export type DestinationKey = (typeof DESTINATIONS)[number]['key'];

/** Home pin — arcs fly out from India. */
export const INDIA = { lat: 21, lng: 78 } as const;

/** Mutable focus read by the globe each frame; -1 = no focus (slow auto-spin). */
export const globeFocus = { index: -1 };
