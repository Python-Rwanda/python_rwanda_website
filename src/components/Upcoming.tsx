"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { EventItem } from "@/lib/types";

export function useCountdown(iso?: string) {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    if (!iso) return;
    const tick = () => setMs(Math.max(0, new Date(iso).getTime() - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [iso]);
  return ms;
}

export function Countdown({ iso }: { iso?: string }) {
  const ms = useCountdown(iso);
  if (ms === null) return null;
  const parts = [
    ["days", Math.floor(ms / 864e5)],
    ["hrs", Math.floor(ms / 36e5) % 24],
    ["min", Math.floor(ms / 6e4) % 60],
    ["sec", Math.floor(ms / 1e3) % 60],
  ] as const;
  return (
    <div className="mono" style={{ display: "flex", gap: "clamp(14px,3vw,28px)", marginTop: 28 }}>
      {parts.map(([k, v]) => (
        <div key={k}>
          <div style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 500, lineHeight: 1, color: k === "days" ? "var(--blue)" : "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{String(v).padStart(2, "0")}</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6, textTransform: "uppercase", letterSpacing: ".1em" }}>{k}</div>
        </div>
      ))}
    </div>
  );
}

/** One immersive panel: the next event large, the rest of the upcoming list beside it. */
export default function Upcoming({ events, fallbackImage, rsvpFallback }: { events: EventItem[]; fallbackImage: string; rsvpFallback: string }) {
  const [next, ...rest] = events;
  if (!next) return null;
  const bg = next.cover?.src ?? fallbackImage;

  return (
    <section id="upcoming" className="section" style={{ paddingBottom: 0 }}>
      <div className="eyebrow y">Upcoming</div>
      <div data-reveal style={{ position: "relative", overflow: "hidden", borderRadius: 28, border: "1px solid oklch(1 0 0 / .12)", minHeight: 460 }}>
        <Image src={bg} alt="" fill sizes="100vw" style={{ objectFit: "cover", animation: "kenburns 24s ease-in-out infinite alternate" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, oklch(0.15 0.025 255 / .95) 0%, oklch(0.15 0.025 255 / .82) 55%, oklch(0.15 0.025 255 / .78) 100%)" }} />

        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(28px,4vw,64px)", padding: "clamp(28px,4vw,56px)", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ padding: "6px 14px", borderRadius: 99, background: "var(--yellow)", color: "var(--bg)", fontSize: 13, fontWeight: 600 }}>Next up</span>
              <span className="mono" style={{ fontSize: 14, color: "var(--ink-2)" }}>{next.dateLabel}</span>
            </div>
            <h2 style={{ margin: "20px 0 0", fontSize: "clamp(32px,4.2vw,64px)", lineHeight: 1.02, letterSpacing: "-.03em", fontWeight: 800, textWrap: "balance" }}>{next.title}</h2>
            <p style={{ margin: "14px 0 0", fontSize: 18, color: "var(--ink-2)" }}>{next.where}</p>
            <Countdown iso={next.startsAt} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <a href={next.rsvp ?? rsvpFallback} target="_blank" rel="noopener" className="btn btn-b">RSVP ↗</a>
              <Link href={`/events/${next.slug}`} className="btn btn-ghost">Details</Link>
            </div>
          </div>

          {rest.length > 0 && (
            <div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Also coming up</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: 300, overflowY: "auto" }}>
                {rest.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/events/${e.slug}`} className="up-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", padding: "18px 4px", borderBottom: "1px solid oklch(1 0 0 / .14)", color: "var(--ink)" }}>
                      <span className="mono" style={{ fontSize: 12, color: "var(--yellow)", padding: "6px 10px", border: "1px solid oklch(0.85 0.15 90 / .5)", borderRadius: 8 }}>{e.type}</span>
                      <span>
                        <span style={{ display: "block", fontSize: 20, fontWeight: 800, letterSpacing: "-.01em" }}>{e.title}</span>
                        <span style={{ display: "block", fontSize: 14, color: "var(--ink-3)", marginTop: 4 }}>{e.dateLabel} · {e.where}</span>
                      </span>
                      <span aria-hidden style={{ color: "var(--blue)" }}>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
