"use client";

import type { Icon } from "@phosphor-icons/react";
import { ArrowUpRight, Code, Files, Headset } from "@phosphor-icons/react";
import { useState } from "react";

import { ROLE_GROUPS } from "../lib/cv";

const ICONS: Record<string, Icon> = { Code, Headset, Files };

const FIT_LABEL = { alta: "Encaje alto", media: "Encaje bueno" } as const;

/** Roles I can apply for, grouped by area, with tabs to focus on one area. */
export function RoleExplorer() {
  const [area, setArea] = useState<string>("todas");
  const groups = area === "todas" ? ROLE_GROUPS : ROLE_GROUPS.filter((group) => group.area === area);
  const total = ROLE_GROUPS.reduce((sum, group) => sum + group.roles.length, 0);

  return (
    <div className="roles">
      <div className="study-tabs" role="tablist" aria-label="Áreas">
        <button aria-selected={area === "todas"} onClick={() => setArea("todas")} role="tab" type="button">
          Todas <span className="tab-count">{total}</span>
        </button>
        {ROLE_GROUPS.map((group) => {
          const GroupIcon = ICONS[group.icon];
          return (
            <button aria-selected={area === group.area} key={group.area} onClick={() => setArea(group.area)} role="tab" type="button">
              <GroupIcon aria-hidden size={18} weight="bold" />
              {group.area} <span className="tab-count">{group.roles.length}</span>
            </button>
          );
        })}
      </div>

      <div className="role-groups" key={area}>
        {groups.map((group) => {
          const GroupIcon = ICONS[group.icon];
          return (
            <section className="role-group" key={group.area}>
              <header className="role-group-head">
                <span className="step-mark">
                  <GroupIcon aria-hidden size={18} weight="bold" />
                </span>
                <div>
                  <h3>{group.area}</h3>
                  <p>{group.intro}</p>
                </div>
              </header>
              <ul className="role-list">
                {group.roles.map((role, index) => (
                  <li className="role-card" key={role.title} style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="role-card-top">
                      <span className={`badge fit-${role.fit}`}>{FIT_LABEL[role.fit]}</span>
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
