import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "@fontsource-variable/archivo";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "../globals.css";

import { CONTACT } from "../../lib/cv";
import { getDictionary } from "../../lib/dictionaries";
import { isLocale, localePath, LOCALES } from "../../lib/i18n";
import { INTRO_SCRIPT } from "../../lib/intro";
import { MOTION_SCRIPT } from "../../lib/motion";
import { THEME_SCRIPT } from "../../lib/theme";

// Only the four languages exist; any other first segment is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  const socialImage = `/${lang}/opengraph-image`;
  return {
    metadataBase: new URL("https://www.miguelliebana.com"),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: localePath(lang),
      languages: { ...Object.fromEntries(LOCALES.map((code) => [code, localePath(code)])), "x-default": "/" },
    },
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      images: [{ alt: t.title, height: 630, url: socialImage, width: 1200 }],
      locale: t.ogLocale,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.ogDescription,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).meta;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.miguelliebana.com/#person",
        name: CONTACT.name,
        jobTitle: "Full-Stack Web Developer & Educator",
        url: "https://www.miguelliebana.com",
        image: "https://www.miguelliebana.com/fotos/fw7.jpg",
        sameAs: [CONTACT.linkedin, CONTACT.github, CONTACT.linktree],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Universitat de Barcelona" },
          { "@type": "EducationalOrganization", name: "Upgrade Hub" },
          { "@type": "EducationalOrganization", name: "Centro de Formación Coliseum" },
          { "@type": "CollegeOrUniversity", name: "Universidad Internacional de Valencia" },
        ],
        knowsLanguage: ["es", "ca", "de", "en"],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Supabase",
          "PostgreSQL",
          "HTML5",
          "CSS3",
          "Artificial Intelligence",
          "Prompt Engineering",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `https://www.miguelliebana.com${localePath(lang)}`,
        url: `https://www.miguelliebana.com${localePath(lang)}`,
        name: t.title,
        description: t.description,
        inLanguage: lang,
        mainEntity: { "@id": "https://www.miguelliebana.com/#person" },
      },
    ],
  };

  return (
    // data-theme is set by the head script before React hydrates, so it differs from the server HTML on purpose.
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body>
        {/* Aurora: soft colour fields under the notebook grid, so the glass surfaces have something to frost. */}
        <div aria-hidden className="aurora">
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* Hairline reading progress, driven by scroll in CSS alone. */}
        <div aria-hidden className="reading-progress" />
        {children}
      </body>
    </html>
  );
}
