"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { OFFER_ROTATOR } from "../lib/cv";

type Letter = { char: string; key: boolean };

/** Splits a label into letters, remembering which belong to a *key word*. */
function lettersOf(label: string): Letter[] {
  const letters: Letter[] = [];
  let key = false;
  for (const char of label) {
    if (char === "*") key = !key;
    else letters.push({ char, key });
  }
  return letters;
}

const plainLabel = (label: string) => label.replace(/\*/g, "");

// Typewriter timing: letters appear one by one, the command holds, then is erased letter by letter.
const TYPE_MS = 62;
const ERASE_MS = 26;
const HOLD_MS = 2400;
const GAP_MS = 380;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** A terminal prompt that types one thing I can offer at a time, holds it, erases it and moves on. */
export function OfferRotator() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [paused, setPaused] = useState(false);

  const letters = lettersOf(OFFER_ROTATOR[index]);
  const length = letters.length;

  useEffect(() => {
    if (paused || reduceMotion) return;
    let delay: number;
    let step: () => void;
    if (phase === "typing") {
      delay = count === 0 ? GAP_MS : TYPE_MS;
      step = () => (count + 1 >= length ? (setCount(length), setPhase("holding")) : setCount(count + 1));
    } else if (phase === "holding") {
      delay = HOLD_MS;
      step = () => setPhase("erasing");
    } else {
      delay = ERASE_MS;
      step = () => {
        if (count > 0) return setCount(count - 1);
        setIndex((index + 1) % OFFER_ROTATOR.length);
        setPhase("typing");
      };
    }
    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [count, phase, index, length, paused, reduceMotion]);

  function show(next: number) {
    setIndex(next);
    setCount(0);
    setPhase("typing");
  }

  const everything = (
    <ul className="term-list">
      {OFFER_ROTATOR.map((item) => (
        <li key={item}>{plainLabel(item)}</li>
      ))}
    </ul>
  );

  return (
    <div
      className="terminal"
      onBlur={() => setPaused(false)}
      // Pause for keyboard users only: a mouse click on a tab should jump there and keep typing.
      onFocus={(event) => event.target.matches(":focus-visible") && setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="term-bar">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span>miguel@portfolio: ~/tu-equipo</span>
      </div>
      <div className="term-body">
        <p className="term-comment"># en tu equipo puedo…</p>
        {reduceMotion ? (
          everything
        ) : (
          <>
            {/* Screen readers get the whole list once instead of text that keeps being typed. */}
            <div className="visually-hidden">{everything}</div>
            <p aria-hidden className="term-line">
              <span className="term-prompt">❯</span>
              <span className="term-text">
                {letters.slice(0, count).map(({ char, key }, position) => (
                  <span className={key ? "is-key" : undefined} key={position}>
                    {char}
                  </span>
                ))}
                <span className={`term-caret${phase === "holding" || paused ? " is-blinking" : ""}`} />
              </span>
            </p>
            <div className="term-tabs" role="group" aria-label="Qué puedo aportar">
              {OFFER_ROTATOR.map((item, dot) => (
                <button aria-current={dot === index} aria-label={plainLabel(item)} key={item} onClick={() => show(dot)} type="button">
                  {String(dot + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
