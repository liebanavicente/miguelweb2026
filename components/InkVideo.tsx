"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

type Props = {
  /** Sources in order of preference; `media` picks a lighter file for small screens. */
  sources: Array<{ src: string; media?: string }>;
  /** Frame shown before playing (and without JavaScript). */
  poster: string;
  /** Frame shown instead of the clip when the visitor prefers reduced motion. Defaults to the poster. */
  still?: string;
  /** Loop while on screen, or play once and rest on the last frame. */
  loop?: boolean;
  className?: string;
};

/**
 * A silent, decorative clip that only plays while it is on screen. Nothing downloads until it is close to the
 * viewport, and visitors who prefer reduced motion get a still frame instead.
 */
export function InkVideo({ sources, poster, still = poster, loop = false, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.ended) video.play().catch(() => {});
          if (!loop) video.addEventListener("ended", () => observer.disconnect(), { once: true });
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [loop, reduceMotion]);

  if (reduceMotion) {
    // eslint-disable-next-line @next/next/no-img-element -- a plain decorative frame, already sized by CSS
    return <img alt="" aria-hidden className={className} src={still} />;
  }

  return (
    <video aria-hidden className={className} disablePictureInPicture loop={loop} muted playsInline poster={poster} preload="none" ref={ref}>
      {sources.map((source) => (
        <source key={source.src} media={source.media} src={source.src} type="video/mp4" />
      ))}
    </video>
  );
}
