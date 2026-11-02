import Image from "@/components/Img";
import type { Photo } from "@/lib/types";

/** Endless film strip of community photos. */
export default function Marquee({ photos }: { photos: Photo[] }) {
  if (!photos.length) return null;
  const strip = [...photos, ...photos];
  return (
    <div className="marquee" aria-label="Photos from Python Rwanda events" style={{ position: "relative", overflow: "hidden", padding: "8px 0", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="marquee-track">
        {strip.map((p, i) => (
          <div key={i} style={{ height: "clamp(140px,18vw,220px)", borderRadius: 14, overflow: "hidden", flex: "none", background: "var(--bg-3)" }}>
            {/* width/height are placeholders; width:auto keeps each photo's real proportions */}
            <Image src={p.src} alt={i < photos.length ? p.alt : ""} width={400} height={300} sizes="400px" style={{ display: "block", height: "100%", width: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
