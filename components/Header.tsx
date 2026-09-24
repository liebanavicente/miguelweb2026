"use client";

import { List, X } from "@phosphor-icons/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import type { Dictionary } from "../lib/dictionaries";
import type { Locale } from "../lib/i18n";
import { OPEN_SECTION_EVENT } from "./Collapsible";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

// Section anchors stay the same in every language, so shared links keep working.
const SECTION_IDS = ["ofrezco", "proyectos", "puestos", "formacion", "titulos", "trayectoria", "contacto"] as const;

/** Sticky header: an ink underline slides to the hovered link and rests on the section in view. */
export function Header({ t, locale }: { t: Dictionary["header"]; locale: Locale }) {
  const LINKS = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  // Chapters are folded: following a link also unfolds the chapter it points to.
  const openSection = (id: string) => window.dispatchEvent(new CustomEvent(OPEN_SECTION_EVENT, { detail: id }));
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Above the first chapter nothing is current, so the underline does not linger on the last section seen.
      const first = document.getElementById(SECTION_IDS[0]);
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.35) setCurrent(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the upper third of the screen is the current one.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const target = hovered ?? current;
  useEffect(() => {
    const list = listRef.current;
    const link = target ? list?.querySelector<HTMLElement>(`a[href="#${target}"]`) : null;
    if (!list || !link) return setPill(null);
    setPill({ x: link.offsetLeft, w: link.offsetWidth });
  }, [target]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="topbar" data-scrolled={scrolled}>
      <a className="skip-link" href="#contenido">
        {t.skip}
      </a>
      <div className="container topbar-inner">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)}>
          <span aria-hidden className="brand-mark">
            ml<i>_</i>
          </span>
          <span className="brand-copy">
            <strong>Miguel Liébana</strong>
            <span>{t.tagline}</span>
          </span>
        </a>

        <nav aria-label={t.sectionsLabel} className="site-nav">
          <div className="nav-track" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden
              className="nav-indicator"
              style={{ "--x": `${pill?.x ?? 0}px`, "--w": `${pill?.w ?? 0}px`, opacity: pill ? 1 : 0 } as CSSProperties}
            />
            <ul ref={listRef}>
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a aria-current={current === id ? "location" : undefined} href={`#${id}`} onClick={() => openSection(id)} onFocus={() => setHovered(id)} onBlur={() => setHovered(null)} onMouseEnter={() => setHovered(id)}>
                    <span className="nav-label">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="topbar-tools">
          <ThemeToggle label={t.darkMode} />
          <LanguageSwitcher label={t.languageLabel} locale={locale} />
          <button aria-controls="menu-movil" aria-expanded={open} className="menu-toggle" onClick={() => setOpen(!open)} type="button">
            {open ? <X aria-hidden size={18} weight="bold" /> : <List aria-hidden size={18} weight="bold" />}
            {t.menu}
          </button>
        </div>
      </div>
    </header>

      {open ? (
        <nav aria-label={t.sectionsLabel} className="mobile-menu" id="menu-movil">
          <ul>
            {LINKS.map(({ id, label }, index) => (
              <li key={id} style={{ "--i": index } as CSSProperties}>
                <a
                  aria-current={current === id ? "location" : undefined}
                  href={`#${id}`}
                  onClick={() => {
                    openSection(id);
                    setOpen(false);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className="button primary mobile-cta" href="mailto:mlieban3@gmail.com">
            {t.write}
          </a>
        </nav>
      ) : null}
    </>
  );
}
