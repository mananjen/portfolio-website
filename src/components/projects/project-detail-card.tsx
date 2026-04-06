import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Project, getProjectLinks } from "@/content/projects"

type ProjectDetailCardProps = {
  project: Project
  expanded: boolean
  onToggle: () => void
}

export function ProjectDetailCard({
  project,
  expanded,
  onToggle,
}: ProjectDetailCardProps) {
  const links = getProjectLinks(project)

  const challenge = project.details?.challenge ?? project.summary

  const approach =
    project.details?.approach ?? [
      `Built using ${project.technologies.slice(0, 4).join(", ")}.`,
      "Focused on turning the core idea into a usable end-to-end implementation.",
    ]

  const results = project.details?.results ?? [project.impact]

  return (
    <Card className="overflow-hidden border-border/70 bg-card/80">
      {project.imageUrl ? (
        <div className="aspect-[16/8] overflow-hidden border-b border-border/60 bg-muted">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <CardHeader className="space-y-4 p-6 md:p-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">{project.tagline}</p>
          <CardTitle className="text-2xl md:text-3xl">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {project.category} • {project.timeframe}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6 pt-0 md:p-8 md:pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Overview
            </h3>
            <p className="text-sm leading-6 text-muted-foreground md:text-base">
              {project.summary}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Why it matters
            </h3>
            <p className="text-sm leading-6 text-foreground/90 md:text-base">
              {project.impact}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={onToggle}>
            {expanded ? (
              <>
                Show less
                <ChevronUp className="ml-2 size-4" />
              </>
            ) : (
              <>
                Learn more
                <ChevronDown className="ml-2 size-4" />
              </>
            )}
          </Button>

          {links.map((link) => (
            <Button key={link.label} asChild variant="ghost">
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          ))}
        </div>

        {expanded ? (
          <div className="grid gap-6 rounded-2xl border border-border bg-background/70 p-5 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wide uppercase">
                Challenge
              </h4>
              <p className="text-sm leading-6 text-muted-foreground">
                {challenge}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wide uppercase">
                Technical approach
              </h4>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {approach.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wide uppercase">
                Outcomes
              </h4>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {results.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}