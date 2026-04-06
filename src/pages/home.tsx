import { ArrowRight, Mail, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import profilePic from "@/assets/temp.jpg"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/layout/section-heading"
import {
  contactLinks,
  experienceHighlights,
  heroContent,
  homeFeaturedProjects,
  siteConfig,
} from "@/content/site"
import { getProjectLinks } from "@/content/projects"

export function HomePage() {
  return (
    <div className="space-y-18 md:space-y-24">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-7"
        >
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {heroContent.eyebrow}
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {heroContent.headline}
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {heroContent.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
                <Mail className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {heroContent.proofPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-400/20 blur-3xl" />
            <img
              src={profilePic}
              alt={siteConfig.name}
              className="relative h-[320px] w-[280px] rounded-[2rem] border border-border/70 object-cover shadow-2xl md:h-[420px] md:w-[340px]"
            />
          </div>
        </motion.div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="A few projects that best represent how I like to build."
          description="Three recent projects that combine technical depth, practical constraints, and clear product thinking."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {homeFeaturedProjects.map((project) => {
            const primaryLink = getProjectLinks(project)[0]

            return (
              <Card
                key={project.slug}
                className="overflow-hidden border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1"
              >
                {project.imageUrl ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="border-b border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-sky-400/10 px-6 py-5">
                    <p className="text-sm font-medium text-primary">
                      {project.category}
                    </p>
                  </div>
                )}

                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">
                      {project.tagline}
                    </p>

                    <h3 className="text-xl font-semibold leading-7">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <Button asChild variant="ghost" className="px-0">
                      <Link to="/projects">
                        View details
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>

                    {primaryLink ? (
                      <a
                        href={primaryLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {primaryLink.label}
                        <ExternalLink className="ml-1 size-4" />
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <SectionHeading
              eyebrow="Experience Snapshot"
              title="A mix of research, engineering, and product-facing work."
              description="My diverse work experience has given me a broad perspective on how to build impactful products, and I'm always eager to learn more."
            />

            <div className="mt-8 space-y-6">
              {experienceHighlights.map((item) => (
                <div key={`${item.title}-${item.org}`} className="space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm font-medium text-primary">
                        {item.org}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.period}
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
            <div className="space-y-4">
              <SectionHeading
                eyebrow="Contact"
                title="Easy ways to reach me."
                description="Feel free to ask about my work, chat about potential opportunities, or just say hi. I’m always open to connecting with new people."
              />

              <div className="space-y-4 pt-2">
                {contactLinks.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-background/70 p-4"
                  >
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button asChild size="lg" className="w-full">
                <Link to="/contact">Open Contact Page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}