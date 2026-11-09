import { useEffect, useRef } from "react"
import type { Project } from "../content/projects"
import { projectLabels } from "../content/site"
import { ArtifactLinks } from "./ArtifactLinks"
import { ImageLink, TextButton } from "./link"
import { Tags } from "./Tags"
import styles from "./ProjectCard.module.css"

type ProjectCardProps = {
  project: Project
  expanded: boolean
  onToggle: () => void
}

export function ProjectCard({ project, expanded, onToggle }: ProjectCardProps) {
  const article = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(false)
  const briefId = `brief-${project.slug}`

  useEffect(() => {
    if (expanded) {
      toggle.current?.focus({ preventScroll: true })
      article.current?.scrollIntoView({ block: "start", behavior: "instant" })
    } else if (wasExpanded.current && document.activeElement === document.body) {
      toggle.current?.focus({ preventScroll: true })
    }
    wasExpanded.current = expanded
  }, [expanded])

  return (
    <article ref={article} id={`project-${project.slug}`} className={styles.project}>
      <div className={styles.preview}>
        <div>
          <p className={styles.categoryLabel}>{project.category} / {project.timeframe}</p>
          <h2>{project.title}</h2>
          <p className={styles.summary}>{project.summary}</p>
          {project.role && <p className={styles.role}>{project.role}</p>}
          <Tags tags={project.technologies} />
          <div className="actions"><ArtifactLinks links={project.links} bibtex={project.bibtex} /></div>
        </div>
        {project.image && (
          <figure className={styles.figure}>
            <ImageLink href={project.image} label={projectLabels.imageLink(project.title)}>
              <img src={project.image} alt={projectLabels.imageAlt(project.title)} loading="lazy" />
            </ImageLink>
            <figcaption className={styles.figureCaption}>{projectLabels.image}</figcaption>
          </figure>
        )}
      </div>
      <TextButton
        ref={toggle}
        className={styles.toggle}
        aria-label={expanded ? projectLabels.closeLabel(project.title) : projectLabels.readLabel(project.title)}
        aria-expanded={expanded}
        aria-controls={briefId}
        onClick={onToggle}
      >
        {expanded ? projectLabels.close : projectLabels.read}
      </TextButton>
      <div id={briefId} className={styles.brief} hidden={!expanded}>
        {project.brief.map(section => (
          <section key={section.heading}>
            <h3 className={styles.briefHeading}>{section.heading}</h3>
            <p className={styles.briefText}>{section.text}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
