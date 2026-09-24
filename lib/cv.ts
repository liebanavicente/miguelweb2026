export const CONTACT = {
  name: "Miguel Liébana",
  phone: "+34 685 396 609",
  phoneHref: "tel:+34685396609",
  email: "mlieban3@gmail.com",
  linktree: "https://linktr.ee/liebanavicente",
  cv: "/cv-miguel-liebana.jpg",
};

export const CURRENT_ROLE = "Recepcionista / administrativo en CTTI";

export const STATS = [
  { value: "14", unit: "años", label: "en el aula como maestro de primaria y coordinador TIC" },
  { value: "+20", unit: "años", label: "de experiencia laboral en educación, oficina y atención al público" },
  { value: "4", unit: "idiomas", label: "Español y catalán nativos, alemán C2 e inglés B2" },
];

/** What I can bring. *Asterisks* mark the key words, set in the display serif. */
export const OFFER_ROTATOR = [
  "enseñar *cualquier concepto* a cualquier edad",
  "coordinar *programas y equipos*",
  "llevar la *administración y la tesorería*",
  "dominar *Microsoft Office* a nivel experto",
  "construir *webs full-stack* con IA",
  "automatizar *avisos y correos*",
  "atender en *cuatro idiomas*",
  "digitalizar *un centro educativo*",
];

export type Offer = { title: string; text: string; icon: string; tags: string[] };

export const OFFERS: Offer[] = [
  {
    icon: "ChalkboardTeacher",
    title: "Docencia y pedagogía",
    text: "Catorce años explicando conceptos a alumnado de todas las edades y niveles. Diseño actividades, gestiono el aula y adapto el ritmo a cada grupo.",
    tags: ["Primaria", "Música", "Metodologías activas"],
  },
  {
    icon: "Laptop",
    title: "Tecnología educativa",
    text: "Coordinador T.I.C. en la Escola Joan Maragall y máster en TIC aplicadas a la educación. Llevo herramientas digitales al aula y formo al claustro.",
    tags: ["Coordinación TIC", "Formación docente", "EdTech"],
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
    icon: "Code",
    title: "Desarrollo web con IA",
    text: "Construyo webs y portales con HTML, CSS, JavaScript y Supabase, con despliegue continuo en Vercel y correos automáticos mediante APIs externas.",
    tags: ["Supabase", "Vercel", "APIs"],
  },
  {
    icon: "UsersThree",
    title: "Atención y comunicación",
    text: "Recepción, teleoperación y trato con familias. Me comunico con claridad con alumnado, clientes y equipos, y escucho antes de resolver.",
    tags: ["Recepción", "Atención al cliente", "Escucha activa"],
  },
];

export type Fit = "alta" | "media";

export type Role = { title: string; why: string; fit: Fit; note?: string };

export type RoleGroup = { area: string; icon: string; intro: string; roles: Role[] };

