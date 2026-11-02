"use client";

import { useState } from "react";
import type { EventItem } from "@/lib/types";
import EventPanel from "./EventPanel";

/** Full archive of past events, filterable by year and type. */
export default function EventsBrowser({ events }: { events: EventItem[] }) {
  const YEARS = Array.from(new Set(events.map((e) => e.year))).sort((a, b) => b - a);
  const TYPES = Array.from(new Set(events.map((e) => e.type))).sort();
  const [year, setYear] = useState<number | "All">("All");
  const [type, setType] = useState<string>("All");
  const list = events.filter((e) => (year === "All" || e.year === year) && (type === "All" || e.type === type));

  return (
    <section id="archive" className="section">
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 20, marginBottom: 32 }}>
        <div>
          <div className="eyebrow">Archive</div>
          <h2 className="h2">Past events</h2>
        </div>
        <div style={{ display: "grid", gap: 10, justifyItems: "end" }}>
          {YEARS.length > 1 && <Chips label="Year" values={["All", ...YEARS]} value={year} onPick={(v) => setYear(v as number | "All")} />}
          <Chips label="Type" values={["All", ...TYPES]} value={type} onPick={(v) => setType(String(v))} />
        </div>
      </div>
      {list.length === 0 ? (
        <p style={{ color: "var(--ink-3)" }}>No events match these filters.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 16 }}>
          {list.map((e) => <EventPanel key={e.slug} e={e} width="100%" height="420px" />)}
        </div>
      )}
    </section>
  );
}

function Chips({ label, values, value, onPick }: { label: string; values: (string | number)[]; value: string | number; onPick: (v: string | number) => void }) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      {values.map((v) => (
        <button key={v} onClick={() => onPick(v)} aria-pressed={value === v} className="mono"
          style={{ cursor: "pointer", fontSize: 13, padding: "8px 14px", borderRadius: 99, border: "1px solid oklch(1 0 0 / .25)", background: value === v ? "var(--yellow)" : "transparent", color: value === v ? "var(--bg)" : "var(--ink)" }}>
          {v}
        </button>
      ))}
    </div>
  );
}
