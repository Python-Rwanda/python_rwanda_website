import Image from "@/components/Img";
import Link from "next/link";
import { getPartners } from "@/lib/content";
import type { Partner } from "@/lib/types";

export function PartnerTile({ p }: { p: Partner }) {
  const inner = p.logo ? (
    <Image src={p.logo} alt={p.name} width={200} height={80} style={{ height: 48, width: "auto", objectFit: "contain" }} />
  ) : (
    <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.01em" }}>{p.name}</span>
  );
  const style: React.CSSProperties = { display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, minHeight: 110, padding: "0 24px", borderRadius: 16, border: "1px solid var(--line)", color: "var(--ink)" };
  const body = (<>{inner}<span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{p.note}</span></>);
  return p.url ? <a href={p.url} target="_blank" rel="noopener" style={style}>{body}</a> : <div style={style}>{body}</div>;
}

/** Slim "partners & hosts" row for the home page. */
export default function PartnerStrip() {
  return (
    <section style={{ padding: "0 var(--pad) clamp(64px,8vw,110px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div className="eyebrow" style={{ color: "var(--ink-3)", margin: 0 }}>Partners &amp; hosts</div>
        <Link href="/sponsors" className="mono" style={{ fontSize: 13 }}>Become a sponsor →</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
        {getPartners().map((p) => <PartnerTile key={p.name} p={p} />)}
      </div>
    </section>
  );
}
