import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Project } from "@/content/projects"

type ProjectCompactCardProps = {
  project: Project
  onLearnMore: () => void
}

export function ProjectCompactCard({
  project,
  onLearnMore,
}: ProjectCompactCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1">
      {project.imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="border-b border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-sky-400/10 px-6 py-4">
          <p className="text-sm font-medium text-primary">{project.category}</p>
        </div>
      )}

      <CardHeader className="space-y-3">
        <p className="text-sm font-medium text-primary">{project.tagline}</p>
        <CardTitle className="text-xl leading-7">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.timeframe}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button type="button" variant="ghost" className="px-0" onClick={onLearnMore}>
          Learn more
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}