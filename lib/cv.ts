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

export const CURRENT_ROLE = "Bootcamp Full Stack con IA · Upgrade Hub";

export const STATS = [
  { value: "2", unit: "formaciones en curso", label: "Bootcamp Full Stack con IA en Upgrade Hub y certificado de Confección y publicación de páginas web" },
  { value: "+20", unit: "años", label: "de experiencia laboral en administración, atención al público y educación" },
  { value: "4", unit: "idiomas", label: "Español y catalán nativos, alemán C2 e inglés B2" },
];

/** What I can bring. *Asterisks* mark the key words, set in the display serif. */
export const OFFER_ROTATOR = [
  "construir *webs full-stack* con IA",
  "maquetar *páginas accesibles* y responsive",
  "conectar *bases de datos* y APIs",
  "automatizar *avisos y correos*",
  "llevar la *administración y la tesorería*",
  "dominar *Microsoft Office* a nivel experto",
  "enseñar *competencias digitales* a adultos",
  "atender en *cuatro idiomas*",
];

export type Offer = { title: string; text: string; icon: string; tags: string[] };

export const OFFERS: Offer[] = [
  {
    icon: "Code",
    title: "Desarrollo web full-stack",
    text: "Me estoy formando en el Bootcamp Full Stack con IA de Upgrade Hub. Construyo aplicaciones con base de datos, autenticación y correos automáticos, y las despliego en Vercel.",
    tags: ["JavaScript", "Supabase", "IA"],
  },
  {
    icon: "Browser",
    title: "Maquetación y publicación web",
    text: "Curso el certificado de profesionalidad Confección y publicación de páginas web: HTML, CSS, diseño responsive, accesibilidad, usabilidad y puesta en producción.",
    tags: ["HTML y CSS", "Responsive", "Accesibilidad"],
  },
  {
    icon: "Robot",
    title: "Automatización con IA",
    text: "Uso la IA como herramienta de trabajo diaria para programar, resumir y automatizar tareas repetitivas de oficina: avisos, correos y flujos de datos.",
    tags: ["IA generativa", "APIs", "Automatización"],
  },
  {
    icon: "Briefcase",
    title: "Administración y finanzas",
    text: "Técnico superior en Administración y finanzas y técnico en Gestión administrativa: tesorería, registros contables, archivo, personal y operaciones comerciales.",
    tags: ["Contabilidad", "Tesorería", "Gestión de personal"],
  },
  {
    icon: "MicrosoftExcelLogo",
    title: "Ofimática experta",
    text: "Word, Excel, Outlook y PowerPoint a nivel experto; Access y Contaplus a nivel alto. Acreditado con ACTIC nivel 1 y nivel 2.",
    tags: ["Office", "Contaplus", "ACTIC"],
  },
  {
    icon: "ChalkboardTeacher",
    title: "Formación digital para adultos",
    text: "14 años de experiencia docente y un máster en TIC aplicadas a la educación. Enseño ofimática, competencias digitales, HTML y CSS e IA con paciencia y a partir de casos reales.",
    tags: ["Competencias digitales", "Ofimática", "IA"],
  },
];

export type Fit = "alta" | "media";

export type Role = { title: string; why: string; fit: Fit; note?: string };

export type RoleGroup = { area: string; icon: string; intro: string; roles: Role[] };

