"use client";

import type { Icon } from "@phosphor-icons/react";
import { ArrowUpRight, ChalkboardTeacher, Code, Files, Headset } from "@phosphor-icons/react";
import { useState } from "react";

import { ROLE_AREAS, type RoleAreaId } from "../lib/cv";
import type { Dictionary } from "../lib/dictionaries";

const ICONS: Record<string, Icon> = { Code, ChalkboardTeacher, Headset, Files };

/** Roles I can apply for, grouped by area, with tabs to focus on one area. */
export function RoleExplorer({ t }: { t: Dictionary["roles"] }) {
  const [area, setArea] = useState<RoleAreaId | "todas">("todas");
  const groups = area === "todas" ? ROLE_AREAS : ROLE_AREAS.filter((group) => group.id === area);
  const total = ROLE_AREAS.reduce((sum, group) => sum + t.areas[group.id].roles.length, 0);

  return (
    <div className="roles">
      <div className="tabs" role="tablist" aria-label={t.tabsLabel}>
        <button aria-selected={area === "todas"} onClick={() => setArea("todas")} role="tab" type="button">
          {t.all} <span className="tab-count">{total}</span>
        </button>
        {ROLE_AREAS.map((group) => {
          const GroupIcon = ICONS[group.icon];
          const text = t.areas[group.id];
          return (
            <button aria-selected={area === group.id} key={group.id} onClick={() => setArea(group.id)} role="tab" type="button">
              <GroupIcon aria-hidden size={18} weight="bold" />
              {text.name} <span className="tab-count">{text.roles.length}</span>
            </button>
          );
        })}
      </div>

      <div className="role-groups" key={area}>
        {groups.map((group) => {
          const GroupIcon = ICONS[group.icon];
          const text = t.areas[group.id];
          return (
            <section className="role-group" key={group.id}>
              <header className="role-group-head">
                <span className="step-mark">
                  <GroupIcon aria-hidden size={18} weight="bold" />
                </span>
                <div>
                  <h3>{text.name}</h3>
                  <p>{text.intro}</p>
                </div>
              </header>
              <ul className="role-list">
                {text.roles.map((role, index) => (
                  <li className="role-card" key={role.title} style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="role-card-top">
                      <span className={`fit fit-${role.fit}`}>{t.fit[role.fit]}</span>
                      <ArrowUpRight aria-hidden className="role-arrow" size={18} weight="bold" />
                    </div>
                    <h4>{role.title}</h4>
                    <p>{role.why}</p>
                    {role.note ? <p className="role-note">{role.note}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
