"use client";

import Image from "@/components/Img";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/types";

/** Masonry photo grid with a keyboard-friendly lightbox. Works with any image size. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, step]);

  return (
    <>
      <div style={{ columns: "3 260px", columnGap: 14 }}>
        {photos.map((p, i) => (
          <button key={p.src + i} onClick={() => setOpen(i)} aria-label={`Open ${p.alt}`} className="g-item"
            style={{ display: "block", width: "100%", marginBottom: 14, padding: 0, border: 0, borderRadius: 16, overflow: "hidden", cursor: "zoom-in", breakInside: "avoid", background: "var(--bg-3)" }}>
            {/* width/height are placeholders; height:auto keeps each photo's real proportions */}
            <Image src={p.src} alt={p.alt} width={800} height={600} sizes="(max-width: 600px) 100vw, 33vw" style={{ display: "block", width: "100%", height: "auto" }} />
          </button>
        ))}
      </div>
      <style>{`.g-item img{transition:transform 1s cubic-bezier(.2,.7,.2,1)}.g-item:hover img{transform:scale(1.05)}`}</style>

      {open !== null && (
        <div role="dialog" aria-modal aria-label="Photo viewer" onClick={() => setOpen(null)}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "oklch(0.1 0.02 255 / .95)", backdropFilter: "blur(10px)", display: "grid", placeItems: "center", padding: "clamp(12px,4vw,48px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(100%, 1400px)", height: "min(82svh, 100%)" }}>
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" style={{ objectFit: "contain" }} />
          </div>
          <div className="mono" style={{ position: "absolute", left: 0, right: 0, bottom: 20, textAlign: "center", fontSize: 13, color: "var(--ink-2)" }}>
            {open + 1} / {photos.length}
          </div>
          {photos.length > 1 && (
            <>
              <LbBtn label="Previous photo" style={{ left: 16, top: "50%" }} onClick={(e) => { e.stopPropagation(); step(-1); }}>←</LbBtn>
              <LbBtn label="Next photo" style={{ right: 16, top: "50%" }} onClick={(e) => { e.stopPropagation(); step(1); }}>→</LbBtn>
            </>
          )}
          <LbBtn label="Close" style={{ right: 16, top: 16 }} onClick={() => setOpen(null)}>✕</LbBtn>
        </div>
      )}
    </>
  );
}

function LbBtn({ children, label, style, onClick }: { children: React.ReactNode; label: string; style: React.CSSProperties; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button aria-label={label} onClick={onClick}
      style={{ position: "absolute", width: 52, height: 52, borderRadius: 99, border: "1px solid oklch(1 0 0 / .25)", background: "oklch(0.15 0.025 255 / .7)", color: "var(--ink)", fontSize: 20, cursor: "pointer", ...style }}>
      {children}
    </button>
  );
}
