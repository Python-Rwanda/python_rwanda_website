"use client";

import { useEffect } from "react";

/** Adds `.in` to every [data-reveal] element as it enters the viewport. Mount once. */
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    const watch = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    watch();
    // Re-scan when filtered lists re-render new nodes.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
