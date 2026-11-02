"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrollY } from "./hooks";

const ITEMS = [
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Nav() {
  const y = useScrollY();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const solid = y > 40 || open;

  return (
    <nav
      aria-label="Main"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: `${solid ? 12 : 20}px clamp(16px,4vw,48px)`,
        background: solid ? "oklch(0.15 0.025 255 / .85)" : "transparent",
        backdropFilter: solid ? "blur(14px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${solid ? "oklch(1 0 0 / .08)" : "transparent"}`,
        transition: "background .3s, padding .3s, border-color .3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/" aria-label="Python Rwanda home" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/media/logo-light.png" alt="Python Rwanda" width={368} height={126} priority style={{ height: 40, width: "auto" }} />
        </Link>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,28px)", fontSize: 14 }}>
          {ITEMS.map((i) => {
            const active = path === i.href || path.startsWith(i.href + "/");
            return (
              <Link key={i.href} href={i.href} className="hide-sm" aria-current={active ? "page" : undefined}
                style={{ color: active ? "var(--yellow)" : undefined, borderBottom: `1px solid ${active ? "var(--yellow)" : "transparent"}`, paddingBottom: 2 }}>
                {i.label}
              </Link>
            );
          })}
          <Link href="/get-involved#join" className="btn btn-y" style={{ padding: "9px 18px", fontSize: 14 }}>Join community</Link>
          <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}
            style={{ width: 40, height: 40, borderRadius: 99, border: "1px solid oklch(1 0 0 / .25)", background: "transparent", color: "var(--ink)", fontSize: 18, cursor: "pointer" }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu" style={{ gap: 4, padding: "16px 0 8px" }}>
          {ITEMS.map((i) => (
            <Link key={i.href} href={i.href} style={{ color: "var(--ink)", fontSize: 22, fontWeight: 800, padding: "10px 0", borderBottom: "1px solid oklch(1 0 0 / .08)" }}>{i.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
