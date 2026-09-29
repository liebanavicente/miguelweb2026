import type { MetadataRoute } from "next";

import { LOCALES, localePath } from "../lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.miguelliebana.com";

  return LOCALES.map((lang) => ({
    url: `${baseUrl}${localePath(lang)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: lang === "es" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((code) => [code, `${baseUrl}${localePath(code)}`])),
    },
  }));
}
