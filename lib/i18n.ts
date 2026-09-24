export const LOCALES = ["es", "ca", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Each language named in itself, so a visitor finds theirs whatever the page is showing. */
export const LOCALE_NAMES: Record<Locale, string> = { es: "Español", ca: "Català", en: "English", de: "Deutsch" };

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Spanish lives at the root; the other languages under their code. */
export const localePath = (locale: Locale) => (locale === DEFAULT_LOCALE ? "/" : `/${locale}`);
