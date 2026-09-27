"use client";

import { useEffect, useRef, useState } from "react";

import { INTRO_SEEN_KEY } from "../lib/intro";

const HOLD_MS = 600; // rest on the glowing name before dissolving
const LEAVE_MS = 1100; // matches the .welcome transition in globals.css
const STALL_MS = 4000; // give up if the film has not started by then
const MAX_MS = 14000; // never keep anyone waiting longer than this
const PORTRAIT = "(max-aspect-ratio: 1 / 1)"; // keep in sync with the .welcome media query in globals.css

/**
 * Welcome film: my name is written in ink on the notebook, lights up and turns into code, then the sheet dissolves
 * into the hero, whose own entrance animations are held until that moment. Shown once per visit; the head script in
 * lib/intro.ts decides before first paint, so this only acts when <html data-intro="play"> is already set.
 */
export function WelcomeIntro({ skipLabel }: { skipLabel: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const leaveRef = useRef<() => void>(() => {});
  // Which cut to play: the vertical one on portrait screens, where the wide one would crop the name.
  const [film, setFilm] = useState<string | null>(null);
  const active = film !== null;

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;
    setFilm(window.matchMedia(PORTRAIT).matches ? "firma-vertical" : "firma");
  }, []);

  useEffect(() => {
    const clip = video.current;
    if (!clip) return;
    const root = document.documentElement;
    const timers: number[] = [];

    let left = false;
    const leave = () => {
      if (left) return;
      left = true;
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}
      root.dataset.intro = "leaving";
      timers.push(
        window.setTimeout(() => {
          root.dataset.intro = "done";
          setFilm(null);
        }, LEAVE_MS),
      );
    };
    leaveRef.current = leave;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" && event.key !== "Shift") leave();
    };
    const onEnded = () => timers.push(window.setTimeout(leave, HOLD_MS));
    window.addEventListener("wheel", leave, { passive: true });
    window.addEventListener("touchmove", leave, { passive: true });
    window.addEventListener("keydown", onKey);
    clip.addEventListener("ended", onEnded);
    clip.addEventListener("error", leave);
    timers.push(window.setTimeout(leave, MAX_MS));
    timers.push(window.setTimeout(() => clip.currentTime === 0 && leave(), STALL_MS));
    clip.play().catch(leave);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", leave);
      window.removeEventListener("touchmove", leave);
      window.removeEventListener("keydown", onKey);
      clip.removeEventListener("ended", onEnded);
      clip.removeEventListener("error", leave);
    };
  }, [film]);

  return (
    <div aria-hidden className="welcome" onClick={() => leaveRef.current()}>
      {/* The film is only requested once we know the intro will actually play. */}
      {active ? (
        <video className="welcome-film" disablePictureInPicture muted playsInline poster={`/video/${film}.jpg`} preload="auto" ref={video} src={`/video/${film}.mp4`} />
      ) : null}
      <button className="welcome-skip" tabIndex={-1} type="button">
        {skipLabel}
      </button>
    </div>
  );
}
