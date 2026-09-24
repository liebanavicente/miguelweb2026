import { type CSSProperties, Fragment, type ReactNode } from "react";

import type { Dictionary } from "../lib/dictionaries";

type Token = { t: string; k?: "key" | "str" | "bool" | "punc" };

const k = (t: string): Token => ({ t, k: "key" });
const s = (t: string): Token => ({ t, k: "str" });
const p = (t: string): Token => ({ t, k: "punc" });

// Each line is a list of tokens; the indent is part of the first one. Keys and values follow the page language.
function linesFor({ keys, role, also }: Dictionary["codeCard"]): Token[][] {
  return [
    [p("{")],
    [{ t: "  " }, k(`"${keys.name}"`), p(": "), s('"Miguel Liébana"'), p(",")],
    [{ t: "  " }, k(`"${keys.role}"`), p(": "), s(`"${role}"`), p(",")],
    [{ t: "  " }, k(`"${keys.training}"`), p(": ["), s('"Upgrade Hub"'), p(", "), s('"Coliseum"'), p("],")],
    [{ t: "  " }, k('"stack"'), p(": ["), s('"JS"'), p(", "), s('"React"'), p(", "), s('"Node"'), p(", "), s('"SQL"'), p("],")],
    [{ t: "  " }, k(`"${keys.also}"`), p(": ["), s(`"${also[0]}"`), p(", "), s(`"${also[1]}"`), p("],")],
    [{ t: "  " }, k(`"${keys.languages}"`), p(": "), s('"es · ca · de · en"'), p(",")],
    [{ t: "  " }, k(`"${keys.available}"`), p(": "), { t: "true", k: "bool" }],
    [p("}")],
  ];
}

const START_MS = 500;
const CHAR_MS = 14;

/**
 * A small editor window whose JSON types itself line by line. Pure CSS: every line is clipped open with
 * steps() over its own length, delayed until the previous line is done, so the text is in the HTML from the start.
 */
export function CodeCard({ t }: { t: Dictionary["codeCard"] }) {
  const lines = linesFor(t);
  let delay = START_MS;
  const rows: ReactNode[] = lines.map((tokens, index) => {
    const length = tokens.reduce((sum, token) => sum + token.t.length, 0);
    const duration = length * CHAR_MS;
    const style = { "--chars": length, "--dur": `${duration}ms`, "--delay": `${delay}ms` } as CSSProperties;
    delay += duration + 90;
    return (
      <Fragment key={index}>
        <span className="code-ln">{index + 1}</span>
        <span className="code-line" style={style}>
          {tokens.map((token, position) => (
            <span className={token.k ? `tok-${token.k}` : undefined} key={position}>
              {token.t}
            </span>
          ))}
          {index === lines.length - 1 ? <span aria-hidden className="code-caret" /> : null}
        </span>
      </Fragment>
    );
  });

  return (
    <figure aria-label={t.label} className="code-card">
      <div aria-hidden className="code-bar">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-tab">miguel.json</span>
      </div>
      <pre className="code-body">
        <code>{rows}</code>
      </pre>
    </figure>
  );
}
