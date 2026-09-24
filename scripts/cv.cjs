// Harvard-style CV: single column, serif, no graphics, standard section names — ATS friendly.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat,
  Tab, TabStopType, ExternalHyperlink,
} = require("docx");

const FONT = "Times New Roman";
const SIZE = 21; // 10.5 pt

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: SIZE, ...opts });
// A4 width minus both margins: the right tab stop sits exactly on the right margin.
const TEXT_WIDTH = 11906 - 2 * 1000;
const RIGHT = [{ type: TabStopType.RIGHT, position: TEXT_WIDTH }];
const rightTab = () => new Tab();

function section(title) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 } },
    children: [run(title.toUpperCase(), { bold: true, size: 22 })],
  });
}

/** Organisation (bold) left, place/date right; then role (italic) left, dates right. */
function entry(left, right, sub, subRight, before = 100) {
  const out = [
    new Paragraph({
      spacing: { before, after: 0 },
      keepNext: true,
      tabStops: RIGHT,
      children: [run(left, { bold: true }), new TextRun({ children: [rightTab()] }), run(right || "")],
    }),
  ];
  if (sub) {
    out.push(new Paragraph({
      spacing: { after: 20 },
      keepNext: true,
      tabStops: RIGHT,
      children: [run(sub, { italics: true }), new TextRun({ children: [rightTab()] }), run(subRight || "", { italics: true })],
    }));
  }
  return out;
}

const bullet = (children) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 10 }, children: typeof children === "string" ? [run(children)] : children });

/** "Label: text" line used in the skills block. */
const skill = (label, text) => new Paragraph({ spacing: { after: 30 }, children: [run(`${label}: `, { bold: true }), run(text)] });

const link = (text, url) => new ExternalHyperlink({ link: url, children: [run(text)] });
const sep = () => run("  |  ");

