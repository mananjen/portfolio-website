import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/layout/section-heading"
import { aboutContent, aboutPageContent } from "@/content/about"
import { siteConfig } from "@/content/site"

export function AboutPage() {
  return (
    <div className="space-y-14 md:space-y-20">
      <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <SectionHeading {...aboutPageContent.intro} />

          <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground md:text-lg">
            {aboutContent.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-400/20 blur-3xl" />
            <img
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              className="relative h-[320px] w-[280px] rounded-[2rem] border border-border/70 object-cover shadow-2xl md:h-[420px] md:w-[340px]"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {aboutPageContent.artEyebrow}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {aboutPageContent.artTitle}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {aboutContent.artIntro}
          </p>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {aboutContent.books}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aboutContent.gallery.map((item) => (
            <Card
              key={item.alt}
              className="overflow-hidden border-border/70 bg-card/80"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Button asChild variant="outline" size="lg">
            <a
              href={aboutContent.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {aboutPageContent.instagramCta}
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {aboutPageContent.factsTitle}
              </p>

              <ul className="space-y-3 pl-5 text-sm leading-6 text-muted-foreground md:text-base">
                {aboutContent.funFacts.map((fact) => (
                  <li key={fact} className="list-disc">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {aboutPageContent.rightNowTitle}
              </p>

              <ul className="space-y-3 pl-5 text-sm leading-6 text-muted-foreground md:text-base">
                {aboutContent.rightNow.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}