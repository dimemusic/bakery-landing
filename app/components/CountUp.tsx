"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up once when scrolled into view. The server renders the final value
 * (so no-JS and reduced-motion users see the right number); the DOM is updated directly
 * to avoid re-rendering on every frame.
 */
export default function CountUp({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = `0${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - (1 - t) ** 3;
          el.textContent = `${Math.round(to * eased)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}
