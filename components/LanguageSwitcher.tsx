"use client";

import { CaretDown, Check, Translate } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { LOCALE_NAMES, LOCALES, type Locale, localePath } from "../lib/i18n";

/** Glass pill with the current language code; opens a short list of the four languages, each named in itself. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  // Keep the reader's place: switching language lands on the same chapter.
  const [hash, setHash] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className="lang"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      ref={rootRef}
    >
      <button
        aria-controls="idiomas"
        aria-expanded={open}
        aria-label={`${label}: ${LOCALE_NAMES[locale]}`}
        className="lang-toggle"
        onClick={() => {
          setHash(window.location.hash);
          setOpen(!open);
        }}
        ref={buttonRef}
        type="button"
      >
        <Translate aria-hidden size={17} weight="bold" />
        <span className="lang-code">{locale}</span>
        <CaretDown aria-hidden className="lang-caret" size={12} weight="bold" />
      </button>
      <ul className="lang-menu" data-open={open} id="idiomas" inert={!open}>
        {LOCALES.map((code) => (
          <li key={code}>
            <a aria-current={code === locale ? "true" : undefined} href={`${localePath(code)}${hash}`} hrefLang={code} lang={code}>
              <span className="lang-code">{code}</span>
              {LOCALE_NAMES[code]}
              {code === locale ? <Check aria-hidden className="lang-check" size={15} weight="bold" /> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
