"use client";

import { CaretRight, IdentificationCard } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { EDUCATION, type EducationId } from "../lib/cv";
import type { Dictionary } from "../lib/dictionaries";
import type { EducationDetail } from "../lib/dictionaries/types";

function Detail({ detail, id }: { detail: EducationDetail; id?: string }) {
  return (
    <div className="edu-detail" id={id}>
      <h3>{detail.heading}</h3>
      {detail.groups.map((group, index) => (
        <div className="edu-group" key={group.title ?? index}>
          {group.title ? <p className="edu-group-title">{group.title}</p> : null}
          <ul className="check-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      {detail.note ? <p className="edu-note">{detail.note}</p> : null}
    </div>
  );
}

/**
 * Studies timeline where every entry opens its contents: in the glass panel on the right on wide screens,
 * or right under the entry on phones.
 */
export function EducationExplorer({ t }: { t: Dictionary["education"] }) {
  const [selected, setSelected] = useState<EducationId>(EDUCATION[0].id);

  return (
    <div className="edu-layout">
      <ol className="timeline edu-timeline">
        {EDUCATION.map((item) => {
          const open = item.id === selected;
          const text = t.items[item.id];
          return (
            <li className={`${item.year ? "" : "is-current"}${open ? " is-open" : ""}`} key={item.id}>
              <span className="tl-date">{item.year ?? t.inProgress}</span>
              <div className="tl-body">
                <button aria-controls={`edu-${item.id}`} aria-expanded={open} className="edu-toggle" onClick={() => setSelected(item.id)} type="button">
                  <Image alt={item.logo.alt} className="edu-logo" height={item.logo.height} src={item.logo.src} unoptimized width={item.logo.width} />
                  <span className="edu-title">{text.title}</span>
                  <span className="edu-area">{text.area}</span>
                  <span className="edu-more">
                    {open ? t.viewing : t.view} <CaretRight aria-hidden size={13} weight="bold" />
                  </span>
                </button>
                {/* Phones: the contents open in place, under the entry. */}
                {open ? (
                  <div className="edu-inline sheet">
                    <Detail detail={text.detail} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="edu-side">
        <section aria-live="polite" className="sheet edu-panel">
          <Detail detail={t.items[selected].detail} id={`edu-${selected}`} key={selected} />
        </section>
        <section className="sheet">
          <h3>
            <IdentificationCard aria-hidden size={18} /> {t.licensesTitle}
          </h3>
          <ul className="check-list">
            {t.licenses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
