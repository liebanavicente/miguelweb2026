import type { Icon } from "@phosphor-icons/react";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Browser,
  Certificate,
  ChalkboardTeacher,
  Code,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  LinkSimple,
  LinkedinLogo,
  MicrosoftExcelLogo,
  Phone,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { Header } from "../components/Header";
import { HeroBalls } from "../components/HeroBalls";
import { OfferRotator } from "../components/OfferRotator";
import { RoleExplorer } from "../components/RoleExplorer";
import { TechMarquee } from "../components/TechMarquee";
import { TypedHeading } from "../components/TypedHeading";
import {
  CERTIFICATES,
  CONTACT,
  CURRENT_ROLE,
  EDUCATION,
  JOBS,
  LANGUAGES,
  LICENSES,
  MORE_PROJECTS,
  OFFERS,
  PROJECTS,
  SOFTWARE,
  SOFT_SKILLS,
  STATS,
  TECH,
} from "../lib/cv";

const OFFER_ICONS: Record<string, Icon> = { Code, Browser, Robot, Briefcase, MicrosoftExcelLogo, ChalkboardTeacher };

const AREA_LABEL = { edu: "Educación", admin: "Administración", tech: "Tecnología", music: "Música", service: "Atención al público" } as const;

const GALLERY = [
  { src: "/fotos/escenario.jpg", alt: "Miguel hablando ante un auditorio", word: "Comunicar" },
  { src: "/fotos/oficina.jpg", alt: "Miguel de pie en una oficina diáfana", word: "Coordinar" },
  { src: "/fotos/retrato-bn.jpg", alt: "Retrato de Miguel en blanco y negro", word: "Escuchar" },
];

