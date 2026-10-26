import { useSearchParams } from "react-router-dom"
import { ProjectCard } from "../components/ProjectCard"
import { featuredProjects, additionalProjects } from "../content/projects"
import { projectPage } from "../content/site"
import styles from "./ProjectsPage.module.css"

export function ProjectsPage() {
  const [params, setParams] = useSearchParams()
  const selectedSlug = params.get("project")

  function toggleProject(slug: string) {
    setParams(current => {
      const next = new URLSearchParams(current)
      if (next.get("project") === slug) next.delete("project")
      else next.set("project", slug)
      return next
    })
  }

  return (
    <div className="container">
      <section className={styles.intro}>
        <p className="eyebrow">{projectPage.eyebrow}</p>
        <h1>{projectPage.headline.map(line => <span key={line}>{line}</span>)}</h1>
        <p className="muted">{projectPage.description}</p>
      </section>
      {[
        { label: projectPage.featuredLabel, projects: featuredProjects },
        { label: projectPage.additionalLabel, projects: additionalProjects },
      ].map(group => group.projects.length > 0 && (
        <section key={group.label} className={styles.listing} aria-label={group.label}>
          <p className="eyebrow">{group.label} / {String(group.projects.length).padStart(2, "0")}</p>
          {group.projects.map(project => (
            <ProjectCard
              key={project.slug}
              project={project}
              expanded={selectedSlug === project.slug}
              onToggle={() => toggleProject(project.slug)}
            />
          ))}
        </section>
      ))}
    </div>
  )
}
