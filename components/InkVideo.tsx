"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A silent, decorative looping clip that only plays while it is on screen. Nothing downloads until it is close to
 * the viewport, and visitors who prefer reduced motion get the poster frame instead.
 */
export function InkVideo({ src, poster }: { src: string; poster: string }) {
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
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.45 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    // eslint-disable-next-line @next/next/no-img-element -- a plain decorative frame, already sized by CSS
    return <img alt="" aria-hidden src={poster} />;
  }

  return <video aria-hidden disablePictureInPicture loop muted playsInline poster={poster} preload="none" ref={ref} src={src} />;
}
