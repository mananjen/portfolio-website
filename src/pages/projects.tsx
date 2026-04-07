import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ProjectCompactCard } from "@/components/projects/project-compact-card"
import { ProjectDetailCard } from "@/components/projects/project-detail-card"
import {
  additionalProjects,
  featuredProjects,
  type Project,
} from "@/content/projects"

type ProjectsLocationState = {
  expandProject?: string
  preserveScroll?: boolean
}

function renderCompactGrid(
  projects: Project[],
  onExpand: (slug: string) => void
) {
  if (projects.length === 0) return null

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCompactCard
          key={project.slug}
          project={project}
          onLearnMore={() => onExpand(project.slug)}
        />
      ))}
    </div>
  )
}

export function ProjectsPage() {
  const location = useLocation()
  const routeState = (location.state as ProjectsLocationState | null) ?? null

  const [expandedProjectSlug, setExpandedProjectSlug] = useState<string | null>(null)

  const toggleProject = (slug: string) => {
    setExpandedProjectSlug((current) => (current === slug ? null : slug))
  }

  useEffect(() => {
    if (!routeState?.expandProject) return
    setExpandedProjectSlug(routeState.expandProject)
  }, [routeState?.expandProject])

  useEffect(() => {
    if (!expandedProjectSlug) return

    const el = document.getElementById(`project-${expandedProjectSlug}`)
    if (!el) return

    requestAnimationFrame(() => {
      el.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    })
  }, [expandedProjectSlug])

  const orderedAdditionalProjects = [...additionalProjects].sort((a, b) => {
    if (a.slug === "real-or-ai-generated") return -1
    if (b.slug === "real-or-ai-generated") return 1
    return 0
  })

  const expandedAdditionalIndex = orderedAdditionalProjects.findIndex(
    (project) => project.slug === expandedProjectSlug
  )

  const additionalBefore =
    expandedAdditionalIndex === -1
      ? orderedAdditionalProjects
      : orderedAdditionalProjects.slice(0, expandedAdditionalIndex)

  const expandedAdditionalProject =
    expandedAdditionalIndex === -1
      ? null
      : orderedAdditionalProjects[expandedAdditionalIndex]

  const additionalAfter =
    expandedAdditionalIndex === -1
      ? []
      : orderedAdditionalProjects.slice(expandedAdditionalIndex + 1)

  return (
    <div className="space-y-14 md:space-y-20">
      <section className="space-y-4">
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Projects
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
          Selected work across AI research, NLP, computer vision, VR, web systems,
          and applied machine learning.
        </h1>

        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          Every project can expand into a more detailed case-study view, to give a deeper look at the motivation, process, and impact of the work. Click on any project card to explore!
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Featured Projects
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            The three projects I’d want someone to remember first.
          </h2>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <ProjectDetailCard
              key={project.slug}
              project={project}
              expanded={expandedProjectSlug === project.slug}
              onToggle={() => toggleProject(project.slug)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Additional Projects
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Some more projects that I'm proud of, feel free to explore!
          </h2>
        </div>

        <div className="space-y-6">
          {renderCompactGrid(additionalBefore, toggleProject)}

          {expandedAdditionalProject ? (
            <ProjectDetailCard
              project={expandedAdditionalProject}
              expanded={true}
              onToggle={() => toggleProject(expandedAdditionalProject.slug)}
            />
          ) : null}

          {renderCompactGrid(additionalAfter, toggleProject)}
        </div>
      </section>
    </div>
  )
}