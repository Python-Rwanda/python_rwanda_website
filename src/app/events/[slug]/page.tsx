import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import CodeArt from "@/components/CodeArt";
import { Countdown } from "@/components/Upcoming";
import { getEvent, getEvents, getSite } from "@/lib/content";
import type { EventItem } from "@/lib/types";

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.summary,
    openGraph: { title: e.title, description: e.summary, images: e.cover ? [e.cover.src] : undefined },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEvent((await params).slug);
  if (!e) notFound();

  const { links } = getSite();
  const chrono = [...getEvents()].sort((a, b) => a.start.localeCompare(b.start));
  const i = chrono.findIndex((x) => x.slug === e.slug);
  const older = chrono[i - 1];
  const newer = chrono[i + 1];

  return (
    <>
      <PageHeader eyebrow={`${e.upcoming ? "Upcoming · " : ""}${e.type}`} title={e.title} photo={e.cover}>
        <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginTop: 24, fontSize: 14, color: "var(--ink-2)" }}>
          <span style={{ color: "var(--yellow)" }}>{e.dateLabel}</span>
          <span>{e.where}</span>
        </div>
        {e.upcoming && <Countdown iso={e.startsAt} />}
        {e.upcoming && (
          <a href={e.rsvp ?? links.linkedin} target="_blank" rel="noopener" className="btn btn-y" style={{ marginTop: 28 }}>RSVP ↗</a>
        )}
      </PageHeader>

      <section className="section" style={{ paddingTop: "clamp(32px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,72px)", alignItems: "flex-start" }}>
        <div className="prose" style={{ flex: "2 1 480px", minWidth: 0 }}>
          {e.bodyHtml ? <div dangerouslySetInnerHTML={{ __html: e.bodyHtml }} /> : <p>{e.summary}</p>}
          {!e.cover && (
            <div style={{ position: "relative", height: 260, borderRadius: 24, overflow: "hidden", marginTop: 12, maxWidth: 680 }}>
              <CodeArt e={e} size={22} />
            </div>
          )}
        </div>
        <aside style={{ flex: "1 1 240px", display: "grid", gap: 28 }}>
          {e.speakers.length > 0 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{e.speakers.length > 1 ? "Speakers" : "Speaker"}</div>
              {e.speakers.map((s) => (
                <div key={s.name} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 2 }}>{s.role}</div>
                </div>
              ))}
            </div>
          )}
          {e.links.length > 0 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Links</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                {e.links.map((l) => (
                  <li key={l.url}><a href={l.url} target="_blank" rel="noopener" style={{ fontSize: 16 }}>{l.label} ↗</a></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {e.video && (
        <section style={{ padding: "0 var(--pad) clamp(40px,5vw,72px)" }}>
          <video src={e.video} autoPlay muted loop playsInline preload="metadata" aria-label={`Video clip from ${e.title}`}
            style={{ width: "100%", maxHeight: "70svh", objectFit: "cover", borderRadius: 24, display: "block" }} />
        </section>
      )}

      {e.gallery.length > 0 && (
        <section style={{ padding: "0 var(--pad) clamp(56px,7vw,100px)" }}>
          <div className="eyebrow y">Photos · {e.gallery.length}</div>
          <Gallery photos={e.gallery} />
        </section>
      )}

      <nav aria-label="More events" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <EventLink e={newer} dir="← Newer" />
        <EventLink e={older} dir="Older →" right />
      </nav>
      <div style={{ padding: "32px var(--pad)", textAlign: "center" }}>
        <Link href="/events" className="mono" style={{ fontSize: 13 }}>All events</Link>
      </div>
    </>
  );
}

function EventLink({ e, dir, right }: { e?: EventItem; dir: string; right?: boolean }) {
  if (!e) return <div />;
  return (
    <Link href={`/events/${e.slug}`} style={{ display: "block", padding: "28px var(--pad)", textAlign: right ? "right" : "left", color: "var(--ink)", borderLeft: right ? "1px solid var(--line)" : undefined }}>
      <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{dir}</div>
      <div style={{ fontSize: "clamp(17px,2vw,24px)", fontWeight: 800, marginTop: 6, letterSpacing: "-.01em" }}>{e.title}</div>
    </Link>
  );
}
