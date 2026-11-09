import { useEffect, useRef } from "react"
import { Navigate, Route, Routes, useLocation, useMatch } from "react-router-dom"
import { Layout } from "./components/Layout"
import { TextLink } from "./components/link"
import { projects } from "./content/projects"
import { notFound } from "./content/site"
import { pageMeta } from "./content/meta"
import { HomePage } from "./pages/HomePage"
import { ProjectsPage } from "./pages/ProjectsPage"
import { ExperiencePage } from "./pages/ExperiencePage"
import { AboutPage } from "./pages/AboutPage"

function RouteEffects() {
  const { pathname, search, hash, key: navigationKey } = useLocation()
  const previousPath = useRef<string | undefined>(undefined)
  const isProjects = useMatch("/projects") !== null
  const isExperience = useMatch("/experience") !== null
  const isAbout = useMatch("/about") !== null
  const isHome = useMatch("/") !== null
  const meta = isProjects ? pageMeta.projects
    : isExperience ? pageMeta.experience
    : isAbout ? pageMeta.about
    : isHome ? pageMeta.home : pageMeta.notFound

  useEffect(() => {
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description)

    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname
    const selected = new URLSearchParams(search).get("project")
    if (isProjects && projects.some(project => project.slug === selected)) return
    const anchor = hash ? document.getElementById(hash.slice(1)) : null
    if (anchor) {
      anchor.focus({ preventScroll: true })
      anchor.scrollIntoView({ block: "start" })
    } else if (changedPage) {
      window.scrollTo(0, 0)
      document.getElementById("main")?.focus({ preventScroll: true })
    }
  }, [pathname, search, hash, navigationKey, isProjects, meta])

  return null
}

export function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={(
            <section className="container page-message">
              <h1>{notFound.title}</h1>
              <p className="muted">{notFound.description}</p>
              <div className="actions"><TextLink tone="plain" href="/">{notFound.home}</TextLink><TextLink tone="plain" href="/projects">{notFound.projects}</TextLink></div>
            </section>
          )} />
        </Route>
      </Routes>
    </>
  )
}
