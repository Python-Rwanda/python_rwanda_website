import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Join from "@/components/Join";
import { getPrograms, getSite, getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Python Rwanda is a community for everyone who writes Python in Rwanda.",
};

export default function AboutPage() {
  const { about, page_images } = getSite();
  const PROGRAMS = getPrograms();
  const TEAM = getTeam();
  return (
    <>
      <PageHeader eyebrow="About" title="A Python community in Rwanda." photo={{ src: page_images.about, alt: "" }}
        intro={about.intro} />

      <section className="section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(32px,6vw,96px)", alignItems: "center" }}>
        <div className="prose" data-reveal>
          <div className="eyebrow">Our mission</div>
          <p style={{ fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.35, color: "var(--ink)", fontWeight: 600, letterSpacing: "-.01em" }}>
            {about.mission}
          </p>
          <p>{about.mission_detail}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} data-reveal>
          {about.collage.slice(0, 4).map((src, k) => (
            <div key={src} style={{ position: "relative", aspectRatio: "1", borderRadius: 18, overflow: "hidden", transform: k % 2 ? "translateY(24px)" : undefined }}>
              <Image src={src} alt="Python Rwanda community event" fill sizes="(max-width: 700px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="eyebrow y">What we do</div>
        <h2 className="h2" style={{ marginBottom: 40 }}>How we bring people together</h2>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--line)" }}>
          {PROGRAMS.map((p, k) => (
            <li key={p.name} data-reveal style={{ display: "grid", gridTemplateColumns: "60px minmax(0,1fr) minmax(0,1.4fr)", gap: 20, alignItems: "baseline", padding: "26px 4px", borderBottom: "1px solid var(--line)" }} className="program-row">
              <span className="mono" style={{ fontSize: 14, color: "var(--yellow)" }}>{String(k + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 800, letterSpacing: "-.02em" }}>{p.name}</span>
              <span style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)" }}>{p.text}</span>
            </li>
          ))}
        </ol>
        <style>{`@media (max-width:700px){.program-row{grid-template-columns:40px 1fr !important}.program-row>span:last-child{grid-column:2}}`}</style>
        <Link href="/events" className="btn btn-ghost" style={{ marginTop: 36 }}>See our events →</Link>
      </section>

      {TEAM.length > 0 && (
        <section className="section">
          <div className="eyebrow">Organizers</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>The people behind it</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 28 }}>
            {TEAM.map((t) => (
              <div key={t.name} data-reveal>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "50%", overflow: "hidden", background: "var(--bg-3)" }}>
                  {t.photo && <Image src={t.photo} alt={t.name} fill sizes="200px" style={{ objectFit: "cover" }} />}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 16 }}>
                  {t.linkedin ? <a href={t.linkedin} target="_blank" rel="noopener" style={{ color: "var(--ink)" }}>{t.name}</a> : t.name}
                </div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div>
          <h2 className="h2" style={{ fontSize: "clamp(28px,3.6vw,48px)" }}>Want to help run it?</h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, margin: "12px 0 0" }}>Speak, volunteer, host an event or sponsor one.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/get-involved" className="btn btn-y">Get involved</Link>
          <Link href="/code-of-conduct" className="btn btn-ghost">Code of Conduct</Link>
        </div>
      </section>

      <Join />
    </>
  );
}
