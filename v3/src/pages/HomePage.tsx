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
            <p className="eyebrow">{home.eyebrow}</p>
            <h1>{home.headline.map(line => <span key={line}>{line}</span>)}</h1>
            <p className={styles.introCopy}>{home.intro}</p>
            <Link className="text-link" to="/#work">{home.workCta}</Link>
          </div>
          <figure className={styles.portrait}>
            <img src={home.portrait.src} alt={home.portrait.alt} width="180" height="215" fetchPriority="high" />
            <figcaption>{home.portrait.caption}</figcaption>
          </figure>
        </div>
      </section>
      <div className="container">
        <section id="work" className={styles.work} tabIndex={-1}>
          <div className={styles.sectionLine}>
            <p className="eyebrow">{home.featuredLabel}</p>
            <Link className="text-link" to="/projects">{home.allProjects}</Link>
          </div>
          {lead && (
            <article className={styles.lead}>
              <div>
                <p className="eyebrow">{lead.category} / {lead.timeframe}</p>
                <h2>{lead.title}</h2>
                <p className="muted">{lead.summary}</p>
                {lead.role && <p className={styles.role}>{lead.role}</p>}
                <Tags tags={lead.technologies} />
                <div className="actions">
                  <Link className="text-link" to={briefUrl(lead.slug)} aria-label={projectLabels.readLabel(lead.title)}>{projectLabels.read} →</Link>
                  <ArtifactLinks links={lead.links} />
                </div>
              </div>
              {lead.image && (
                <figure className={styles.research}>
                  <a href={lead.image} target="_blank" rel="noreferrer"><img src={lead.image} alt={projectLabels.imageAlt(lead.title)} /></a>
                  <figcaption>{projectLabels.image}</figcaption>
                </figure>
              )}
            </article>
          )}
          {supporting.length > 0 && (
            <div className={styles.supporting}>
              <p className="eyebrow">{home.moreLabel}</p>
              {supporting.map((project, index) => (
                <article key={project.slug}>
                  <span className={styles.number} aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
                  <div>
                    <h3><Link to={briefUrl(project.slug)}>{project.title}</Link></h3>
                    <p>{project.summary}</p>
                    <div className="actions">
                      <Link className="text-link" to={briefUrl(project.slug)} aria-label={projectLabels.readLabel(project.title)}>{projectLabels.read} →</Link>
                      <ArtifactLinks links={project.links} />
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
            <p className="eyebrow">{home.personal.eyebrow}</p>
            <h2>{home.personal.title}</h2>
            <p className="muted">{home.personal.description}</p>
            <a className="text-link" href={home.personal.link.href}>{home.personal.link.label}</a>
          </div>
        </aside>
      </div>
    </>
  )
}
