import type { EventItem } from "@/lib/types";

const ART: Record<string, [string, string]> = {
  Talk: ["oklch(0.45 0.13 250)", "oklch(0.2 0.06 255)"],
  Meetup: ["oklch(0.5 0.12 155)", "oklch(0.2 0.05 200)"],
  Webinar: ["oklch(0.45 0.14 290)", "oklch(0.2 0.06 255)"],
  Conference: ["oklch(0.6 0.14 80)", "oklch(0.3 0.08 40)"],
  Bootcamp: ["oklch(0.42 0.1 155)", "oklch(0.2 0.05 200)"],
  Workshop: ["oklch(0.55 0.13 230)", "oklch(0.2 0.05 255)"],
};

/** Generated artwork for events without photos. */
export default function CodeArt({ e, size = 18 }: { e: Pick<EventItem, "type" | "glyph">; size?: number }) {
  const [a, b] = ART[e.type] ?? ART.Talk;
  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(100% 80% at 80% 0%, ${a}, ${b})` }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(oklch(1 0 0 / .06) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / .06) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      {e.glyph && (
        <div className="mono" style={{ position: "absolute", left: 22, right: 22, top: "34%", fontSize: size, color: "var(--ink)" }}>
          <span style={{ opacity: 0.55 }}>&gt;&gt;&gt; </span>{e.glyph}
        </div>
      )}
    </div>
  );
}
