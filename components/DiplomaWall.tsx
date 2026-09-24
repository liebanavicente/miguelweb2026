"use client";

import { ArrowUpRight, SealCheck } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { DIPLOMA_CATEGORIES, DIPLOMAS, type DiplomaCategory } from "../lib/diplomas";

/** Wall of diplomas: glass cards with an ink stamp, filterable by category; official titles stand out. */
export function DiplomaWall() {
  const [filter, setFilter] = useState<DiplomaCategory | "todos">("todos");
  const shown = filter === "todos" ? DIPLOMAS : DIPLOMAS.filter((diploma) => diploma.category === filter);

  return (
    <div className="diplomas">
      <div className="diploma-summary">
        <p>
          <strong>{DIPLOMAS.length}</strong> títulos y certificados
        </p>
        <p>
          <strong>+1.100</strong> horas de formación acreditada
        </p>
        <p>
          <strong>C2</strong> alemán · <strong>C</strong> catalán · <strong>C1</strong> lectura en inglés
        </p>
      </div>

      <div aria-label="Categorías" className="tabs" role="tablist">
        {DIPLOMA_CATEGORIES.map((category) => {
          const count = category.id === "todos" ? DIPLOMAS.length : DIPLOMAS.filter((diploma) => diploma.category === category.id).length;
          return (
            <button aria-selected={filter === category.id} key={category.id} onClick={() => setFilter(category.id)} role="tab" type="button">
              {category.label} <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="diploma-grid" key={filter}>
        {shown.map((diploma, index) => (
          <li className={`diploma${diploma.featured ? " is-featured" : ""}`} key={diploma.title} style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}>
            <div className="diploma-top">
              {diploma.badge ? (
                <Image alt="" className="diploma-badge" height={150} src={diploma.badge} width={150} />
              ) : (
                <span aria-hidden className="diploma-seal">
                  {diploma.seal}
                </span>
              )}
              <span className="diploma-year">{diploma.year}</span>
            </div>
            <h3>{diploma.title}</h3>
            <p className="diploma-issuer">{diploma.issuer}</p>
            {diploma.meta ? <p className="diploma-meta">{diploma.meta}</p> : null}
            {diploma.verify ? (
              <a className="text-link diploma-verify" href={diploma.verify} rel="noreferrer" target="_blank">
                <SealCheck aria-hidden size={15} weight="bold" /> Verificar <ArrowUpRight aria-hidden size={13} weight="bold" />
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
