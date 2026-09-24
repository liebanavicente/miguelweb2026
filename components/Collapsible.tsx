"use client";

import { CaretDown } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/** Event the header fires when one of its links is clicked, so that chapter opens even if the hash did not change. */
export const OPEN_SECTION_EVENT = "open-section";

/**
 * Chapter body folded behind a glass bar, so the page reads as a table of contents first.
 * It opens on click, when the URL hash points at the chapter, or when the header asks for it.
 */
export function Collapsible({ id, summary, labels, children, defaultOpen = false }: { id: string; summary: string; labels: { open: string; close: string }; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  // Only once fully open may the content overflow (hover lifts, shadows, sticky panels).
  const [settled, setSettled] = useState(defaultOpen);
  const barRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    const fromHeader = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) setOpen(true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(OPEN_SECTION_EVENT, fromHeader);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(OPEN_SECTION_EVENT, fromHeader);
    };
  }, [id]);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) return;
    setSettled(false);
    // Folding a long chapter from below would leave the reader far down the page: bring its bar back into view.
    const bar = barRef.current;
    if (bar && bar.getBoundingClientRect().top < 0) bar.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <button aria-controls={`${id}-cuerpo`} aria-expanded={open} className="fold-bar" onClick={toggle} ref={barRef} type="button">
        <span className="fold-summary">{summary}</span>
        <span className="fold-action">
          {open ? labels.close : labels.open}
          <CaretDown aria-hidden className="fold-caret" size={15} weight="bold" />
        </span>
      </button>
      <div
        className="fold"
        data-open={open}
        data-settled={open && settled}
        id={`${id}-cuerpo`}
        inert={!open}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "grid-template-rows" && open) setSettled(true);
        }}
      >
        <div className="fold-inner">{children}</div>
      </div>
    </>
  );
}
