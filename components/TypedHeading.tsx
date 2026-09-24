import { type CSSProperties, Fragment } from "react";

const LETTER_MS = 55;
// Long titles type faster so no heading takes much more than a second and a half.
const MAX_TYPING_MS = 1500;

/**
 * Page heading typed letter by letter once, when the page loads. Pure CSS (a staggered delay per
 * letter), so the full text is in the HTML from the start and nothing flashes. Words are kept whole so
 * a line never breaks mid-word, and assistive tech reads the heading as one piece of text.
 */
export function TypedHeading({ text, accent }: { text: string; accent?: string }) {
  const full = accent ? `${text} ${accent}` : text;
  const step = Math.min(LETTER_MS, MAX_TYPING_MS / Math.max(full.length, 1));
  let position = 0;

  const words = (value: string, className?: string) =>
    value.split(" ").map((word, index) => {
      const letters = [...word].map((char) => {
        const delay = position++ * step;
        return (
          <span className="typed-letter" key={delay} style={{ "--d": `${delay}ms` } as CSSProperties}>
            {char}
          </span>
        );
      });
      position++; // the space
      // The space stays outside the word: inside a no-wrap word the line could never break there.
      return (
        <Fragment key={`${value}-${index}`}>
          {index > 0 ? " " : null}
          <span className={`typed-word${className ? ` ${className}` : ""}`}>{letters}</span>
        </Fragment>
      );
    });

  const main = words(text);
  const accentWords = accent ? words(accent, "typed-accent") : null;

  return (
    <h1 className="typed-heading">
      <span className="visually-hidden">{full}</span>
      <span aria-hidden="true" style={{ "--typed-end": `${position * step}ms`, "--step": `${step}ms` } as CSSProperties}>
        {main}
        {accentWords ? " " : null}
        {accentWords}
        <span className="typed-caret" />
      </span>
    </h1>
  );
}