export const ROLE_GROUPS: RoleGroup[] = [
  {
    area: "Desarrollo web",
    icon: "Code",
    intro: "Mi objetivo principal: Bootcamp Full Stack con IA en Upgrade Hub y certificado de Confección y publicación de páginas web en el Centro Coliseum de Cornellà.",
    roles: [
      { title: "Maquetador / desarrollador front-end junior", fit: "alta", why: "HTML, CSS y JavaScript con diseño responsive y accesible: el núcleo de mis dos formaciones." },
      { title: "Desarrollador web full-stack junior", fit: "alta", why: "Proyectos publicados con base de datos, autenticación y despliegue continuo.", note: "Disponible al terminar el bootcamp." },
      { title: "Gestor de contenidos y publicación web", fit: "alta", why: "Publicar, mantener y actualizar webs es justo lo que acredita mi certificado." },
      { title: "Desarrollador de automatizaciones e IA", fit: "media", why: "Automatizo notificaciones y flujos con APIs externas y asistentes de IA." },
      { title: "Tester / QA junior", fit: "media", why: "Ojo para el detalle, orientación al usuario y base técnica para reproducir errores." },
    ],
  },
  {
    area: "Formación digital",
    icon: "ChalkboardTeacher",
    intro: "Formación para personas adultas: mi experiencia docente al servicio de las competencias digitales, la ofimática y la web.",
    roles: [
      { title: "Formador de competencias digitales para adultos", fit: "alta", why: "14 años de docencia, máster en TIC educativas y ACTIC nivel 2." },
      { title: "Formador de ofimática", fit: "alta", why: "Word, Excel, Outlook y PowerPoint a nivel experto, y experiencia explicándolos." },
      { title: "Dinamizador de espacios TIC y telecentros", fit: "alta", why: "Acompaño a personas sin experiencia digital con claridad y sin prisas." },
      { title: "Formador de HTML, CSS e IA para principiantes", fit: "media", why: "Ya he creado material didáctico propio para aprender HTML y CSS desde cero.", note: "Para impartir certificados de profesionalidad se exige acreditar el certificado correspondiente." },
      { title: "Formador en IA para equipos de oficina", fit: "media", why: "Uso la IA a diario y sé traducirla a tareas concretas de administración." },
    ],
  },
  {
    area: "Tecnología y soporte",
    icon: "Headset",
    intro: "Puestos donde la parte técnica se une a la atención a las personas, mi punto fuerte de siempre.",
    roles: [
      { title: "Soporte técnico / helpdesk N1", fit: "alta", why: "Base técnica, paciencia y experiencia real en atención telefónica y presencial." },
      { title: "Customer success en empresas de software", fit: "alta", why: "Sé explicar herramientas digitales a quien no es técnico y acompañarle." },
      { title: "Implantación y onboarding de software", fit: "media", why: "Ofimática experta, experiencia en coordinación TIC y facilidad para documentar." },
      { title: "Soporte y formación en plataformas edtech", fit: "alta", why: "Conozco por dentro cómo trabaja un centro educativo y sé formar a sus usuarios." },
    ],
  },
  {
    area: "Administración digital",
    icon: "Files",
    intro: "Técnico superior en Administración y finanzas y técnico en Gestión administrativa, con un perfil muy digital.",
    roles: [
      { title: "Administrativo con perfil digital", fit: "alta", why: "Doble FP administrativa, Office experto y capacidad para automatizar procesos." },
      { title: "Auxiliar administrativo / recepción", fit: "alta", why: "Experiencia en el Club de Polo Empordà y en recepción y atención al público." },
      { title: "Técnico de contabilidad y tesorería junior", fit: "media", why: "Registros contables, tesorería y Contaplus a nivel alto." },
      { title: "Asistente de dirección / office manager", fit: "media", why: "Organización, coordinación de equipos y ofimática experta." },
      { title: "Oposiciones de administración pública", fit: "media", why: "El título de técnico superior permite presentarse a plazas del grupo C1.", note: "Cuerpos administrativos del Estado, la Generalitat o ayuntamientos." },
    ],
  },
];

export type Job = { role: string; company: string; from: string; to: string; area: "edu" | "admin" | "tech" | "music" | "service" };

export const JOBS: Job[] = [
  { role: "Recepcionista / administrativo", company: "CTTI", from: "Nov 2025", to: "Jul 2026", area: "admin" },
  { role: "Compositor, músico y cantante", company: "Grupo musical No Flag Patriots", from: "Ene 2022", to: "Ene 2024", area: "music" },
  { role: "Teleoperador", company: "Konecta · AMB Bicing · Securitas Direct", from: "Ene 2023", to: "Sep 2023", area: "service" },
  { role: "Administrativo", company: "Club de Polo Empordà", from: "Ene 2022", to: "Oct 2022", area: "admin" },
  { role: "Especialista en métodos didácticos (Coordinador T.I.C.)", company: "Escola Joan Maragall", from: "Sep 2017", to: "Jun 2020", area: "edu" },
  { role: "Profesor de educación primaria", company: "Escoles Gornal · Bernat Metge · Torre de la Miranda · Joan Maragall", from: "Sep 2006", to: "Jun 2020", area: "edu" },
  { role: "Camarero", company: "Bar La Concha", from: "Jun 2003", to: "Sep 2005", area: "service" },
  { role: "Vendedor", company: "El Corte Inglés · Boulangerie · comercio", from: "Ene 2003", to: "Ene 2005", area: "service" },
];

export type Education = { year: string; title: string; area: string; current?: boolean; logo?: { src: string; alt: string; width: number; height: number } };

export const EDUCATION: Education[] = [
  { year: "En curso · sep 2026 – feb 2027", title: "Bootcamp Full Stack con IA", area: "Upgrade Hub · Git, SQL y MongoDB, Node.js, JavaScript, React, automatización y despliegue", current: true, logo: { src: "/logos/upgrade-hub.svg", alt: "Upgrade Hub", width: 5282, height: 1163 } },
  { year: "En curso", title: "Certificado de profesionalidad: Confección y publicación de páginas web (IFCD0110)", area: "Centro Coliseum · Cornellà de Llobregat", current: true, logo: { src: "/logos/coliseum.svg", alt: "Centro de Formación Coliseum", width: 282, height: 65 } },
  { year: "2023", title: "Máster universitario en Tecnologías de la Información y la Comunicación aplicadas a la Educación", area: "Universidad Internacional de Valencia (VIU)" },
  { year: "2022", title: "Técnico superior en Administración y finanzas", area: "Formación profesional de grado superior" },
  { year: "2022", title: "Técnico en Gestión administrativa", area: "Formación profesional de grado medio" },
  { year: "2007", title: "Estudios universitarios de Educación primaria y musical", area: "Magisterio" },
];