const children = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run("MIGUEL LIÉBANA", { bold: true, size: 34 })] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 20 },
    children: [run("Desarrollador web full-stack junior  ·  Formador de competencias digitales  ·  Administrativo", { italics: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      run("+34 685 396 609"), sep(),
      link("mlieban3@gmail.com", "mailto:mlieban3@gmail.com"), sep(),
      link("linkedin.com/in/mliebanavicente", "https://www.linkedin.com/in/mliebanavicente"), sep(),
      link("github.com/liebanavicente", "https://github.com/liebanavicente"), sep(),
      link("miguelweb2026.vercel.app", "https://miguelweb2026.vercel.app"),
    ],
  }),

  section("Perfil profesional"),
  new Paragraph({
    spacing: { after: 40 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      run("Desarrollador web full-stack junior en formación (Bootcamp Full Stack con IA, Upgrade Hub) y técnico superior en Administración y Finanzas, con 14 años de experiencia docente y más de 20 años de trayectoria laboral. Construyo y despliego aplicaciones web con HTML, CSS, JavaScript, TypeScript, React, Next.js y Supabase, e integro la inteligencia artificial en el desarrollo y la automatización de tareas. Aporto comunicación clara, capacidad de enseñar y experiencia en administración y atención al cliente. Español y catalán nativos, alemán C2 e inglés B2."),
    ],
  }),

  section("Formación"),
  ...entry("Upgrade Hub", "En curso", "Bootcamp Full Stack con IA", ""),
  bullet("Desarrollo front-end y back-end, bases de datos, APIs, control de versiones con Git y despliegue, con IA aplicada al desarrollo."),
  ...entry("Centro Coliseum, Cornellà de Llobregat", "En curso", "Certificado de profesionalidad: Confección y publicación de páginas web (IFCD0110)", ""),
  bullet("HTML, CSS, diseño responsive, accesibilidad y usabilidad web, y publicación de sitios web."),
  ...entry("Máster universitario en Tecnologías de la Información y la Comunicación aplicadas a la Educación", "", null, null),
  ...entry("Técnico Superior en Administración y Finanzas", "2022", "Formación Profesional de Grado Superior", "", 60),
  ...entry("Técnico en Gestión Administrativa", "2022", "Formación Profesional de Grado Medio", "", 60),
  ...entry("Estudios universitarios de Educación Primaria y Educación Musical", "2007", null, null, 60),

  section("Experiencia profesional"),
  ...entry("CTTI", "", "Recepcionista / Administrativo", ""),
  bullet("Atención presencial y telefónica, y tareas administrativas de apoyo."),
  ...entry("Grupo musical No Flag Patriots", "", "Compositor, músico y cantante", "Ene 2022 – Ene 2024"),
  bullet("Composición e interpretación; desarrollo posterior de la tienda online de merchandising del grupo con pagos Stripe."),
  ...entry("Konecta (servicios para AMB Bicing y Securitas Direct)", "", "Teleoperador", "Ene 2023 – Sep 2023"),
  bullet("Atención telefónica a clientes, resolución de incidencias y gestión de solicitudes."),
  ...entry("Club de Polo Empordà", "", "Administrativo", "Ene 2022 – Oct 2022"),
  bullet("Gestión administrativa y documental, grabación de datos y uso avanzado de ofimática."),
  ...entry("Escola Joan Maragall", "", "Coordinador TIC (especialista en métodos didácticos y pedagógicos)", "Sep 2017 – Jun 2020"),
  bullet("Coordinación de las TIC del centro e integración de herramientas digitales en el aula."),
  bullet("Apoyo y formación al profesorado en el uso de tecnología educativa."),
  ...entry("Escoles Gornal, Bernat Metge, Torre de la Miranda y Joan Maragall", "", "Maestro de Educación Primaria", "Sep 2006 – Jun 2020"),
  bullet("Docencia a alumnado de distintas edades y niveles durante 14 años: programación, evaluación y adaptación de contenidos."),
  bullet("Coordinación con equipos docentes y comunicación continua con familias."),
  ...entry("Experiencia previa: hostelería y comercio", "", "Camarero (Bar La Concha) y vendedor (El Corte Inglés, comercio)", "2003 – 2005"),

  section("Proyectos"),
  ...entry("ENERPRO: portal del empleado", "enerpro.vercel.app", null, null, 60),
  bullet("Portal privado para empresa de seguridad: documentos, cuadrantes, turnos, vacaciones y solicitudes, con autenticación y avisos por correo. JavaScript, Supabase, Resend, Vercel."),
  ...entry("BandManager: plataforma SaaS de gestión", "bandmanager-nine.vercel.app", null, null, 60),
  bullet("Gestión de eventos, repertorio, tareas, archivos y merchandising para bandas. Next.js 16, TypeScript, Prisma, PostgreSQL, shadcn/ui."),
  ...entry("HTML y CSS desde cero: material didáctico interactivo", "materialdidacticocpweb.vercel.app", null, null, 60),
  bullet("Curso web en español con actividades guiadas para aprender HTML y CSS desde cero."),
  ...entry("Apuntes Upgrade: aplicación web con IA", "", null, null, 60),
  bullet("Resume con IA documentos y transcripciones de clase y genera tests, tarjetas de repaso y glosario. Next.js, AI SDK, TypeScript."),
  ...entry("Suscripscan y otras webs publicadas", "github.com/liebanavicente", null, null, 60),
  bullet("Control de suscripciones con gráficas y exportación a PDF (Next.js, Recharts); webs corporativas y tienda online con Stripe para clientes."),

  section("Habilidades"),
  skill("Desarrollo web", "HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, diseño responsive, accesibilidad web"),
  skill("Back-end y datos", "Supabase (Auth, Database, Storage, Edge Functions), PostgreSQL, Prisma, APIs REST, Resend, Stripe"),
  skill("Herramientas", "Git, GitHub, VS Code, Warp, Vercel, FileZilla, Figma, Framer, WordPress"),
  skill("Inteligencia artificial", "Claude, ChatGPT, Gemini; IA aplicada a la programación y a la automatización de tareas"),
  skill("Ofimática", "Microsoft Word, Excel, Outlook y PowerPoint (experto); Access y Contaplus (alto); Teams; Canva; Photoshop (medio)"),
  skill("Administración", "contabilidad, tesorería, gestión auxiliar de personal, gestión de archivos, grabación de datos, operaciones comerciales"),
  skill("Competencias", "formación de adultos, comunicación, liderazgo, trabajo en equipo, escucha activa, resolución de problemas"),
  skill("Idiomas", "español y catalán (nativos), alemán (C2), inglés (B2)"),

  section("Certificaciones"),
  skill("Certificados de profesionalidad (módulos)", "actividades de gestión administrativa; gestión auxiliar de personal; gestión de archivos; gestión operativa de tesorería; grabación de datos; ofimática; operaciones administrativas comerciales; registros contables"),
  skill("Otras", "ACTIC nivel 1 y nivel 2 (competencias digitales, Generalitat de Catalunya); permiso de conducir B"),
];

const doc = new Document({
  creator: "Miguel Liébana",
  title: "CV Miguel Liébana",
  description: "Currículum de Miguel Liébana: desarrollo web full-stack, formación digital y administración",
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } } } }],
    }],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 850, bottom: 850, left: 1000, right: 1000 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => fs.writeFileSync("CV-Miguel-Liebana.docx", buf));
