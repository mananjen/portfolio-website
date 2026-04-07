import { Mail, FolderGit2, UserRound, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { contactLinks, type ContactLink } from "@/content/site"

const iconMap: Record<ContactLink["kind"] | "github" | "linkedin", React.ComponentType<{ className?: string }>> = {
  email: Mail,
  phone: Phone,
  external: UserRound,
  github: FolderGit2,
  linkedin: UserRound,
}

function getIcon(item: ContactLink) {
  if (item.label === "GitHub") return FolderGit2
  if (item.label === "LinkedIn") return UserRound
  if (item.kind === "phone") return Phone
  if (item.kind === "email") return Mail
  return UserRound
}

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
          The easiest way to reach me is by email or LinkedIn. Phone is here as
          a direct option if needed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contactLinks.map((item) => {
          const Icon = getIcon(item)
          const isExternal = item.kind === "external"

          return (
            <Card key={item.label} className="border-border/70 bg-card/80">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>

                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="mt-1 block font-medium transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>

                <Button asChild variant="outline">
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {item.kind === "email"
                      ? "Compose Email"
                      : item.kind === "phone"
                        ? "Call"
                        : "Open"}
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