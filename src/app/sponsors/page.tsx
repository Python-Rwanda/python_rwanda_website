import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { PartnerTile } from "@/components/PartnerStrip";
import { getPartners, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Support Python Rwanda events and reach students, developers and researchers across Rwanda.",
};


const WHO = [
  "University students learning Python, data and web development",
  "Working developers and engineers",
  "Researchers and data practitioners",
  "Educators and mentors",
];

const WAYS = [
  { title: "Sponsor an event", text: "Fund a meetup, workshop or bootcamp: food, transport, prizes and materials." },
  { title: "Host us", text: "Provide a venue or computer lab for a session." },
  { title: "Equipment & connectivity", text: "Laptops, internet access or software licences for participants." },
  { title: "Speakers & mentors", text: "Send engineers from your team to speak or mentor." },
];

export default function SponsorsPage() {
  const { links: LINKS, page_images } = getSite();
  const PARTNERS = getPartners();
  const sponsorMail = `mailto:${LINKS.email}?subject=${encodeURIComponent("Sponsoring Python Rwanda")}`;
  return (
    <>
      <PageHeader eyebrow="Sponsors & partners" title="Help us grow Python in Rwanda." photo={{ src: page_images.sponsors, alt: "" }}
        intro="Sponsors and partners make our bootcamps, workshops and meetups possible, and get to meet the people building with Python in Rwanda.">
        <a href={sponsorMail} className="btn btn-y" style={{ marginTop: 28 }}>Talk to us about sponsoring</a>
      </PageHeader>

      <section className="section" style={{ paddingTop: "clamp(32px,4vw,56px)" }}>
        <div className="eyebrow">Partners &amp; hosts</div>
        <h2 className="h2" style={{ marginBottom: 32 }}>Who has supported us</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {PARTNERS.map((p) => <PartnerTile key={p.name} p={p} />)}
        </div>
      </section>

      <section className="section alt" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(32px,6vw,96px)" }}>
        <div>
          <div className="eyebrow y">Who you reach</div>
          <h2 className="h2" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>The people building Rwanda&apos;s tech future.</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 12 }}>
            {WHO.map((w) => (
              <li key={w} style={{ display: "flex", gap: 12, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.5 }}>
                <span aria-hidden style={{ color: "var(--yellow)" }}>→</span>{w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Ways to support</div>
          <div style={{ display: "grid", gap: 12 }}>
            {WAYS.map((w) => (
              <div key={w.title} data-reveal style={{ padding: "20px 22px", borderRadius: 18, border: "1px solid var(--line)", background: "var(--bg)" }}>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{w.title}</div>
                <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 6, lineHeight: 1.5 }}>{w.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 className="h2" style={{ fontSize: "clamp(32px,4.5vw,64px)" }}>Let&apos;s plan something together.</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: "18px auto 28px" }}>
          Tell us what you&apos;d like to support and we&apos;ll put together options that fit.
        </p>
        <a href={sponsorMail} className="btn btn-y">{LINKS.email}</a>
        <p style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 28 }}>
          Want to donate? We&apos;re setting up a transparent way to accept donations. Until then, email us.
        </p>
      </section>
    </>
  );
}
