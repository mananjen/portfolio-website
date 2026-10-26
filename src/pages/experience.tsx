import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SectionHeading } from "@/components/layout/section-heading"
import { education, workExperience, experienceContent } from "@/content/experience"

export function ExperiencePage() {
  return (
    <div className="space-y-14 md:space-y-20">
      <section className="space-y-4">
        <SectionHeading {...experienceContent.intro} />
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {experienceContent.workEyebrow}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {experienceContent.workTitle}
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
            {experienceContent.educationEyebrow}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {experienceContent.educationTitle}
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