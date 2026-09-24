import type { Metadata, Viewport } from "next";

import "@fontsource-variable/archivo";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://miguelweb2026.vercel.app"),
  title: "Miguel Liébana · Desarrollo web, IA y administración",
  description:
    "Portfolio de Miguel Liébana: desarrollador web full-stack con IA en formación (Upgrade Hub), técnico superior en Administración y finanzas. Qué ofrece y a qué puestos puede aspirar.",
  openGraph: {
    title: "Miguel Liébana · Desarrollo web, IA y administración",
    description: "Construyo webs y ordeno procesos con IA. Portfolio y CV.",
    images: ["/fotos/retrato.jpg"],
    locale: "es_ES",
    type: "profile",
  },
};

export const viewport: Viewport = { themeColor: "#f7f8fa" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {/* Hairline reading progress, driven by scroll in CSS alone. */}
        <div aria-hidden className="reading-progress" />
        {children}
      </body>
    </html>
  );
}
