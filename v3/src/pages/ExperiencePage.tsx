import { Link } from "react-router-dom"
import { Tags } from "../components/Tags"
import { experiencePage, workExperience, education } from "../content/experience"
import { pageMeta } from "../content/meta"
import { briefUrl } from "../lib/links"
import styles from "./ExperiencePage.module.css"

export function ExperiencePage() {
  return (
    <div className="container">
      <section className={styles.intro}>
        <p className="eyebrow">{experiencePage.eyebrow}</p>
        <h1>{experiencePage.headline.map(line => <span key={line}>{line}</span>)}</h1>
        <p className="muted">{pageMeta.experience.description}</p>
      </section>
      {workExperience.length > 0 && <section className={styles.listing} aria-labelledby="work-heading">
        <h2 id="work-heading" className="eyebrow">{experiencePage.workLabel}</h2>
        {workExperience.map(entry => <article key={`${entry.organization}-${entry.period}`} className={styles.entry}>
          <div className={styles.context}>
            <p>{entry.period}</p>
            {entry.jobLocation && <p className="muted">{entry.jobLocation}</p>}
          </div>
          <div className={styles.detail}>
            <h3>{entry.title}</h3>
            <p className={styles.organization}>{entry.organization}</p>
            <p className={`muted ${styles.summary}`}>{entry.summary}</p>
            {entry.bullets.length > 0 && <ul className={styles.bullets}>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
            <Tags tags={entry.technologies} />
            {entry.relatedProjects && <div className={`actions ${styles.related}`}>
              {entry.relatedProjects.map(project => <Link key={project.slug} className="text-link" to={briefUrl(project.slug)}>{project.label}</Link>)}
            </div>}
          </div>
        </article>)}
      </section>}
      {education.length > 0 && <section className={styles.listing} aria-labelledby="education-heading">
        <h2 id="education-heading" className="eyebrow">{experiencePage.educationLabel}</h2>
        {education.map(entry => <article key={`${entry.school}-${entry.period}`} className={styles.entry}>
          <p className={styles.context}>{entry.period}</p>
          <div className={styles.detail}>
            <h3>{entry.school}</h3>
            <p className={styles.organization}>{entry.degree}</p>
            <p className={`muted ${styles.summary}`}>{entry.summary}</p>
            {entry.bullets.length > 0 && <ul className={styles.bullets}>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
            <Tags tags={entry.technologies} />
          </div>
        </article>)}
      </section>}
    </div>
  )
}
