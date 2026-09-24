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
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CodeCard } from "../../components/CodeCard";
import { Collapsible } from "../../components/Collapsible";
import { DiplomaWall } from "../../components/DiplomaWall";
import { EducationExplorer } from "../../components/EducationExplorer";
import { Header } from "../../components/Header";
import { OfferRotator } from "../../components/OfferRotator";
import { Rich } from "../../components/Rich";
import { RoleExplorer } from "../../components/RoleExplorer";
import { MarginNote, Scribble } from "../../components/Scribble";
import { TechMarquee } from "../../components/TechMarquee";
import { CONTACT, JOBS, LANGUAGES, MORE_PROJECTS, OFFER_ICONS, PROJECTS, SOFTWARE, type YearMonth } from "../../lib/cv";
import { fill, getDictionary } from "../../lib/dictionaries";
import { isLocale } from "../../lib/i18n";

const ICONS: Record<(typeof OFFER_ICONS)[number], Icon> = { Code, Browser, Robot, Briefcase, MicrosoftExcelLogo, ChalkboardTeacher };

const GALLERY = ["/fotos/escenario.jpg", "/fotos/oficina.jpg", "/fotos/retrato-bn.jpg"];

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

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const month = ([year, m]: YearMonth) => `${t.jobs.months[m - 1]} ${year}`;

  return (
    <div className="app-shell" id="inicio">
      <Header locale={lang} t={t.header} />
      <main className="main" id="contenido" tabIndex={-1}>
        <div className="container">
          {/* Hero */}
          <header className="hero">
            <div className="hero-copy">
              <p className="kicker">
                <span>00</span> {t.hero.kicker}
              </p>
              <h1 className="hero-title">
                <span className="rise" style={{ animationDelay: "60ms" }}>
                  {t.hero.title[0]}
                </span>{" "}
                <span className="rise" style={{ animationDelay: "160ms" }}>
                  {t.hero.title[1]}
                </span>{" "}
                <span className="rise" style={{ animationDelay: "260ms" }}>
                  <Scribble onLoad>{t.hero.title[2]}</Scribble>
                </span>
              </h1>
              <p className="lede">
                <Rich text={t.hero.lede} />
              </p>
              <div className="actions">
                <a className="btn btn-ink" href="#puestos">
                  {t.hero.ctaRoles} <ArrowDown aria-hidden className="btn-arrow" size={16} weight="bold" />
                </a>
                <a className="btn" href={`mailto:${CONTACT.email}`}>
                  <EnvelopeSimple aria-hidden size={16} weight="bold" /> {t.hero.ctaWrite}
                </a>
                <a className="btn" download href={CONTACT.cv}>
                  <DownloadSimple aria-hidden size={16} weight="bold" /> {t.hero.ctaCv}
                </a>
              </div>
              <div className="hero-meta">
                <div className="school-row">
                  <span>{t.hero.trainingAt}</span>
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
                <Image alt={t.hero.portraitAlt} height={1600} priority sizes="(max-width: 960px) 80vw, 400px" src="/fotos/retrato.jpg" width={1600} />
              </figure>
              <CodeCard t={t.codeCard} />
            </div>
          </header>

          {/* Key numbers */}
          <dl className="stats">
            {t.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <dt>{stat.unit}</dt>
                <dd>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <OfferRotator t={t.rotator} />

          {/* What I offer */}
          <section aria-labelledby="ofrezco-titulo" className="section" id="ofrezco">
            <Chapter {...t.offers.chapter} id="ofrezco" index="01" />
            <Collapsible id="ofrezco" labels={t.fold} summary={t.offers.chapter.summary}>
              <ol className="offer-grid">
                {t.offers.items.map((offer, index) => {
                  const OfferIcon = ICONS[OFFER_ICONS[index]];
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
              <Chapter {...t.projects.chapter} aside={<MarginNote arrow="down">{t.projects.marginNote}</MarginNote>} id="proyectos" index="02" />
              <figure className="polaroid side-polaroid">
                <div className="polaroid-img">
                  <Image alt={t.projects.photoAlt} fill sizes="(max-width: 960px) 90vw, 340px" src="/fotos/portatil.jpg" />
                </div>
                <figcaption>{t.projects.photoCaption}</figcaption>
              </figure>
            </div>
            <Collapsible id="proyectos" labels={t.fold} summary={t.projects.chapter.summary}>
              <ol className="project-grid">
                {PROJECTS.map((project, index) => {
                  const text = t.projects.items[project.id];
                  return (
                  <li className="project-card" key={project.id}>
                    <p className="project-kind">
                      <span>#{String(index + 1).padStart(2, "0")}</span> {text.kind}
                    </p>
                    <h3>{"name" in project ? project.name : text.name}</h3>
                    <p className="project-text">{text.text}</p>
                    <div className="tag-row">
                      {[...project.stack, ...(text.tags ?? [])].map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {"demo" in project ? (
                        <a className="text-link" href={project.demo} rel="noreferrer" target="_blank">
                          {t.projects.viewSite} <ArrowUpRight aria-hidden size={15} weight="bold" />
                        </a>
                      ) : null}
                      {"code" in project ? (
                        <a className="text-link" href={project.code} rel="noreferrer" target="_blank">
                          <GithubLogo aria-hidden size={15} weight="bold" /> {t.projects.code}
                        </a>
                      ) : null}
                      {text.note ? <span className="project-note">{text.note}</span> : null}
                    </div>
                  </li>
                  );
                })}
              </ol>
              <div className="more-projects">
                <p className="kicker small">
                  <span>+</span> {t.projects.more}
                </p>
                <ul>
                  {MORE_PROJECTS.map((item) => (
                    <li key={item.url}>
                      <a href={item.url} rel="noreferrer" target="_blank">
                        <strong>{"name" in item ? item.name : t.projects.moreItems[item.id].name}</strong>
                        <span>{t.projects.moreItems[item.id].kind}</span>
                        <ArrowUpRight aria-hidden className="row-arrow" size={15} weight="bold" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapsible>
          </section>

          <TechMarquee t={t.marquee} />

          {/* Photos pinned to the notebook */}
          <div aria-label={t.gallery.label} className="photo-band" role="group">
            {GALLERY.map((src, index) => (
              <figure className="polaroid" key={src}>
                <div className="polaroid-img">
                  <Image alt={t.gallery.photos[index].alt} fill sizes="(max-width: 620px) 70vw, 30vw" src={src} />
                </div>
                <figcaption>{t.gallery.photos[index].word}</figcaption>
              </figure>
            ))}
          </div>

          {/* Roles */}
          <section aria-labelledby="puestos-titulo" className="section" id="puestos">
            <Chapter {...t.roles.chapter} aside={<MarginNote arrow="down">{t.roles.marginNote}</MarginNote>} id="puestos" index="03" />
            <Collapsible id="puestos" labels={t.fold} summary={t.roles.chapter.summary}>
              <RoleExplorer t={t.roles} />
            </Collapsible>
          </section>

          {/* Education */}
          <section aria-labelledby="formacion-titulo" className="section" id="formacion">
            <Chapter {...t.education.chapter} id="formacion" index="04" />
            <Collapsible id="formacion" labels={t.fold} summary={t.education.chapter.summary}>
              <EducationExplorer t={t.education} />
            </Collapsible>
          </section>

          {/* Diplomas */}
          <section aria-labelledby="titulos-titulo" className="section" id="titulos">
            <Chapter {...t.diplomas.chapter} id="titulos" index="05" />
            <Collapsible id="titulos" labels={t.fold} summary={t.diplomas.chapter.summary}>
              <DiplomaWall t={t.diplomas} />
            </Collapsible>
          </section>

          {/* Experience */}
          <section aria-labelledby="trayectoria-titulo" className="section" id="trayectoria">
            <Chapter {...t.jobs.chapter} id="trayectoria" index="06" />
            <Collapsible id="trayectoria" labels={t.fold} summary={t.jobs.chapter.summary}>
              <ol className="timeline jobs">
                {JOBS.map((job) => (
                  <li key={job.id}>
                    {/* Desktop: the company logo drifts in large and soft from the right while the row is hovered. */}
                    <span aria-hidden className="job-mark">
                      {"logos" in job ? (
                        job.logos.map((logo) => <Image alt="" height={logo.height} key={logo.src} src={logo.src} unoptimized width={logo.width} />)
                      ) : (
                        <Coffee size={120} weight="thin" />
                      )}
                    </span>
                    <span className="tl-date">{`${month(job.from)} — ${month(job.to)}`}</span>
                    <div className="tl-body">
                      <div className="job-logos">
                        {"logos" in job ? (
                          job.logos.map((logo) => <Image alt={logo.alt} height={logo.height} key={logo.src} src={logo.src} unoptimized width={logo.width} />)
                        ) : (
                          <span className="job-icon" title={t.jobs.hospitality}>
                            <Coffee aria-hidden size={20} />
                          </span>
                        )}
                      </div>
                      <p className="tl-area">{t.jobs.areas[job.area]}</p>
                      <h3>{t.jobs.items[job.id].role}</h3>
                      <p>{t.jobs.items[job.id].company}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Collapsible>
          </section>

          {/* Skills */}
          <section aria-labelledby="competencias-titulo" className="section" id="competencias">
            <Chapter {...t.skills.chapter} id="competencias" index="07" />
            <Collapsible id="competencias" labels={t.fold} summary={t.skills.chapter.summary}>
              <div className="skills-grid">
                <section className="sheet">
                  <h3>{t.skills.languages}</h3>
                  <ul className="lang-list">
                    {LANGUAGES.map((lang) => (
                      <li key={lang.name}>
                        <span>
                          <strong>{lang.name}</strong> <em>{lang.level}</em>
                        </span>
                        <span aria-label={fill(t.skills.dots, lang.dots)} className="dots" role="img">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <i className={dot <= lang.dots ? "on" : undefined} key={dot} />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="sheet-sub">{t.skills.softSkillsTitle}</h3>
                  {t.skills.softSkills.map((skill) => (
                    <div className="skill" key={skill.name}>
                      <span>{skill.name}</span>
                      <div className="meter">
                        <span style={{ width: `${skill.value}%` }} />
                      </div>
                    </div>
                  ))}
                </section>
                <section className="sheet">
                  <h3>{t.skills.software}</h3>
                  <ul className="soft-list">
                    {SOFTWARE.map((item) => (
                      <li key={item.name}>
                        <span>{item.name === "Microsoft Office" ? `${item.name} (${t.skills.officeSuite})` : item.name}</span>
                        <span className={`level level-${item.level}`}>{t.skills.levels[item.level]}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="sheet">
                  <h3>{t.skills.tech}</h3>
                  <ul className="check-list">
                    {t.skills.techItems.map((item) => (
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
                  <span>08</span> {t.contact.kicker}
                </p>
                <h2 className="section-title" id="contacto-titulo">
                  {t.contact.title} <Scribble>{t.contact.accent}</Scribble>
                </h2>
                <p className="lede">{t.contact.lede}</p>
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
                    {t.contact.cta} <ArrowRight aria-hidden className="btn-arrow" size={16} weight="bold" />
                  </a>
                  <a className="btn" download href={CONTACT.cv}>
                    <DownloadSimple aria-hidden size={16} weight="bold" /> {t.hero.ctaCv}
                  </a>
                </div>
              </div>
              <figure className="polaroid contact-polaroid">
                <div className="polaroid-img">
                  <Image alt={t.contact.photoAlt} fill sizes="(max-width: 960px) 90vw, 380px" src="/fotos/ciudad.jpg" />
                </div>
                <figcaption>{t.contact.photoCaption}</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Miguel Liébana · {t.footer.made}</span>
          <span className="footer-links">
            <a href={CONTACT.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href={CONTACT.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a href="https://github.com/liebanavicente/miguelweb2026" rel="noreferrer" target="_blank">
              {t.footer.source}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
