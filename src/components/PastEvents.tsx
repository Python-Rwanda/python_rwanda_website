"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EventItem } from "@/lib/types";
import EventPanel from "./EventPanel";

/** Home page: the most recent past events as a horizontal rail, linking to /events for the rest. */
export default function PastEvents({ events }: { events: EventItem[] }) {
  const recent = events.slice(0, 8);
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const r = rail.current;
    if (!r) return;
    setEdge({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 });
  };
  useEffect(update, []);
  const go = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="past" className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ padding: "0 var(--pad)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 20, marginBottom: 28 }}>
        <div>
          <div className="eyebrow">Past events</div>
          <h2 className="h2">Where we&apos;ve been</h2>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/events" className="mono" style={{ fontSize: 13, marginRight: 10 }}>All events →</Link>
          <ArrowBtn label="Previous events" disabled={edge.start} onClick={() => go(-1)}>←</ArrowBtn>
          <ArrowBtn label="Next events" disabled={edge.end} onClick={() => go(1)}>→</ArrowBtn>
        </div>
      </div>

      <div ref={rail} onScroll={update} className="rail" tabIndex={0} aria-label="Recent past events"
        style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px var(--pad) 12px", scrollPaddingLeft: "var(--pad)" }}>
        {recent.map((e) => <EventPanel key={e.slug} e={e} />)}
      </div>
    </section>
  );
}

function ArrowBtn({ children, label, disabled, onClick }: { children: React.ReactNode; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button aria-label={label} disabled={disabled} onClick={onClick}
      style={{ width: 44, height: 44, borderRadius: 99, border: "1px solid oklch(1 0 0 / .25)", background: "transparent", color: "var(--ink)", fontSize: 18, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.3 : 1 }}>
      {children}
    </button>
  );
}
