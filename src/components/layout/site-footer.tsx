export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} Manan Jain</p>
        <p>Built with React, Vite, Tailwind, and shadcn/ui</p>
      </div>
    </footer>
  )
}