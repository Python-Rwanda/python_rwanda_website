import Image from "@/components/Img";
import { getSite } from "@/lib/content";

/** Blue call-to-action band used at the bottom of pages. */
export default function Join({ id = "join", title = "Come write Python with us.", text = "Event announcements and daily conversation, all in one place." }: { id?: string; title?: string; text?: string }) {
  const { links: LINKS, page_images } = getSite();
  return (
    <section id={id} style={{ position: "relative", overflow: "hidden", padding: "clamp(64px,8vw,110px) var(--pad)", color: "var(--bg)" }}>
      <Image src={page_images.join} alt="" fill sizes="100vw" style={{ objectFit: "cover", filter: "grayscale(1)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "oklch(0.72 0.13 250 / .9)" }} />
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 32 }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(40px,6vw,84px)", lineHeight: 0.95, letterSpacing: "-.04em", fontWeight: 800 }}>{title}</h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, margin: "20px 0 0" }}>{text}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener" className="btn" style={{ background: "var(--bg)", color: "var(--ink)" }}>Join WhatsApp community</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener" className="btn join-outline">LinkedIn</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="btn join-outline">Instagram</a>
        </div>
      </div>
    </section>
  );
}
