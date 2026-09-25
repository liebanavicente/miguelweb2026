// Facts that read the same in every language: links, logos, dates and stacks.
// The words around them live in lib/dictionaries, keyed by the ids below.

export const CONTACT = {
  name: "Miguel Liébana",
  phone: "+34 685 396 609",
  phoneHref: "tel:+34685396609",
  email: "mlieban3@gmail.com",
  linktree: "https://linktr.ee/liebanavicente",
  linkedin: "https://www.linkedin.com/in/mliebanavicente",
  github: "https://github.com/liebanavicente",
  cv: "/CV-Miguel-Liebana.pdf",
};

export const OFFER_ICONS = ["Code", "Browser", "Robot", "Briefcase", "MicrosoftExcelLogo", "ChalkboardTeacher"] as const;

export type Fit = "alta" | "media";

export const ROLE_AREAS = [
  { id: "web", icon: "Code" },
  { id: "teaching", icon: "ChalkboardTeacher" },
  { id: "support", icon: "Headset" },
  { id: "admin", icon: "Files" },
] as const;

export type RoleAreaId = (typeof ROLE_AREAS)[number]["id"];

export type Logo = { src: string; alt: string; width: number; height: number };

const GENCAT: Logo = { src: "/logos/gencat.svg", alt: "Generalitat de Catalunya", width: 124, height: 33 };

export type JobArea = "edu" | "admin" | "tech" | "music" | "service";

/** Dates are [year, month]; the month name comes from the dictionary. */
export type YearMonth = [number, number];

/** `to: null` marks a role still ongoing; `link` turns that name inside the company line into a link. */
export const JOBS = [
  { id: "nfp", from: [2010, 1], to: null, area: "music", link: { name: "No Flag Patriots", href: "https://www.noflagpatriots.com" }, logos: [{ src: "/logos/nfp.png", alt: "No Flag Patriots", width: 298, height: 300 }] },
  { id: "ctti", from: [2025, 11], to: [2026, 7], area: "admin", logos: [GENCAT] },
  { id: "konecta", from: [2023, 1], to: [2023, 9], area: "service", logos: [{ src: "/logos/ambici.svg", alt: "AMBici", width: 450, height: 50 }, { src: "/logos/securitas-direct.png", alt: "Securitas Direct", width: 380, height: 300 }] },
  { id: "polo", from: [2022, 1], to: [2022, 10], area: "admin", logos: [{ src: "/logos/polo-ampurdan.png", alt: "Club de Polo Ampurdán", width: 61, height: 66 }] },
  { id: "tic", from: [2017, 9], to: [2020, 6], area: "edu", logos: [GENCAT] },
  { id: "teacher", from: [2006, 9], to: [2020, 6], area: "edu", logos: [GENCAT] },
  { id: "bar", from: [2003, 6], to: [2005, 9], area: "service", icon: "cafe" },
  { id: "sales", from: [2003, 1], to: [2005, 1], area: "service", logos: [{ src: "/logos/el-corte-ingles.svg", alt: "El Corte Inglés", width: 1040, height: 586 }] },
] as const satisfies ReadonlyArray<{ id: string; from: YearMonth; to: YearMonth | null; area: JobArea; link?: { name: string; href: string }; logos?: Logo[]; icon?: "cafe" }>;

export type JobId = (typeof JOBS)[number]["id"];

/** `year: null` marks a course still in progress. */
export const EDUCATION = [
  { id: "bootcamp", year: null, logo: { src: "/logos/upgrade-hub.svg", alt: "Upgrade Hub", width: 5282, height: 1163 } },
  { id: "ifcd0110", year: null, logo: { src: "/logos/coliseum.svg", alt: "Centro de Formación Coliseum", width: 282, height: 65 } },
  { id: "master", year: "2023", logo: { src: "/logos/viu.svg", alt: "Universidad Internacional de Valencia", width: 1508, height: 208 } },
  { id: "cp-admin", year: "2022", logo: { src: "/logos/thecorner.png", alt: "The Corner, centre d'estudis", width: 380, height: 366 } },
  { id: "ub", year: "2007", logo: { src: "/logos/ub.png", alt: "Universitat de Barcelona", width: 984, height: 250 } },
] as const satisfies ReadonlyArray<{ id: string; year: string | null; logo: Logo }>;

export type EducationId = (typeof EDUCATION)[number]["id"];

/** Endonyms on purpose: each language is named in itself. */
export const LANGUAGES = [
  { name: "Español", level: "Nativo", dots: 5 },
  { name: "Català", level: "Nadiu", dots: 5 },
  { name: "Deutsch", level: "C2", dots: 5 },
  { name: "English", level: "B2", dots: 4 },
];

export type SoftwareLevel = "experto" | "alto" | "medio";

export const SOFTWARE: Array<{ name: string; level: SoftwareLevel }> = [
  { name: "Microsoft Word", level: "experto" },
  { name: "Microsoft Excel", level: "experto" },
  { name: "Microsoft Outlook", level: "experto" },
  { name: "Microsoft PowerPoint", level: "experto" },
  { name: "Microsoft Office", level: "experto" },
  { name: "Microsoft Access", level: "alto" },
  { name: "Contaplus", level: "alto" },
  { name: "Adobe Photoshop", level: "medio" },
  { name: "Canva", level: "experto" },
];

/** Featured work, picked from github.com/liebanavicente. Code links only for public repositories. */
export const PROJECTS = [
  { id: "enerpro", name: "ENERPRO", stack: ["JavaScript", "Supabase", "Resend", "Vercel"], demo: "https://enerpro.vercel.app", code: "https://github.com/liebanavicente/enerpro" },
  { id: "bandmanager", name: "BandManager", stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "shadcn/ui"], demo: "https://bandmanager-nine.vercel.app", code: "https://github.com/liebanavicente/bandmanager" },
  { id: "htmlcss", stack: ["HTML", "CSS"], demo: "https://materialdidacticocpweb.vercel.app" },
  { id: "apuntes", name: "Apuntes Upgrade", stack: ["Next.js", "AI SDK", "Vercel Blob", "TypeScript"] },
  { id: "suscripscan", name: "Suscripscan", stack: ["Next.js", "Recharts", "jsPDF"], demo: "https://suscripscan.vercel.app", code: "https://github.com/liebanavicente/suscripscan" },
] as const satisfies ReadonlyArray<{ id: string; name?: string; stack: string[]; demo?: string; code?: string }>;

export type ProjectId = (typeof PROJECTS)[number]["id"];

export const MORE_PROJECTS = [
  { id: "llar", name: "La Llar del Dolç", url: "https://lallardeldolc.vercel.app" },
  { id: "nfp", name: "No Flag Patriots", url: "https://www.noflagpatriots.com" },
  { id: "nfpshop", name: "NFP Clothing", url: "https://www.nfpclothing.com" },
  { id: "dario", name: "Darío Campos", url: "https://dariocampos.vercel.app" },
  { id: "florystan", name: "Construcciones Florystan", url: "https://florystan-web.vercel.app" },
  { id: "reas0nance", name: "Reas0nance", url: "https://danielsommm.vercel.app" },
  { id: "apuntesweb", url: "https://apuntes-web.vercel.app" },
] as const satisfies ReadonlyArray<{ id: string; name?: string; url: string }>;

export type MoreProjectId = (typeof MORE_PROJECTS)[number]["id"];
