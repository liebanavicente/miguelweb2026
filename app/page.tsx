import type { Icon } from "@phosphor-icons/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Browser,
  ChalkboardTeacher,
  Code,
  Coffee,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkSimple,
  LinkedinLogo,
  MicrosoftExcelLogo,
  Phone,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { ReactNode } from "react";

import { CodeCard } from "../components/CodeCard";
import { Collapsible } from "../components/Collapsible";
import { DiplomaWall } from "../components/DiplomaWall";
import { EducationExplorer } from "../components/EducationExplorer";
import { Header } from "../components/Header";
import { OfferRotator } from "../components/OfferRotator";
import { RoleExplorer } from "../components/RoleExplorer";
import { MarginNote, Scribble } from "../components/Scribble";
import { TechMarquee } from "../components/TechMarquee";
import {
  CONTACT,
  JOBS,
  LANGUAGES,
  MORE_PROJECTS,
  OFFERS,
  PROJECTS,
  SOFTWARE,
  SOFT_SKILLS,
  STATS,
  TECH,
} from "../lib/cv";

const OFFER_ICONS: Record<string, Icon> = { Code, Browser, Robot, Briefcase, MicrosoftExcelLogo, ChalkboardTeacher };

const AREA_LABEL = { edu: "educación", admin: "administración", tech: "tecnología", music: "música", service: "atención al público" } as const;

const GALLERY = [
  { src: "/fotos/escenario.jpg", alt: "Miguel hablando ante un auditorio", word: "comunicar" },
  { src: "/fotos/oficina.jpg", alt: "Miguel de pie en una oficina diáfana", word: "coordinar" },
  { src: "/fotos/retrato-bn.jpg", alt: "Retrato de Miguel en blanco y negro", word: "escuchar" },
];