export const CERTIFICATES = [
  "Actividades de gestión administrativa",
  "Gestión auxiliar de personal",
  "Gestión de archivos",
  "Gestión operativa de tesorería",
  "Grabación de datos",
  "Ofimática",
  "Operaciones administrativas comerciales",
  "Registros contables",
  "Módulo de prácticas profesionales no laborales",
];

export const LICENSES = ["ACTIC nivel 1 · certificado básico", "ACTIC nivel 2 · certificado medio", "Permiso de conducir B"];

export const LANGUAGES = [
  { name: "Español", level: "Nativo", dots: 5 },
  { name: "Català", level: "Nadiu", dots: 5 },
  { name: "Deutsch", level: "C2", dots: 5 },
  { name: "English", level: "B2", dots: 4 },
];

export const SOFT_SKILLS = [
  { name: "Liderazgo", value: 85 },
  { name: "Manejo de equipo", value: 85 },
  { name: "Visión de negocio", value: 80 },
  { name: "Escucha activa", value: 80 },
];

export const SOFTWARE = [
  { name: "Microsoft Word", level: "Experto" },
  { name: "Microsoft Excel", level: "Experto" },
  { name: "Microsoft Outlook", level: "Experto" },
  { name: "Microsoft PowerPoint", level: "Experto" },
  { name: "Microsoft Office (paquete)", level: "Experto" },
  { name: "Microsoft Access", level: "Alto" },
  { name: "Contaplus", level: "Alto" },
  { name: "Adobe Photoshop", level: "Medio" },
  { name: "Canva", level: "Experto" },
];

export const TECH = [
  "HTML, CSS y JavaScript",
  "Diseño responsive, accesibilidad y usabilidad",
  "Bases de datos SQL y MongoDB",
  "Supabase · Auth, Database, Storage, Edge Functions",
  "Asistentes de IA para programar",
  "Git y GitHub",
  "Vercel · despliegue continuo",
  "APIs externas · Resend, Formspree",
];

export type Project = { name: string; kind: string; text: string; stack: string[]; demo?: string; code?: string; note?: string };

/** Featured work, picked from github.com/liebanavicente. Code links only for public repositories. */
export const PROJECTS: Project[] = [
  {
    name: "ENERPRO",
    kind: "Portal del empleado",
    text: "Portal privado para una empresa de seguridad: documentos, cuadrantes, turnos, vacaciones y solicitudes, con acceso por usuario y avisos automáticos.",
    stack: ["JavaScript", "Supabase", "Resend", "Vercel"],
    demo: "https://enerpro.vercel.app",
    code: "https://github.com/liebanavicente/enerpro",
  },
  {
    name: "BandManager",
    kind: "SaaS de gestión",
    text: "Plataforma para gestionar una banda: eventos, repertorio, setlists, tareas, archivos y merchandising, con base de datos relacional.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "shadcn/ui"],
    demo: "https://bandmanager-nine.vercel.app",
    code: "https://github.com/liebanavicente/bandmanager",
  },
  {
    name: "HTML y CSS desde cero",
    kind: "Material didáctico interactivo",
    text: "Curso web en español para aprender los fundamentos de HTML y CSS partiendo de cero, con actividades guiadas paso a paso.",
    stack: ["HTML", "CSS", "Didáctica"],
    demo: "https://materialdidacticocpweb.vercel.app",
  },
  {
    name: "Apuntes Upgrade",
    kind: "App web con IA · bootcamp",
    text: "Archivo de resúmenes del Bootcamp Full Stack con IA: importa Word, PDF o transcripciones, los resume con IA y genera tests, tarjetas de repaso y un glosario.",
    stack: ["Next.js", "AI SDK", "Vercel Blob", "TypeScript"],
    note: "Uso privado del curso",
  },
  {
    name: "Suscripscan",
    kind: "Herramienta de finanzas personales",
    text: "Controla el gasto real en suscripciones: panel mensual, anual y diario, avisos de renovación, gráficas y exportación a PDF.",
    stack: ["Next.js", "Recharts", "jsPDF"],
    demo: "https://suscripscan.vercel.app",
    code: "https://github.com/liebanavicente/suscripscan",
  },
];

export const MORE_PROJECTS = [
  { name: "La Llar del Dolç", kind: "Web de lotes y packs regalo", url: "https://lallardeldolc.vercel.app" },
  { name: "No Flag Patriots", kind: "Tienda online con pagos Stripe", url: "https://nfpclothing.vercel.app" },
  { name: "Darío Campos", kind: "Web de guitarrista y productor", url: "https://dariocampos.vercel.app" },
  { name: "Construcciones Florystan", kind: "Web corporativa", url: "https://florystan-web.vercel.app" },
  { name: "Reas0nance", kind: "Web de DJ", url: "https://danielsommm.vercel.app" },
  { name: "Apuntes del curso web", kind: "Apuntes de desarrollo web", url: "https://apuntes-web.vercel.app" },
];
