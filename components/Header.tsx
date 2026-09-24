"use client";

import { List, X } from "@phosphor-icons/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "ofrezco", label: "Qué ofrezco" },
  { id: "puestos", label: "Puestos" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "formacion", label: "Formación" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

/** Sticky glass header: a blue pill slides to the hovered link and rests on the section in view. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the upper third of the screen is the current one.
  useEffect(() => {
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
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
        Saltar al contenido
      </a>
      <div className="container topbar-inner">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)}>
          <span aria-hidden className="brand-mark">
            ML
          </span>
          <span className="brand-copy">
            <strong>Miguel Liébana</strong>
            <span>Edu · Admin · IA · Office</span>
          </span>
        </a>

        <nav aria-label="Secciones" className="site-nav">
          <div className="nav-track" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden
              className="nav-indicator"
              style={{ "--x": `${pill?.x ?? 0}px`, "--w": `${pill?.w ?? 0}px`, opacity: pill ? 1 : 0 } as CSSProperties}
            />
            <ul ref={listRef}>
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a aria-current={current === id ? "location" : undefined} href={`#${id}`} onFocus={() => setHovered(id)} onBlur={() => setHovered(null)} onMouseEnter={() => setHovered(id)}>
                    <span className="nav-label">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <button aria-controls="menu-movil" aria-expanded={open} className="menu-toggle" onClick={() => setOpen(!open)} type="button">
          {open ? <X aria-hidden size={18} weight="bold" /> : <List aria-hidden size={18} weight="bold" />}
          Menú
        </button>
      </div>
    </header>

      {open ? (
        <nav aria-label="Secciones" className="mobile-menu" id="menu-movil">
          <ul>
            {LINKS.map(({ id, label }, index) => (
              <li key={id} style={{ "--i": index } as CSSProperties}>
                <a aria-current={current === id ? "location" : undefined} href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className="button primary mobile-cta" href="mailto:mlieban3@gmail.com">
            Escríbeme
          </a>
        </nav>
      ) : null}
    </>
  );
}
