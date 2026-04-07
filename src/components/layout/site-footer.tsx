import { contactLinks, siteConfig } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, Vite, Tailwind, and shadcn/ui.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.kind === "external" ? "_blank" : undefined}
              rel={item.kind === "external" ? "noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}