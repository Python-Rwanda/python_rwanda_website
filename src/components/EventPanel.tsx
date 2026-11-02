"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useRef, useState } from "react";
import type { EventItem } from "@/lib/types";
import CodeArt from "./CodeArt";

/** Tall photo panel linking to the event page. Plays the event's video on hover. */
export default function EventPanel({ e, width = "clamp(260px, 30vw, 380px)", height = "clamp(380px, 52vh, 480px)" }: { e: EventItem; width?: string; height?: string }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [hot, setHot] = useState(false);
  const on = () => { if (!e.video) return; setHot(true); vid.current?.play().catch(() => {}); };
  const off = () => { setHot(false); vid.current?.pause(); };

  return (
    <Link href={`/events/${e.slug}`} className="panel" onMouseEnter={on} onMouseLeave={off} onFocus={on} onBlur={off}
      style={{ position: "relative", display: "block", flex: "none", width, height, borderRadius: 24, overflow: "hidden", scrollSnapAlign: "start", background: "var(--bg-3)", color: "var(--ink)" }}>
      {e.cover ? (
        <>
          <Image src={e.cover.src} alt={e.cover.alt} fill sizes="400px" className="panel-img" style={{ objectFit: "cover", objectPosition: e.cover.pos ?? "50% 50%", opacity: hot ? 0 : 1 }} />
          {e.video && (
            <video ref={vid} src={e.video} muted loop playsInline preload="none" aria-hidden
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: hot ? 1 : 0, transition: "opacity .5s" }} />
          )}
        </>
      ) : (
        <CodeArt e={e} />
      )}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, oklch(0.15 0.025 255 / .05) 25%, oklch(0.12 0.025 255 / .75) 60%, oklch(0.12 0.025 255 / .97) 100%)" }} />
      <span className="mono" style={{ position: "absolute", left: 16, top: 16, padding: "5px 11px", borderRadius: 99, background: e.upcoming ? "var(--yellow)" : "oklch(0.15 0.025 255 / .8)", backdropFilter: "blur(6px)", fontSize: 11, color: e.upcoming ? "var(--bg)" : "var(--yellow)" }}>
        {e.upcoming ? `Upcoming · ${e.type}` : e.type}
      </span>
      {e.video && (
        <span className="mono" style={{ position: "absolute", right: 16, top: 16, padding: "5px 10px", borderRadius: 99, background: "oklch(0.15 0.025 255 / .8)", fontSize: 11, color: "var(--ink-2)" }}>{hot ? "● playing" : "▶ hover"}</span>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 22 }}>
        <div className="mono" style={{ fontSize: 12, color: e.upcoming ? "var(--yellow)" : "var(--blue)" }}>{e.dateLabel}</div>
        <h3 style={{ margin: "8px 0 0", fontSize: 24, lineHeight: 1.1, letterSpacing: "-.02em", fontWeight: 800, textWrap: "balance" }}>{e.title}</h3>
        <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.4 }}>{e.where}</div>
        <div className="mono panel-more" style={{ fontSize: 12, color: "var(--yellow)", marginTop: 12 }}>View event →</div>
      </div>
    </Link>
  );
}
