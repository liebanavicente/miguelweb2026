"use client";

import { ArrowUpRight, SealCheck } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { type Dictionary, fill } from "../lib/dictionaries";
import { DIPLOMA_CATEGORIES, DIPLOMAS, type DiplomaCategory } from "../lib/diplomas";
import { Rich } from "./Rich";

/** Wall of diplomas: glass cards with an ink stamp, filterable by category; official titles stand out. */
export function DiplomaWall({ t }: { t: Dictionary["diplomas"] }) {
  const [filter, setFilter] = useState<DiplomaCategory | "todos">("todos");
  const shown = filter === "todos" ? DIPLOMAS : DIPLOMAS.filter((diploma) => diploma.category === filter);

  return (
    <div className="diplomas">
      <div className="diploma-summary">
        <p>
          <Rich text={fill(t.count, DIPLOMAS.length)} />
        </p>
        <p>
          <Rich text={t.hours} />
        </p>
        <p>
          <Rich text={t.languages} />
        </p>
      </div>

      <div aria-label={t.categoriesLabel} className="tabs" role="tablist">
        {DIPLOMA_CATEGORIES.map((category) => {
          const count = category === "todos" ? DIPLOMAS.length : DIPLOMAS.filter((diploma) => diploma.category === category).length;
          return (
            <button aria-selected={filter === category} key={category} onClick={() => setFilter(category)} role="tab" type="button">
              {t.categories[category]} <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="diploma-grid" key={filter}>
        {shown.map((diploma, index) => {
          const text = t.items[diploma.id];
          return (
            <li className={`diploma${"featured" in diploma ? " is-featured" : ""}`} key={diploma.id} style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}>
              <div className="diploma-top">
                {"badge" in diploma ? (
                  <Image alt="" className="diploma-badge" height={150} src={diploma.badge} width={150} />
                ) : (
                  <span aria-hidden className="diploma-seal">
                    {diploma.seal}
                  </span>
                )}
                <span className="diploma-year">{diploma.year}</span>
              </div>
              <h3>{text.title}</h3>
              <p className="diploma-issuer">{text.issuer}</p>
              {text.meta ? <p className="diploma-meta">{text.meta}</p> : null}
              {"verify" in diploma ? (
                <a className="text-link diploma-verify" href={diploma.verify} rel="noreferrer" target="_blank">
                  <SealCheck aria-hidden size={15} weight="bold" /> {t.verify} <ArrowUpRight aria-hidden size={13} weight="bold" />
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
