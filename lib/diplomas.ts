export type DiplomaCategory = "oficial" | "idiomas" | "tech" | "marketing" | "personas";

export const DIPLOMA_CATEGORIES = ["todos", "oficial", "idiomas", "tech", "marketing", "personas"] as const satisfies ReadonlyArray<DiplomaCategory | "todos">;

type DiplomaFacts = {
  id: string;
  /** Two to four letters stamped on the seal when there is no badge image. */
  seal: string;
  year: string;
  category: DiplomaCategory;
  featured?: boolean;
  badge?: string;
  /** Public verification page (never a document with personal data). */
  verify?: string;
};

// Read from the diplomas in Miguel's Drive folder; hours, dates and levels as printed on each certificate.
// Titles, issuers and notes are translated in lib/dictionaries, keyed by id.
export const DIPLOMAS = [
  { id: "ub", seal: "UB", year: "2007", category: "oficial", featured: true },
  { id: "master", seal: "VIU", year: "2023", category: "oficial", featured: true },
  { id: "adgd0308", seal: "SOC", year: "2022", category: "oficial", featured: true },
  { id: "zop", seal: "GI", year: "2010", category: "idiomas", featured: true },
  { id: "abitur", seal: "DSB", year: "", category: "oficial" },
  { id: "catala", seal: "UB", year: "2007", category: "idiomas" },
  { id: "linguaskill", seal: "CE", year: "2023", category: "idiomas" },
  { id: "actic", seal: "ACTIC", year: "2017 · 2022", category: "tech" },
  { id: "ibm-ai", seal: "IBM", year: "2023", category: "tech", verify: "https://www.credly.com/go/QGdC3GH3" },
  { id: "ibm-watson", seal: "IBM", year: "2023", category: "tech", badge: "/diplomas/watson-ai-essentials.png", verify: "https://www.credly.com/go/aGyyu5HG" },
  { id: "intro-ia", seal: "IBM", year: "2023", category: "tech", verify: "https://coursera.org/verify/TPQGKS8TFS2G" },
  { id: "watson-es", seal: "IBM", year: "2023", category: "tech", verify: "https://coursera.org/verify/UGMTMN9KN4EG" },
  { id: "bigdata", seal: "BD", year: "2024", category: "tech" },
  { id: "microsoft", seal: "MS", year: "2022", category: "tech" },
  { id: "mydigiskills", seal: "MDS", year: "", category: "tech" },
  { id: "typing", seal: "PPM", year: "2022", category: "tech" },
  { id: "digital-marketing", seal: "DM", year: "2024", category: "marketing" },
  { id: "community", seal: "CM", year: "2024", category: "marketing" },
  { id: "plan-mkt", seal: "MKT", year: "2024", category: "marketing" },
  { id: "neuromarketing", seal: "NM", year: "2024", category: "marketing" },
  { id: "talento", seal: "PTD", year: "2024", category: "marketing" },
  { id: "profesorado", seal: "EDU", year: "2007 – 2018", category: "personas", featured: true },
  { id: "gestalt", seal: "CG", year: "2023", category: "personas" },
  { id: "igualdad", seal: "AI", year: "2024", category: "personas" },
  { id: "coach", seal: "G", year: "2023", category: "personas" },
] as const satisfies ReadonlyArray<DiplomaFacts>;

export type DiplomaId = (typeof DIPLOMAS)[number]["id"];
