import type { ReactNode } from "react";

// Two hand-drawn marker strokes; which one a word gets is picked from its length so the page does not repeat.
const STROKES = [
  "M3 13 C 38 6, 74 15, 110 9 S 172 5, 197 11",
  "M2 10 C 30 15, 62 5, 98 11 C 132 16, 166 6, 198 12",
];

/** Serif italic word with a pen stroke drawn underneath, like a teacher's correction in the margin. */
export function Scribble({ children, onLoad = false }: { children: ReactNode; onLoad?: boolean }) {
  const text = typeof children === "string" ? children : "";
  return (
    <em className={`scribble${onLoad ? " on-load" : ""}`}>
      {children}
      <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 200 20">
        <path d={STROKES[text.length % STROKES.length]} pathLength={1} />
      </svg>
    </em>
  );
}

/** Handwritten-style note in the margin with a small curved arrow. */
export function MarginNote({ children, arrow = "down" }: { children: ReactNode; arrow?: "down" | "left" }) {
  return (
    <span aria-hidden className={`margin-note arrow-${arrow}`}>
      {children}
      <svg viewBox="0 0 40 40">
        {arrow === "down" ? <path d="M8 4 C 22 8, 30 18, 26 34 M18 28 L26 35 L32 26" /> : <path d="M36 8 C 26 20, 16 26, 4 26 M12 19 L4 26 L12 32" />}
      </svg>
    </span>
  );
}
