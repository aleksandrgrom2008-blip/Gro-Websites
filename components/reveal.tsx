"use client";

import { useEffect, useRef } from "react";

/**
 * Fade/slide-in on scroll. Progressive enhancement only:
 * - Content is server-rendered fully visible; without JS nothing is hidden.
 * - Elements already in the viewport at mount never animate.
 * - Respects prefers-reduced-motion by doing nothing at all.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen — leave it alone so nothing visibly "pops in".
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
