import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeading } from "@/components/layout/section-heading"
import { education, workExperience } from "@/content/experience"

export function ExperiencePage() {
  return (
    <div className="space-y-14 md:space-y-20">
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Experience"
          title="Work, research, and education with detail."
          description="This page focuses on the experiences that shaped how I work: production engineering, applied research, and a strong academic foundation in AI, NLP, and systems."
        />
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Work Experience
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Research and engineering experience across industry and academia.
          </h2>
        </div>

        <Card className="border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-8">
              {workExperience.map((item, index) => (
                <div key={`${item.title}-${item.organization}`} className="space-y-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-sm font-medium text-primary">
                        {item.organization}
                        {item.jobLocation ? ` • ${item.jobLocation}` : ""}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </div>

                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-3 pl-5 text-sm leading-6 text-muted-foreground md:text-base">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {index < workExperience.length - 1 ? <Separator className="pt-2" /> : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Education
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Academic foundation in computer science, AI, and applied systems work.
          </h2>
        </div>

        <Card className="border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={`${item.school}-${item.degree}`} className="space-y-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{item.school}</h3>
                      <p className="text-sm font-medium text-primary">{item.degree}</p>
                    </div>

                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </div>

                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-3 pl-5 text-sm leading-6 text-muted-foreground md:text-base">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {index < education.length - 1 ? <Separator className="pt-2" /> : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}