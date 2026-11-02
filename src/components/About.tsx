import Link from "next/link";
import { getPrograms, getSite, getStripPhotos } from "@/lib/content";
import Marquee from "./Marquee";

export default function About() {
  const { about } = getSite();
  return (
    <section id="about" style={{ padding: "clamp(56px,8vw,100px) 0" }}>
      <div style={{ padding: "0 var(--pad)", marginBottom: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 24, alignItems: "end" }}>
        <h2 className="h2" style={{ fontSize: "clamp(32px,4vw,56px)" }}>{about.heading}</h2>
        <div>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: 520 }}>{about.short}</p>
          <Link href="/about" className="mono" style={{ display: "inline-block", marginTop: 16, fontSize: 13 }}>More about us →</Link>
        </div>
      </div>
      <Marquee photos={getStripPhotos()} />
      <ul style={{ listStyle: "none", margin: "40px 0 0", padding: "0 var(--pad)", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {getPrograms().map((p) => (
          <li key={p.name} className="mono" style={{ fontSize: 13, padding: "9px 16px", borderRadius: 99, border: "1px solid var(--line)", color: "var(--ink-2)" }}>{p.name}</li>
        ))}
      </ul>
    </section>
  );
}
