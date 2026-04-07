import { Menu } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/content/site"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-sm font-medium transition-colors",
    isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  ].join(" ")

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.16em] text-foreground uppercase"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild>
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(92vw,320px)] px-4 sm:px-5"
            >
              <SheetHeader className="px-1">
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex min-w-0 flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      [
                        "block w-full max-w-full rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                        "box-border",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="pt-1">
                  <ThemeToggle className="w-full max-w-full rounded-2xl" />
                </div>

                <Button asChild className="mt-2 w-full max-w-full rounded-2xl">
                  <a href={siteConfig.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}