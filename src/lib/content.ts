import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { marked } from "marked";
import YAML from "yaml";
import { z } from "zod";
import { EVENT_TYPES, type EventItem, type Member, type Partner, type Photo, type Program } from "./types";

/*
 * All editable content lives in /content (YAML + Markdown) and is read at build time.
 * Every file is validated; a mistake fails the build with a message naming the file.
 */

const ROOT = path.join(process.cwd(), "content");
const TZ = "Africa/Kigali";
const TZ_OFFSET = "+02:00";

// Paths in /public ("/media/...") or full https URLs (e.g. Cloudinary).
const img = z.string().regex(/^(\/|https:\/\/)/, "must start with / (a file in public/) or https://");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date like 2026-10-22");
const opt = <T extends z.ZodType>(s: T) => z.preprocess((v) => (v === "" || v === null ? undefined : v), s.optional());

const SiteSchema = z.object({
  links: z.object({
    whatsapp: z.url(),
    linkedin: z.url(),
    instagram: z.url(),
    instagram_handle: z.string(),
    email: z.email(),
  }),
  hero: z.object({ title: z.string(), eyebrow: z.string(), tagline: z.string(), video: opt(img), poster: opt(img) }),
  about: z.object({
    heading: z.string(),
    short: z.string(),
    intro: z.string(),
    mission: z.string(),
    mission_detail: z.string(),
    collage: z.array(img).default([]),
  }),
  page_images: z.object({
    events: img,
    about: img,
    get_involved: img,
    sponsors: img,
    upcoming_fallback: img,
    join: img,
  }),
  forms: z.object({ talk_proposal: opt(z.url()), volunteer: opt(z.url()), host_event: opt(z.url()) }).default({}),
});
export type Site = z.infer<typeof SiteSchema>;

const ProgramsSchema = z.array(z.object({ name: z.string(), text: z.string() }));
const PartnersSchema = z.array(z.object({ name: z.string(), note: z.string().default(""), url: opt(z.url()), logo: opt(img) }));
const TeamSchema = z.array(z.object({ name: z.string(), role: z.string(), photo: opt(img), linkedin: opt(z.url()) })).nullable().transform((v) => v ?? []);

const EventSchema = z.object({
  title: z.string(),
  type: z.enum(EVENT_TYPES),
  start: date,
  end: opt(date),
  time: opt(z.string().regex(/^\d{2}:\d{2}$/, "must be a time like 18:00")),
  date_label: opt(z.string()),
  where: z.string(),
  summary: z.string(),
  cover: opt(img),
  cover_alt: opt(z.string()),
  cover_position: opt(z.string()),
  video: opt(img),
  gallery: z.array(img).nullable().default([]).transform((v) => v ?? []),
  speakers: z.array(z.object({ name: z.string(), role: z.string().default("") })).nullable().default([]).transform((v) => v ?? []),
  links: z.array(z.object({ label: z.string(), url: z.url() })).nullable().default([]).transform((v) => v ?? []),
  rsvp: opt(z.url()),
  glyph: opt(z.string()),
});

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const r = schema.safeParse(data);
  if (!r.success) throw new Error(`\n\nInvalid content in content/${file}:\n${z.prettifyError(r.error)}\n`);
  return r.data;
}

function readYaml<T>(file: string, schema: z.ZodType<T>): T {
  const raw = fs.readFileSync(path.join(ROOT, file), "utf8");
  return parse(schema, YAML.parse(raw), file);
}

function splitFrontmatter(raw: string, file: string) {
  const m = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`content/${file} must start with a --- frontmatter block`);
  return { data: YAML.parse(m[1]) ?? {}, body: m[2].trim() };
}

/** Today's date in Kigali as yyyy-MM-dd. */
function todayKigali() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

const fmt = (d: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(new Date(d + "T00:00:00Z"));

function dateLabel(start: string, end: string | undefined, withWeekday: boolean) {
  if (!end || end === start) return fmt(start, { ...(withWeekday ? { weekday: "short" } : {}), month: "short", day: "numeric", year: "numeric" });
  const [sy, sm] = start.split("-");
  const [ey, em] = end.split("-");
  if (sy === ey && sm === em) return `${fmt(start, { month: "short", day: "numeric" })}–${fmt(end, { day: "numeric" })}, ${sy}`;
  if (sy === ey) return `${fmt(start, { month: "short", day: "numeric" })} – ${fmt(end, { month: "short", day: "numeric" })}, ${sy}`;
  return `${fmt(start, { month: "short", day: "numeric", year: "numeric" })} – ${fmt(end, { month: "short", day: "numeric", year: "numeric" })}`;
}

export const getSite = cache(() => readYaml("site.yaml", SiteSchema));
export const getPrograms = cache((): Program[] => readYaml("programs.yaml", ProgramsSchema));
export const getPartners = cache((): Partner[] => readYaml("partners.yaml", PartnersSchema));
export const getTeam = cache((): Member[] => readYaml("team.yaml", TeamSchema));

/** All events: upcoming (soonest first), then past (newest first). */
export const getEvents = cache((): EventItem[] => {
  const dir = path.join(ROOT, "events");
  const today = todayKigali();
  const events = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f): EventItem => {
      const file = `events/${f}`;
      const { data, body } = splitFrontmatter(fs.readFileSync(path.join(dir, f), "utf8"), file);
      const e = parse(EventSchema, data, file);
      const upcoming = (e.end ?? e.start) >= today;
      const toPhoto = (src: string, i: number): Photo => ({ src, alt: `Photo ${i + 1} from ${e.title}` });
      return {
        slug: f.replace(/\.md$/, ""),
        title: e.title,
        type: e.type,
        start: e.start,
        end: e.end,
        year: Number(e.start.slice(0, 4)),
        upcoming,
        startsAt: `${e.start}T${e.time ?? "00:00"}:00${TZ_OFFSET}`,
        dateLabel: e.date_label ?? dateLabel(e.start, e.end, upcoming),
        where: e.where,
        summary: e.summary,
        bodyHtml: body ? (marked.parse(body, { async: false }) as string) : "",
        cover: e.cover ? { src: e.cover, alt: e.cover_alt ?? e.title, pos: e.cover_position } : undefined,
        gallery: e.gallery.map(toPhoto),
        video: e.video,
        speakers: e.speakers,
        links: e.links,
        rsvp: e.rsvp,
        glyph: e.glyph,
      };
    });
  const up = events.filter((e) => e.upcoming).sort((a, b) => a.start.localeCompare(b.start));
  const past = events.filter((e) => !e.upcoming).sort((a, b) => b.start.localeCompare(a.start));
  return [...up, ...past];
});

export const getEvent = (slug: string) => getEvents().find((e) => e.slug === slug);

/** Photos for the scrolling strip: interleaves every event gallery. */
export const getStripPhotos = cache((): Photo[] => {
  const sets = getEvents().map((e) => e.gallery).filter((g) => g.length);
  const out: Photo[] = [];
  for (let i = 0; out.length < 40 && sets.some((s) => i < s.length); i++) for (const s of sets) if (s[i]) out.push(s[i]);
  return out.slice(0, 40);
});
