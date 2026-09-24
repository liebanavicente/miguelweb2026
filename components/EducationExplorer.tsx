"use client";

import { CaretRight, IdentificationCard } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { EDUCATION, type EducationDetail, LICENSES } from "../lib/cv";

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
export function EducationExplorer() {
  const [selected, setSelected] = useState(EDUCATION[0].id);
  const current = EDUCATION.find((item) => item.id === selected) ?? EDUCATION[0];

  return (
    <div className="edu-layout">
      <ol className="timeline edu-timeline">
        {EDUCATION.map((item) => {
          const open = item.id === selected;
          return (
            <li className={`${item.current ? "is-current" : ""}${open ? " is-open" : ""}`} key={item.id}>
              <span className="tl-date">{item.year}</span>
              <div className="tl-body">
                <button aria-controls={`edu-${item.id}`} aria-expanded={open} className="edu-toggle" onClick={() => setSelected(item.id)} type="button">
                  {item.logo ? <Image alt={item.logo.alt} className="edu-logo" height={item.logo.height} src={item.logo.src} unoptimized width={item.logo.width} /> : null}
                  <span className="edu-title">{item.title}</span>
                  <span className="edu-area">{item.area}</span>
                  <span className="edu-more">
                    {open ? "viendo contenido" : "ver contenido"} <CaretRight aria-hidden size={13} weight="bold" />
                  </span>
                </button>
                {/* Phones: the contents open in place, under the entry. */}
                {open ? (
                  <div className="edu-inline sheet">
                    <Detail detail={item.detail} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="edu-side">
        <section aria-live="polite" className="sheet edu-panel">
          <Detail detail={current.detail} id={`edu-${current.id}`} key={current.id} />
        </section>
        <section className="sheet">
          <h3>
            <IdentificationCard aria-hidden size={18} /> Carnets profesionales
          </h3>
          <ul className="check-list">
            {LICENSES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
