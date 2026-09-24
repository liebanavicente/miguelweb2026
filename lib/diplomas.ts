export type DiplomaCategory = "oficial" | "idiomas" | "tech" | "marketing" | "personas";

export type Diploma = {
  title: string;
  issuer: string;
  /** Two to four letters stamped on the seal when there is no badge image. */
  seal: string;
  year: string;
  meta?: string;
  category: DiplomaCategory;
  featured?: boolean;
  badge?: string;
  /** Public verification page (never a document with personal data). */
  verify?: string;
};

export const DIPLOMA_CATEGORIES: Array<{ id: DiplomaCategory | "todos"; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "oficial", label: "Títulos oficiales" },
  { id: "idiomas", label: "Idiomas" },
  { id: "tech", label: "Tecnología e IA" },
  { id: "marketing", label: "Marketing digital" },
  { id: "personas", label: "Docencia y personas" },
];

// Read from the diplomas in Miguel's Drive folder; hours, dates and levels as printed on each certificate.
export const DIPLOMAS: Diploma[] = [
  { title: "Maestro, especialidad de Educación Musical", issuer: "Universitat de Barcelona", seal: "UB", year: "2007", meta: "Nivel de Grado · MECES 2 · EQF 6", category: "oficial", featured: true },
  { title: "Máster universitario en TIC aplicadas a la Educación", issuer: "Universidad Internacional de Valencia", seal: "VIU", year: "2023", meta: "Máster universitario", category: "oficial", featured: true },
  { title: "Certificado de profesionalidad ADGD0308 · Actividades de gestión administrativa", issuer: "Servei Públic d'Ocupació de Catalunya", seal: "SOC", year: "2022", meta: "Nivel 2 · familia Administración y Gestión", category: "oficial", featured: true },
  { title: "Zentrale Oberstufenprüfung (ZOP)", issuer: "Goethe-Institut Barcelona", seal: "GI", year: "2010", meta: "Alemán C2", category: "idiomas", featured: true },
  { title: "Abitur · bachillerato alemán", issuer: "Colegio Alemán de Barcelona", seal: "DSB", year: "", meta: "Bachillerato oficial alemán", category: "oficial" },
  { title: "Certificat de Capacitació en Llengua Catalana", issuer: "Universitat de Barcelona", seal: "UB", year: "2007", meta: "Catalán nivel C", category: "idiomas" },
  { title: "Linguaskill General", issuer: "Cambridge English", seal: "CE", year: "2023", meta: "Lectura C1+ · comprensión oral B2", category: "idiomas" },
  { title: "ACTIC nivel 2 (medio) y nivel 1 (básico)", issuer: "Generalitat de Catalunya", seal: "ACTIC", year: "2017 · 2022", meta: "Competencias TIC acreditadas", category: "tech" },
  { title: "Artificial Intelligence Essentials", issuer: "IBM · Coursera", seal: "IBM", year: "2023", meta: "Insignia digital", category: "tech", verify: "https://www.credly.com/go/QGdC3GH3" },
  { title: "Watson AI Essentials", issuer: "IBM · Coursera", seal: "IBM", year: "2023", meta: "Insignia digital", category: "tech", badge: "/diplomas/watson-ai-essentials.png", verify: "https://www.credly.com/go/aGyyu5HG" },
  { title: "Introducción a la Inteligencia Artificial", issuer: "IBM Skills Network · Coursera", seal: "IBM", year: "2023", category: "tech", verify: "https://coursera.org/verify/TPQGKS8TFS2G" },
  { title: "Iniciación a la IA con IBM Watson", issuer: "IBM Skills Network · Coursera", seal: "IBM", year: "2023", category: "tech", verify: "https://coursera.org/verify/UGMTMN9KN4EG" },
  { title: "Big Data", issuer: "Iniciativa y Conocimiento para la Formación", seal: "BD", year: "2024", meta: "60 horas", category: "tech" },
  { title: "MIE Trainer Academy y Microsoft Educator Academy", issuer: "Microsoft Learn", seal: "MS", year: "2022", meta: "13 h 27 min", category: "tech" },
  { title: "Evaluación de competencias digitales", issuer: "MyDigiSkills", seal: "MDS", year: "", meta: "Nivel avanzado en las 5 áreas", category: "tech" },
  { title: "Mecanografía: 418 pulsaciones por minuto", issuer: "Cursomeca", seal: "PPM", year: "2022", category: "tech" },
  { title: "Digital Marketing & Automation Marketing", issuer: "Iniciativa y Conocimiento para la Formación", seal: "DM", year: "2024", meta: "60 horas", category: "marketing" },
  { title: "Community Manager", issuer: "Iniciativa y Conocimiento para la Formación", seal: "CM", year: "2024", meta: "50 horas", category: "marketing" },
  { title: "Cómo elaborar un plan de marketing digital", issuer: "Iniciativa y Conocimiento para la Formación", seal: "MKT", year: "2024", meta: "50 horas", category: "marketing" },
  { title: "Neuromarketing", issuer: "Iniciativa y Conocimiento para la Formación", seal: "NM", year: "2024", meta: "35 horas", category: "marketing" },
  { title: "E-commerce y redes sociales · Personal branding · SEO", issuer: "Por Talento Digital", seal: "PTD", year: "2024", meta: "3 insignias de aprovechamiento", category: "marketing" },
  { title: "Formación permanente del profesorado", issuer: "Departament d'Educació", seal: "EDU", year: "2007 – 2018", meta: "31 actividades · 696 horas", category: "personas", featured: true },
  { title: "Certificación en Counseling y Terapia Gestalt", issuer: "Formación online", seal: "CG", year: "2023", meta: "140 horas", category: "personas" },
  { title: "Agente de Igualdad", issuer: "Iniciativa y Conocimiento para la Formación", seal: "AI", year: "2024", meta: "50 horas", category: "personas" },
  { title: "Coach Skills Assessment", issuer: "Google for Education", seal: "G", year: "2023", meta: "Aprobado con un 81 %", category: "personas" },
];
