"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

export function StatCounter({
  value,
  suffix = "+",
}: {
  value: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const showFinalValue = () => setDisplay(value);
    if (reducedMotion) {
      showFinalValue();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        }
        window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="stat-number">
      {display}
      {suffix}
    </span>
  );
}