function SectionHead({ id, eyebrow, title, accent, intro }: { id: string; eyebrow: string; title: string; accent?: string; intro?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={`${id}-titulo`}>
        {title} {accent ? <em>{accent}</em> : null}
      </h2>
      {intro ? <p className="page-intro">{intro}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="app-shell" id="inicio">
      <Header />
      <main className="main" id="contenido" tabIndex={-1}>
        <div className="container">
          {/* Hero */}
          <div className="page-head hero">
            <div className="hero-copy">
              <p className="eyebrow">Desarrollo web · IA · Formación digital · Administración</p>
              <TypedHeading accent="con IA." text="Construyo webs y ordeno procesos" />
              <p className="page-intro">
                Soy Miguel Liébana. Me estoy formando como <strong>desarrollador full-stack con IA en Upgrade Hub</strong> y en{" "}
                <strong>Confección y publicación de páginas web</strong> en el Centro Coliseum de Cornellà. Además soy técnico superior en
                Administración y finanzas y llevo 14 años enseñando, experiencia que hoy aplico a la formación digital de adultos.
              </p>
              <div className="nav hero-actions">
                <a className="button primary" href="#puestos">
                  Puestos que encajan <ArrowDown aria-hidden size={16} weight="bold" />
                </a>
                <a className="button" href={`mailto:${CONTACT.email}`}>
                  <EnvelopeSimple aria-hidden size={16} weight="bold" /> Escríbeme
                </a>
                <a className="button" download href={CONTACT.cv}>
                  <DownloadSimple aria-hidden size={16} weight="bold" /> Descargar CV
                </a>
              </div>
              <div className="school-row">
                <span>Me formo en</span>
                <a href="https://www.upgrade-hub.com" rel="noreferrer" target="_blank">
                  <Image alt="Upgrade Hub" height={1163} src="/logos/upgrade-hub.svg" unoptimized width={5282} />
                </a>
                <a href="https://centrocoliseum.com" rel="noreferrer" target="_blank">
                  <Image alt="Centro de Formación Coliseum" height={65} src="/logos/coliseum.svg" unoptimized width={282} />
                </a>
              </div>
              <div className="social-row">
                <a aria-label="LinkedIn" className="social-link" href={CONTACT.linkedin} rel="noreferrer" target="_blank">
                  <LinkedinLogo aria-hidden size={20} weight="bold" /> LinkedIn
                </a>
                <a aria-label="GitHub" className="social-link" href={CONTACT.github} rel="noreferrer" target="_blank">
                  <GithubLogo aria-hidden size={20} weight="bold" /> GitHub
                </a>
              </div>
            </div>
            <figure className="hero-photo" data-obstacle>
              <Image alt="Retrato de Miguel Liébana con americana azul y los brazos cruzados" height={1600} priority sizes="(max-width: 960px) 80vw, 420px" src="/fotos/retrato.jpg" width={1600} />
              <figcaption className="status-chip">
                <span aria-hidden className="status-dot" />
                <span>
                  <small>Ahora mismo me formo en</small>
                  {CURRENT_ROLE}
                </span>
              </figcaption>
            </figure>
            <HeroBalls />
          </div>

          {/* Key numbers */}
          <div className="grid dashboard-grid">
            {STATS.map((stat) => (
              <section className="panel" key={stat.label}>
                <p className="muted">{stat.unit}</p>
                <p className="progress-value">{stat.value}</p>
                <p>{stat.label}</p>
              </section>
            ))}
          </div>

          <div className="rotator-wrap">
            <OfferRotator />
          </div>

          {/* What I offer */}
          <section aria-labelledby="ofrezco-titulo" className="section" id="ofrezco">
            <SectionHead
              accent="aportar"
              eyebrow="Qué ofrezco"
              id="ofrezco"
              intro="Lo que aprendo en mis dos formaciones de desarrollo web, sumado a lo que ya he demostrado en oficinas y en el aula."
              title="Lo que puedo"
            />
            <ul className="offer-grid">
              {OFFERS.map((offer) => {
                const OfferIcon = OFFER_ICONS[offer.icon];
                return (
                  <li className="offer-card" key={offer.title}>
                    <span className="offer-icon">
                      <OfferIcon aria-hidden size={26} weight="bold" />
                    </span>
                    <h3>{offer.title}</h3>
                    <p>{offer.text}</p>
                    <div className="tag-row">
                      {offer.tags.map((tag) => (
                        <span className="badge" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Projects */}
          <section aria-labelledby="proyectos-titulo" className="section" id="proyectos">
            <div className="split-head">
              <SectionHead
                accent="publicados"
                eyebrow="Proyectos"
                id="proyectos"
                intro="Una selección de lo que he construido y publicado. El código público está en mi GitHub."
                title="Proyectos"
              />
              <figure className="side-photo">
                <Image alt="Miguel programando con un portátil junto a una ventana" fill sizes="(max-width: 960px) 100vw, 360px" src="/fotos/portatil.jpg" />
              </figure>
            </div>
            <ul className="project-grid">
              {PROJECTS.map((project, index) => (
                <li className="project-card" key={project.name}>
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="muted">{project.kind}</p>
                  <h3>{project.name}</h3>
                  <p>{project.text}</p>
                  <div className="project-links">
                    {project.demo ? (
                      <a className="project-link" href={project.demo} rel="noreferrer" target="_blank">
                        Ver web <ArrowUpRight aria-hidden size={16} weight="bold" />
                      </a>
                    ) : null}
                    {project.code ? (
                      <a className="project-link" href={project.code} rel="noreferrer" target="_blank">
                        <GithubLogo aria-hidden size={16} weight="bold" /> Código
                      </a>
                    ) : null}
                    {project.note ? <span className="project-note">{project.note}</span> : null}
                  </div>
                  <div className="tag-row">
                    {project.stack.map((tag) => (
                      <span className="badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="more-projects">
              <p className="muted">Más webs publicadas</p>
              <ul>
                {MORE_PROJECTS.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} rel="noreferrer" target="_blank">
                      <strong>{item.name}</strong>
                      <span>{item.kind}</span>
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <TechMarquee />

          {/* Photo band */}
          <div aria-label="Fotografías" className="photo-band" role="group">
            {GALLERY.map((photo) => (
              <figure className="photo-tile" key={photo.src}>
                <Image alt={photo.alt} fill sizes="(max-width: 620px) 70vw, 33vw" src={photo.src} />
                <figcaption>{photo.word}</figcaption>
              </figure>
            ))}
          </div>

          {/* Roles */}
          <section aria-labelledby="puestos-titulo" className="section" id="puestos">
            <SectionHead
              accent="aspirar"
              eyebrow="Puestos"
              id="puestos"
              intro="Según mis estudios actuales y mi experiencia, estos son los puestos en los que puedo rendir, empezando por el desarrollo web."
              title="A qué puedo"
            />
            <RoleExplorer />
          </section>

          {/* Education */}
          <section aria-labelledby="formacion-titulo" className="section" id="formacion">
            <SectionHead accent="acreditaciones" eyebrow="Formación" id="formacion" title="Estudios y" />
            <div className="edu-layout">
              <ol className="history-list edu-list">
                {EDUCATION.map((item) => (
                  <li key={item.title}>
                    <div className={`history-item${item.current ? " is-current" : ""}`}>
                      {item.logo ? <Image alt={item.logo.alt} className="edu-logo" height={item.logo.height} src={item.logo.src} unoptimized width={item.logo.width} /> : null}
                      <span className="history-when">{item.year}</span>
                      <span className="history-kind">{item.title}</span>
                      <span className="history-detail">{item.area}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="edu-side">
                <section className="glass-card">
                  <h3>
                    <Certificate aria-hidden size={20} weight="bold" /> Certificados de profesionalidad
                  </h3>
                  <ul className="check-list">
                    {CERTIFICATES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section className="glass-card">
                  <h3>
                    <GraduationCap aria-hidden size={20} weight="bold" /> Carnets profesionales
                  </h3>
                  <ul className="check-list">
                    {LICENSES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section aria-labelledby="trayectoria-titulo" className="section" id="trayectoria">
            <SectionHead
              accent="profesional"
              eyebrow="Trayectoria"
              id="trayectoria"
              intro="Administración, atención al público y educación: más de veinte años aprendiendo a organizar, comunicar y resolver."
              title="Experiencia"
            />
            <ol className="class-list">
              {JOBS.map((job, index) => (
                <li className={`class-card${job.from === "Actualidad" ? " is-current" : ""}`} key={`${job.role}-${job.from}`}>
                  <span className="step-mark">{String(index + 1).padStart(2, "0")}</span>
                  <div className="class-card-copy">
                    <p className="muted">{AREA_LABEL[job.area]}</p>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <div className="card-meta">
                    <span className={`badge${job.from === "Actualidad" ? " resumida" : ""}`}>{job.to ? `${job.from} – ${job.to}` : job.from}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Skills */}
          <section aria-labelledby="competencias-titulo" className="section" id="competencias">
            <SectionHead accent="herramientas" eyebrow="Competencias" id="competencias" title="Idiomas, habilidades y" />
            <div className="grid skills-grid">
              <section className="panel">
                <p className="muted">Idiomas</p>
                <ul className="lang-list">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.name}>
                      <span>
                        <strong>{lang.name}</strong> {lang.level}
                      </span>
                      <span aria-label={`${lang.dots} de 5`} className="dots" role="img">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <i className={dot <= lang.dots ? "on" : undefined} key={dot} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="panel">
                <p className="muted">Habilidades</p>
                {SOFT_SKILLS.map((skill) => (
                  <div className="skill" key={skill.name}>
                    <span>{skill.name}</span>
                    <div className="progress-bar">
                      <span style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </section>
              <section className="panel">
                <p className="muted">Informática</p>
                <ul className="soft-list">
                  {SOFTWARE.map((item) => (
                    <li key={item.name}>
                      <span>{item.name}</span>
                      <span className={`badge level-${item.level.toLowerCase()}`}>{item.level}</span>
                    </li>
                  ))}
                </ul>
                <p className="muted tech-label">Tecnologías web</p>
                <ul className="check-list compact">
                  {TECH.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          {/* Contact */}
          <section aria-labelledby="contacto-titulo" className="section contact" id="contacto">
            <div className="contact-card">
              <div className="contact-copy">
                <p className="eyebrow">Contacto</p>
                <h2 className="section-title" id="contacto-titulo">
                  ¿Hablamos de <em>tu equipo?</em>
                </h2>
                <p className="page-intro">Busco puesto en desarrollo web, formación digital para adultos, soporte técnico o administración con perfil digital. Cuéntame qué necesitas y te respondo.</p>
                <ul className="contact-list">
                  <li>
                    <a href={`mailto:${CONTACT.email}`}>
                      <EnvelopeSimple aria-hidden size={20} weight="bold" />
                      {CONTACT.email}
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.phoneHref}>
                      <Phone aria-hidden size={20} weight="bold" />
                      {CONTACT.phone}
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.linkedin} rel="noreferrer" target="_blank">
                      <LinkedinLogo aria-hidden size={20} weight="bold" />
                      linkedin.com/in/mliebanavicente
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.github} rel="noreferrer" target="_blank">
                      <GithubLogo aria-hidden size={20} weight="bold" />
                      github.com/liebanavicente
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.linktree} rel="noreferrer" target="_blank">
                      <LinkSimple aria-hidden size={20} weight="bold" />
                      linktr.ee/liebanavicente
                      <ArrowUpRight aria-hidden className="contact-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                </ul>
                <div className="nav hero-actions">
                  <a className="button primary" href={`mailto:${CONTACT.email}`}>
                    Escríbeme un correo
                  </a>
                  <a className="button" download href={CONTACT.cv}>
                    <DownloadSimple aria-hidden size={16} weight="bold" /> Descargar CV
                  </a>
                </div>
              </div>
              <figure className="contact-photo">
                <Image alt="Miguel apoyado en una barandilla con rascacielos al atardecer" fill sizes="(max-width: 960px) 100vw, 420px" src="/fotos/ciudad.jpg" />
              </figure>
            </div>
          </section>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Miguel Liébana</span>
          <span className="footer-links">
            <a href={CONTACT.linkedin} rel="noreferrer" target="_blank">LinkedIn</a>
            <a href={CONTACT.github} rel="noreferrer" target="_blank">GitHub</a>
            <a href="https://github.com/liebanavicente/miguelweb2026" rel="noreferrer" target="_blank">Código de esta web</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
