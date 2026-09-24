import type { DiplomaCategory, DiplomaId } from "../diplomas";
import type { EducationId, Fit, JobArea, JobId, MoreProjectId, ProjectId, RoleAreaId, SoftwareLevel } from "../cv";

/** Chapter heading: `title` is followed by `accent`, the word that gets the pen stroke. */
export type Chapter = { label: string; title: string; accent: string; intro?: string; summary: string };

export type EducationDetail = { heading: string; groups: { title?: string; items: string[] }[]; note?: string };

/**
 * Every word on the page, in one language. `**double asterisks**` mark bold text;
 * in the offer rotator, `*single asterisks*` mark the key words set in the display serif.
 * `{n}` is replaced by a number.
 */
export type Dictionary = {
  meta: { title: string; description: string; ogDescription: string; ogLocale: string };
  header: {
    skip: string;
    tagline: string;
    sectionsLabel: string;
    menu: string;
    write: string;
    languageLabel: string;
    nav: { ofrezco: string; proyectos: string; puestos: string; formacion: string; titulos: string; trayectoria: string; contacto: string };
  };
  fold: { open: string; close: string };
  hero: {
    kicker: string;
    /** Three lines; the last one gets the pen stroke. */
    title: [string, string, string];
    lede: string;
    ctaRoles: string;
    ctaWrite: string;
    ctaCv: string;
    trainingAt: string;
    portraitAlt: string;
  };
  codeCard: {
    label: string;
    keys: { name: string; role: string; training: string; also: string; languages: string; available: string };
    role: string;
    also: [string, string];
  };
  stats: Array<{ value: string; unit: string; label: string }>;
  rotator: { path: string; comment: string; groupLabel: string; items: string[] };
  offers: { chapter: Chapter; items: Array<{ title: string; text: string; tags: string[] }> };
  projects: {
    chapter: Chapter;
    marginNote: string;
    photoAlt: string;
    photoCaption: string;
    viewSite: string;
    code: string;
    more: string;
    items: Record<ProjectId, { name?: string; kind: string; text: string; tags?: string[]; note?: string }>;
    moreItems: Record<MoreProjectId, { name?: string; kind: string }>;
  };
  marquee: { label: string; title: string };
  gallery: { label: string; photos: [{ alt: string; word: string }, { alt: string; word: string }, { alt: string; word: string }] };
  roles: {
    chapter: Chapter;
    marginNote: string;
    tabsLabel: string;
    all: string;
    fit: Record<Fit, string>;
    areas: Record<RoleAreaId, { name: string; intro: string; roles: Array<{ title: string; why: string; fit: Fit; note?: string }> }>;
  };
  education: {
    chapter: Chapter;
    inProgress: string;
    view: string;
    viewing: string;
    licensesTitle: string;
    licenses: string[];
    items: Record<EducationId, { title: string; area: string; detail: EducationDetail }>;
  };
  diplomas: {
    chapter: Chapter;
    count: string;
    hours: string;
    languages: string;
    categoriesLabel: string;
    categories: Record<DiplomaCategory | "todos", string>;
    verify: string;
    items: Record<DiplomaId, { title: string; issuer: string; meta?: string }>;
  };
  jobs: {
    chapter: Chapter;
    months: [string, string, string, string, string, string, string, string, string, string, string, string];
    areas: Record<JobArea, string>;
    hospitality: string;
    items: Record<JobId, { role: string; company: string }>;
  };
  skills: {
    chapter: Chapter;
    languages: string;
    dots: string;
    softSkillsTitle: string;
    softSkills: Array<{ name: string; value: number }>;
    software: string;
    officeSuite: string;
    levels: Record<SoftwareLevel, string>;
    tech: string;
    techItems: string[];
  };
  contact: {
    kicker: string;
    title: string;
    accent: string;
    lede: string;
    cta: string;
    photoAlt: string;
    photoCaption: string;
  };
  footer: { made: string; source: string };
};
