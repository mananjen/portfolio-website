import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const featured = [
  {
    title: "Multilingual Image-Text Retrieval",
    blurb:
      "A research-driven retrieval system combining pretrained vision and multilingual text encoders.",
    tags: ["NLP", "Vision", "Research"],
  },
  {
    title: "Hinglish Sarcasm Detection",
    blurb:
      "An end-to-end NLP pipeline with experiments, error analysis, and multilingual language understanding.",
    tags: ["NLP", "Classification", "Evaluation"],
  },
  {
    title: "Production Web Systems at Lowe’s",
    blurb:
      "UI and content-platform work focused on usability, reliability, and maintainable frontend code.",
    tags: ["Frontend", "UX", "Web"],
  },
]

export function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Featured work, presented more like case studies.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          In Iteration 2, this page will move from expandable descriptions to
          stronger cards, outcomes, screenshots, and clearer technical
          storytelling.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project) => (
          <Card
            key={project.title}
            className="border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {project.blurb}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}