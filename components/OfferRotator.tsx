"use client";

import type { Icon } from "@phosphor-icons/react";
import { Briefcase, Browser, ChalkboardTeacher, ChatsCircle, Code, Database, EnvelopeSimple, MicrosoftExcelLogo } from "@phosphor-icons/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { OFFER_ROTATOR } from "../lib/cv";

const ICONS: Icon[] = [Code, Browser, Database, EnvelopeSimple, Briefcase, MicrosoftExcelLogo, ChalkboardTeacher, ChatsCircle];

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

// Typewriter timing: letters appear one by one, the phrase holds, then is erased letter by letter.
const TYPE_MS = 70;
const ERASE_MS = 32;
const HOLD_MS = 2600;
const GAP_MS = 420;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Types one thing I can offer at a time, holds it, erases it and moves on to the next. */
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
    <ul className="rotator-list">
      {OFFER_ROTATOR.map((item, position) => {
        const ItemIcon = ICONS[position % ICONS.length];
        const text = plainLabel(item);
        return (
          <li key={item}>
            <ItemIcon aria-hidden size={20} weight="bold" />
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </li>
        );
      })}
    </ul>
  );

  if (reduceMotion) {
    return (
      <div className="rotator is-static">
        <p className="rotator-lead">En tu equipo puedo:</p>
        {everything}
      </div>
    );
  }

  const CurrentIcon = ICONS[index % ICONS.length];
  return (
    <div
      className="rotator"
      onBlur={() => setPaused(false)}
      // Pause for keyboard users only: a mouse click on a dot should jump there and keep typing.
      onFocus={(event) => event.target.matches(":focus-visible") && setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="rotator-lead">En tu equipo puedo</p>
      {/* Screen readers get the whole list once instead of text that keeps being typed. */}
      <div className="visually-hidden">{everything}</div>
      <p aria-hidden className="rotator-stage">
        <span className="rotator-phrase">
          <CurrentIcon className="rotator-icon" key={index} size={30} weight="bold" />
          <span className="rotator-text">
            {letters.slice(0, count).map(({ char, key }, position) => (
              // Keyed by position so only the newest letter animates in.
              <span className={`rotator-letter${key ? " is-key" : ""}`} key={position}>
                {char}
              </span>
            ))}
            <span className={`rotator-caret${phase === "holding" || paused ? " is-blinking" : ""}`} />
          </span>
        </span>
      </p>
      <div className="rotator-dots" role="group" aria-label="Qué puedo aportar">
        {OFFER_ROTATOR.map((item, dot) => (
          <button aria-current={dot === index} aria-label={plainLabel(item)} className={dot === index ? "is-active" : undefined} key={item} onClick={() => show(dot)} type="button">
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