/** Chapter heading: mono index, the title with one scribbled word, and an optional intro. */
function Chapter({ id, index, label, title, accent, intro, aside }: { id: string; index: string; label: string; title: string; accent?: string; intro?: string; aside?: ReactNode }) {
  return (
    <div className="chapter">
      <p className="kicker">
        <span>{index}</span> {label}
      </p>
      <h2 className="section-title" id={`${id}-titulo`}>
        {title} {accent ? <Scribble>{accent}</Scribble> : null}
      </h2>
      {intro ? <p className="lede">{intro}</p> : null}
      {aside}
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
          <header className="hero">
            <div className="hero-copy">
              <p className="kicker">
                <span>00</span> desarrollo web · ia · formación digital · administración
              </p>
              <h1 className="hero-title">
                <span className="rise" style={{ animationDelay: "60ms" }}>
                  Construyo webs
                </span>{" "}
                <span className="rise" style={{ animationDelay: "160ms" }}>
                  y ordeno procesos
                </span>{" "}
                <span className="rise" style={{ animationDelay: "260ms" }}>
                  <Scribble onLoad>con IA.</Scribble>
                </span>
              </h1>
              <p className="lede">
                Soy Miguel Liébana. Me estoy formando como <strong>desarrollador full-stack con IA en Upgrade Hub</strong> y en{" "}
                <strong>Confección y publicación de páginas web</strong> en el Centro Coliseum de Cornellà. Además soy maestro titulado por la
                Universitat de Barcelona, tengo el certificado de profesionalidad de gestión administrativa y llevo 14 años enseñando, experiencia que hoy aplico a la formación digital de adultos.
              </p>
              <div className="actions">
                <a className="btn btn-ink" href="#puestos">
                  Puestos que encajan <ArrowDown aria-hidden className="btn-arrow" size={16} weight="bold" />
                </a>
                <a className="btn" href={`mailto:${CONTACT.email}`}>
                  <EnvelopeSimple aria-hidden size={16} weight="bold" /> Escríbeme
                </a>
                <a className="btn" download href={CONTACT.cv}>
                  <DownloadSimple aria-hidden size={16} weight="bold" /> CV en PDF
                </a>
              </div>
              <div className="hero-meta">
                <div className="school-row">
                  <span>me formo en</span>
                  <a href="https://www.upgrade-hub.com" rel="noreferrer" target="_blank">
                    <Image alt="Upgrade Hub" height={1163} src="/logos/upgrade-hub.svg" unoptimized width={5282} />
                  </a>
                  <a href="https://centrocoliseum.com" rel="noreferrer" target="_blank">
                    <Image alt="Centro de Formación Coliseum" height={65} src="/logos/coliseum.svg" unoptimized width={282} />
                  </a>
                </div>
                <div className="social-row">
                  <a className="social-link" href={CONTACT.linkedin} rel="noreferrer" target="_blank">
                    <LinkedinLogo aria-hidden size={18} weight="bold" /> LinkedIn
                  </a>
                  <a className="social-link" href={CONTACT.github} rel="noreferrer" target="_blank">
                    <GithubLogo aria-hidden size={18} weight="bold" /> GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <figure className="hero-photo">
                <Image alt="Retrato de Miguel Liébana con americana azul y los brazos cruzados" height={1600} priority sizes="(max-width: 960px) 80vw, 400px" src="/fotos/retrato.jpg" width={1600} />
              </figure>
              <CodeCard />
            </div>
          </header>

          {/* Key numbers */}
          <dl className="stats">
            {STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <dt>{stat.unit}</dt>
                <dd>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <OfferRotator />

          {/* What I offer */}
          <section aria-labelledby="ofrezco-titulo" className="section" id="ofrezco">
            <Chapter
              accent="aportar"
              id="ofrezco"
              index="01"
              intro="Lo que aprendo en mis dos formaciones de desarrollo web, sumado a lo que ya he demostrado en oficinas y en el aula."
              label="qué ofrezco"
              title="Lo que puedo"
            />
            <Collapsible id="ofrezco" summary="6 capacidades · desarrollo web, formación digital y administración">
              <ol className="offer-grid">
                {OFFERS.map((offer, index) => {
                  const OfferIcon = OFFER_ICONS[offer.icon];
                  return (
                    <li className="offer-card" key={offer.title}>
                      <div className="offer-top">
                        <span className="offer-icon">
                          <OfferIcon aria-hidden size={22} weight="regular" />
                        </span>
                        <span className="offer-num">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3>{offer.title}</h3>
                      <p>{offer.text}</p>
                      <div className="tag-row">
                        {offer.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Collapsible>
          </section>

          {/* Projects */}
          <section aria-labelledby="proyectos-titulo" className="section" id="proyectos">
            <div className="chapter-split">
              <Chapter
                accent="publicados"
                aside={<MarginNote arrow="down">todo en línea y funcionando</MarginNote>}
                id="proyectos"
                index="02"
                intro="Una selección de lo que he construido y publicado. El código público está en mi GitHub."
                label="proyectos"
                title="Proyectos"
              />
              <figure className="polaroid side-polaroid">
                <div className="polaroid-img">
                  <Image alt="Miguel programando con un portátil junto a una ventana" fill sizes="(max-width: 960px) 90vw, 340px" src="/fotos/portatil.jpg" />
                </div>
                <figcaption>programando</figcaption>
              </figure>
            </div>
            <Collapsible id="proyectos" summary="5 proyectos destacados · 6 webs más publicadas">
              <ol className="project-grid">
                {PROJECTS.map((project, index) => (
                  <li className="project-card" key={project.name}>
                    <p className="project-kind">
                      <span>#{String(index + 1).padStart(2, "0")}</span> {project.kind}
                    </p>
                    <h3>{project.name}</h3>
                    <p className="project-text">{project.text}</p>
                    <div className="tag-row">
                      {project.stack.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.demo ? (
                        <a className="text-link" href={project.demo} rel="noreferrer" target="_blank">
                          Ver web <ArrowUpRight aria-hidden size={15} weight="bold" />
                        </a>
                      ) : null}
                      {project.code ? (
                        <a className="text-link" href={project.code} rel="noreferrer" target="_blank">
                          <GithubLogo aria-hidden size={15} weight="bold" /> Código
                        </a>
                      ) : null}
                      {project.note ? <span className="project-note">{project.note}</span> : null}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="more-projects">
                <p className="kicker small">
                  <span>+</span> más webs publicadas
                </p>
                <ul>
                  {MORE_PROJECTS.map((item) => (
                    <li key={item.url}>
                      <a href={item.url} rel="noreferrer" target="_blank">
                        <strong>{item.name}</strong>
                        <span>{item.kind}</span>
                        <ArrowUpRight aria-hidden className="row-arrow" size={15} weight="bold" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapsible>
          </section>

          <TechMarquee />

          {/* Photos pinned to the notebook */}
          <div aria-label="Fotografías" className="photo-band" role="group">
            {GALLERY.map((photo) => (
              <figure className="polaroid" key={photo.src}>
                <div className="polaroid-img">
                  <Image alt={photo.alt} fill sizes="(max-width: 620px) 70vw, 30vw" src={photo.src} />
                </div>
                <figcaption>{photo.word}</figcaption>
              </figure>
            ))}
          </div>

          {/* Roles */}
          <section aria-labelledby="puestos-titulo" className="section" id="puestos">
            <Chapter
              accent="aspirar"
              aside={<MarginNote arrow="down">empieza por aquí</MarginNote>}
              id="puestos"
              index="03"
              intro="Según mis estudios actuales y mi experiencia, estos son los puestos en los que puedo rendir, empezando por el desarrollo web."
              label="puestos"
              title="A qué puedo"
            />
            <Collapsible id="puestos" summary="19 puestos en 4 áreas · con nivel de encaje">
              <RoleExplorer />
            </Collapsible>
          </section>

          {/* Education */}
          <section aria-labelledby="formacion-titulo" className="section" id="formacion">
            <Chapter accent="acreditaciones" id="formacion" index="04" label="formación" title="Estudios y" />
            <Collapsible id="formacion" summary="5 formaciones · 2 en curso · contenido desplegable">
              <EducationExplorer />
            </Collapsible>
          </section>

          {/* Diplomas */}
          <section aria-labelledby="titulos-titulo" className="section" id="titulos">
            <Chapter
              accent="títulos"
              id="titulos"
              index="05"
              intro="Todo lo que he ido acreditando por el camino: títulos oficiales, idiomas, tecnología, marketing y formación docente."
              label="archivo"
              title="Archivo de"
            />
            <Collapsible id="titulos" summary="25 títulos y certificados · +1.100 horas acreditadas">
              <DiplomaWall />
            </Collapsible>
          </section>

          {/* Experience */}
          <section aria-labelledby="trayectoria-titulo" className="section" id="trayectoria">
            <Chapter
              accent="profesional"
              id="trayectoria"
              index="06"
              intro="Administración, atención al público y educación: más de veinte años aprendiendo a organizar, comunicar y resolver."
              label="trayectoria"
              title="Experiencia"
            />
            <Collapsible id="trayectoria" summary="8 puestos · de 2003 a 2026">
              <ol className="timeline jobs">
                {JOBS.map((job) => (
                  <li key={`${job.role}-${job.from}`}>
                    {/* Desktop: the company logo drifts in large and soft from the right while the row is hovered. */}
                    {job.logos?.length || job.icon ? (
                      <span aria-hidden className="job-mark">
                        {job.logos?.map((logo) => (
                          <Image alt="" height={logo.height} key={logo.src} src={logo.src} unoptimized width={logo.width} />
                        ))}
                        {job.icon === "cafe" ? <Coffee size={120} weight="thin" /> : null}
                      </span>
                    ) : null}
                    <span className="tl-date">{job.to ? `${job.from} — ${job.to}` : job.from}</span>
                    <div className="tl-body">
                      {job.logos || job.icon ? (
                        <div className="job-logos">
                          {job.logos?.map((logo) => (
                            <Image alt={logo.alt} height={logo.height} key={logo.src} src={logo.src} unoptimized width={logo.width} />
                          ))}
                          {job.icon === "cafe" ? (
                            <span className="job-icon" title="Hostelería">
                              <Coffee aria-hidden size={20} />
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      <p className="tl-area">{AREA_LABEL[job.area]}</p>
                      <h3>{job.role}</h3>
                      <p>{job.company}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Collapsible>
          </section>

          {/* Skills */}
          <section aria-labelledby="competencias-titulo" className="section" id="competencias">
            <Chapter accent="herramientas" id="competencias" index="07" label="competencias" title="Idiomas, habilidades y" />
            <Collapsible id="competencias" summary="4 idiomas · habilidades · informática · tecnologías web">
              <div className="skills-grid">
                <section className="sheet">
                  <h3>Idiomas</h3>
                  <ul className="lang-list">
                    {LANGUAGES.map((lang) => (
                      <li key={lang.name}>
                        <span>
                          <strong>{lang.name}</strong> <em>{lang.level}</em>
                        </span>
                        <span aria-label={`${lang.dots} de 5`} className="dots" role="img">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <i className={dot <= lang.dots ? "on" : undefined} key={dot} />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="sheet-sub">Habilidades</h3>
                  {SOFT_SKILLS.map((skill) => (
                    <div className="skill" key={skill.name}>
                      <span>{skill.name}</span>
                      <div className="meter">
                        <span style={{ width: `${skill.value}%` }} />
                      </div>
                    </div>
                  ))}
                </section>
                <section className="sheet">
                  <h3>Informática</h3>
                  <ul className="soft-list">
                    {SOFTWARE.map((item) => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <span className={`level level-${item.level.toLowerCase()}`}>{item.level}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="sheet">
                  <h3>Tecnologías web</h3>
                  <ul className="check-list">
                    {TECH.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </Collapsible>
          </section>

          {/* Contact */}
          <section aria-labelledby="contacto-titulo" className="section" id="contacto">
            <div className="contact-card">
              <div className="contact-copy">
                <p className="kicker">
                  <span>08</span> contacto
                </p>
                <h2 className="section-title" id="contacto-titulo">
                  ¿Hablamos de <Scribble>tu equipo?</Scribble>
                </h2>
                <p className="lede">Busco puesto en desarrollo web, formación digital para adultos, soporte técnico o administración con perfil digital. Cuéntame qué necesitas y te respondo.</p>
                <ul className="contact-list">
                  <li>
                    <a href={`mailto:${CONTACT.email}`}>
                      <EnvelopeSimple aria-hidden size={19} />
                      {CONTACT.email}
                      <ArrowRight aria-hidden className="row-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.phoneHref}>
                      <Phone aria-hidden size={19} />
                      {CONTACT.phone}
                      <ArrowRight aria-hidden className="row-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.linkedin} rel="noreferrer" target="_blank">
                      <LinkedinLogo aria-hidden size={19} />
                      linkedin.com/in/mliebanavicente
                      <ArrowUpRight aria-hidden className="row-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.github} rel="noreferrer" target="_blank">
                      <GithubLogo aria-hidden size={19} />
                      github.com/liebanavicente
                      <ArrowUpRight aria-hidden className="row-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.linktree} rel="noreferrer" target="_blank">
                      <LinkSimple aria-hidden size={19} />
                      linktr.ee/liebanavicente
                      <ArrowUpRight aria-hidden className="row-arrow" size={16} weight="bold" />
                    </a>
                  </li>
                </ul>
                <div className="actions">
                  <a className="btn btn-ink" href={`mailto:${CONTACT.email}`}>
                    Escríbeme un correo <ArrowRight aria-hidden className="btn-arrow" size={16} weight="bold" />
                  </a>
                  <a className="btn" download href={CONTACT.cv}>
                    <DownloadSimple aria-hidden size={16} weight="bold" /> CV en PDF
                  </a>
                </div>
              </div>
              <figure className="polaroid contact-polaroid">
                <div className="polaroid-img">
                  <Image alt="Miguel apoyado en una barandilla con rascacielos al atardecer" fill sizes="(max-width: 960px) 90vw, 380px" src="/fotos/ciudad.jpg" />
                </div>
                <figcaption>nos vemos pronto</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Miguel Liébana · hecho a mano, con código e IA</span>
          <span className="footer-links">
            <a href={CONTACT.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href={CONTACT.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a href="https://github.com/liebanavicente/miguelweb2026" rel="noreferrer" target="_blank">
              Código de esta web
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
