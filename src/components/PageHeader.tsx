import Image from "@/components/Img";
import type { Photo } from "@/lib/types";

/** Compact header for inner pages: dimmed photo, eyebrow, title, intro. */
export default function PageHeader({ eyebrow, title, intro, photo, children }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; photo?: Photo; children?: React.ReactNode }) {
  return (
    <header style={{ position: "relative", overflow: "hidden", padding: "clamp(140px,16vw,200px) var(--pad) clamp(48px,6vw,80px)" }}>
      {photo && <Image src={photo.src} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: photo.pos ?? "50% 50%" }} />}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: photo ? "linear-gradient(180deg, oklch(0.15 0.025 255 / .7), oklch(0.15 0.025 255 / .82) 60%, var(--bg))" : "radial-gradient(80% 120% at 20% 0%, oklch(0.3 0.08 250), var(--bg))" }} />
      <div style={{ position: "relative", maxWidth: 900 }}>
        <div className="eyebrow y">{eyebrow}</div>
        <h1 style={{ margin: 0, fontSize: "clamp(40px,7vw,104px)", lineHeight: 0.95, letterSpacing: "-.04em", fontWeight: 800, textWrap: "balance" }}>{title}</h1>
        {intro && <p style={{ fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.55, color: "var(--ink-2)", margin: "24px 0 0", maxWidth: 640 }}>{intro}</p>}
        {children}
      </div>
    </header>
  );
}