export const ROLE_GROUPS: RoleGroup[] = [
  {
    area: "Educación",
    icon: "GraduationCap",
    intro: "Mi base: título universitario en Educación primaria y musical, máster en TIC educativas y 14 años de aula.",
    roles: [
      { title: "Maestro de educación primaria", fit: "alta", why: "Titulación y 14 años de experiencia en varias escuelas.", note: "Centros privados y concertados, o por oposición en la pública." },
      { title: "Especialista de música", fit: "alta", why: "Mención musical, pedagogía musical y experiencia como músico y compositor." },
      { title: "Coordinador TIC / TAC de centro", fit: "alta", why: "Ya lo he sido (2017–2020) y tengo un máster específico." },
      { title: "Formador de ofimática y competencias digitales", fit: "alta", why: "Docente, Office a nivel experto y ACTIC 2: sé enseñar lo que domino." },
      { title: "Diseñador instruccional / e-learning", fit: "media", why: "Pedagogía, TIC educativas y capacidad para montar contenidos web." },
      { title: "Tutor de formación online", fit: "media", why: "Experiencia docente y soltura con plataformas digitales." },
    ],
  },
  {
    area: "Administración y oficina",
    icon: "Files",
    intro: "Técnico superior en Administración y finanzas, técnico en Gestión administrativa y certificados de profesionalidad.",
    roles: [
      { title: "Administrativo / auxiliar administrativo", fit: "alta", why: "Doble FP administrativa y experiencia en el Club de Polo Empordà." },
      { title: "Recepcionista administrativo", fit: "alta", why: "Es mi puesto actual en CTTI." },
      { title: "Administrativo de centro educativo (PAS)", fit: "alta", why: "Une lo que sé de gestión con lo que sé de escuelas." },
      { title: "Técnico de contabilidad y tesorería junior", fit: "media", why: "Registros contables, tesorería y Contaplus a nivel alto." },
      { title: "Asistente de dirección / office manager", fit: "media", why: "Organización, coordinación de equipos y ofimática experta." },
      { title: "Oposiciones de administración pública", fit: "media", why: "El título de técnico superior permite presentarse a plazas del grupo C1.", note: "Cuerpos administrativos del Estado, la Generalitat o ayuntamientos." },
    ],
  },
  {
    area: "Tecnología",
    icon: "Code",
    intro: "Mi crecimiento actual: desarrollo web full-stack con IA y automatización de procesos de oficina.",
    roles: [
      { title: "Desarrollador web junior", fit: "media", why: "Proyectos publicados con Supabase, JavaScript y Vercel." },
      { title: "Especialista en EdTech", fit: "alta", why: "Pocas personas juntan aula, pedagogía y código." },
      { title: "Soporte técnico / helpdesk N1", fit: "media", why: "Atención al usuario, experiencia en CTTI y base técnica sólida." },
      { title: "Automatización e IA para oficinas", fit: "media", why: "Automatizo notificaciones y flujos con APIs externas." },
      { title: "Customer success en empresas edtech", fit: "alta", why: "Sé qué necesita un colegio y sé explicarlo." },
    ],
  },
];

export type Job = { role: string; company: string; from: string; to: string; area: "edu" | "admin" | "tech" | "music" | "service" };

export const JOBS: Job[] = [
  { role: "Recepcionista / administrativo", company: "CTTI", from: "Actualidad", to: "", area: "admin" },
  { role: "Compositor, músico y cantante", company: "Grupo musical No Flag Patriots", from: "Ene 2022", to: "Ene 2024", area: "music" },
  { role: "Teleoperador", company: "Konecta · AMB Bicing · Securitas Direct", from: "Ene 2023", to: "Sep 2023", area: "service" },
  { role: "Administrativo", company: "Club de Polo Empordà", from: "Ene 2022", to: "Oct 2022", area: "admin" },
  { role: "Especialista en métodos didácticos (Coordinador T.I.C.)", company: "Escola Joan Maragall", from: "Sep 2017", to: "Jun 2020", area: "edu" },
  { role: "Profesor de educación primaria", company: "Escoles Gornal · Bernat Metge · Torre de la Miranda · Joan Maragall", from: "Sep 2006", to: "Jun 2020", area: "edu" },
  { role: "Camarero", company: "Bar La Concha", from: "Jun 2003", to: "Sep 2005", area: "service" },
  { role: "Vendedor", company: "El Corte Inglés · Boulangerie · comercio", from: "Ene 2003", to: "Ene 2005", area: "service" },
];

export const EDUCATION = [
  { year: "Máster", title: "Máster universitario en Tecnologías de la Información y la Comunicación aplicadas a la Educación", area: "Formación y ciencias de la educación" },
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
  "Supabase · Auth, Database, Storage, Edge Functions",
  "HTML, CSS y JavaScript",
  "Git y GitHub",
  "Vercel · despliegue continuo",
  "APIs externas · Resend, Formspree",
];

export const PROJECTS = [
  {
    name: "ENERPRO",
    kind: "Portal web · seguridad privada",
    text: "Portal para una empresa de seguridad privada con autenticación de usuarios, gestión documental y notificaciones automáticas.",
    stack: ["Supabase", "JavaScript", "Resend", "Vercel"],
  },
  {
    name: "La Llar del Dolç",
    kind: "Web corporativa · regalos personalizados",
    text: "Web corporativa para un negocio de regalos personalizados, con formulario de contacto y despliegue continuo.",
    stack: ["HTML", "CSS", "Formspree", "Vercel"],
  },
  {
    name: "Este portfolio",
    kind: "Página personal",
    text: "La página que estás leyendo: mi CV convertido en web, con lo que ofrezco y los puestos que encajan conmigo.",
    stack: ["Next.js", "React", "Vercel"],
  },
];
