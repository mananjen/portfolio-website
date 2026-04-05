import { ArrowRight, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import profilePic from "@/assets/temp.jpg"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AboutPage() {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Software Engineer • AI / NLP / CV
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Building practical AI systems with clean product thinking.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            I’m Manan Jain, a software engineer with experience across
            production web systems, NLP, computer vision, and research-driven
            AI projects. This new version of the site is focused on stronger
            visual hierarchy, cleaner storytelling, and better project
            presentation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/projects">
              View Projects
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link to="/contact">
              Contact Me
              <Mail className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Focus</p>
              <p className="mt-2 font-medium">AI + full-stack systems</p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Strength</p>
              <p className="mt-2 font-medium">Research to product execution</p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Next step</p>
              <p className="mt-2 font-medium">Featured case studies</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-400/20 blur-2xl" />
          <img
            src={profilePic}
            alt="Manan Jain"
            className="relative h-[320px] w-[280px] rounded-[2rem] border border-border/70 object-cover shadow-2xl md:h-[420px] md:w-[340px]"
          />
        </div>
      </div>
    </section>
  )
}