import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Join from "@/components/Join";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Join the Python Rwanda community, give a talk, volunteer, host an event or sponsor one.",
};

function ways() {
  const { links: LINKS, forms } = getSite();
  const mail = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;
  return [
  { n: "01", title: "Join the community", text: "The WhatsApp community is where events are announced first and where members talk every day.", cta: "Join on WhatsApp", href: LINKS.whatsapp },
  { n: "02", title: "Give a talk", text: "Share something you've built, learned or researched, at a meetup or in a webinar. First-time speakers are welcome.", cta: "Propose a talk", href: forms.talk_proposal ?? mail("Talk proposal for Python Rwanda") },
  { n: "03", title: "Volunteer", text: "Help with organizing, mentoring at workshops, photos and video, or spreading the word.", cta: "Volunteer", href: forms.volunteer ?? mail("Volunteering with Python Rwanda") },
  { n: "04", title: "Host an event", text: "Bring a workshop or meetup to your university, school or company. You provide the room, we bring the session.", cta: "Host us", href: forms.host_event ?? mail("Hosting a Python Rwanda event") },
  { n: "05", title: "Sponsor", text: "Support an event with funding, a venue, equipment, food or prizes.", cta: "Sponsorship", href: "/sponsors" },
  ];
}

export default function GetInvolvedPage() {
  const WAYS = ways();
  const { page_images } = getSite();
  return (
    <>
      <PageHeader eyebrow="Get involved" title="There's a place for you here." photo={{ src: page_images.get_involved, alt: "" }}
        intro="Whether you wrote your first line of Python last week or ship it every day, there are lots of ways to take part." />

      <section className="section" style={{ paddingTop: "clamp(32px,4vw,56px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 16 }}>
          {WAYS.map((w, k) => {
            const internal = w.href.startsWith("/");
            const cta = { className: "mono", style: { fontSize: 14, marginTop: "auto", paddingTop: 20 } as React.CSSProperties };
            return (
              <div key={w.n} data-reveal style={{ ["--d" as string]: `${k * 0.06}s`, display: "flex", flexDirection: "column", padding: 28, borderRadius: 22, border: "1px solid var(--line)", background: k === 0 ? "oklch(0.85 0.15 90 / .08)" : "var(--bg-2)", minHeight: 240 }}>
                <span className="mono" style={{ fontSize: 13, color: "var(--yellow)" }}>{w.n}</span>
                <h2 style={{ margin: "14px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-.02em" }}>{w.title}</h2>
                <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)" }}>{w.text}</p>
                {internal ? <Link href={w.href} {...cta}>{w.cta} →</Link> : <a href={w.href} target={w.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener" {...cta}>{w.cta} →</a>}
              </div>
            );
          })}
        </div>
        <p style={{ color: "var(--ink-3)", fontSize: 15, marginTop: 32 }}>
          Everyone taking part agrees to our <Link href="/code-of-conduct">Code of Conduct</Link>.
        </p>
      </section>

      <Join />
    </>
  );
}
