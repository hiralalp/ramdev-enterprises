"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import "./hero-slider.css";

const banners = [
  { file: "mall.jpg", label: "Architectural spaces" },
  { file: "table1.jpg", label: "Furniture details" },
  { file: "gate.jpg", label: "Entrance designs" },
];

export function HeroSlider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  const rotating = !paused && !hovered && !reducedMotion && !hidden;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % banners.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [rotating]);
  function select(index: number) {
    setPaused(true);
    setActive((index + banners.length) % banners.length);
  }
  return (
    <section
      className="hero hero-slider"
      aria-label="Featured inspiration"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-rotation-control]"))
          setPaused(true);
      }}
    >
      <div className="hero-slides" aria-live={rotating ? "off" : "polite"}>
        {banners.map((banner, index) => (
          <div
            key={banner.file}
            className="hero-slide"
            data-active={index === active}
            aria-hidden={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${banners.length}: ${banner.label}`}
          >
            <Image
              src={`/images/reference/ramdev-steels/banner_new/${banner.file}`}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-art"
            />
          </div>
        ))}
      </div>
      <div className="hero-slider-shade" aria-hidden="true" />
      {children}
      <div className="container hero-slider-footer">
        <div className="hero-slide-caption">
          <span>{String(active + 1).padStart(2, "0")} / 03</span>
          <strong>{banners[active].label}</strong>
          <a href="/image-credits#supplied-catalogue">Reference imagery</a>
        </div>
        <div
          className="hero-slider-controls"
          role="group"
          aria-label="Banner controls"
        >
          <button
            type="button"
            aria-label="Previous banner"
            title="Previous banner"
            onClick={() => select(active - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          {banners.map((banner, index) => (
            <button
              type="button"
              className="hero-slide-dot"
              key={banner.file}
              aria-label={`Show banner ${index + 1}: ${banner.label}`}
              aria-pressed={active === index}
              title={banner.label}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
          <button
            type="button"
            aria-label="Next banner"
            title="Next banner"
            onClick={() => select(active + 1)}
          >
            <ArrowRight size={18} />
          </button>
          {!reducedMotion && (
            <button
              type="button"
              data-rotation-control
              aria-label={paused ? "Play banners" : "Pause banners"}
              title={paused ? "Play banners" : "Pause banners"}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
