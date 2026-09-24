import type { Locale } from "../i18n";
import { ca } from "./ca";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary } from "./types";

export type { Dictionary } from "./types";

const DICTIONARIES: Record<Locale, Dictionary> = { es, ca, en, de };

export const getDictionary = (locale: Locale) => DICTIONARIES[locale];

/** Fills `{n}` in a dictionary string. */
export const fill = (text: string, n: number | string) => text.replace("{n}", String(n));
