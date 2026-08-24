import { useState } from "react"
import { Mail, FolderGit2, UserRound, Phone, Copy, Check } from "lucide-react"
import { TbBrandLinkedin } from "react-icons/tb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { contactLinks, type ContactLink } from "@/content/site"

function getIcon(item: ContactLink) {
  if (item.label === "GitHub") return FolderGit2
  if (item.label === "LinkedIn") return TbBrandLinkedin
  if (item.kind === "phone") return Phone
  if (item.kind === "email") return Mail
  return UserRound
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.setAttribute("readonly", "")
  textArea.style.position = "absolute"
  textArea.style.left = "-9999px"
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
}

export function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = async (email: string) => {
    try {
      await copyToClipboard(email)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch (error) {
      console.error("Failed to copy email:", error)
    }
  }

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
          The easiest way to reach me is by email or LinkedIn. I typically respond within a day or two, but it may take longer during busy periods. I look forward to connecting with you!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contactLinks.map((item) => {
          const Icon = getIcon(item)
          const isExternal = item.kind === "external"
          const isEmail = item.kind === "email"

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

                {isEmail ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline">
                      <a href={item.href}>Compose</a>
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleCopyEmail(item.value)}
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="mr-2 size-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 size-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="outline">
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      {item.kind === "phone" ? "Call" : "Open"}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}