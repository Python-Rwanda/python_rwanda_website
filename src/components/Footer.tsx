import Image from "@/components/Img";
import Link from "next/link";
import { getSite } from "@/lib/content";

function columns(LINKS: ReturnType<typeof getSite>["links"]) {
  return [
  { title: "Community", links: [{ href: "/events", label: "Events" }, { href: "/about", label: "About" }, { href: "/get-involved", label: "Get involved" }, { href: "/sponsors", label: "Sponsors" }] },
  { title: "Follow", links: [{ href: LINKS.linkedin, label: "LinkedIn" }, { href: LINKS.instagram, label: "Instagram" }, { href: LINKS.whatsapp, label: "WhatsApp community" }] },
  { title: "More", links: [{ href: "/code-of-conduct", label: "Code of Conduct" }, { href: `mailto:${LINKS.email}`, label: LINKS.email }, { href: "https://www.python.org", label: "python.org" }] },
  ];
}

export default function Footer() {
  const COLS = columns(getSite().links);
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "clamp(48px,6vw,72px) var(--pad) 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 36 }}>
        <div>
          <Image src="/media/logo-light.png" alt="Python Rwanda" width={368} height={126} style={{ height: 44, width: "auto" }} />
          <p style={{ color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6, margin: "16px 0 0", maxWidth: 280 }}>A Python community in Rwanda.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 14 }}>{c.title}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10, fontSize: 15 }}>
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? <Link href={l.href} style={{ color: "var(--ink-2)" }}>{l.label}</Link> : <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener" style={{ color: "var(--ink-2)" }}>{l.label}</a>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mono" style={{ marginTop: 48, fontSize: 12, color: "var(--ink-3)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
        <span>© 2026 Python Rwanda community</span>
        <span>Python is a trademark of the Python Software Foundation.</span>
      </div>
    </footer>
  );
}
