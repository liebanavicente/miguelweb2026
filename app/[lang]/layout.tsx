import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "@fontsource-variable/archivo";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "../globals.css";

import { getDictionary } from "../../lib/dictionaries";
import { isLocale, localePath, LOCALES } from "../../lib/i18n";
import { THEME_SCRIPT } from "../../lib/theme";

// Only the four languages exist; any other first segment is a 404.
export const dynamicParams = false;

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL("https://miguelweb2026.vercel.app"),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: localePath(lang),
      languages: { ...Object.fromEntries(LOCALES.map((code) => [code, localePath(code)])), "x-default": "/" },
    },
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      images: ["/fotos/retrato.jpg"],
      locale: t.ogLocale,
      type: "profile",
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
  return (
    // data-theme is set by the head script before React hydrates, so it differs from the server HTML on purpose.
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
