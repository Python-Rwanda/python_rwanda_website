// Client-safe types for content loaded by src/lib/content.ts.

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "88% 45%". */
  pos?: string;
};

export const EVENT_TYPES = ["Bootcamp", "Meetup", "Conference", "Workshop", "Webinar", "Talk"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type EventItem = {
  /** URL segment: /events/<slug> (the file name without .md). */
  slug: string;
  title: string;
  type: EventType;
  /** yyyy-MM-dd */
  start: string;
  end?: string;
  year: number;
  /** Computed at build time from the dates. */
  upcoming: boolean;
  /** ISO start time (Kigali time) for the countdown. */
  startsAt: string;
  /** Human date, e.g. "Oct 22, 2026" or "Feb 16 – Apr 16, 2026". */
  dateLabel: string;
  where: string;
  summary: string;
  /** Rendered Markdown body. */
  bodyHtml: string;
  cover?: Photo;
  gallery: Photo[];
  video?: string;
  speakers: { name: string; role: string }[];
  links: { label: string; url: string }[];
  rsvp?: string;
  glyph?: string;
};

export type Partner = { name: string; note: string; url?: string; logo?: string };
export type Member = { name: string; role: string; photo?: string; linkedin?: string };
export type Program = { name: string; text: string };
