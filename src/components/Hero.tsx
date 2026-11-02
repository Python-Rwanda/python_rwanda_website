"use client";

import Link from "next/link";
import { useScrollY } from "./hooks";

type HeroProps = { title: string; eyebrow: string; tagline: string; video?: string; poster?: string };

export default function Hero({ title, eyebrow, tagline, video, poster }: HeroProps) {
  const y = useScrollY();
  const [first, ...rest] = title.split(" ");
  return (
    <header
      id="top"
      style={{ position: "relative", minHeight: "92svh", boxSizing: "border-box", padding: "120px var(--pad) 64px", overflow: "hidden", display: "flex", alignItems: "flex-end" }}
    >
      {video && (
        <div style={{ position: "absolute", inset: "-10% 0 0", transform: `translateY(${y * 0.25}px)` }}>
          <video autoPlay muted loop playsInline preload="auto" poster={poster} style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, oklch(0.15 0.025 255 / .55), oklch(0.15 0.025 255 / .7) 50%, var(--bg))" }} />

      <div style={{ position: "relative", maxWidth: 900 }}>
        <div className="eyebrow y">{eyebrow}</div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(56px,11vw,168px)", lineHeight: 0.88, letterSpacing: "-.04em" }}>
          {first} {rest.length > 0 && <span style={{ color: "var(--blue)" }}>{rest.join(" ")}</span>}<span style={{ color: "var(--yellow)" }}>.</span>
        </h1>
        <p style={{ maxWidth: 520, fontSize: "clamp(18px,1.8vw,22px)", lineHeight: 1.45, margin: "24px 0 0", color: "oklch(0.92 0.01 255)" }}>{tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <Link href="/events" className="btn btn-y">See events</Link>
          <a href="#join" className="btn btn-ghost">Join the community</a>
        </div>
      </div>
    </header>
  );
}
