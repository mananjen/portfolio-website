import { Link } from "react-router-dom"
import { ArtifactLinks } from "../components/ArtifactLinks"
import { Tags } from "../components/Tags"
import { homeProjects } from "../content/projects"
import { home, projectLabels } from "../content/site"
import { briefUrl } from "../lib/links"
import styles from "./HomePage.module.css"

export function HomePage() {
  const { lead, supporting } = homeProjects

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.intro}`}>
          <div>
            <p className={styles.heroLabel}>{home.eyebrow}</p>
            <h1 className={styles.heroTitle}>{home.headline.map(line => <span key={line}>{line}</span>)}</h1>
            <p className={styles.introCopy}>{home.intro}</p>
            <Link className="text-link" to="/#work">{home.workCta}</Link>
          </div>
          <figure className={styles.portrait}>
            <img src={home.portrait.src} alt={home.portrait.alt} width="180" height="215" fetchPriority="high" />
            <figcaption className={styles.portraitCaption}>{home.portrait.caption}</figcaption>
          </figure>
        </div>
      </section>
      <div className="container">
        <section id="work" className={styles.work} tabIndex={-1}>
          <div className={styles.sectionLine}>
            <p className={styles.accentLabel}>{home.featuredLabel}</p>
            <Link className="text-link" to="/projects">{home.allProjects}</Link>
          </div>
          {lead && (
            <article className={styles.lead}>
              <div>
                <p className={styles.accentLabel}>{lead.category} / {lead.timeframe}</p>
                <h2>{lead.title}</h2>
                <p className={styles.leadSummary}>{lead.summary}</p>
                {lead.role && <p className={styles.role}>{lead.role}</p>}
                <Tags tags={lead.technologies} />
                <div className="actions">
                  <Link className="text-link" to={briefUrl(lead.slug)} aria-label={projectLabels.readLabel(lead.title)}>{projectLabels.read} →</Link>
                  <ArtifactLinks links={lead.links} bibtex={lead.bibtex} />
                </div>
              </div>
              {lead.image && (
                <figure className={styles.research}>
                  <a href={lead.image} target="_blank" rel="noreferrer"><img src={lead.image} alt={projectLabels.imageAlt(lead.title)} /></a>
                  <figcaption className={styles.researchCaption}>{projectLabels.image}</figcaption>
                </figure>
              )}
            </article>
          )}
          {supporting.length > 0 && (
            <div className={styles.supporting}>
              <p className={styles.supportingLabel}>{home.moreLabel}</p>
              {supporting.map((project, index) => (
                <article key={project.slug}>
                  <span className={styles.number} aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
                  <div>
                    <h3><Link to={briefUrl(project.slug)}>{project.title}</Link></h3>
                    <p className={styles.supportingSummary}>{project.summary}</p>
                    <div className="actions">
                      <Link className="text-link" to={briefUrl(project.slug)} aria-label={projectLabels.readLabel(project.title)}>{projectLabels.read} →</Link>
                      <ArtifactLinks links={project.links} bibtex={project.bibtex} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <aside className={styles.personal}>
          <img src={home.personal.image} alt={home.personal.alt} loading="lazy" />
          <div>
            <p className={styles.accentLabel}>{home.personal.eyebrow}</p>
            <h2>{home.personal.title}</h2>
            <p className={styles.personalBlurb}>{home.personal.description}</p>
            <Link className="text-link" to={home.personal.link.path}>{home.personal.link.label}</Link>
          </div>
        </aside>
      </div>
    </>
  )
}
