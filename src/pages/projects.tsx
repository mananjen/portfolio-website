import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  additionalProjects,
  featuredProjects,
  getProjectLinks,
} from "@/content/projects"

export function ProjectsPage() {
  return (
    <div className="space-y-14 md:space-y-20">
      <section className="space-y-4">
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Projects
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
          Selected work across AI research, NLP, computer vision, web systems,
          VR, and applied machine learning.
        </h1>

        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          This page is meant to make the strongest work easy to scan. The
          featured projects show the clearest mix of technical depth, practical
          implementation, and product-oriented thinking.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Featured Case Studies
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            The projects I’d most want someone to remember.
          </h2>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project) => {
            const links = getProjectLinks(project)

            return (
              <Card
                key={project.slug}
                className="overflow-hidden border-border/70 bg-card/80"
              >
                <CardHeader className="space-y-4 p-6 md:p-8">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">
                      {project.tagline}
                    </p>
                    <CardTitle className="text-2xl md:text-3xl">
                      {project.title}
                    </CardTitle>
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

                <CardContent className="grid gap-8 p-6 pt-0 md:grid-cols-2 md:p-8 md:pt-0">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold tracking-wide uppercase">
                        Overview
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground md:text-base">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold tracking-wide uppercase">
                        Why it matters
                      </h3>
                      <p className="text-sm leading-6 text-foreground/90 md:text-base">
                        {project.impact}
                      </p>
                    </div>

                    {links.length > 0 ? (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {links.map((link) => (
                          <Button key={link.label} asChild variant="outline">
                            <a href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                              <ExternalLink className="ml-2 size-4" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Additional Projects
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            More work that adds range to the portfolio.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {additionalProjects.map((project) => {
            const links = getProjectLinks(project)

            return (
              <Card
                key={project.slug}
                className="border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1"
              >
                <CardHeader className="space-y-3">
                  <p className="text-sm font-medium text-primary">
                    {project.category}
                  </p>
                  <CardTitle className="text-xl leading-7">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {project.timeframe}
                  </p>
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

                  {links.length > 0 ? (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {links.map((link) => (
                        <Button key={link.label} asChild variant="ghost" className="px-0">
                          <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                            <ArrowRight className="ml-2 size-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}