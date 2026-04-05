import { Mail, FolderGit2, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const links = [
  {
    label: "Email",
    value: "mananjen@gmail.com",
    href: "mailto:mananjen@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/mananjen",
    href: "https://github.com/mananjen",
    icon: FolderGit2,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mananjen",
    href: "https://www.linkedin.com/in/mananjen",
    icon: UserRound,
  },
]

export function ContactPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Easy ways to reach me.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          This page will stay simple. The main improvement is visual polish and
          better spacing, not adding noise.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="border-border/70 bg-card/80">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-medium">{item.value}</p>
                  </div>
                </div>

                <Button asChild variant="outline">
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}