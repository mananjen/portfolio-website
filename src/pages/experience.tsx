import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const timeline = [
  {
    title: "UIC NLP Lab",
    role: "Graduate Research Assistant",
    period: "2025 – Present",
    summary:
      "Research spanning multilingual retrieval and sarcasm detection with a stronger emphasis on technical depth and experimentation.",
  },
  {
    title: "Lowe’s India",
    role: "Software Engineer",
    period: "2019 – 2023",
    summary:
      "Frontend and internal platform work centered on usability, maintainability, and business-facing product improvements.",
  },
  {
    title: "UIC + NIT Kurukshetra",
    role: "Education",
    period: "2015 – 2025",
    summary:
      "A foundation in computer engineering, applied machine learning, and modern software development.",
  },
]

export function ExperiencePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Experience
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Work, research, and education in one cleaner timeline.
        </h1>
      </div>

      <Card className="border-border/70 bg-card/80">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.title}>
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm font-medium text-primary">
                      {item.role}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.period}</p>
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                  {item.summary}
                </p>

                {index < timeline.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}