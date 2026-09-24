"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { THEME_STORAGE_KEY as STORAGE_KEY, type Theme } from "../lib/theme";

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Sun/moon switch. Until the visitor picks, the page keeps following the system setting, even if it changes. */
export function ThemeToggle({ label }: { label: string }) {
  // Unknown on the server; both icons render and CSS shows the right one, so nothing jumps on hydration.
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (readSaved()) return;
      apply(query.matches ? "dark" : "light");
      setDark(query.matches);
    };
    query.addEventListener("change", onSystem);
    return () => query.removeEventListener("change", onSystem);
  }, []);

  function toggle() {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    const swap = () => {
      apply(next);
      setDark(next === "dark");
    };
    // A soft cross-fade where the browser can do it, unless the visitor asked for less motion.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(swap);
    else swap();
  }

  return (
    <button aria-label={label} aria-pressed={dark} className="theme-toggle" onClick={toggle} type="button">
      <Moon aria-hidden className="theme-moon" size={18} weight="bold" />
      <Sun aria-hidden className="theme-sun" size={18} weight="bold" />
    </button>
  );
}
